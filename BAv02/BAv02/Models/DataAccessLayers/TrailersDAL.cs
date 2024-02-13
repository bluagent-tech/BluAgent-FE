using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using BAv02.Models.Tools;
using Microsoft.Extensions.Configuration;

namespace BAv02.Models.DataAccessLayers
{
    public class TrailersDAL
    {
        Alerts a = new Alerts();
        DateTime dateOld;
        static long idCompany = 0;

        private IConfiguration Configuration { get; set; }

        public TrailersDAL()
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

        /// <summary>
        /// get trailer with id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="idu"></param>
        /// <returns></returns>
        public Trailer getTrailer(long id, long idu)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    if (idu > 0) { idCompany = (long)DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;  }
                }
                using (var DbContext = new BAV02Context())
                {
                    var t = DbContext.Trailer.Where(x => x.IdTrailer == id).FirstOrDefault();
                    if (t.IdCompany == idCompany)
                    {
                        return t;
                    }
                    else { return null; }
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        ///<summary>
        ///save/update data trailer
        ///</summary>
        ///<param name="id"></param>
        ///<param name="t"></param>
        ///<param name="img"></param>
        public Trailer saveTrailer(Trailer t, long id, string img)
        {
            long validationID = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    dateOld = DbContext.Trailer.Where(x => x.IdTrailer == id).FirstOrDefault().PlateExpiration;
                    validationID = (long)DbContext.Trailer.Where(x => x.IdTrailer == id).FirstOrDefault().IdCompany;
                }

                using (var DbContext = new BAV02Context())
                {
                    if (idCompany == validationID)
                    {
                        if (img !="") { t.FileImage = img; }
                        t.IdTrailer = id;
                        var e = DbContext.Attach(t);
                        if (img !="") { e.Property(x => x.FileImage).IsModified = true; }
                        e.Property(x => x.Vin).IsModified = true;
                        e.Property(x => x.TrailerNumber).IsModified = true;
                        e.Property(x => x.Plate).IsModified = true;
                        e.Property(x => x.PlateState).IsModified = true;
                        e.Property(x => x.PlateExpiration).IsModified = true;
                        e.Property(x => x.Make).IsModified = true;
                        e.Property(x => x.Model).IsModified = true;
                        e.Property(x => x.Year).IsModified = true;
                        e.Property(x => x.Ownership).IsModified = true;
                        e.Property(x => x.Cost).IsModified = true;
                        e.Property(x => x.InServiceDate).IsModified = true;
                        e.Property(x => x.Weight).IsModified = true;
                        e.Property(x => x.Miles).IsModified = true;
                        e.Property(x => x.Hazmat).IsModified = true;
                        e.Property(x => x.TireSize).IsModified = true;
                        DbContext.SaveChanges();

                        var dateNew = t.PlateExpiration;
                        if (dateOld < dateNew) { a.deleteMAlerts(id, "TRAILER", dateOld.ToString("MM/dd/yyyy")); }
                    }
                }
                return getTrailer(id, 0);
            }
            catch (Exception) { return null; }
        }

        /// <summary>
        /// Save Insurance data
        /// </summary>
        /// <param name="id"></param>
        /// <param name="t"></param>
        /// <returns></returns>
        public Trailer saveInsurance(long id, Trailer t)
        {
            long validationID = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    dateOld = Convert.ToDateTime(DbContext.Trailer.Where(y => y.IdTrailer == id).FirstOrDefault().InsuranceExpiration);
                    validationID = (long)DbContext.Trailer.Where(x => x.IdTrailer == id).FirstOrDefault().IdCompany;
                }

                using (var DbContext = new BAV02Context())
                {
                    if (idCompany == validationID)
                    {
                        if (t.InsuranceName != "Other") { t.OtherInsurance = null; }
                        t.IdTrailer = id;
                        var entrada = DbContext.Attach(t);
                        entrada.Property(x => x.InsuranceName).IsModified = true;
                        entrada.Property(x => x.InsuranceExpiration).IsModified = true;
                        entrada.Property(x => x.PolicyTerm).IsModified = true;
                        entrada.Property(x => x.PortEntry).IsModified = true;
                        entrada.Property(x => x.OperationRadius).IsModified = true;
                        entrada.Property(x => x.OtherInsurance).IsModified = true;
                        DbContext.SaveChanges();

                        var dateNew = t.InsuranceExpiration;
                        if (dateOld < dateNew) { a.deleteMAlerts(id, "TRAILER", dateOld.ToString("MM/dd/yyyy")); }
                    }
                }
                return getTrailer(id,0);
            }
            catch (Exception) { return null; }
        }


        
        /// <summary>
        /// get all alerts of trailer with id
        /// </summary>
        /// <param name="idt"></param>
        /// <returns></returns>
        public List<MaintenanceAlerts> getAllAlerts(long companyID, long idt, string type)
        {
            List<MaintenanceAlerts> list = new List<MaintenanceAlerts>();

            long validationID = 0;
            using (var DbContext = new BAV02Context()) 
            { 
                if(type == "TRAILER")  { validationID = (long)DbContext.Trailer.Where(x => x.IdTrailer == idt).FirstOrDefault().IdCompany; }
                else { validationID = (long)DbContext.Vehicle.Where(x => x.Id == idt).FirstOrDefault().IdCompany; }
            }

            if (validationID == companyID)
            {
                a.validationMAlerts(idt, type);

                try
                {
                    using (var DbContext = new BAV02Context())
                    {
                        var items = DbContext.MaintenanceAlerts.Where(x => x.IdVehicle == idt && x.TypeId == type && x.IdCompany == companyID).OrderByDescending(x => x.Id);
                        list = items.ToList();
                    }

                }
                catch (Exception) { }
            }
            return list;
        }
        public int alertsCounter(long companyID, long idt, string type)
        {
            long validationID = 0;
            using (var DbContext = new BAV02Context())
            {
                if (type == "TRAILER") { validationID = (long)DbContext.Trailer.Where(x => x.IdTrailer == idt).FirstOrDefault().IdCompany; }
                else { validationID = (long)DbContext.Vehicle.Where(x => x.Id == idt).FirstOrDefault().IdCompany; }
            }

            if (validationID == companyID)
            {
                try
                {
                    using (var DbContext = new BAV02Context())
                    {
                        var r = (int)DbContext.MaintenanceAlerts.Where(x => x.IdVehicle == idt && x.TypeId == type && x.IdCompany == companyID).Select(x => new { x.IdVehicle }).Count();
                        return r;
                    }
                }
                catch (Exception) { return 0; }
            }
            else { return 0; }
        }

        /// <summary>
        /// Get Trailer Inspections
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public Table getTrailerInspections(long idu, int page, int size, DateTime F, DateTime T)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 0, NumberP = 0 };
            DateTime tt = new DateTime(); DateTime ff = new DateTime();
            if (F != tt & T != tt) { ff = F; tt = T; }
            else { tt = DateTime.Now; }

            try
            {
                string vin = "";
                using (var DbContext = new BAV02Context())
                {
                    vin = DbContext.Trailer.Where(x => x.IdTrailer == idu).FirstOrDefault().Vin;

                    var list = DbContext.Inspection.Where(x => x.Vin == vin).ToList<Object>();

                    foreach (Inspection i in list)
                    {
                        var listViolations = DbContext.Violations.Where(id => id.UniqueId == i.UniqueId).ToList<Object>();
                        i.VIOLATIONS = listViolations;
                    }

                    t.Items = list;
                    t.CurrentPage = page;
                }
            }
            catch (Exception e) {
                Console.WriteLine(e);
             }
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
                    if(name.Length > 95) 
                    {
                        m.DescriptionDoc = name.Remove(95);
                    } 
                    else
                    {
                        m.DescriptionDoc= name;
                    }
                    DbContext.Add(m);
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { r = 2; }
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
                                where maintenanceDocs.IdVehicle == idVehicle && maintenanceDocs.TypeId == "TRAILER"
                                select new
                                {
                                    maintenanceDocs.Id,
                                    maintenanceDocs.DescriptionDoc,
                                    maintenanceDocs.DocName,
                                    maintenanceDocs.DocType,
                                    maintenanceDocs.RoadsideInspectionID,
                                    maintenanceDocs.TypeId
                                }).ToList<Object>();

                    var count = Math.Ceiling((DbContext.MaintenanceDocs.Where(x => x.IdVehicle == idVehicle).Select(x => new { x.IdVehicle }).Count() / (double)size));
                    t.Items = list;
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }

            }
            catch (Exception ex) {Console.WriteLine(ex); }
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

        public List<Trailer> getSearchVIN(string vin, long idCompany)
        {
            var DbContext = new BAV02Context();
            return DbContext.Trailer.Where(x => x.Vin == vin && x.IdCompany == idCompany).ToList();
        }

        public int saveTrailerLogo(Trailer u)
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
