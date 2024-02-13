using System;
using System.Collections.Generic;
using System.Linq;
using BAv02.Models.ComplianceReport;

namespace BAv02.Models.DataAccessLayers
{
    public class ComplianceReportSuperAdminDAL
    {

        public DriverComplianceReport getDriverReport(long companyId)
        {
            List<HiringDateDto> hiringDates = new List<HiringDateDto>();
            List<DriverCompliance> driverCompliances = new List<DriverCompliance>();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    hiringDates = this.getDriverHiringDatesByCompany(companyId);
                    driverCompliances = DbContext.DriverCompliance.Where(x => x.IdCompany == companyId).ToList();
                }

            }
            catch (Exception e) { Console.WriteLine(e); }

            DriverComplianceReport driverCompliance = new DriverComplianceReport();
            if (driverCompliances.Count > 0)
            {
                driverCompliance.DriverReport = this.GetDriverReports(driverCompliances);
                int totalCompliance = 0;
                for (int y = 0; y < driverCompliance.DriverReport.Count; y++)
                {
                    totalCompliance += driverCompliance.DriverReport[y].driverCount;
                }
                driverCompliance.CompliancePercentage = 100 * totalCompliance / (driverCompliances.Count * driverCompliance.DriverReport.Count);
                driverCompliance.DriversByQuarters = this.processHiringDates(hiringDates);
                driverCompliance.ActiveDrivers = driverCompliances.Count;
                driverCompliance.DriversInFullCompliance = this.getDriversInFullCompliance(driverCompliances);
            }
            return driverCompliance;
        }

        public CompanyComplianceReport getCompanyReport(long companyId)
        {
            CompanyCompliance companyCompliance = new CompanyCompliance();
            List<CompanyComplianceDate> complianceDates = new List<CompanyComplianceDate>();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    companyCompliance = DbContext.CompanyCompliance.Where(x => x.CompanyId == companyId).FirstOrDefault();
                    complianceDates = DbContext.CompanyComplianceDate.Where(x => x.CompanyId == companyId).ToList<CompanyComplianceDate>();
                }

            }
            catch (Exception e) { Console.WriteLine(e); }
            CompanyComplianceReport companyComplianceReport = new CompanyComplianceReport();
            companyComplianceReport.CompanyReport = this.GetCompanyReports(companyCompliance);
            int totalCompliance = 0;
            for (int y = 0; y < companyComplianceReport.CompanyReport.Count; y++)
            {
                totalCompliance += companyComplianceReport.CompanyReport[y].percentage;
            }
            companyComplianceReport.CompliancePercentage = totalCompliance / 7;
            CompanyComplianceDate newComplianceDate = new CompanyComplianceDate();
            newComplianceDate.CompanyId = companyId;
            newComplianceDate.ComplianceValue = companyComplianceReport.CompliancePercentage;
            newComplianceDate.ComplianceValueDate = DateTime.Now;
            try
            {
                using (var DbContext2 = new BAV02Context())
                {
                    DbContext2.CompanyComplianceDate.Add(newComplianceDate);
                    complianceDates = DbContext2.CompanyComplianceDate.Where(x => x.CompanyId == companyId).ToList<CompanyComplianceDate>();
                    DbContext2.SaveChanges();
                }

            }
            catch (Exception e) { Console.WriteLine(e); }
            complianceDates.Add(newComplianceDate);
            companyComplianceReport.ComplianceDate = complianceDates;
            return companyComplianceReport;
        }

        public TruckComplianceReport getTruckReport(long companyId)
        {
            return this.getVehicleReport(companyId, "VEHICLE");
        }

        public TruckComplianceReport getTrailerReport(long companyId)
        {
            return this.getVehicleReport(companyId, "TRAILER");
        }

        public TruckComplianceReport getVehicleReport(long companyId, string vehicleType)
        {
            int contador = 0;
            List<HiringDateDto> hiringDates = new List<HiringDateDto>();
            List<TruckCompliance> truckCompliances = new List<TruckCompliance>();
            List<TrailerCompliance> trailerCompliances = new List<TrailerCompliance>();
            List<VehicleInspection> truckInspections = new List<VehicleInspection>();
            List<VehicleInspection> truckAnnualInspections = new List<VehicleInspection>();
            List<Vehicle> vehicles = new List<Vehicle>();
            List<Vehicle> Filtervehicles = new List<Vehicle>();
            List<Trailer> trailers = new List<Trailer>();
            Company company = new Company();
            try
            {
                using (var DbContext = new BAV02Context())
                {

                    if (vehicleType == "VEHICLE")
                    {
                        var allvehicles = DbContext.Vehicle.Select(x => new Vehicle
                        {
                            VehicleNumber = x.VehicleNumber,
                            Vin = x.Vin,
                            VehicleType = x.VehicleType,
                            Id = x.Id,
                        });
                        truckCompliances = DbContext.TruckCompliance.Where(x => x.IdCompany == companyId).ToList();
                        foreach (var vehicle in allvehicles)
                        {
                            if (vehicle.Id == truckCompliances[contador].Id)
                            {
                                Filtervehicles.Add(vehicle);
                                contador++;
                            }
                        }
                    }
                    if (vehicleType == "TRAILER")
                    {
                        var alltrailers = DbContext.Trailer.Select(x => new Vehicle
                        {
                            VehicleNumber = x.TrailerNumber,
                            Vin = x.Vin,
                            VehicleType = x.TrailerType,
                            Id = x.IdTrailer,
                        });
                        trailerCompliances = DbContext.TrailerCompliance.Where(x => x.IdCompany == companyId).ToList();
                        truckCompliances = this.MapTruckCompliances(trailerCompliances);
                        foreach (var vehicle in alltrailers)
                        {
                            if (vehicle.Id == truckCompliances[contador].Id)
                            {
                                Filtervehicles.Add(vehicle);
                                contador++;
                            }
                        }
                    }
                    company = DbContext.Company.Where(x => x.Id == companyId).FirstOrDefault();
                    truckInspections = DbContext.VehicleInspections.Where(x => (x.IdCompany == companyId)
                        && (x.VehicleType == vehicleType) && (x.InspectionType == "90-dayInspection")).ToList();
                    truckAnnualInspections = DbContext.VehicleInspections.Where(x => (x.IdCompany == companyId)
                        && (x.VehicleType == vehicleType) && (x.InspectionType == "AnnualInspection")).ToList();
                }
            }
            catch (Exception e) { Console.WriteLine(e); }

            TruckComplianceReport truckCompliance = new TruckComplianceReport();
            if (truckCompliances.Count > 0)
            {
                truckCompliance.TruckReport = this.GetTruckReports(truckCompliances, Filtervehicles);
                int totalCompliance = 0;
                truckCompliance.ActiveTrucks = truckCompliances.Count;
                truckCompliance.HasStateNumberOrCA = company.StateNumber != null ? true : false;
                for (int y = 0; y < truckCompliance.TruckReport.Count; y++)
                {
                    totalCompliance += truckCompliance.TruckReport[y].truckCount;
                }
                truckCompliance.CompliancePercentage = 100 * totalCompliance / (truckCompliances.Count * truckCompliance.TruckReport.Count);
            }
            List<HiringDateDto> inspectionDates90days = new List<HiringDateDto>();
            List<HiringDateDto> inspectionDatesAnnual = new List<HiringDateDto>();
            foreach (var truckInspection in truckInspections)
            {
                HiringDateDto dto = new HiringDateDto();
                dto.HiringDate = truckInspection.InspectionDate;
                inspectionDates90days.Add(dto);
            }
            foreach (var truckInspection in truckAnnualInspections)
            {
                HiringDateDto dto = new HiringDateDto();
                dto.HiringDate = truckInspection.InspectionDate;
                inspectionDatesAnnual.Add(dto);
            }
            truckCompliance.TrucksByQuarters = this.processTruckInspections(inspectionDates90days);
            truckCompliance.TrucksByAnnual = this.processTruckAnnualInspections(inspectionDatesAnnual);
            //truckCompliance.FilterVehicles = Filtervehicles;
            return truckCompliance;
        }

        private List<TruckCompliance> MapTruckCompliances(List<TrailerCompliance> trailerCompliances)
        {
            List<TruckCompliance> truckCompliances = new List<TruckCompliance>();
            foreach (TrailerCompliance trailer in trailerCompliances)
            {
                TruckCompliance truck = new TruckCompliance();
                truck.Dvir = trailer.Dvir;
                truck.Id = trailer.Id;
                truck.IdCompany = trailer.IdCompany;
                truck.StateInspection = trailer.StateInspection;
                truckCompliances.Add(truck);
            }
            return truckCompliances;
        }

        private DriverReport getDriverReport(string alertTag, int driverCount, int driverTotalCount, List<long> Idu, IQueryable<DriverComplianceData> allusers)
        {
            try
            {
                int contador = 0;
                List<DriverComplianceData> filterUser = new List<DriverComplianceData>();
                DriverReport report = new DriverReport();
                report.alertTag = alertTag;
                report.driverCount = driverCount;
                int percentage = 100 * driverCount / driverTotalCount;
                report.percentage = percentage;
                report.severy = percentage >= 100 ? "green" : percentage > 70 ? "yellow" : "red";

                if (Idu.Count() == 0)
                {
                    Idu.Add(0);
                }
                foreach (var fdriver in allusers)
                {
                    if (contador < Idu.Count())
                    {
                        if (fdriver.Id == Idu[contador])
                        {
                            filterUser.Add(fdriver);
                            contador++;
                        }
                    }
                }
                report.alldrivers = filterUser;
                return report;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        private CompanyReport getCompanyReport(string alertTag, int percentage)
        {
            CompanyReport companyReport = new CompanyReport();
            companyReport.alertTag = alertTag;
            companyReport.percentage = percentage;
            companyReport.severy = percentage == 100 ? "green" : "red";
            return companyReport;
        }

        private TruckReport getTruckReport(string alertTag, int truckCount, int truckTotalCount, List<Vehicle> vehicles)
        {
            TruckReport report = new TruckReport();
            report.alertTag = alertTag;
            report.truckCount = truckCount;
            int percentage = truckTotalCount > 0 ? 100 * truckCount / truckTotalCount : 0;
            report.percentage = percentage;
            report.severy = percentage >= 100 ? "green" : percentage > 70 ? "yellow" : "red";
            report.vehicles = vehicles;
            return report;
        }

        public int getDriverCountByCompany(long companyId)
        {
            int count = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    count = (from r in DbContext.CompanyUsersRoles
                             join u in DbContext.Users on r.IdUser equals u.Id
                             join d in DbContext.Driver on u.Id equals d.IdUser
                             where r.IdCompany == companyId && r.Type == "DRIVER" && r.Status == "ACTIVE"
                             select new { Id = u.Id }).Count();
                }
            }
            catch (Exception) { }
            return count;
        }

        public List<HiringDateDto> getDriverHiringDatesByCompany(long companyId)
        {
            List<HiringDateDto> list = new List<HiringDateDto>();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    list = (from r in DbContext.CompanyUsersRoles
                            join u in DbContext.Users on r.IdUser equals u.Id
                            join d in DbContext.Driver on u.Id equals d.IdUser
                            where r.IdCompany == companyId && r.Type == "DRIVER" && r.Status == "ACTIVE"
                            select new HiringDateDto
                            {
                                HiringDate = d.HiringDate
                            }).ToList();
                }
            }
            catch (Exception e) { Console.WriteLine(e); }
            return list;
        }

        private List<DriversByQuarters> processHiringDates(List<HiringDateDto> hiringDates)
        {
            List<HiringDateDto> list = hiringDates;
            List<DriversByQuarters> drivers = new List<DriversByQuarters>();
            int driverCount = 0;
            DateTime now = DateTime.Now;
            for (int i = list.Count - 1; i >= 0; i--)
            {
                if (DateTime.Compare(list[i].HiringDate, now.AddMonths(-12)) < 0)
                {
                    list.RemoveAt(i);
                    driverCount++;
                }
            }
            drivers.Add(this.getDriversInQuarter(now.AddMonths(-12), driverCount));
            for (int i = list.Count - 1; i >= 0; i--)
            {
                if (DateTime.Compare(list[i].HiringDate, now.AddMonths(-9)) < 0)
                {
                    list.RemoveAt(i);
                    driverCount++;
                }
            }
            drivers.Add(this.getDriversInQuarter(now.AddMonths(-9), driverCount));
            for (int i = list.Count - 1; i >= 0; i--)
            {
                if (DateTime.Compare(list[i].HiringDate, now.AddMonths(-6)) < 0)
                {
                    list.RemoveAt(i);
                    driverCount++;
                }
            }
            drivers.Add(this.getDriversInQuarter(now.AddMonths(-6), driverCount));
            for (int i = list.Count - 1; i >= 0; i--)
            {
                if (DateTime.Compare(list[i].HiringDate, now.AddMonths(-3)) < 0)
                {
                    list.RemoveAt(i);
                    driverCount++;
                }
            }
            drivers.Add(this.getDriversInQuarter(now.AddMonths(-3), driverCount));
            for (int i = list.Count - 1; i >= 0; i--)
            {
                if (DateTime.Compare(list[i].HiringDate, now) > 0)
                {
                    list.RemoveAt(i);
                    driverCount++;
                }
            }
            drivers.Add(this.getDriversInQuarter(now, driverCount));
            return drivers;
        }

        private List<TrucksByQuarters> processTruckInspections(List<HiringDateDto> hiringDates)
        {
            List<HiringDateDto> list = hiringDates;
            List<TrucksByQuarters> trucks = new List<TrucksByQuarters>();
            int totalVehicles = hiringDates.Count;
            int driverCount = 0;
            int lastYear = DateTime.Now.Year - 1;
            for (int j = 0; j < 8; j++)
            {
                driverCount = 0;
                DateTime leftDate = new DateTime(lastYear + j / 4, 1 + (j % 4) * 3, 1);
                DateTime rightDate = new DateTime(lastYear + (j + 1) / 4, 1 + ((j + 1) % 4) * 3, 1);
                for (int i = list.Count - 1; i >= 0; i--)
                {
                    if (DateTime.Compare(list[i].HiringDate, leftDate) >= 0
                        && DateTime.Compare(list[i].HiringDate, rightDate) < 0)
                    {
                        list.RemoveAt(i);
                        driverCount++;
                    }
                }
                TrucksByQuarters truckQuarter = new TrucksByQuarters();
                truckQuarter.Date = leftDate;
                truckQuarter.TrucksCount = driverCount;
                int percentage = totalVehicles > 0 ? (driverCount * 100 / totalVehicles) : 0;
                truckQuarter.severy = percentage >= 100 ? "green" : percentage >= 30 ? "yellow" : "red";
                trucks.Add(truckQuarter);
            }
            TrucksByQuarters truckNoQuarter = new TrucksByQuarters();
            truckNoQuarter.Date = new DateTime(2000, 1, 1);
            truckNoQuarter.TrucksCount = list.Count;
            trucks.Add(truckNoQuarter);
            return trucks;
        }

        private List<TrucksByQuarters> processTruckAnnualInspections(List<HiringDateDto> hiringDates)
        {
            List<HiringDateDto> list = hiringDates;
            List<TrucksByQuarters> trucks = new List<TrucksByQuarters>();
            int totalVehicles = hiringDates.Count;
            int driverCount = 0;
            int lastYear = DateTime.Now.Year - 1;
            for (int j = 0; j < 2; j++)
            {
                driverCount = 0;
                DateTime leftDate = new DateTime(lastYear + j, 1, 1);
                DateTime rightDate = new DateTime(lastYear + j + 1, 1, 1);
                for (int i = list.Count - 1; i >= 0; i--)
                {
                    if (DateTime.Compare(list[i].HiringDate, leftDate) > 0
                        && DateTime.Compare(list[i].HiringDate, rightDate) <= 0)
                    {
                        list.RemoveAt(i);
                        driverCount++;
                    }
                }
                TrucksByQuarters truckQuarter = new TrucksByQuarters();
                truckQuarter.Date = leftDate;
                truckQuarter.TrucksCount = driverCount;
                int percentage = totalVehicles > 0 ? (driverCount * 100 / totalVehicles) : 0;
                truckQuarter.severy = percentage >= 100 ? "green" : percentage >= 30 ? "yellow" : "red";
                trucks.Add(truckQuarter);
            }
            TrucksByQuarters truckNoQuarter = new TrucksByQuarters();
            truckNoQuarter.Date = new DateTime(2000, 1, 1);
            truckNoQuarter.TrucksCount = list.Count;
            trucks.Add(truckNoQuarter);
            return trucks;
        }

        private DriversByQuarters getDriversInQuarter(DateTime date, int driverCount)
        {
            DriversByQuarters drivers = new DriversByQuarters();
            drivers.Date = date;
            drivers.DriverCount = driverCount;
            return drivers;
        }

        private int getDriversInFullCompliance(List<DriverCompliance> driverCompliances)
        {
            int driversInFullCompliance = 0;
            for (int y = 0; y < driverCompliances.Count; y++)
            {
                bool fullCompliance = true;
                if (driverCompliances[y].Preemployment == null) { fullCompliance = false; }
                if (driverCompliances[y].EmpApplications == null) { fullCompliance = false; }
                if (driverCompliances[y].LetterInquiry == null) { fullCompliance = false; }
                if (driverCompliances[y].EmpHistory == null) { fullCompliance = false; }
                if (driverCompliances[y].Dmv == null) { fullCompliance = false; }
                if (driverCompliances[y].RoadTest == null) { fullCompliance = false; }
                if (driverCompliances[y].MedicalCertificate == null) { fullCompliance = false; }
                if (driverCompliances[y].AnnualDMV == null) { fullCompliance = false; }
                if (driverCompliances[y].AnnualDc == null) { fullCompliance = false; }
                if (driverCompliances[y].FileSignature == null) { fullCompliance = false; }
                if (driverCompliances[y].UsernameCH == null) { fullCompliance = false; }
                if (driverCompliances[y].License == null) { fullCompliance = false; }
                if (driverCompliances[y].PullNotice == null) { fullCompliance = false; }
                if (fullCompliance) { driversInFullCompliance++; }
            }
            return driversInFullCompliance;
        }

        //public AllUsers(string name, string lastName, DateTime? birtTime, long id)
        //{
        //    Name = name;
        //    LastName = lastName
        //}

        private List<DriverReport> GetDriverReports(List<DriverCompliance> driverCompliances)
        {
            using (var DbContext = new BAV02Context())
            {
                //var names = DbContext.Users.Select(x => x.Name);
                //var lastName = DbContext.Users.Select(x => x.LastName);
                //var birthDate = DbContext.Users.Select(x => x.Birthdate);
                //

                //var user = new List<Users>();


                //List<Users> users = new List<Users>();
                var allusers = DbContext.DriverComplianceData.Select(x => new DriverComplianceData
                {
                    Name = x.Name,
                    lastName = x.lastName,
                    BirthDate = x.BirthDate,
                    License = x.License,
                    IdCompany = x.IdCompany,
                    Id = x.Id,
                });



                //var allusers = DbContext.Users.Select(x => new Users
                //{
                //    Name = x.Name,
                //    LastName = x.LastName,
                //    Birthdate = x.Birthdate,
                //    Id = x.Id
                //});


                //user = alluser.Select(x => new Users()
                //{
                //    x.Name, x.LastName, x.Birthdate, x.Id
                //})
                //var userDrivers = (from name in DbContext.Users
                //                   select name.Name).Single();

                List<long> Preemployment = new List<long>();
                List<long> EmpApplications = new List<long>();
                List<long> LetterInquiry = new List<long>();
                List<long> EmpHistory = new List<long>();
                List<long> Dmv = new List<long>();
                List<long> RoadTest = new List<long>();
                List<long> MedicalCertificate = new List<long>();
                List<long> AnnualDMV = new List<long>();
                List<long> AnnualDc = new List<long>();
                List<long> FileSignature = new List<long>();
                List<long> UsernameCH = new List<long>();
                List<long> License = new List<long>();
                List<long> PullNotice = new List<long>();

                List<DriverReport> driverReports = new List<DriverReport>();
                int driverTotalCount = driverCompliances.Count;


                int pe = 0, ea = 0, li = 0, eh = 0, dmv = 0, rt = 0, mc = 0, admv = 0, adc = 0, fs = 0, uch = 0, lc = 0, pn = 0;
                for (int y = 0; y < driverCompliances.Count; y++)
                {
                    if (driverCompliances[y].Preemployment != null) { pe++; }
                    else
                    {
                        Preemployment.Add(driverCompliances[y].IdUser);
                    }
                    if (driverCompliances[y].EmpApplications != null) { ea++; }
                    else
                    {
                        EmpApplications.Add(driverCompliances[y].IdUser);
                    }
                    if (driverCompliances[y].LetterInquiry != null) { li++; }
                    else
                    {
                        LetterInquiry.Add(driverCompliances[y].IdUser);
                    }
                    if (driverCompliances[y].EmpHistory != null) { eh++; }
                    else
                    {
                        EmpHistory.Add(driverCompliances[y].IdUser);
                    }
                    if (driverCompliances[y].Dmv != null) { dmv++; }
                    else
                    {
                        Dmv.Add(driverCompliances[y].IdUser);
                    }
                    if (driverCompliances[y].RoadTest != null) { rt++; }
                    else
                    {
                        RoadTest.Add(driverCompliances[y].IdUser);
                    }
                    if (driverCompliances[y].MedicalCertificate != null) { mc++; }
                    else
                    {
                        MedicalCertificate.Add(driverCompliances[y].IdUser);
                    }
                    if (driverCompliances[y].AnnualDMV != null) { admv++; }
                    else
                    {
                        AnnualDMV.Add(driverCompliances[y].IdUser);
                    }
                    if (driverCompliances[y].AnnualDc != null) { adc++; }
                    else
                    {
                        AnnualDc.Add(driverCompliances[y].IdUser);
                    }
                    if (driverCompliances[y].FileSignature != null) { fs++; }
                    else
                    {
                        FileSignature.Add(driverCompliances[y].IdUser);
                    }
                    if (driverCompliances[y].UsernameCH != null) { uch++; }
                    else
                    {
                        UsernameCH.Add(driverCompliances[y].IdUser);
                    }
                    if (driverCompliances[y].License != null) { lc++; }
                    else
                    {
                        License.Add(driverCompliances[y].IdUser);
                    }
                    if (driverCompliances[y].PullNotice != null) { pn++; }
                    else
                    {
                        PullNotice.Add(driverCompliances[y].IdUser);
                    }
                }

                driverReports.Add(this.getDriverReport("Pre-employment", pe, driverTotalCount, Preemployment, allusers));
                driverReports.Add(this.getDriverReport("Employment Application", ea, driverTotalCount, EmpApplications, allusers));
                driverReports.Add(this.getDriverReport("Letter of Inquiry", li, driverTotalCount, LetterInquiry, allusers));
                driverReports.Add(this.getDriverReport("Employment History", eh, driverTotalCount, EmpHistory, allusers));
                driverReports.Add(this.getDriverReport("DMV Record", dmv, driverTotalCount, Dmv, allusers));
                driverReports.Add(this.getDriverReport("Road Test", rt, driverTotalCount, RoadTest, allusers));
                driverReports.Add(this.getDriverReport("Medical Certificate", mc, driverTotalCount, MedicalCertificate, allusers));
                driverReports.Add(this.getDriverReport("Annual Review of DMV", admv, driverTotalCount, AnnualDMV, allusers));
                driverReports.Add(this.getDriverReport("Annual Certification of Violations", adc, driverTotalCount, AnnualDc, allusers));
                driverReports.Add(this.getDriverReport("Driver Signature", fs, driverTotalCount, FileSignature, allusers));
                driverReports.Add(this.getDriverReport("Clearing House Driver Account", uch, driverTotalCount, UsernameCH, allusers));
                driverReports.Add(this.getDriverReport("Commercial Driver License", lc, driverTotalCount, License, allusers));
                driverReports.Add(this.getDriverReport("Employer Pull Notice", pn, driverTotalCount, PullNotice, allusers));

                return driverReports;
            }
        }

        private List<CompanyReport> GetCompanyReports(CompanyCompliance companyCompliance)
        {
            List<CompanyReport> companyReports = new List<CompanyReport>();
            companyReports.Add(this.getCompanyReport("FMCSA Clearing House Register", companyCompliance.FMCSA ? 100 : 0));
            companyReports.Add(this.getCompanyReport("Drug & Alcohol Testing Certificate of Enrollment", companyCompliance.CA != null ? 100 : companyCompliance.Enrollment != null ? 100 : 0));
            companyReports.Add(this.getCompanyReport("Insurance Info", companyCompliance.InsuranceInfo != null ? 100 : 0));
            companyReports.Add(this.getCompanyReport("Insurance Policy", companyCompliance.InsurancePolicy != null ? 100 : 0));
            companyReports.Add(this.getCompanyReport("Resonable Suspicion Certificate", companyCompliance.SupervisorTraining != null ? 100 : 0));
            companyReports.Add(this.getCompanyReport("Safety Fleet Compliance Manual", companyCompliance.FleetSafety != null ? 100 : 0));
            companyReports.Add(this.getCompanyReport("Safety Driver Compliance Manual", companyCompliance.DriverSafety != null ? 100 : 0));
            return companyReports;
        }

        private List<TruckReport> GetTruckReports(List<TruckCompliance> truckCompliances, List<Vehicle> filterVehicles)
        {
            List<TruckReport> truckReports = new List<TruckReport>();
            List<Vehicle> vehiclesD = new List<Vehicle>();
            List<Vehicle> vehiclesC = new List<Vehicle>();
            List<long> idDvir = new List<long>();
            List<long> cardR = new List<long>();
            int contadorD = 0;
            int contadorC = 0;

            int truckTotalCount = truckCompliances.Count;
            int dvir = 0;
            int stateInspection = 0;

            for (int y = 0; y < truckCompliances.Count; y++)
            {
                if (truckCompliances[y].Dvir != null) { dvir++; }
                else { idDvir.Add(truckCompliances[y].Id); }
                if (truckCompliances[y].StateInspection != null) { stateInspection++; }
                else { cardR.Add(truckCompliances[y].Id); }
            }

            foreach (var vehicle in filterVehicles)
            {
                if (contadorD < idDvir.Count)
                {
                    if (vehicle.Id == idDvir[contadorD])
                    {
                        vehiclesD.Add(vehicle);
                        contadorD++;
                    }
                }

                if (contadorC < cardR.Count)
                {
                    if (vehicle.Id == cardR[contadorC])
                    {
                        vehiclesC.Add(vehicle);
                        contadorC++;
                    }
                }

            }
            truckReports.Add(this.getTruckReport("Dvir", dvir, truckTotalCount, vehiclesD));
            truckReports.Add(this.getTruckReport("Card Registration", stateInspection, truckTotalCount, vehiclesC));
            return truckReports;
        }

    }

}
