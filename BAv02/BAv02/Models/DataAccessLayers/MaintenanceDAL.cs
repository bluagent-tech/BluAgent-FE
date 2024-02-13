using BAv02.Models.Tools;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using System.Net.Mail;
using System.Net.Mime;

namespace BAv02.Models.DataAccessLayers
{
    public class MaintenanceDAL
    {
        private IConfiguration Configuration { get; set; }

        public MaintenanceDAL()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");
            Configuration = builder.Build();
        }

        /// <summary>
        /// validate existence vin in data base of truck/trailer
        /// </summary>
        /// <param name="idu"></param>
        /// <returns></returns>
        public string validationVin(string vin, string type, long id)
        {
            var r = "";
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var idc = DbContext.CompanyUsersRoles.Where(x => x.IdUser == id & x.Status == "ACTIVE").FirstOrDefault().IdCompany;
                    if (type == "Vehicle")
                    {
                        var exist = DbContext.Vehicle.Where(x => x.Vin == vin && x.IdCompany == idc).FirstOrDefault();
                        if (exist != null) { r = "VIN number already exists"; }
                        else { r = " "; }
                    }
                    else
                    {
                        var exist = DbContext.Trailer.Where(x => x.Vin == vin && x.IdCompany == idc).FirstOrDefault();
                        if (exist != null) { r = "VIN number already exists"; }
                        else { r = " "; }
                    }
                }
            }
            catch (Exception) { r = "Search Error"; }
            return r;
        }

        /// <summary> 
        /// get all alerts of trailer with id
        /// </summary>
        /// <param name="idt"></param>
        /// <returns></returns>
        public List<MAlertsVehicles> getAllNotificationsVehicle(int id)
        {
            List<MAlertsVehicles> list = new List<MAlertsVehicles>();

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    list = (from da in DbContext.MaintenanceAlerts
                            join d in DbContext.Vehicle on da.IdVehicle equals d.Id
                            where da.IdCompany == id && da.Message.StartsWith("Registration") && da.TypeId == "VEHICLE"
                            select new MAlertsVehicles
                            {
                                Id = da.Id,
                                IdVehicle = da.IdVehicle,
                                Message = da.Message,
                                TypeId = da.TypeId,
                                IdCompany = da.IdCompany,
                                Severy = da.Severy,
                                EconomicNumber = da.EconomicNumber,
                                VehicleNumber = d.VehicleNumber,
                                Year = d.Year,
                                Make = d.Make,
                                Status = d.Status,
                                InServiceDate = d.InServiceDate,
                                FileImage = d.FileImage,
                                VehicleType = d.VehicleType,
                                Vin = d.Vin,
                            }).ToList();
                }

            }
            catch (Exception) { Trace.WriteLine("Aca hubo exception");}

            return list;
        }
        public List<MAlertsTrailers> getAllNotificationsTrailer(int id)
        {
            List<MAlertsTrailers> list = new List<MAlertsTrailers>();

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    list = (from da in DbContext.MaintenanceAlerts
                            join d in DbContext.Trailer on da.IdVehicle equals d.IdTrailer
                            where da.IdCompany == id && da.Message.StartsWith("Registration") && da.TypeId == "TRAILER"
                            select new MAlertsTrailers
                            {
                                Id = da.Id,
                                IdTrailer = da.IdVehicle,
                                Message = da.Message,
                                TypeId = da.TypeId,
                                IdCompany = da.IdCompany,
                                Severy = da.Severy,
                                EconomicNumber = da.EconomicNumber,
                                TrailerNumber = d.TrailerNumber,
                                Year = d.Year,
                                Make = d.Make,
                                Status = d.Status,
                                InServiceDate = d.InServiceDate,
                                FileImage = d.FileImage,
                                TrailerType = d.TrailerType,
                                Vin = d.Vin,
                            }).ToList();
                }

            }
            catch (Exception) { Trace.WriteLine("Aca hubo exception"); }

            return list;
        }
        public List<MAlertsMaintenance> getAllNotificationMaintenance(int id)
        {
            List<MAlertsMaintenance> list = new List<MAlertsMaintenance>();

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    list = (from da in DbContext.MaintenanceAlerts
                            join dt in DbContext.Trailer on da.IdVehicle equals dt.IdTrailer
                            into Tunit
                            from dt in Tunit.DefaultIfEmpty()
                            join dv in DbContext.Vehicle on da.IdVehicle equals dv.Id
                            into Vunit
                            from dv in Vunit.DefaultIfEmpty()
                            where da.IdCompany == id && !da.Message.StartsWith("Registration")
                            select new MAlertsMaintenance
                            {
                                Id = da.Id,
                                IdUnit = da.IdVehicle,
                                Message = da.Message,
                                TypeId = da.TypeId,
                                IdCompany = da.IdCompany,
                                Severy = da.Severy,
                                EconomicNumber = da.EconomicNumber,
                                TrailerNumber = dt.TrailerNumber,
                                TYear = dt.Year,
                                TMake = dt.Make,
                                TStatus = dt.Status,
                                TInServiceDate = dt.InServiceDate,
                                TFileImage = dt.FileImage,
                                TUnitType = dt.TrailerType,
                                TVin = dt.Vin,
                                VehicleNumber = dv.VehicleNumber,
                                VYear = dv.Year,
                                VMake = dv.Make,
                                VStatus = dv.Status,
                                VInServiceDate = dv.InServiceDate,
                                VFileImage = dv.FileImage,
                                VUnitType = dv.VehicleType,
                                VVin = dv.Vin,
                            }).ToList();
                }

            }
            catch (Exception) { Trace.WriteLine("Aca hubo exception"); }

            return list;
        }

        public int NotificationsCounterMaintenance(int id)
        {
            var r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    r = (int)DbContext.MaintenanceAlerts.Where(x => x.IdCompany == id).Select(x => new { x.IdCompany }).Count();
                    return r;
                }
            }
            catch (Exception) { }
            return r;
        }

        /// <summary>
        /// Add new Truck
        /// </summary>
        /// <param name="v"></param>
        /// <param name="idu"></param>
        /// <returns></returns>
        public int addTruck(Vehicle v, long idu)
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    v.Status = "ACTIVE";
                    v.IdCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                    DbContext.Add(v);
                    DbContext.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
                // r = 2;
            }
            return r;
        }

        /// <summary>
        /// Get US States
        /// </summary>
        /// <returns></returns>
        public List<State> getStates()
        {
            List<State> list = new List<State>();
            CountryDAL countryDAL = new CountryDAL();
            StatesDAL statesDAL = new StatesDAL();

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var id = countryDAL.GetCountries().Where(x => x.Name == "US").FirstOrDefault().Id;
                    list = statesDAL.GetStates(id).ToList();
                }
            }
            catch (Exception) { }
            return list;
        }

        /// <summary>
        /// Get trucks per company
        /// </summary>
        /// <param name="idu"></param>
        /// <returns></returns>
        public Table getTrucks(long idu, int page, int size, bool inactiveMode)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 1, NumberP = 1 };
            StatesDAL statesDAL = new StatesDAL();
            List<State> lstStates = new List<State>();
            lstStates = statesDAL.GetStates().ToList();

            string status = "ACTIVE";
            if (inactiveMode == true)
            {
                status = "INACTIVE";
            }

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var id = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu & x.Status == "ACTIVE").FirstOrDefault().IdCompany;
                    var list = (from v in DbContext.Vehicle
                                join s in lstStates on v.PlateState equals s.Id
                                where v.IdCompany == id & v.Status == status
                                select new
                                {
                                    v.Id,
                                    v.FileImage,
                                    Name = v.VehicleNumber,
                                    v.Vin,
                                    v.Plate,
                                    PlateState = s.Name,
                                    v.VehicleType,
                                    Passenger = DbContext.Company.Where(x => x.Id == id).FirstOrDefault().PcFlag,
                                    v.PlateExpiration,
                                    v.Status,
                                }).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList<Object>();

                    var count = Math.Ceiling((DbContext.Vehicle.Where(x => x.IdCompany == id & x.Status == status).Select(x => new { x.Id }).Count() / (double)size));
                    t.Items = list;
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }

            }
            catch (Exception) { }
            return t;
        }

        /// <summary>
        /// Get trucks per company by SA
        /// </summary>
        /// <param name="idu"></param>
        /// <returns></returns>
        public Table getTrucksCompanySA(long idCompany, int page, int size)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 1, NumberP = 1 };
            StatesDAL statesDAL = new StatesDAL();
            List<State> lstStates = new List<State>();
            lstStates = statesDAL.GetStates().ToList();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var list = (from v in DbContext.Vehicle
                                join s in lstStates on v.PlateState equals s.Id
                                where v.IdCompany == idCompany
                                select new
                                {
                                    v.Id,
                                    v.FileImage,
                                    Name = v.VehicleNumber,
                                    v.Vin,
                                    v.Plate,
                                    PlateState = s.Name,
                                    v.VehicleType,
                                    Passenger = DbContext.Company.Where(x => x.Id == idCompany).FirstOrDefault().PcFlag,
                                    v.PlateExpiration,
                                    v.Status,
                                }).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList<Object>();

                    var count = Math.Ceiling((DbContext.Vehicle.Where(x => x.IdCompany == idCompany).Select(x => new { x.Id }).Count() / (double)size));
                    t.Items = list;
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }

            }
            catch (Exception) { }
            return t;
        }

        /// <summary>
        /// Get trucks per company
        /// </summary>
        /// <param name="idu"></param>
        /// <returns></returns>
        public Table getTrucksInactiveOrArchived(long idu, int page, int size, bool inactiveMode)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 1, NumberP = 1 };
            StatesDAL statesDAL = new StatesDAL();
            List<State> lstStates = new List<State>();
            lstStates = statesDAL.GetStates().ToList();

            string status = "ACTIVE";
            if (inactiveMode == true)
            {
                status = "INACTIVE";
            }

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var id = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu & x.Status == "ACTIVE").FirstOrDefault().IdCompany;
                    var list = (from v in DbContext.Vehicle
                                join s in lstStates on v.PlateState equals s.Id
                                where v.IdCompany == id & (v.Status == status || v.Status == "ARCHIVED")
                                select new
                                {
                                    v.Id,
                                    v.FileImage,
                                    Name = v.VehicleNumber,
                                    v.Vin,
                                    v.Plate,
                                    PlateState = s.Name,
                                    v.VehicleType,
                                    Passenger = DbContext.Company.Where(x => x.Id == id).FirstOrDefault().PcFlag,
                                    v.PlateExpiration,
                                    v.Status,
                                }).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList<Object>();

                    var count = Math.Ceiling((DbContext.Vehicle.Where(x => x.IdCompany == id & x.Status == status).Select(x => new { x.Id }).Count() / (double)size));
                    t.Items = list;
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }

            }
            catch (Exception) { }
            return t;
        }

        /// <summary>
        /// Delete truck by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int inactivateTruck(long id, DateTime DeactivationDate, string DeactivationReason)//TODO: add idCompany parameter to minimize errors
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var t = DbContext.Vehicle.Where(x => x.Id == id).FirstOrDefault();
                    t.Status = "INACTIVE";
                    t.DeactivationDate = DeactivationDate;
                    t.DeactivationReason = DeactivationReason;
                    var entrada = DbContext.Attach(t);
                    entrada.Property(x => x.Status).IsModified = true;
                    entrada.Property(x => x.DeactivationDate).IsModified = true;
                    entrada.Property(x => x.DeactivationReason).IsModified = true;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { r = 1; }
            return r;
        }

        public int activateTruck(long id)//TODO: add idCompany parameter to minimize errors
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var t = DbContext.Vehicle.Where(x => x.Id == id).FirstOrDefault();
                    t.Status = "ACTIVE";
                    var entrada = DbContext.Attach(t);
                    entrada.Property(x => x.Status).IsModified = true;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { r = 1; }
            return r;
        }

        public int updateDReasonAndDDate(long idTruck, string DeactivationReason, DateTime DeactivationDate)//TODO: add idCompany parameter to minimize errors
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var t = DbContext.Vehicle.Where(x => x.Id == idTruck).FirstOrDefault();
                    t.DeactivationDate = DeactivationDate;
                    t.DeactivationReason = DeactivationReason;
                    var entrada = DbContext.Attach(t);
                    entrada.Property(x => x.DeactivationDate).IsModified = true;
                    entrada.Property(x => x.DeactivationReason).IsModified = true;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { r = 1; }
            return r;
        }

        public int archivedTruck(long idVehicle)
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var t = DbContext.Vehicle.Where(x => x.Id == idVehicle).FirstOrDefault();
                    t.Status = "ARCHIVED";
                    var entrada = DbContext.Attach(t);
                    entrada.Property(x => x.Status).IsModified = true;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { r = 1; }
            return r;
        }

        //Trailers
        /// <summary>
        /// Add new Trailer
        /// </summary>
        /// <param name="t"></param>
        /// <param name="idu"></param>
        /// <returns></returns>
        public int addTrailer(Trailer t, long idu)
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {


                    var vin = DbContext.Trailer.Where(x => x.Vin == t.Vin).FirstOrDefault();
                    if (vin == null)
                    {
                        t.Status = "ACTIVE";
                        t.IdCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                        DbContext.Add(t);
                        DbContext.SaveChanges();
                    }
                    else { r = 1; }

                }
                return r;
            }
            catch (Exception ex)
            {
                r = 2;
                throw ex;
            }

        }

        /// <summary>
        /// Get trailers per company
        /// </summary>
        /// <param name="idu"></param>
        /// <returns></returns>
        public Table getTrailers(long idu, int page, int size, bool inactiveMode)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 1, NumberP = 1 };
            List<State> lstStates = new List<State>();
            StatesDAL statesDAL = new StatesDAL();
            lstStates = statesDAL.GetStates().ToList();

            string status = "ACTIVE";
            if (inactiveMode == true)
            {
                status = "INACTIVE";
            }

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var id = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu & x.Status == "ACTIVE").FirstOrDefault().IdCompany;
                    var list = (from tr in DbContext.Trailer
                                join s in lstStates on tr.PlateState equals s.Id
                                where tr.IdCompany == id & tr.Status == status
                                select new
                                {
                                    Id = tr.IdTrailer,
                                    tr.FileImage,
                                    Name = tr.TrailerNumber,
                                    tr.Vin,
                                    tr.Plate,
                                    PlateState = s.Name,
                                    tr.PlateExpiration,
                                    tr.Hazmat,
                                    tr.Ownership,
                                    tr.TrailerType
                                }).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList<Object>();

                    var count = Math.Ceiling((DbContext.Trailer.Where(x => x.IdCompany == id & x.Status == status).Select(x => new { x.IdTrailer }).Count() / (double)size));
                    t.Items = list;
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }

            }
            catch (Exception) { }
            return t;
        }

        public Table getHazmatTrailers(long idu, int page, int size, bool inactiveMode)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 1, NumberP = 1 };
            List<State> lstStates = new List<State>();
            StatesDAL statesDAL = new StatesDAL();
            lstStates = statesDAL.GetStates().ToList();

            string status = "ACTIVE";
            if (inactiveMode == true)
            {
                status = "INACTIVE";
            }

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var id = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu & x.Status == "ACTIVE").FirstOrDefault().IdCompany;
                    var list = (from tr in DbContext.Trailer
                                join s in lstStates on tr.PlateState equals s.Id
                                where tr.IdCompany == id && tr.Status == status && tr.Hazmat == true
                                select new
                                {
                                    Id = tr.IdTrailer,
                                    tr.FileImage,
                                    Name = tr.TrailerNumber,
                                    tr.Vin,
                                    tr.Plate,
                                    PlateState = s.Name,
                                    tr.PlateExpiration,
                                    tr.Hazmat
                                }).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList<Object>();

                    var count = Math.Ceiling((DbContext.Trailer.Where(x => x.IdCompany == id & x.Status == status).Select(x => new { x.IdTrailer }).Count() / (double)size));
                    t.Items = list;
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }

            }
            catch (Exception) { }
            return t;
        }

        /// <summary>
        /// delete trailer per company
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int inactivateTrailer(long id)
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var t = DbContext.Trailer.Where(x => x.IdTrailer == id).FirstOrDefault();
                    t.Status = "INACTIVE"; 
                    var entrada = DbContext.Attach(t);
                    entrada.Property(x => x.Status).IsModified = true;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { r = 1; }
            return r;
        }
        public int activateTrailer(long id)
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var t = DbContext.Trailer.Where(x => x.IdTrailer == id).FirstOrDefault();
                        t.Status = "ACTIVE";
                    var entrada = DbContext.Attach(t);
                    entrada.Property(x => x.Status).IsModified = true;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { r = 1; }
            return r;
        }

        /// <summary>
        /// delete inspection function
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int deleteInspection(long id)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var inspection = DbContext.VehicleInspections.Where(x => x.Id == id).FirstOrDefault();
                    deleteInspectionNotification(inspection);
                    DbContext.VehicleInspections.RemoveRange(inspection);
                    DbContext.SaveChanges();
                }
                return 0;
            }
            catch (Exception) { return 1; }
        }

        public void deleteInspectionNotification( VehicleInspection i )
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var Message = "";
                    var dateInspection = i.InspectionDate.ToString("MM/dd/yyyy");
                    if(i.InspectionType == "90-dayInspection")
                    {
                        Message = "90-Day Inspection was due on " + dateInspection;
                    }
                    if(i.InspectionType == "AnnualInspection")
                    {
                        Message = "Annual Inspection was due on " + dateInspection;
                    }
                    var inspectionNotification = DbContext.MaintenanceAlerts.Where(x => x.IdVehicle == i.IdVehicle && x.IdCompany == i.IdCompany && x.Message == Message).FirstOrDefault();
                    DbContext.MaintenanceAlerts.RemoveRange(inspectionNotification);
                    DbContext.SaveChanges();
                }
            }
            catch ( Exception ) { }
        }
        /// <summary>
        /// Get Violations
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public Table getViolations(string id, int page, int size)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 0, NumberP = 0 };

            try
            {
                using (var dotContext = new DotDBContext(Configuration))
                {
                    MySql.Data.MySqlClient.MySqlParameter param = new MySql.Data.MySqlClient.MySqlParameter("@UNIQUE_ID", id);
                    var list = dotContext.Violations
                        .FromSql($"SELECT * FROM "
                        + Configuration.GetSection("AuroraAWS")["TableViolation"]
                        + " WHERE UNIQUE_ID = @UNIQUE_ID AND (VIOL_UNIT <> 'D' AND VIOL_UNIT <> 'C')", param)
                        .ToList<Object>();

                    t.Items = list;
                    t.CurrentPage = page;
                }

            }
            catch (Exception ex) { throw new Exception($"Error: {ex}"); }
            return t;
        }

        /// <summary>
        /// Add new Work Orden
        /// </summary>
        /// <param name="wo"></param>
        /// <param name="id"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public long addWorkOrder(WorkOrder wo, long idVehicle, string typeT, long idu)
        {
            long r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    if (typeT != null) { wo.IdVehicle = idVehicle; wo.VehicleType = typeT; }
                    var worder = DbContext.WorkOrder.Where(x => x.CreatedDate == wo.CreatedDate && x.AssignedTo == wo.AssignedTo && x.Type == wo.Type && x.IdVehicle == wo.IdVehicle && x.VehicleType == wo.VehicleType).FirstOrDefault();

                    if (worder == null)
                    {
                        wo.IdCompany = (long)DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                        wo.IssuedBy = idu;
                        wo.Status = "New";
                        DbContext.Add(wo);
                        DbContext.SaveChanges();
                        r = DbContext.WorkOrder.LastOrDefault().Id;
                    }
                }
            }
            catch (Exception) { r = 1; }
            return r;
        }

        /// <summary>
        /// Get work order per company
        /// </summary>
        /// <param name="idu"></param>
        /// <returns></returns>
        public List<Object> getWorkOrders(long idu)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var id = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu & x.Status == "ACTIVE").FirstOrDefault().IdCompany;
                    var listByTrailers = (from wo in DbContext.WorkOrder
                                          where wo.IdCompany == id && wo.VehicleType == "TRAILER"
                                          select new
                                          {
                                              wo.Id,
                                              wo.CreatedDate,
                                              IdVehicle = DbContext.Trailer.Where(x => x.IdTrailer == wo.IdVehicle).FirstOrDefault().IdTrailer,
                                              DbContext.Trailer.Where(x => x.IdTrailer == wo.IdVehicle).FirstOrDefault().FileImage,
                                              VehicleNumber = DbContext.Trailer.Where(x => x.IdTrailer == wo.IdVehicle).FirstOrDefault().TrailerNumber,
                                              wo.VehicleType,
                                              wo.Type,
                                              wo.Status,
                                              wo.AssignedTo,
                                              ExactVehicleType = DbContext.Trailer.Where(x => x.IdTrailer == wo.IdVehicle).FirstOrDefault().TrailerType,
                                          }).OrderByDescending(x => x.Id)
                                          .ToList();

                    var listByTrucks = (from wo in DbContext.WorkOrder
                                        where wo.IdCompany == id && wo.VehicleType == "VEHICLE"
                                        select new
                                        {
                                            wo.Id,
                                            wo.CreatedDate,
                                            IdVehicle = DbContext.Vehicle.Where(x => x.Id == wo.IdVehicle).FirstOrDefault().Id,
                                            DbContext.Vehicle.Where(x => x.Id == wo.IdVehicle).FirstOrDefault().FileImage,
                                            DbContext.Vehicle.Where(x => x.Id == wo.IdVehicle).FirstOrDefault().VehicleNumber,
                                            wo.VehicleType,
                                            wo.Type,
                                            wo.Status,
                                            wo.AssignedTo,
                                            ExactVehicleType = DbContext.Vehicle.Where(x => x.Id == wo.IdVehicle).FirstOrDefault().VehicleType,
                                        }).OrderByDescending(x => x.Id).ToList();

                    var listWorkOrder = listByTrailers.Union(listByTrucks).ToList<Object>();

                    return listWorkOrder;
                }

            }
            catch (Exception ex) { Console.WriteLine("{0} Exception caught.", ex); return null; }
        }

        /// <summary>
        /// eliminates the services and materials related to the work order according to its
        /// </summary>
        /// <param name="idWorkOrder">work order id</param>
        /// <returns></returns>
        public int deleteWorkOrderServicesAndMaterials(long idWorkOrder)
        {
            using (var DbContext = new BAV02Context())
            {
                using (var transaction = DbContext.Database.BeginTransaction())
                {
                    try
                    {
                        WorkOrderDAL workOrder = new WorkOrderDAL();
                        var servicesOfWorkOrder = DbContext.Service.Where(x => x.IdWorkOrder == idWorkOrder).ToList();
                        var materialsOfWorkOrder = DbContext.Material.Where(x => x.IdWorkOrder == idWorkOrder).ToList();
                        if (servicesOfWorkOrder.Count > 0)
                        {
                            foreach (var service in servicesOfWorkOrder)
                            {
                                workOrder.deleteService(service.Id);
                                DbContext.SaveChanges();
                                transaction.Commit();
                            }
                        }
                        if (materialsOfWorkOrder.Count > 0)
                        {
                            foreach (var material in materialsOfWorkOrder)
                            {
                                workOrder.deleteMaterial(material.Id);
                                DbContext.SaveChanges();
                                transaction.Commit();
                            }
                        }
                        return 0;
                    }
                    catch (Exception) { transaction.Rollback(); return 1; }

                }
            }
        }

        /// <summary>
        /// delete work order by id
        /// </summary>
        /// <param name="idWorkOrder"> work order id</param>
        /// <returns></returns>
        public int deleteWorkOrder(long idWorkOrder)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var workOrder = DbContext.WorkOrder.Where(x => x.Id == idWorkOrder).FirstOrDefault();
                    DbContext.WorkOrder.RemoveRange(workOrder);
                    DbContext.SaveChanges();
                }
                return 0;
            }
            catch (Exception) { return 1; }
        }

        public Table ExportWorkOrder(long idCompany)
        {
            Table t = new Table { Items = new List<object>() };

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var listByTrailers = (from wo in DbContext.WorkOrder
                                          where wo.IdCompany == idCompany && wo.VehicleType == "TRAILER"
                                          select new
                                          {
                                              wo.Id,
                                              wo.CreatedDate,
                                              IdVehicle = DbContext.Trailer.Where(x => x.IdTrailer == wo.IdVehicle).FirstOrDefault()
                                                  .IdTrailer,
                                              DbContext.Trailer.Where(x => x.IdTrailer == wo.IdVehicle).FirstOrDefault().FileImage,
                                              VehicleNumber = DbContext.Trailer.Where(x => x.IdTrailer == wo.IdVehicle)
                                                  .FirstOrDefault().TrailerNumber,
                                              wo.VehicleType,
                                              wo.Type,
                                              wo.Status,
                                              wo.AssignedTo,

                                          }).OrderByDescending(x => x.Id)
                        .ToList();

                    var listByTrucks = (from wo in DbContext.WorkOrder
                                        where wo.IdCompany == idCompany && wo.VehicleType == "VEHICLE"
                                        select new
                                        {
                                            wo.Id,
                                            wo.CreatedDate,
                                            IdVehicle = DbContext.Vehicle.Where(x => x.Id == wo.IdVehicle).FirstOrDefault().Id,
                                            DbContext.Vehicle.Where(x => x.Id == wo.IdVehicle).FirstOrDefault().FileImage,
                                            DbContext.Vehicle.Where(x => x.Id == wo.IdVehicle).FirstOrDefault().VehicleNumber,
                                            wo.VehicleType,
                                            wo.Type,
                                            wo.Status,
                                            wo.AssignedTo,

                                        }).OrderByDescending(x => x.Id).ToList();

                    t.Items = listByTrailers.Union(listByTrucks).ToList<Object>();
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error: {ex}");
            }

            return t;
        }

        /// <summary>
        /// Export Trucks actives/inactive to excel
        /// </summary>
        /// <param name="idu"></param>
        /// <returns></returns>
        public Table ExportTrucks(Int64 idu, string status)
        {
            Table t = new Table { Items = new List<object>() };
            StatesDAL statesDAL = new StatesDAL();
            List<State> lstStates = new List<State>();
            lstStates = statesDAL.GetStates().ToList();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                    var Trucks = (from v in DbContext.Vehicle
                                  join s in lstStates on v.PlateState equals s.Id
                                  where v.IdCompany == idCompany & v.Status == status
                                  select new
                                  {
                                      v.VehicleNumber,
                                      v.Vin,
                                      v.Plate,
                                      PlateState = s.Name,
                                      PlateExp = Convert.ToDateTime(v.PlateExpiration).ToString("MM/dd/yyyy"),
                                      v.Make,
                                      v.Year
                                  }).OrderBy(x => x.VehicleNumber).ToList();
                    t.Items = Trucks.ToList<Object>();
                }
            }
            catch (Exception) { }
            return t;
        }

        /// <summary>
        /// Export Trucks with inpsections actives/inactive  to excel
        /// </summary>
        /// <param name="idu"></param>
        /// <returns></returns>
        public Table ExportTrucksWithInspections(Int64 idu, string status)
        {
            Table t = new Table { Items = new List<object>() };
            StatesDAL statesDAL = new StatesDAL();
            List<State> lstStates = new List<State>();
            lstStates = statesDAL.GetStates().ToList();

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                    var Trucks = (from i in DbContext.Inspection
                                  join v in DbContext.Vehicle on i.Vin equals v.Vin
                                  join s in lstStates on v.PlateState equals s.Id
                                  where v.IdCompany == idCompany & v.Status == status
                                  select new
                                  {
                                      v.VehicleNumber,
                                      v.Vin,
                                      v.Plate,
                                      PlateState = s.Name,
                                      PlateExp = Convert.ToDateTime(v.PlateExpiration).ToString("MM/dd/yyyy"),
                                      InspDate = Convert.ToDateTime(i.InspDate).ToString("MM/dd/yyyy"),
                                      i.ReportNumber,
                                      i.ReportState,
                                      i.InspLevelId,
                                      i.CountryCodeState,
                                      i.VehicleOosTotal,
                                      i.TotalHazmatSent,
                                      i.OosTotal,
                                      i.HazmatOosTotal,
                                      i.UnsafeInsp,
                                      i.HmViol

                                  }).OrderBy(x => x.VehicleNumber).OrderBy(x => x.InspDate).ToList();
                    t.Items = Trucks.ToList<Object>();
                }
            }
            catch (Exception) { }
            return t;
        }

        public Table ExportVehicleInspection(Int64 idCompany)
        {
            Table table = new Table { Items = new List<Object>() };
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var listByTrailers = (from i in DbContext.VehicleInspections
                                          join t in DbContext.Trailer on i.IdVehicle equals t.IdTrailer
                                          where i.IdCompany == idCompany && i.VehicleType == "TRAILER"
                                          select new
                                          {
                                              i.Id,
                                              i.IdVehicle,
                                              t.FileImage,
                                              VehicleNumber = t.TrailerNumber,
                                              i.VehicleType,
                                              t.Vin,
                                              t.Plate,
                                              i.InspectionType,
                                              i.InspectionDate,
                                              i.Odometer,
                                              i.InspectionName,
                                              NextInspection = "",
                                              i.FileName

                                          }).OrderByDescending(x => x.Id).ToList();

                    var listByTrucks = (from i in DbContext.VehicleInspections
                                        join v in DbContext.Vehicle on i.IdVehicle equals v.Id
                                        where i.IdCompany == idCompany && i.VehicleType == "VEHICLE"
                                        select new
                                        {
                                            i.Id,
                                            i.IdVehicle,
                                            v.FileImage,
                                            v.VehicleNumber,
                                            i.VehicleType,
                                            v.Vin,
                                            v.Plate,
                                            i.InspectionType,
                                            i.InspectionDate,
                                            i.Odometer,
                                            i.InspectionName,
                                            NextInspection = "",
                                            i.FileName
                                        }).OrderByDescending(x => x.Id).ToList();

                    table.Items = listByTrailers.Union(listByTrucks).ToList<Object>();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return table;
        }

        /// <summary>
        /// Export trailers  actives/inactive  to excel
        /// </summary>
        /// <param name="idu"></param>
        /// <returns></returns>
        public Table ExportTrailers(Int64 idu, string status)
        {
            Table t = new Table { Items = new List<object>() };
            StatesDAL statesDAL = new StatesDAL();
            List<State> lstStates = new List<State>();
            lstStates = statesDAL.GetStates().ToList();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                    var Trailers = (from v in DbContext.Trailer
                                    join s in lstStates on v.PlateState equals s.Id
                                    where v.IdCompany == idCompany & v.Status == status
                                    select new
                                    {
                                        v.TrailerNumber,
                                        v.Vin,
                                        v.Plate,
                                        PlateState = s.Name,
                                        PlateExp = Convert.ToDateTime(v.PlateExpiration).ToString("MM/dd/yyyy")

                                    }).OrderBy(x => x.TrailerNumber).ToList();
                    t.Items = Trailers.ToList<Object>();
                }
            }
            catch (Exception) { }
            return t;
        }

        /// <summary>
        /// Export trailers with inpsections actives/inactive  to excel
        /// </summary>
        /// <param name="idu"></param>
        /// <returns></returns>
        public Table ExportTrailersWithInspections(Int64 idu, string status)
        {
            Table t = new Table { Items = new List<object>() };
            StatesDAL statesDAL = new StatesDAL();
            List<State> lstStates = new List<State>();
            lstStates = statesDAL.GetStates().ToList();

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                    var Trailers = (from i in DbContext.Inspection
                                    join v in DbContext.Trailer on i.Vin2 equals v.Vin
                                    join s in lstStates on v.PlateState equals s.Id
                                    where v.IdCompany == idCompany & v.Status == status
                                    select new
                                    {
                                        v.TrailerNumber,
                                        v.Vin,
                                        v.Plate,
                                        PlateState = s.Name,
                                        PlateExp = Convert.ToDateTime(v.PlateExpiration).ToString("MM/dd/yyyy"),
                                        InspDate = Convert.ToDateTime(i.InspDate).ToString("MM/dd/yyyy"),
                                        i.ReportNumber,
                                        i.ReportState,
                                        i.InspLevelId,
                                        i.CountryCodeState,
                                        i.VehicleOosTotal,
                                        i.TotalHazmatSent,
                                        i.OosTotal,
                                        i.HazmatOosTotal,
                                        i.UnsafeInsp,
                                        i.HmViol

                                    }).OrderBy(x => x.TrailerNumber).OrderBy(x => x.InspDate).ToList();
                    t.Items = Trailers.ToList<Object>();
                }
            }
            catch (Exception) { }
            return t;
        }

        /// <summary>
        /// get company inspections
        /// </summary>
        /// <param name="idCompany">company id</param>
        /// <returns></returns>
        public List<Object> getInspections(long idCompany)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var listByTrailers = (from i in DbContext.VehicleInspections
                                          join t in DbContext.Trailer on i.IdVehicle equals t.IdTrailer
                                          where i.IdCompany == idCompany && i.VehicleType == "TRAILER"
                                          select new
                                          {
                                              i.Id,
                                              i.IdVehicle,
                                              t.FileImage,
                                              VehicleNumber = t.TrailerNumber,
                                              i.VehicleType,
                                              t.Vin,
                                              t.Plate,
                                              i.InspectionType,
                                              i.InspectionDate,
                                              i.Odometer,
                                              i.InspectionName,
                                              NextInspection = "",
                                              i.FileName

                                          }).OrderByDescending(x => x.Id).ToList();

                    var listByTrucks = (from i in DbContext.VehicleInspections
                                        join v in DbContext.Vehicle on i.IdVehicle equals v.Id
                                        where i.IdCompany == idCompany && i.VehicleType == "VEHICLE"
                                        select new
                                        {
                                            i.Id,
                                            i.IdVehicle,
                                            v.FileImage,
                                            v.VehicleNumber,
                                            i.VehicleType,
                                            v.Vin,
                                            v.Plate,
                                            i.InspectionType,
                                            i.InspectionDate,
                                            i.Odometer,
                                            i.InspectionName,
                                            NextInspection = "",
                                            i.FileName
                                        }).OrderByDescending(x => x.Id).ToList();

                    var listInspections = listByTrailers.Union(listByTrucks).ToList<Object>();

                    return listInspections;
                }

            }
            catch (Exception) { return null; }
        }

        /// <summary>
        /// get truck/trailer inspections by vehicle type and id
        /// </summary>
        /// <param name="idVehicle">id of the vehicle with which the inspections will be brought</param>
        /// <param name="vehicleType">vehicle type -> truck or trailer</param>
        /// <returns></returns>
        public List<Object> getInspectionsByVehicle(long idVehicle, string vehicleType)
        {
            try
            {
                var listInspections = new List<Object>();
                using (var DbContext = new BAV02Context())
                {
                    if (vehicleType == "TRAILER")
                    {
                        listInspections = (from i in DbContext.VehicleInspections
                                           join t in DbContext.Trailer on i.IdVehicle equals t.IdTrailer
                                           where i.IdVehicle == idVehicle && i.VehicleType == "TRAILER"
                                           select new
                                           {
                                               i.Id,
                                               i.IdVehicle,
                                               i.FileName,
                                               i.IdCompany,
                                               VehicleNumber = t.TrailerNumber,
                                               i.VehicleType,
                                               t.Vin,
                                               i.InspectionType,
                                               i.InspectionDate,
                                               i.Odometer
                                               //Odometer = ""

                                           }).OrderByDescending(x => x.Id).ToList<Object>();
                    }
                    else
                    {
                        listInspections = (from i in DbContext.VehicleInspections
                                           join v in DbContext.Vehicle on i.IdVehicle equals v.Id
                                           where i.IdVehicle == idVehicle && i.VehicleType == "VEHICLE"
                                           select new
                                           {
                                               i.Id,
                                               i.IdVehicle,
                                               i.FileName,
                                               i.IdCompany,
                                               v.VehicleNumber,
                                               i.VehicleType,
                                               v.Vin,
                                               i.InspectionType,
                                               i.InspectionDate,
                                               i.Odometer
                                           }).OrderByDescending(x => x.Id).ToList<Object>();
                    }

                    return listInspections;
                }
            }
            catch (Exception) { return null; }
        }

        public VehicleInspection GetVehicleInspection(long idVehicleInspection)
        {
            try
            {

                using (var DbContext = new BAV02Context())
                {
                    var vehicleInspection = DbContext.VehicleInspections.Where(x => x.Id == idVehicleInspection).FirstOrDefault();
                    return vehicleInspection;
                }
            }
            catch (Exception) { return null; }
        }

        public int AddNewVehicleInspection(VehicleInspection vh)
        {
            int r = 0;
            try
            {
                using (var dbContext = new BAV02Context())
                {
                    vh.DateDue = DateTime.Now;
                    dbContext.Add(vh);
                    dbContext.SaveChanges();
                    try
                    {
                        var updateOdometerVehicle = dbContext.Vehicle.Where(x => x.Id == vh.IdVehicle).FirstOrDefault();
                        if (updateOdometerVehicle != null)
                        {
                            if (vh.Odometer > 0 && vh.Odometer > updateOdometerVehicle.Odometer)
                            {
                                updateOdometerVehicle.Odometer = vh.Odometer;
                                dbContext.SaveChanges();
                            }

                        }
                        else
                        {
                            if (vh.VehicleType != "TRAILER")
                            {
                                updateOdometerVehicle.Odometer = vh.Odometer;
                                dbContext.SaveChanges();
                            }
                        }

                    }
                    catch (Exception)
                    {
                        r = 2;
                    }
                }
            }
            catch (Exception)
            {
                r = 1; //vidor
            }
            return r;
        }

        public object OnBoardingDOT(List<Vehicles> vehicles, List<Trailer> trailers, List<Inspection> inspections, List<Violations> violations)
        {
            var listOfVehicle = new List<Vehicle>();

            using (var dbContext = new BAV02Context())
            {

                using (var transaction = dbContext.Database.BeginTransaction())
                {
                    
                    try
                    {

                        listOfVehicle = vehicles
                      .Select(x => new Vehicle()
                      {
                          Condition = x.condition,
                          PlateExpiration = x.PlateExpiration,
                          FuelType = x.fuelType,
                          IdCompany = x.idCompany,
                          Make = x.make,
                          Model = x.model,
                          Plate = x.plate,
                          PlateState = x.plateState,
                          VehicleNumber = x.vehicleNumber,
                          Status = x.status,
                          VehicleType = x.vehicleType,
                          Vin = x.vin
                      })
                      .ToList();

                        dbContext.Vehicle.AddRange(listOfVehicle);

                        dbContext.SaveChanges();

                        dbContext.Trailer.AddRange(trailers);

                        dbContext.SaveChanges();

                        AddInspections(inspections, violations);

                    } catch (Exception ex) {
                        Console.WriteLine(ex);
                        transaction.Rollback(); 
                        return ex; }
                    transaction.Commit();
                }


                return ($"{{\"status\":{0}}}");
            }
          
        }

        public object OnBoardingPIN(List<Vehicles> vehicles, List<Trailer> trailers, List<Users> driver, List<Driver> dataDriver, long IdCompany, List<Inspection> inspections, List<Violations> violations)
        {
            var listOfVehicle = new List<Vehicle>();
            var listDrivers = new List<Driver>();
            object response;
            using (var dbContext = new BAV02Context())
            {
                using (var transaction = dbContext.Database.BeginTransaction())
                {
                    DQFDAL dQFDAL = new DQFDAL();
                    try
                    {

                        listOfVehicle = vehicles
                       .Select(x => new Vehicle()
                       {
                           Condition = x.condition,
                           PlateExpiration = x.PlateExpiration,
                           FuelType = x.fuelType,
                           IdCompany = x.idCompany,
                           Make = x.make,
                           Model = x.model,
                           Plate = x.plate,
                           PlateState = x.plateState,
                           VehicleNumber = x.vehicleNumber,
                           Status = x.status,
                           VehicleType = x.vehicleType,
                           Vin = x.vin
                       })
                       .ToList();

                        listOfVehicle.RemoveAll(removeId => removeId.Equals("Id"));
                        trailers.RemoveAll(removeId => removeId.Equals("IdTrailer"));

                        dbContext.Vehicle.AddRange(listOfVehicle);

                        dbContext.Trailer.AddRange(trailers);

                        dbContext.SaveChanges();

                        AddInspections(inspections, violations);

                        response = dQFDAL.AddNewDriverAsync(driver, IdCompany, "Chofer753#", dataDriver);
                        dbContext.SaveChanges();

                    }
                    catch (Exception ex) { transaction.Rollback(); return ex; }
                    transaction.Commit();
                }
                return response;
            }

        }

        public void AddInspections(List<Inspection> inspections, List<Violations> violations)
        {
            using (var dbContext = new BAV02Context())
            {
                var lastRecord = long.Parse(dbContext.Inspection.OrderByDescending(x => x.UniqueId).First().UniqueId);

                for (int y = 0; y < inspections.Count(); y++)
                {
                    inspections[y].UniqueId = (lastRecord + y + 1).ToString();
                }

                dbContext.Inspection.AddRange(inspections);
                dbContext.SaveChanges();

                for (int x = 0; x < inspections.Count(); x++)
                {
                    for (int y = 0; y < violations.Count(); y++)
                    {
                        if (violations[y].UniqueId == inspections[x].ReportNumber)
                        {
                            violations[y].UniqueId = inspections[x].UniqueId;
                        }
                    }
                }

                dbContext.Violations.AddRange(violations);
                dbContext.SaveChanges();
            }
        }
        public int saveDoc(MaintenanceDocs m, string name, long idCompany)
        {

            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    m.IdCompany = idCompany;
                    m.DescriptionDoc = name;
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

        public int saveDocWorkOrder(WorkOrderImages m, string name, long idCompany)
        {

            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    m.IdCompany = idCompany;
                    m.DescriptionDoc = name;
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


        public List<BrakeInspectionCertificateView> getDocsBic(long idCompany)
        {
            List<BrakeInspectionCertificateView> docsBIC = new List<BrakeInspectionCertificateView>();

            try
            {

                using (var DbContext = new BAV02Context())
                {
                    docsBIC = (from BrakeInspectionCertificateView in DbContext.BrakeInspectionCertificateView
                               where BrakeInspectionCertificateView.IdCompany == idCompany
                               select new BrakeInspectionCertificateView
                               {
                                   Id = BrakeInspectionCertificateView.Id,
                                   DocName = BrakeInspectionCertificateView.DocName,
                                   DescriptionDoc = BrakeInspectionCertificateView.DescriptionDoc,
                                   DocType = BrakeInspectionCertificateView.DocType,
                                   IdCompany = BrakeInspectionCertificateView.IdCompany,
                                   IdVehicleInspection = BrakeInspectionCertificateView.IdVehicleInspection,
                                   MechanicName = BrakeInspectionCertificateView.MechanicName,
                                   Certificate = BrakeInspectionCertificateView.Certificate,
                                   vibIdMaintenanceDocs = BrakeInspectionCertificateView.vibIdMaintenanceDocs
                               }).ToList();
                    return docsBIC;
                }

            }
            catch (Exception) { return null; }
        }

        public int saveinfoBIC(string Certificate, string MechanicName)
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    VehicleInspectionBrakes infoBIC = new VehicleInspectionBrakes();
                    var IdDoc = DbContext.MaintenanceDocs.Where(x => x.DocType == "BrakeInspectorCertificate").OrderByDescending(s => s.Id).FirstOrDefault().Id;
                    infoBIC.IdMaintenanceDocs = IdDoc;
                    infoBIC.Certificate = Certificate;
                    infoBIC.MechanicName = MechanicName;
                    DbContext.Add(infoBIC);
                    DbContext.SaveChanges();
                }
            }
            catch ( Exception ex )
            {
                r = 2;
                throw new Exception($"Error: {ex} {r}");
            }
            return r;
        }

        public int deleteBIC(long id)
        {
            Console.Write(id);
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var mdBIC = DbContext.MaintenanceDocs.Where(x => x.Id == id).FirstOrDefault();
                    DbContext.MaintenanceDocs.RemoveRange(mdBIC);
                    DbContext.SaveChanges();

                    var vibBIC = DbContext.VehicleInspectionBrakes.Where(x => x.IdMaintenanceDocs == id).FirstOrDefault();
                    DbContext.VehicleInspectionBrakes.RemoveRange(vibBIC);
                    DbContext.SaveChanges();
                }
                return 0;
            }
            catch (Exception) { return 1; }
        }

        public int EmailSend(long idCompany, long idTruck, string email, IHostingEnvironment _env)
        {
            string link = "";
            using (var DbContext = new BAV02Context())
            {
                using (var transaction = DbContext.Database.BeginTransaction())
                {
                    try
                    {
                        //var description = "BillOfSale " + idTruck + ".pdf";
                        var docName = DbContext.MaintenanceDocs.Where(x => x.IdCompany == idCompany && x.DocType == "BillOfSale" && x.IdVehicle == idTruck).LastOrDefault().DocName;
                        var company = DbContext.Company.Where(x => x.Id == idCompany).FirstOrDefault();
                        var vehicle = DbContext.Vehicle.Where(x => x.Id == idTruck).FirstOrDefault();
                        var file = $"https://bluagent-files.s3.us-west-2.amazonaws.com/{idCompany}/TrucksFile/{idTruck}/BillOfSale/{docName}";
                        EmailService sendArchivedTruckEmail = new EmailService(_env);
                        sendArchivedTruckEmail.setEmailArchivedTruck();
                        sendArchivedTruckEmail.emailBody = sendArchivedTruckEmail.emailBody.
                        Replace("[Link]", file).
                        Replace("[CompanyName]", company.LegalName).
                        Replace("[DERName]", company.Der).
                        Replace("[PhoneNumber]", company.PhoneNumber).
                        Replace("[VIN]", vehicle.Vin).
                        Replace("[VehicleNumber]", vehicle.VehicleNumber);
                        sendArchivedTruckEmail.sendMail("support@bluagent.com", "Bill Of Sale");
                        return 0;
                    }
                    catch (Exception) { return 1; }
                }
            }
        }

        public String emailUser(long idUser)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    return DbContext.Users.Where(x => x.Id == idUser).FirstOrDefault().Email;
                }
            }
            catch (Exception) { return ""; }
        }

        public long getIdUserCompany(long idCompany)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var emailCompany = DbContext.Company.Where(x => x.Id == idCompany).FirstOrDefault().Email;
                    return DbContext.Users.Where(x => x.Email == emailCompany).FirstOrDefault().Id;
                }
            }
            catch (Exception) { return 0; }
        }
    }
}