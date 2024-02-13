using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using BAv02.Models.Tools;
using Microsoft.Extensions.Configuration;

namespace BAv02.Models.DataAccessLayers
{
    public class TrucksDAL
    {
        Alerts a = new Alerts();
        DateTime dateOld;
        static long idCompany = 0;

        private IConfiguration Configuration { get; set; }

        public TrucksDAL()
        {
            var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json");

            Configuration = builder.Build();
        }


        /// <summary>
        /// gets the companyId of the user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>

        public long getCompanyId(long userId)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    long idcompany = (long)DbContext.CompanyUsersRoles.Where(x => x.IdUser == userId).FirstOrDefault().IdCompany;
                    return idcompany;
                }
            }
            catch (Exception) { return 0; }

        }

        public List<Vehicle> getSearchVIN(string vin, long idCompany )
        {
            var DbContext = new BAV02Context();
            return DbContext.Vehicle.Where(x => x.Vin == vin && x.IdCompany == idCompany).ToList();
        }

        /// <summary>
        /// get truck by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Vehicle getTruck(long id, long idu)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    if (idu > 0) { idCompany = (long)DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany; }
                }

                using (var DbContext = new BAV02Context())
                {
                    var t = DbContext.Vehicle.Where(x => x.Id == id).FirstOrDefault();
                    if (t.IdCompany == idCompany)
                    {
                        return t;
                    }
                    else { return null; }
                }
            }
            catch (Exception) { return null; }
        }

        /// <summary>
        /// Save  Truck data
        /// </summary>
        /// <param name="id"></param>
        /// <param name="v"></param>
        /// <param name="nameImg"></param>
        /// <returns></returns>
        public Vehicle saveDataTruck(long id,Vehicle v,string nameImg)
        {
            long validationID = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    dateOld = DbContext.Vehicle.Where(x => x.Id == id).FirstOrDefault().PlateExpiration;
                    validationID = (long)DbContext.Vehicle.Where(x => x.Id == id).FirstOrDefault().IdCompany;
                }

                using (var DbContext = new BAV02Context())
                {
                    if (idCompany == validationID)
                    {
                        if (nameImg != "") { v.FileImage = nameImg; }
                        v.Id = id;
                        var updateTruck = DbContext.Attach(v);
                        if (nameImg != "") { updateTruck.Property(x => x.FileImage).IsModified = true; }
                        updateTruck.Property(x => x.VehicleNumber).IsModified = true;
                        updateTruck.Property(x => x.VehicleType).IsModified = true;
                        updateTruck.Property(x => x.Vin).IsModified = true;
                        updateTruck.Property(x => x.Plate).IsModified = true;
                        updateTruck.Property(x => x.PlateState).IsModified = true;
                        updateTruck.Property(x => x.PlateExpiration).IsModified = true;
                        updateTruck.Property(x => x.Make).IsModified = true;
                        updateTruck.Property(x => x.Model).IsModified = true;
                        updateTruck.Property(x => x.Year).IsModified = true;
                        updateTruck.Property(x => x.Condition).IsModified = true;
                        updateTruck.Property(x => x.Cost).IsModified = true;
                        updateTruck.Property(x => x.InServiceDate).IsModified = true;
                        updateTruck.Property(x => x.Weight).IsModified = true;
                        updateTruck.Property(x => x.Odometer).IsModified = true;
                        updateTruck.Property(x => x.Engine).IsModified = true;
                        updateTruck.Property(x => x.FuelType).IsModified = true;
                        updateTruck.Property(x => x.Hazmat).IsModified = true;
                        updateTruck.Property(x => x.TireSize).IsModified = true;
                        DbContext.SaveChanges();

                        var dateNew = v.PlateExpiration;
                        if (dateOld < dateNew) { a.deleteMAlerts(id, "VEHICLE", dateOld.ToString("MM/dd/yyyy")); }
                    }
                }
                return getTruck(id,0);
            }
            catch (Exception) { return null; }
        }

        /// <summary>
        /// Save Insurance data
        /// </summary>
        /// <param name="id"></param>
        /// <param name="v"></param>
        /// <returns></returns>
        public Vehicle saveDataInsurance(long id, Vehicle v)
        {
            long validationID = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    dateOld = Convert.ToDateTime(DbContext.Vehicle.Where(x => x.Id == id).FirstOrDefault().InsuranceExpiration);
                    validationID = (long)DbContext.Vehicle.Where(x => x.Id == id).FirstOrDefault().IdCompany;
                }

                using (var DbContext = new BAV02Context())
                {
                    if (idCompany == validationID)
                    {
                        if (v.InsuranceName != "Other") { v.OtherInsurance = null; }
                        v.Id = id;
                        var entrada = DbContext.Attach(v);
                        entrada.Property(x => x.InsuranceName).IsModified = true;
                        entrada.Property(x => x.InsuranceExpiration).IsModified = true;
                        entrada.Property(x => x.PolicyTerm).IsModified = true;
                        entrada.Property(x => x.PortEntry).IsModified = true;
                        entrada.Property(x => x.OperationRadius).IsModified = true;
                        entrada.Property(x => x.OtherInsurance).IsModified = true;
                        DbContext.SaveChanges();

                        var dateNew = v.InsuranceExpiration;
                        if (dateOld < dateNew) { a.deleteMAlerts(id, "VEHICLE", dateOld.ToString("MM/dd/yyyy")); }
                    }
                }
                return getTruck(id,0);
            }
            catch (Exception) { return null; }
        }

        /// <summary>
        /// Save notifications dat
        /// </summary>
        /// <param name="v"></param>
        /// <returns></returns>
        public Vehicle saveDataNotifications(Vehicle v)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var entrada = DbContext.Attach(v);
                    entrada.Property(x => x.Twic).IsModified = true;
                    entrada.Property(x => x.ExpTwic).IsModified = true;
                    entrada.Property(x => x.Sct).IsModified = true;
                    entrada.Property(x => x.Sctexpiration).IsModified = true;
                    entrada.Property(x => x.VerificationNumber).IsModified = true;
                    entrada.Property(x => x.ExpNumber).IsModified = true;
                    DbContext.SaveChanges();
                }
                return getTruck(v.Id,0);
            }
            catch (Exception) { return null; }
        }

        /// <summary>
        /// Get Truck Inspections
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public Table getTruckInspections(long idu, int page, int size, DateTime F, DateTime T)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 0, NumberP = 0 };
            DateTime tt = new DateTime(); 
            DateTime ff = new DateTime(); 
            if (F != tt & T != tt) { ff = F; tt = T; }
            else { tt = DateTime.Now; }

            try
            {
                string vin = "";
                string typeDriver = 'D'.ToString();
                string typeCo = 'C'.ToString();

                using (var DbContext = new BAV02Context())
                {
                    vin = DbContext.Vehicle.Where(x => x.Id == idu).FirstOrDefault().Vin;
                }

                using (var DbContext = new BAV02Context())
                {
                    var violationList = DbContext.Inspection.Where(x => x.Vin == vin).ToList<Object>();
                    foreach(Inspection i in violationList)
                    {
                        var listViolations = DbContext.Violations
                            .Where(violations => (violations.UniqueId == i.UniqueId) && (violations.ViolUnit != typeDriver && violations.ViolUnit != typeCo)).ToList<Object>();

                        i.VIOLATIONS = listViolations;
                   }

                    t.Items = violationList;
                    t.CurrentPage = page;
                }
            }
            catch (Exception ex) { throw new Exception($"Error: {ex}");}

            return t;
        }

        public int saveDoc(MaintenanceDocs m, long idVehicle, string name)
        {

            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    m.IdVehicle = idVehicle;
                    if (name.Length > 95)
                    {
                        m.DescriptionDoc = name.Remove(95);
                    }
                    else
                    {
                        m.DescriptionDoc = name;
                    }
                    DbContext.Add(m);
                    DbContext.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                r = 2;
                throw new Exception($"Error: {ex} {r}");
            }
            return r;
        }

        public List<MaintenanceDocs> getDocuments(long idVehicle, string docType)
        {
            List<MaintenanceDocs> list = new List<MaintenanceDocs>();

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var items = DbContext.MaintenanceDocs.Where(x => x.IdVehicle == idVehicle && x.DocType == docType).OrderByDescending(x => x.Id);
                    list = items.ToList();
                }

            }
            catch (Exception) { }
            return list;
        }

        public Table getAllDocuments(long idVehicle, int page, int size)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 1, NumberP = 5 };

            try
            {

                using (var DbContext = new BAV02Context())
                {
                    var list = (from maintenanceDocs in DbContext.MaintenanceDocs
                                where maintenanceDocs.IdVehicle == idVehicle && maintenanceDocs.TypeId == "VEHICLE"
                                select new
                                {
                                    maintenanceDocs.Id,
                                    maintenanceDocs.DescriptionDoc,
                                    maintenanceDocs.DocName,
                                    maintenanceDocs.DocType,
                                    maintenanceDocs.RoadsideInspectionID,
                                    maintenanceDocs.TypeId
                                }).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList<Object>();

                    var count = Math.Ceiling((DbContext.MaintenanceDocs.Where(x => x.IdVehicle == idVehicle).Select(x => new { x.IdVehicle }).Count() / (double)size));
                    t.Items = list;
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }

            }
            catch (Exception) { }
            return t;
        }

        public int deleteDoc(long id)
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var maintenanceDoc = DbContext.MaintenanceDocs.Where(x => x.Id == id).FirstOrDefault();
                    DbContext.MaintenanceDocs.RemoveRange(maintenanceDoc);
                    DbContext.SaveChanges();

                }
            }
            catch (Exception) { r = 1; }
            return r;
        }

        public MaintenanceDocs getDocument(long id)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    MaintenanceDocs Document = DbContext.MaintenanceDocs.Where(x => x.Id == id).FirstOrDefault();
                    return Document;
                }
            }
            catch (Exception) { return null; }
        }

        public int saveTruckLogo(Vehicle u)
        {
            var r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var entrada = DbContext.Attach(u);
                    entrada.Property(x => x.FileImage).IsModified = true;
                    DbContext.SaveChanges();

                }
                return r;
            }
            catch (Exception)
            {
                return 1;
            }
        }
    }
}
