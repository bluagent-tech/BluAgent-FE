using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using BAv02.Models.Tools;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;

namespace BAv02.Models.DataAccessLayers
{
    public class AccountSetDAL
    {
        Alerts a = new Alerts();

        //private IHostingEnvironment _env;



        private IConfiguration Configuration { get; set; }

        public AccountSetDAL()
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
        /// Get list of driver for company
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public object getDrivers(long id)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var Company = DbContext.CompanyUsersRoles.Where(x => x.IdUser == id).FirstOrDefault().IdCompany;
                    var list = (from d in DbContext.Driver
                                join u in DbContext.Users on d.IdUser equals u.Id
                                join r in DbContext.CompanyUsersRoles on u.Id equals r.IdUser
                                where r.IdCompany == Company && d.Status == "ACTIVE"
                                select new
                                {
                                    Id = d.IdUser,
                                    Name = u.Name + " " + u.LastName,
                                    d.CDL,
                                    d.Status,
                                    d.QuestionInterstate,
                                    d.QuestionIntrastate,
                                    d.QuestionWithin,
                                    d.QuestionBeyond,
                                }).ToList();
                    return list;
                }
            }
            catch (Exception) { return null; }
        }

        public object getVehiclesActive(long IdCompany)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    //var Company = DbContext.CompanyUsersRoles.Where(x => x.IdUser == id).FirstOrDefault().IdCompany;
                    var ListActiveVehicles = (from d in DbContext.Vehicle
                                    //join u in DbContext.Users on d.IdUser equals u.Id
                                    //join r in DbContext.CompanyUsersRoles on u.Id equals r.IdUser
                                where d.IdCompany == IdCompany && d.Status == "ACTIVE"
                                select new
                                {
                                    d.Id,
                                    d.VehicleType,
                                    d.Condition,
                                    d.Hazmat,
                                    d.Status,
                                    d.CargoTank,
                                    d.Passengers,
                                }).ToList();
                    //var ActiveVehicles = DbContext.Vehicle.Where(x => x.IdCompany == IdCompany && x.Status == "ACTIVE");
                    return ListActiveVehicles;
                }
            }
            catch (Exception) { return null; }
        }

        /// <summary>
        /// Get list of states per Country
        /// </summary>
        /// <param name="idc"></param>
        /// <returns></returns>
        public List<State> getStates(Int64 idc)
        {
            StatesDAL statesDAL = new StatesDAL();
            List<State> list = new List<State>();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    list = statesDAL.GetStates(idc).OrderBy(x => x.Name).ToList();
                    return list;
                }
            }
            catch (Exception) { return list; }
        }

        /// <summary>
        /// Get lis of cities per state
        /// </summary>
        /// <param name="idstate"></param>
        /// <returns></returns>
        public List<City> getCities(Int64 idstate)
        {
            List<City> list = new List<City>();
            CityDAL cities = new CityDAL();
            try
            {
                list = cities.GetCities(idstate).OrderBy(x => x.Name).ToList();
                return list;
            }
            catch (Exception) { return list; }
        }

        public List<Company> saveCompanyCredentialsCH(Company company)
        {
            List<Company> list = new List<Company>();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var dr = DbContext.Company.Where(x => x.Id == company.Id).FirstOrDefault();
                    dr.UserNameCH = company.UserNameCH;
                    dr.PasswordCH = company.PasswordCH;
                    dr.Phone = company.Phone;
                    dr.HaveAccount = company.HaveAccount;
                    DbContext.SaveChanges();
                    return DbContext.Company.Where(x => x.Id == company.Id).ToList();
                }
            }
            catch (Exception error)
            {
                throw error;
            }
        }

        public List<Company> GetCompanyCHCredentials(long idCompany)
        {
            List<Company> list = new List<Company>();

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    list = DbContext.Company.Where(x => x.Id == idCompany).ToList();
                    return list;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Get data company
        /// </summary>
        /// <param name="idU"></param>
        /// <returns></returns>
        public DataCompany getDataCompany(Int64 idU, Boolean alert)
        {
            DataCompany c = new DataCompany();
            CityDAL cityDAL = new CityDAL();
            CountryDAL countryDAL = new CountryDAL();
            StatesDAL statesDAL = new StatesDAL();
            List<City> lstCities = new List<City>();
            List<Country> lstCountries = new List<Country>();
            List<State> lstStates = new List<State>();
            lstCities = cityDAL.GetCities().ToList();
            lstCountries = countryDAL.GetCountries().ToList();
            lstStates = statesDAL.GetStates().ToList();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var Company = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idU).FirstOrDefault().IdCompany;

                    if (alert == true)
                    {
                        updateDateMCS150(Company);
                        a.deleteCAlerts((long)Company, "Please Review your Company Profile and Update MCS-150  Information");
                    }

                    c.Company = DbContext.Company.Where(x => x.Id == (long)Company).FirstOrDefault();
                    c.Countries = lstCountries.OrderBy(x => x.Name).ToList();
                    c.States = lstStates.Where(x => x.IdCountry == c.Company.PhysicalCountry).OrderBy(x => x.Name).ToList();
                    c.Cities = lstCities.Where(x => x.IdState == c.Company.PhysicalState).OrderBy(x => x.Name).ToList();
                    c.MailingStates = lstStates.Where(x => x.IdCountry == c.Company.MailCountry).OrderBy(x => x.Name).ToList();
                    c.MailingCities = lstCities.Where(x => x.IdState == c.Company.MailState).OrderBy(x => x.Name).ToList();
                    c.Signature = DbContext.Users.Where(x => x.Id == idU).Select(x => x.FileSignature).First();
                    a.validationCAlerts(c.Company);

                    return c;
                }
            }
            catch (Exception) { return c; }
        }

        /// <summary>
        /// save data company
        /// </summary>
        /// <param name="c"></param>
        /// <returns></returns>
        public Company saveDataCompany(Company c, Int64 idu)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {

                    var idc = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu && x.Status == "ACTIVE").Select(x => x.IdCompany).First();


                    var driverTotal = DbContext.CompanyUsersRoles.Where(x => x.IdCompany == idc && x.Status == "ACTIVE" && x.Type == "DRIVER").Count();
                    var trailerTotal = DbContext.Trailer.Where(x => x.IdCompany == idc && x.Status == "ACTIVE").Count();
                    var truckTotal = DbContext.Vehicle.Where(x => x.IdCompany == idc && x.Status == "ACTIVE").Count();
                    var powerUnit = trailerTotal + truckTotal;

                    c.Id = (long)idc;
                    c.UpdateDate = DateTime.Today;

                    if (c.Powerunit < powerUnit || c.Powerunit == null) { c.Powerunit = powerUnit; }
                    if (powerUnit == 0 && (c.Powerunit == 0 || c.Powerunit == null)) { a.createCAlerts(c.Id, "Please add the Total of Units in your company", "danger"); }
                    else { a.deleteCAlerts(c.Id, "Please add the Total of Units in your company"); }

                    if (c.DriverTotal < driverTotal || c.DriverTotal == null) { c.DriverTotal = driverTotal; }
                    if (driverTotal == 0 && (c.DriverTotal == 0 || c.DriverTotal == null)) { a.createCAlerts(c.Id, "Please add the Total of Drivers in your company", "danger"); }
                    else { a.deleteCAlerts(c.Id, "Please add the Total of Drivers in your company"); }

                    var entrada = DbContext.Attach(c);
                    entrada.Property(x => x.LegalName).IsModified = true;
                    entrada.Property(x => x.DbaName).IsModified = true;
                    entrada.Property(x => x.Tax).IsModified = true;
                    entrada.Property(x => x.Pinnumber).IsModified = true;
                    entrada.Property(x => x.Region).IsModified = true;
                    entrada.Property(x => x.PhysicalAddress).IsModified = true;
                    entrada.Property(x => x.PhysicalCity).IsModified = true;
                    entrada.Property(x => x.PhysicalState).IsModified = true;
                    entrada.Property(x => x.PhysicalCountry).IsModified = true;
                    entrada.Property(x => x.PhysicalZip).IsModified = true;
                    entrada.Property(x => x.PhoneNumber).IsModified = true;
                    entrada.Property(x => x.Der).IsModified = true;
                    entrada.Property(x => x.StateNumber).IsModified = true;
                    entrada.Property(x => x.Hazmat).IsModified = true;
                    entrada.Property(x => x.ScacCode).IsModified = true;
                    entrada.Property(x => x.Saat).IsModified = true;
                    entrada.Property(x => x.Email).IsModified = true;
                    entrada.Property(x => x.MailAddress).IsModified = true;
                    entrada.Property(x => x.MailCity).IsModified = true;
                    entrada.Property(x => x.MailState).IsModified = true;
                    entrada.Property(x => x.MailCountry).IsModified = true;
                    entrada.Property(x => x.MailZip).IsModified = true;
                    entrada.Property(x => x.McMx).IsModified = true;
                    entrada.Property(x => x.Title).IsModified = true;
                    entrada.Property(x => x.MovilPhone).IsModified = true;

                    entrada.Property(x => x.CarrierOperation).IsModified = true;
                    entrada.Property(x => x.DriverTotal).IsModified = true;
                    entrada.Property(x => x.Powerunit).IsModified = true;
                    entrada.Property(x => x.Mcs150Date).IsModified = true;
                    entrada.Property(x => x.Mcs150Mileage).IsModified = true;
                    entrada.Property(x => x.AddDate).IsModified = true;
                    entrada.Property(x => x.PcFlag).IsModified = true;
                    entrada.Property(x => x.UpdateDate).IsModified = true;

                    DbContext.SaveChanges();

                    a.createCAlerts(c.Id, "Please Review your Company Profile and Update MCS-150  Information", "danger");
                    a.validationCAlerts(c);
                }
                using (var DbContext = new BAV02Context())
                {
                    var newCompanyInfo = DbContext.Company.Where(x => x.Id == c.Id).FirstOrDefault();
                    return newCompanyInfo;
                }
            }
            catch (Exception)
            {
                Company company = null;
                return company;
            }
        }

        /// <summary>
        /// save data company
        /// </summary>
        /// <param name="c"></param>
        /// <returns></returns>
        public Company saveCompanyLogo(Company c)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var entrada = DbContext.Attach(c);
                    entrada.Property(x => x.Image).IsModified = true;
                    DbContext.SaveChanges();

                }
                using (var DbContext = new BAV02Context())
                {
                    var newCompanyInfo = DbContext.Company.Where(x => x.Id == c.Id).FirstOrDefault();
                    return newCompanyInfo;
                }

            }
            catch (Exception)
            {
                Company company = null;
                return company;
            }
        }

        /// <summary>
        /// Save Signature file
        /// </summary>
        /// <param name="u"></param>
        /// <returns></returns>
        public int saveSignatureFile(Users u)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var entrada = DbContext.Attach(u);
                    entrada.Property(x => x.FileSignature).IsModified = true;
                    entrada.Property(x => x.SignatureDate).IsModified = true;
                    DbContext.SaveChanges();
                }
                return 0;
            }
            catch (Exception) { return 1; }
        }

        /// <summary>
        /// Add new User
        /// </summary>
        /// <param name="u"></param>
        /// <param name="Password"></param>
        /// <param name="idu"></param>
        /// <returns></returns>
        public int addUser(Users u, string permits, string Password, Int64 idu)
        {
            int r = 0;
            using (var DbContext = new BAV02Context())
            {
                using (var transaction = DbContext.Database.BeginTransaction())
                {
                    try
                    {
                        var email = DbContext.Users.Where(x => x.Email == u.Email).FirstOrDefault();
                        if (email == null)
                        {
                            u.Status = "ACTIVE";
                            u.Password = (byte[])DbContext.Users.FromSql($"select PWDENCRYPT({Password}) as Password").Select(x => x.Password).FirstOrDefault();
                            u.Deactivated = false;
                            DbContext.Add(u);
                            DbContext.SaveChanges();
                            var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                            var relation = new CompanyUsersRoles { IdCompany = idCompany, IdUser = u.Id, Type = u.Role, DateStarted = DateTime.Now, Status = "ACTIVE", UserPermits = permits };
                            DbContext.Add(relation);
                            DbContext.SaveChanges();
                            transaction.Commit();
                        }
                        else { r = 1; }

                    }
                    catch (Exception) { transaction.Rollback(); r = 2; }
                }
                return r;
            }
        }

        /// <summary>
        /// Inactive User
        /// </summary>
        /// <param name="idu"></param>
        /// <returns></returns>
        public int inactiveUser(long idu)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {

                    var R = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu && x.Status == "ACTIVE").FirstOrDefault();
                    var user = DbContext.Users.Where(x => x.Id == idu).FirstOrDefault();
                    user.Status = "INACTIVE"; R.Status = "INACTIVE"; R.DateEnd = DateTime.Now;
                    DbContext.SaveChanges();
                    return 0;
                }
            }
            catch (Exception) { return 1; }
        }
        public int activeUser(long idu)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {

                    var R = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu && x.Status == "INACTIVE").FirstOrDefault();
                    var user = DbContext.Users.Where(x => x.Id == idu).FirstOrDefault();
                    user.Status = "ACTIVE"; R.Status = "ACTIVE"; R.DateEnd = DateTime.Now;
                    DbContext.SaveChanges();
                    return 0;
                }
            }
            catch (Exception) { return 1; }
        }
        /// <summary>
        /// Get list of users per company
        /// </summary>
        /// <param name="idCompany"></param>
        /// <returns></returns>
        public Table getRoles(Int64 idu, int page, int size)
        {

            Table t = new Table { Items = new List<object>(), CurrentPage = 1, NumberP = 1 };
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                    var Users = (from u in DbContext.Users
                                 join r in DbContext.CompanyUsersRoles
                                 on u.Id equals r.IdUser
                                 where r.IdCompany == idCompany && (r.Type == "USER" || r.Type == "COLLECTOR" || r.Type == "ADMIN" || r.Type == "INSURANCE") && r.Status == "ACTIVE" & u.Status == "ACTIVE"
                                 select new Users
                                 {
                                     Id = u.Id,
                                     Name = u.Name,
                                     LastName = u.LastName,
                                     Email = u.Email,
                                     Role = u.Role,
                                     Status = u.Status,
                                 }).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList();
                    var count = Math.Ceiling(((from u in DbContext.Users
                                               join r in DbContext.CompanyUsersRoles
                                               on u.Id equals r.IdUser
                                               where r.IdCompany == idCompany && (r.Type == "USER" || r.Type == "COLLECTOR" || r.Type == "ADMIN" || r.Type == "INSURANCE") && r.Status == "ACTIVE" & u.Status == "ACTIVE"
                                               select new { Id = u.Id }).Count() / (double)size));
                    t.Items = Users.ToList<Object>();
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }
            }
            catch (Exception) { }
            return t;
        }
        public Table getInactiveRoles(Int64 idu, int page, int size)
        {

            Table t = new Table { Items = new List<object>(), CurrentPage = 1, NumberP = 1 };
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                    var Users = (from u in DbContext.Users
                                 join r in DbContext.CompanyUsersRoles
                                 on u.Id equals r.IdUser
                                 where r.IdCompany == idCompany && (r.Type == "USER" || r.Type == "COLLECTOR" || r.Type == "ADMIN" || r.Type == "INSURANCE") && r.Status == "INACTIVE" & u.Status == "INACTIVE"
                                 select new Users
                                 {
                                     Id = u.Id,
                                     Name = u.Name,
                                     LastName = u.LastName,
                                     Email = u.Email,
                                     Role = u.Role,
                                     Status = u.Status,
                                 }).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList();
                    var count = Math.Ceiling(((from u in DbContext.Users
                                               join r in DbContext.CompanyUsersRoles
                                               on u.Id equals r.IdUser
                                               where r.IdCompany == idCompany && (r.Type == "USER" || r.Type == "COLLECTOR" || r.Type == "ADMIN" || r.Type == "INSURANCE") && r.Status == "INACTIVE" & u.Status == "INACTIVE"
                                               select new { Id = u.Id }).Count() / (double)size));
                    t.Items = Users.ToList<Object>();
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }
            }
            catch (Exception) { }
            return t;
        }

        public int saveDoc(CompanyDocs d, long IdCompany, string name, IHostingEnvironment _env, int Year)
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    d.IdCompany = IdCompany;
                    if(d.DocType == "Certificate of Enrollment")
                    {
                        d.DescriptionDoc = "Certificate of Enrollment " + Year.ToString();
                    } else { 
                        d.DescriptionDoc = name; 
                    }
                    d.Date = Year;
                    DbContext.Add(d);
                    DbContext.SaveChanges();
                }
            }

            catch (Exception) { r = 2; }
            return r;
        }

        public int EmailDotReport(IHostingEnvironment _env, long IdCompany)
        {
            using (var DbContext = new BAV02Context())
            {
                using (var transaction = DbContext.Database.BeginTransaction())
                {
                    try
                    {
                        var companyName = DbContext.Company.Where(x => x.Id == IdCompany).Select(x => x.LegalName).FirstOrDefault();
                        var companyEmail = DbContext.Company.Where(x => x.Id == IdCompany).Select(x => x.Email).FirstOrDefault();
                        EmailService sendNewDotReport = new EmailService(_env);
                        sendNewDotReport.SetEmailTemplateNewDOTReport();
                        sendNewDotReport.emailBody = sendNewDotReport.emailBody.Replace("[DERName]!", companyName);
                        sendNewDotReport.sendMail(companyEmail, "New DOT Report");
                        //sendNewDotReport.sendMail("danielaquino@bluagent.com", "New DOT Report");
                        return 0;
                    }
                    catch (Exception) { return 1; }
                }
            }
        }

        public int saveDriverTrainingCertificateDocs(DriversTrainingCertificateDocs d, long IdCompany, string name, string date)
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    d.IdCompany = IdCompany;
                    d.DescriptionDoc = name;
                    //d.ExpirationDate = date;
                    DbContext.Add(d);
                    DbContext.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                r = 2;
                throw new Exception($"Error: {ex.Message} {r}");
            }
            return r;

        }

        public int saveDriversDocs(DriversDocs d, long IdCompany, string name)
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    d.IdCompany = IdCompany;
                    d.DescriptionDoc = name;
                    DbContext.Add(d);
                    DbContext.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                r = 2;
            }

            return r;
        }

        public int saveHazmatDoc(Documents d)
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    DbContext.Documents.Add(d);
                    DbContext.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                r = 2;
                throw new Exception($"Error: {ex} Response {r}");
            }
            return r;
        }

        public int saveTrainingCertificate(DriverTrainingCertificateDocs d)
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    DbContext.DriverTrainingCertificateDocs.Add(d);
                    DbContext.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                r = 2;
                throw new Exception($"Error: {ex} Response {r}");
            }
            return r;
        }

        public int saveHazmatDocs(Documents driverHazmatDocs, long idd)
        {
            int response = 0;
            var DbContext = new BAV02Context();

            try
            {
                var transaction = DbContext.Database.BeginTransaction();
                var nullDoc = DbContext.Documents
                    .Where(x => x.DocumentURL == driverHazmatDocs.DocumentURL & x.Id == idd).FirstOrDefault();
                if (nullDoc == null)
                {
                    driverHazmatDocs.Id = idd;
                    DbContext.Add(driverHazmatDocs);
                    DbContext.SaveChanges();
                    transaction.Commit();
                }
                else
                {
                    response = 1;
                }
            }
            catch (Exception ex)
            {
                response = 2;
                throw new Exception("Error: ", ex);
            }

            return response;
        }

        public Table getAllHazmatDocuments(long IdCompany, string DocumentType, long IdNumber, int page, int size)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 1, NumberP = 1 };

            try
            {

                using (var DbContext = new BAV02Context())
                {

                    var list = (from d in DbContext.Documents
                                where d.IdCompany == IdCompany && d.DocumentType == DocumentType && d.DriverId == IdNumber
                                select new
                                {
                                    d.IdCompany,
                                    d.DocumentType,
                                    d.DriverId
                                }).OrderByDescending(x => x.IdCompany).Skip((page - 1) * size).Take(size).ToList<Object>();

                    var count = Math.Ceiling((DbContext.Documents.Where(x => x.IdCompany == IdCompany).Select(x => new { x.IdCompany }).Count() / (double)size));
                    t.Items = list;
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }

            }
            catch (Exception) { }
            return t;
        }

        public Table getAllTrainingDocuments(long IdCompany, string DocumentType, long IdNumber, int page, int size)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 1, NumberP = 1 };

            try
            {

                using (var DbContext = new BAV02Context())
                {

                    var list = (from d in DbContext.DriverTrainingCertificateDocs
                                where d.IdCompany == IdCompany && d.DocumentType == DocumentType && d.DriverId == IdNumber
                                select new
                                {
                                    d.IdCompany,
                                    d.DocumentType,
                                    d.DriverId
                                }).OrderByDescending(x => x.IdCompany).Skip((page - 1) * size).Take(size).ToList<Object>();

                    var count = Math.Ceiling((DbContext.Documents.Where(x => x.IdCompany == IdCompany).Select(x => new { x.IdCompany }).Count() / (double)size));
                    t.Items = list;
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }

            }
            catch (Exception) { }
            return t;
        }



        public List<CompanyDocs> getDocuments(long idd)
        {
            List<CompanyDocs> list = new List<CompanyDocs>();

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var n = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idd).FirstOrDefault().IdCompany;

                    var items = DbContext.CompanyDocs.Where(x => x.IdCompany == n).OrderByDescending(x => x.Id);
                    list = items.ToList();
                }

            }
            catch (Exception) { }
            return list;
        }

        public Table getAllDocuments(long idd, int page, int size)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 1, NumberP = 1 };

            try
            {

                using (var DbContext = new BAV02Context())
                {
                    var n = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idd).FirstOrDefault().IdCompany;

                    var list = (from d in DbContext.CompanyDocs
                                where d.IdCompany == n
                                select new
                                {
                                    d.Id,
                                    d.DescriptionDoc,
                                    d.DocName,
                                    d.DocType,
                                    d.Date,
                                }).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList<Object>();

                    var count = Math.Ceiling((DbContext.CompanyDocs.Where(x => x.IdCompany == n).Select(x => new { x.IdCompany }).Count() / (double)size));
                    t.Items = list;
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }

            }
            catch (Exception) { }
            return t;
        }

        public List<CompanyDocs> getDotDocuments(long idCompany)
        {
            List<CompanyDocs> list = new List<CompanyDocs>();

            try
            {

                using (var DbContext = new BAV02Context())
                {
                    var items = DbContext.CompanyDocs.Where(x => x.IdCompany == idCompany && x.DocType == "DotReport").OrderByDescending(x => x.Id);
                    list = items.ToList();
                }

            }
            catch (Exception) { }
            return list;
        }

        public Table getAllDocumentsDrivers(long idd, int page, int size)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 1, NumberP = 1 };

            try
            {

                using (var DbContext = new BAV02Context())
                {
                    var n = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idd).FirstOrDefault().IdCompany;

                    var list = (from d in DbContext.DriversDocs
                                where d.IdCompany == n
                                select new
                                {
                                    d.Id,
                                    d.DescriptionDoc,
                                    d.DocName,
                                    d.DocType,
                                    d.IdDriver
                                }).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList<Object>();

                    var count = Math.Ceiling((DbContext.DriversDocs.Where(x => x.IdCompany == n).Select(x => new { x.IdCompany }).Count() / (double)size));
                    t.Items = list;
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }

            }
            catch (Exception) { }
            return t;
        }

        public Table getAllDocumentsDriversTrainig(long idd, int page, int size)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 1, NumberP = 1 };

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var n = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idd).FirstOrDefault().IdCompany;

                    var list = (from d in DbContext.DriversTrainingCertificateDocs
                                where d.IdCompany == n
                                select new
                                {
                                    d.Id,
                                    d.DescriptionDoc,
                                    d.DocName,
                                    d.DocType,
                                    d.IdDriver,
                                    d.ExpirationDate
                                }).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList<Object>();

                    var count = Math.Ceiling((DbContext.DriversDocs.Where(x => x.IdCompany == n).Select(x => new { x.IdCompany }).Count() / (double)size));
                    t.Items = list;
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }

            }
            catch (Exception) { }
            return t;
        }

        public Table getAccidentRegisterDocuments(long idd, int page, int size, long idAccidentRegister)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 1, NumberP = 1 };

            try
            {

                using (var DbContext = new BAV02Context())
                {
                    var n = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idd).FirstOrDefault().IdCompany;

                    var list = (from d in DbContext.CompanyDocs
                                where d.IdCompany == n && d.IdAccidentRegister == idAccidentRegister
                                select new
                                {
                                    d.Id,
                                    d.DescriptionDoc,
                                    d.DocName,
                                    d.DocType
                                }).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList<Object>();

                    var count = Math.Ceiling((DbContext.CompanyDocs.Where(x => x.IdCompany == n).Select(x => new { x.IdCompany }).Count() / (double)size));
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
                    var d = DbContext.CompanyDocs.Where(x => x.Id == id).FirstOrDefault();
                    DbContext.CompanyDocs.RemoveRange(d);
                    DbContext.SaveChanges();

                    //System.IO.File.Delete($"ClientApp/{AssetsDirectory}/assets/docs/" + d.Name);
                }
            }
            catch (Exception) { r = 1; }
            return r;
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////
        public int deleteDocTrainingC(long id)
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var d = DbContext.DriversTrainingCertificateDocs.Where(x => x.Id == id).FirstOrDefault();
                    DbContext.DriversTrainingCertificateDocs.RemoveRange(d);
                    DbContext.SaveChanges();

                    //System.IO.File.Delete($"ClientApp/{AssetsDirectory}/assets/docs/" + d.Name);
                }
            }
            catch (Exception) { r = 1; }
            return r;
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////

        public int deleteDocDrivers(long id)
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var d = DbContext.DriversDocs.Where(x => x.Id == id).FirstOrDefault();
                    DbContext.DriversDocs.RemoveRange(d);
                    DbContext.SaveChanges();

                    //System.IO.File.Delete($"ClientApp/{AssetsDirectory}/assets/docs/" + d.Name);
                }
            }
            catch (Exception) { r = 1; }
            return r;
        }
        public int deleteHazmatDoc(long id)
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var d = DbContext.Documents.Where(x => x.Id == id).FirstOrDefault();
                    DbContext.Documents.RemoveRange(d);
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { r = 1; }
            return r;
        }

        /// <summary>
        /// save data operation classification
        /// </summary>
        /// <param name="oC"></param>
        /// <returns></returns>
        public OperationClassification saveOperationClassification(OperationClassification oC, long id)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == id).FirstOrDefault().IdCompany;
                    var existing = DbContext.OperationClassification.Where(x => x.IdCompany == idCompany).Select(x => x.Id).FirstOrDefault();
                    oC.IdCompany = (long)idCompany;
                    if (existing == 0) { DbContext.Add(oC); }
                    else
                    {
                        oC.Id = existing;
                        var update = DbContext.Attach(oC);
                        update.Property(x => x.A).IsModified = true;
                        update.Property(x => x.B).IsModified = true;
                        update.Property(x => x.C).IsModified = true;
                        update.Property(x => x.D).IsModified = true;
                        update.Property(x => x.E).IsModified = true;
                        update.Property(x => x.F).IsModified = true;
                        update.Property(x => x.G).IsModified = true;
                        update.Property(x => x.H).IsModified = true;
                        update.Property(x => x.I).IsModified = true;
                        update.Property(x => x.J).IsModified = true;
                        update.Property(x => x.K).IsModified = true;
                        update.Property(x => x.L).IsModified = true;
                        update.Property(x => x.Other).IsModified = true;
                    }
                    DbContext.SaveChanges();

                    var operations = DbContext.OperationClassification.Where(x => x.IdCompany == (long)idCompany).FirstOrDefault();
                    return operations;
                }

            }
            catch (Exception)
            {
                OperationClassification operations = null;
                return operations;
            }
        }

        /// <summary>
        /// get operation classification of company
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public OperationClassification getOperationClassification(long idu)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                    return DbContext.OperationClassification.Where(x => x.IdCompany == idCompany).FirstOrDefault();
                }
            }
            catch (Exception) { return null; }
        }

        /// <summary>
        /// save data cargo classification
        /// </summary>
        /// <param name="cC"></param>
        /// <returns></returns>
        public CargoClassification saveCargoClassification(CargoClassification cC, long id)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == id).FirstOrDefault().IdCompany;
                    var existing = DbContext.CargoClassification.Where(x => x.IdCompany == idCompany).Select(x => x.Id).FirstOrDefault();
                    cC.IdCompany = (long)idCompany;
                    if (existing == 0) { DbContext.Add(cC); }
                    else
                    {
                        cC.Id = existing;
                        var update = DbContext.Attach(cC);
                        update.Property(x => x.A).IsModified = true;
                        update.Property(x => x.B).IsModified = true;
                        update.Property(x => x.C).IsModified = true;
                        update.Property(x => x.D).IsModified = true;
                        update.Property(x => x.E).IsModified = true;
                        update.Property(x => x.F).IsModified = true;
                        update.Property(x => x.G).IsModified = true;
                        update.Property(x => x.H).IsModified = true;
                        update.Property(x => x.I).IsModified = true;
                        update.Property(x => x.J).IsModified = true;
                        update.Property(x => x.K).IsModified = true;
                        update.Property(x => x.L).IsModified = true;
                        update.Property(x => x.M).IsModified = true;
                        update.Property(x => x.N).IsModified = true;
                        update.Property(x => x.O).IsModified = true;
                        update.Property(x => x.P).IsModified = true;
                        update.Property(x => x.Q).IsModified = true;
                        update.Property(x => x.R).IsModified = true;
                        update.Property(x => x.S).IsModified = true;
                        update.Property(x => x.T).IsModified = true;
                        update.Property(x => x.U).IsModified = true;
                        update.Property(x => x.V).IsModified = true;
                        update.Property(x => x.W).IsModified = true;
                        update.Property(x => x.X).IsModified = true;
                        update.Property(x => x.Y).IsModified = true;
                        update.Property(x => x.Z).IsModified = true;
                        update.Property(x => x.Aa).IsModified = true;
                        update.Property(x => x.Bb).IsModified = true;
                        update.Property(x => x.Cc).IsModified = true;
                        update.Property(x => x.Dd).IsModified = true;
                        update.Property(x => x.Other).IsModified = true;
                        update.Property(x => x.PassengerCertificate).IsModified = true;
                    }
                    DbContext.SaveChanges();


                    var cargos = DbContext.CargoClassification.Where(x => x.IdCompany == (long)idCompany).FirstOrDefault();
                    return cargos;
                }

            }
            catch (Exception)
            {
                CargoClassification cargos = null;
                return cargos;
            }
        }

        /// <summary>
        /// get cargo classification of company
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public CargoClassification getCargoClassification(long idu)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                    return DbContext.CargoClassification.Where(x => x.IdCompany == idCompany).FirstOrDefault();
                }
            }
            catch (Exception) { return null; }
        }


        /// <summary>
        /// save data cargo classification
        /// </summary>
        /// <param name="cC"></param>
        /// <returns></returns>
        public int saveHazardMaterial(HazardMaterialOptions hmOptions, HazardMaterialStates hmStates, string hmC, long id)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == id).FirstOrDefault().IdCompany;

                    dynamic obj = JsonConvert.DeserializeObject(hmC);
                    JArray array = (JArray)obj;

                    foreach (dynamic i in array)
                    {
                        string name = i.name; Boolean c = i.c, s = i.s, b = i.b, bn = i.bn;

                        var idHM = DbContext.HazardMaterial.Where(x => x.HazardMaterialClasification == name).FirstOrDefault().Id;
                        var options = DbContext.HazardMaterialCompany.Where(x => x.IdCompany == idCompany && x.IdHazardMaterial == idHM).Select(x => x.Id).FirstOrDefault();

                        HazardMaterialCompany hmCompany = new HazardMaterialCompany();
                        hmCompany.IdHazardMaterial = idHM;
                        hmCompany.IdCompany = (long)idCompany;
                        hmCompany.Carrier = c;
                        hmCompany.Shipper = s;
                        hmCompany.BulkHm = b;
                        hmCompany.NonBulk = bn;

                        if (options == 0) { DbContext.Add(hmCompany); }
                        else
                        {
                            hmCompany.Id = options;
                            var update = DbContext.Attach(hmCompany);
                            update.Property(x => x.Carrier).IsModified = true;
                            update.Property(x => x.Shipper).IsModified = true;
                            update.Property(x => x.BulkHm).IsModified = true;
                            update.Property(x => x.NonBulk).IsModified = true;
                        }
                        DbContext.SaveChanges();
                    }
                }

                using (var DbContext = new BAV02Context())
                {
                    var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == id).FirstOrDefault().IdCompany;
                    var options = DbContext.HazardMaterialOptions.Where(x => x.IdCompany == idCompany).Select(x => x.Id).FirstOrDefault();
                    hmOptions.IdCompany = (long)idCompany;
                    if (options == 0) { DbContext.Add(hmOptions); }
                    else
                    {
                        hmOptions.Id = options;
                        var update = DbContext.Attach(hmOptions);
                        update.Property(x => x.Hrcq).IsModified = true;
                        update.Property(x => x.QuantityofDivision).IsModified = true;
                        update.Property(x => x.Tih).IsModified = true;
                        update.Property(x => x.Shipment).IsModified = true;
                        update.Property(x => x.Hmsafety).IsModified = true;
                        update.Property(x => x.Cfr).IsModified = true;
                        update.Property(x => x.Cfr485).IsModified = true;
                        update.Property(x => x.Anystates).IsModified = true;
                    }
                    DbContext.SaveChanges();
                }

                using (var DbContext = new BAV02Context())
                {
                    var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == id).FirstOrDefault().IdCompany;
                    var options = DbContext.HazardMaterialStates.Where(x => x.IdCompany == idCompany).Select(x => x.Id).FirstOrDefault();
                    hmStates.IdCompany = (long)idCompany;
                    if (options == 0) { DbContext.Add(hmStates); }
                    else
                    {
                        hmStates.Id = options;
                        var update = DbContext.Attach(hmStates);
                        update.Property(x => x.Ak).IsModified = true;
                        update.Property(x => x.Al).IsModified = true;
                        update.Property(x => x.Ar).IsModified = true;
                        update.Property(x => x.Az).IsModified = true;
                        update.Property(x => x.Ca).IsModified = true;
                        update.Property(x => x.Co).IsModified = true;
                        update.Property(x => x.Ct).IsModified = true;
                        update.Property(x => x.Dc).IsModified = true;
                        update.Property(x => x.De).IsModified = true;
                        update.Property(x => x.Fl).IsModified = true;
                        update.Property(x => x.Ga).IsModified = true;
                        update.Property(x => x.Hi).IsModified = true;
                        update.Property(x => x.Ia).IsModified = true;
                        update.Property(x => x.Idaho).IsModified = true;
                        update.Property(x => x.Il).IsModified = true;
                        update.Property(x => x.Indiana).IsModified = true;
                        update.Property(x => x.Ks).IsModified = true;
                        update.Property(x => x.Ky).IsModified = true;
                        update.Property(x => x.La).IsModified = true;
                        update.Property(x => x.Ma).IsModified = true;
                        update.Property(x => x.Md).IsModified = true;
                        update.Property(x => x.Me).IsModified = true;
                        update.Property(x => x.Mi).IsModified = true;
                        update.Property(x => x.Mn).IsModified = true;
                        update.Property(x => x.Mo).IsModified = true;
                        update.Property(x => x.Ms).IsModified = true;
                        update.Property(x => x.Mt).IsModified = true;
                        update.Property(x => x.Nc).IsModified = true;
                        update.Property(x => x.Nd).IsModified = true;
                        update.Property(x => x.Ne).IsModified = true;
                        update.Property(x => x.Nh).IsModified = true;
                        update.Property(x => x.Nj).IsModified = true;
                        update.Property(x => x.Nm).IsModified = true;
                        update.Property(x => x.Nv).IsModified = true;
                        update.Property(x => x.Ny).IsModified = true;
                        update.Property(x => x.Oh).IsModified = true;
                        update.Property(x => x.Ok).IsModified = true;
                        update.Property(x => x.Oregon).IsModified = true;
                        update.Property(x => x.Pa).IsModified = true;
                        update.Property(x => x.Pr).IsModified = true;
                        update.Property(x => x.Ri).IsModified = true;
                        update.Property(x => x.Sc).IsModified = true;
                        update.Property(x => x.Sd).IsModified = true;
                        update.Property(x => x.Tn).IsModified = true;
                        update.Property(x => x.Tx).IsModified = true;
                        update.Property(x => x.Ut).IsModified = true;
                        update.Property(x => x.Va).IsModified = true;
                        update.Property(x => x.Vt).IsModified = true;
                        update.Property(x => x.Wa).IsModified = true;
                        update.Property(x => x.Wi).IsModified = true;
                        update.Property(x => x.Wv).IsModified = true;
                        update.Property(x => x.Wy).IsModified = true;
                    }
                    DbContext.SaveChanges();
                }

                return 0;

            }
            catch (Exception) { return 1; }
        }


        /// <summary>
        /// get hazard material of mcs 150 form
        /// </summary>
        /// <returns></returns>
        public DataHazardMaterial GetHazardMaterials(long id)
        {
            DataHazardMaterial hm = new DataHazardMaterial();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == id).FirstOrDefault().IdCompany;
                    hm.HazardMaterials = DbContext.HazardMaterial.ToList();
                    hm.HazardMaterialStates = DbContext.HazardMaterialStates.Where(x => x.IdCompany == idCompany).FirstOrDefault();
                    hm.HazardMaterialCompanies = (from c in DbContext.HazardMaterialCompany
                                                  join h in DbContext.HazardMaterial
                                                  on c.IdHazardMaterial equals h.Id
                                                  where c.IdCompany == idCompany
                                                  select new
                                                  {
                                                      h.HazardMaterialClasification,
                                                      c.Carrier,
                                                      c.Shipper,
                                                      c.BulkHm,
                                                      c.NonBulk
                                                  }).ToList();
                    hm.HazardMaterialOptions = DbContext.HazardMaterialOptions.Where(x => x.IdCompany == idCompany).FirstOrDefault();

                    return hm;
                }
            }
            catch (Exception) { return hm; }
        }

        /// <summary>
        /// Get  mcs 150 form data 
        /// </summary>
        /// <param name="idU"></param>
        /// <returns></returns>
        public Object getMCS150FormData(long idu)
        {
            Object CompanyData = new Object();
            CityDAL cityDAL = new CityDAL();
            StatesDAL statesDAL = new StatesDAL();
            List<City> lstCities = new List<City>();
            List<State> lstStates = new List<State>();
            lstCities = cityDAL.GetCities().ToList();
            lstStates = statesDAL.GetStates().ToList();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;

                    var winter = (from r in DbContext.CompanyUsersRoles
                                  join u in DbContext.Users on r.IdUser equals u.Id
                                  join d in DbContext.Driver on u.Id equals d.IdUser
                                  where r.IdCompany == idCompany && d.QuestionInterstate == true && d.QuestionWithin == true
                                  select new
                                  {
                                      d.Id
                                  }).Count();
                    var wintra = (from r in DbContext.CompanyUsersRoles
                                  join u in DbContext.Users on r.IdUser equals u.Id
                                  join d in DbContext.Driver on u.Id equals d.IdUser
                                  where r.IdCompany == idCompany && d.QuestionIntrastate == true && d.QuestionWithin == true
                                  select new
                                  {
                                      d.Id
                                  }).Count();
                    var binter = (from r in DbContext.CompanyUsersRoles
                                  join u in DbContext.Users on r.IdUser equals u.Id
                                  join d in DbContext.Driver on u.Id equals d.IdUser
                                  where r.IdCompany == idCompany && d.QuestionInterstate == true && d.QuestionBeyond == true
                                  select new
                                  {
                                      d.Id
                                  }).Count();
                    var bintra = (from r in DbContext.CompanyUsersRoles
                                  join u in DbContext.Users on r.IdUser equals u.Id
                                  join d in DbContext.Driver on u.Id equals d.IdUser
                                  where r.IdCompany == idCompany && d.QuestionIntrastate == true && d.QuestionBeyond == true
                                  select new
                                  {
                                      d.Id
                                  }).Count();

                    CompanyData = (from c in DbContext.Company
                                   join r in DbContext.CompanyUsersRoles on c.Id equals r.IdCompany
                                   join u in DbContext.Users on r.IdUser equals u.Id

                                   where c.Id == idCompany
                                   select new
                                   {
                                       UserName = u.LastName + " " + u.Name,
                                       Signature = $"https://bluagent-files.s3-us-west-2.amazonaws.com/{idCompany}/signature.png",
                                       c.AddDate,
                                       c.MailAddress,
                                       c.PhysicalAddress,
                                       c.CarrierOperation,
                                       c.Pinnumber,
                                       c.CreatedDate,
                                       c.DbaName,
                                       c.Der,
                                       c.Dot,
                                       c.DriverTotal,
                                       c.DrugsPolicy,
                                       c.Email,
                                       c.Hazmat,
                                       c.Image,
                                       c.LegalName,
                                       McMx = c.Region + " - " + c.McMx,
                                       c.Mcs150Date,
                                       c.Mcs150Mileage,
                                       c.Mcs150Myear,
                                       c.MovilPhone,
                                       c.PcFlag,
                                       c.PhoneNumber,
                                       c.Powerunit,
                                       c.Regimen,
                                       c.StateNumber,
                                       c.Tax,
                                       c.Tcompany,
                                       c.Title,
                                       c.UserSat,
                                       c.PhysicalZip,
                                       c.MailZip,
                                       MainState = lstStates.Where(x => x.Id == c.PhysicalState).FirstOrDefault().Name,
                                       MainCity = lstCities.Where(x => x.Id == c.PhysicalCity).FirstOrDefault().Name,
                                       MailingState = lstStates.Where(x => x.Id == c.MailState).FirstOrDefault().Name,
                                       MailingCity = lstCities.Where(x => x.Id == c.MailCity).FirstOrDefault().Name,
                                       CurrentDate = DateTime.Today,
                                       WithinInterstate = winter,
                                       WithinIntrastate = wintra,
                                       BeyonfInterstate = binter,
                                       BeyonfIntrastate = bintra,
                                       TotalWithin = (winter + wintra),
                                       TotalBeyon = (binter + bintra)
                                   }).FirstOrDefault();
                    return CompanyData;
                }
            }
            catch (Exception) { return CompanyData; }
        }

        /// <summary>
        /// If no changes were made when clicked "Print MCS 150" update those date in the PDF automatically with today's date and update in the MCS-150 section.
        /// </summary>
        /// <param name="idcompany">company id</param>
        /// <returns></returns>
        public int updateDateMCS150(long idcompany)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var company = DbContext.Company.Where(x => x.Id == idcompany).FirstOrDefault();

                    if (company.Mcs150Date < DateTime.Today) { company.Mcs150Date = DateTime.Today; }
                    if (company.UpdateDate < DateTime.Today) { company.UpdateDate = DateTime.Today; }
                    var updateDates = DbContext.Attach(company);
                    updateDates.Property(x => x.Mcs150Date).IsModified = true;
                    updateDates.Property(x => x.UpdateDate).IsModified = true;
                    DbContext.SaveChanges();

                }
                return 0;
            }
            catch (Exception) { return 1; }
        }

        /// <summary>
        /// get all alerts of company
        /// </summary>
        /// <param name="idt"></param>
        /// <returns></returns>
        public List<CompanyAlerts> getAllAlerts(long id)
        {
            List<CompanyAlerts> list = new List<CompanyAlerts>();

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == id).FirstOrDefault().IdCompany;
                    var items = DbContext.CompanyAlerts.Where(x => x.IdCompany == idCompany).OrderByDescending(x => x.Id);
                    list = items.ToList();
                }

            }
            catch (Exception) { }
            return list;
        }
        public int alertsCounter(long id)
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == id).FirstOrDefault().IdCompany;
                    r = (int)DbContext.CompanyAlerts.Where(x => x.IdCompany == idCompany).Select(x => new { x.IdCompany }).Count();
                    return r;
                }
            }
            catch (Exception) { return r = 0; }
        }

        public List<Documents> AllHazmatDocuments(long IdCompany, string DocumentType, int DriverId, int page, int size)
        {
            List<Documents> list = new List<Documents>();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var idCompany = DbContext.Documents.Where(x => x.IdCompany == IdCompany).FirstOrDefault().IdCompany;
                    if (idCompany > 0)
                    {
                        return list;
                    }
                    else
                    {
                        return null;
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error: {ex}");
            }
        }

        /// <summary>
        /// get percentage of company information completed
        /// </summary>
        /// <param name="c"></param>
        /// <returns></returns>
        public List<int> getCompanyComplet(Company c)
        {
            var list = new List<int>();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var operationClass = DbContext.OperationClassification.Where(x => x.IdCompany == c.Id).FirstOrDefault();
                    var classifications = DbContext.OperationClassification.Where(x => x.IdCompany == c.Id).FirstOrDefault();
                    var hazardMaterial = DbContext.HazardMaterialOptions.Where(x => x.IdCompany == c.Id).FirstOrDefault();

                    if (c.LegalName != null && c.DbaName != null && c.Dot != null && c.Tax != null && c.CarrierOperation != null && operationClass != null)
                    {
                        if (c.Region == "Not Applicable" || (c.Region != "Not Applicable" && c.McMx != null)) { list.Add(1); }
                    }
                    else { list.Add(0); }

                    if (c.PhysicalAddress != null && c.PhysicalCity != null && c.PhysicalState != null && c.PhysicalZip != null && c.PhysicalCountry != null && c.Title != null && c.Der != null && c.PhoneNumber != null &&
                        c.Email != null && c.MovilPhone != null) 
                    { list.Add(1); }
                    else { list.Add(0); }

                    if (classifications != null) 
                    { if (c.Hazmat == false || (c.Hazmat == true && hazardMaterial != null)) 
                        { list.Add(1); }
                        else { list.Add(0); }
                    } 
                    else { list.Add(0); }


                    if (c.DriverTotal != null && c.Powerunit != null) 
                    { list.Add(1); } 
                    else { list.Add(0); }
                    
                    if (c.Mcs150Date != null && c.Mcs150Mileage != null && c.AddDate != null && c.PcFlag != null && c.Pinnumber != null) 
                    { list.Add(1); } 
                    else { list.Add(0); }
                }
            }
            catch (Exception) { }

            return list;
        }

        public int getCompanyRating(long id)
        {

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == id).FirstOrDefault().IdCompany;
                    var DOT = DbContext.Company.Where(x => x.Id == idCompany).FirstOrDefault().Dot;

                    var OosTotal = DbContext.Inspection.Where(x => x.UniqueId == DOT && x.OosTotal > 0).Count();
                    var totalInspection = DbContext.Inspection.Where(x => x.UniqueId == DOT).Count();

                    var percentage = (OosTotal / totalInspection) * 100;

                    return percentage;
                }
            }
            catch (Exception) { return 0; }
        }

        public CompanyDocs getDocument(long id)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    CompanyDocs Document = DbContext.CompanyDocs.Where(x => x.Id == id).FirstOrDefault();
                    return Document;
                }
            }
            catch (Exception) { return null; }
        }


        /// <summary>
        /// get and add accident register of BD, table crash
        /// </summary>
        /// <param name="ar"></param>
        /// <returns></returns>
        public int getAddAccidentsBD(long idu)
        {
            int r = 0;
            StatesDAL statesDAL = new StatesDAL();
            List<State> lstStates = new List<State>();
            lstStates = statesDAL.GetStates().ToList();

            try
            {
                string dot = "";
                List<DOT.CRASHES> crashes = new List<DOT.CRASHES>();
                long idCompany = 0;
                using (var DbContext = new BAV02Context())
                {

                    idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                    dot = DbContext.Company.Where(x => x.Id == idCompany).FirstOrDefault().Dot;
                }

                using (var dotContext = new DotDBContext(Configuration))
                {
                    MySql.Data.MySqlClient.MySqlParameter param =
                        new MySql.Data.MySqlClient.MySqlParameter("@DOT_NUMBER", dot);
                    crashes = dotContext.Crashes
                        .FromSql(
                            $"SELECT * FROM " + Configuration.GetSection("AuroraAWS")["TableCrash"] +
                            " WHERE DOT_NUMBER = @DOT_NUMBER", param)
                        .ToList();
                }

                using (var DbContext = new BAV02Context())
                {
                    if (crashes.Count > 0)
                    {
                        foreach (DOT.CRASHES i in crashes)
                        {
                            string number = i.REPORT_NUMBER;
                            var exists = DbContext.AccidentRegister
                                .Where(x => x.ReportNumber == number && x.IdCompany == idCompany).FirstOrDefault();

                            if (exists == null)
                            {
                                Boolean hazmat;
                                if (i.HAZMAT_RELEASED == "Y")
                                {
                                    hazmat = true;
                                }
                                else
                                {
                                    hazmat = false;
                                }

                                string ids = i.REPORT_STATE;
                                long idState = lstStates.Where(x => x.Name == ids).FirstOrDefault().Id;

                                var newAccident = new AccidentRegister
                                {
                                    IdCompany = (long)idCompany,
                                    IdState = idState,
                                    ReportNumber = i.REPORT_NUMBER,
                                    AccidentDate = i.REPORT_DATE,
                                    Fatalities = i.FATALITIES,
                                    Injuries = i.INJURIES,
                                    Hm = hazmat
                                };

                                DbContext.Add(newAccident);
                                DbContext.SaveChanges();
                            }
                        }
                    }
                    else
                    {
                        r = 1;
                    }
                }
            }
            catch (Exception ex)
            {
                r = 1;
                throw new Exception($"Error: {ex} {r}");
            }
            return r;
        }

        /// <summary>
        /// add new accident register
        /// </summary>
        /// <param name="ar"></param>
        /// <returns></returns>
        public int AddAccident(AccidentRegister ar, long id)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {

                    var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == id).FirstOrDefault().IdCompany;
                    var exists = DbContext.AccidentRegister.Where(x => x.ReportNumber == ar.ReportNumber && x.IdCompany == idCompany && x.Id != ar.Id).FirstOrDefault();
                    ar.IdCompany = (long)idCompany;
                    if (exists == null)
                    {
                        if (ar.Id == 0) { DbContext.Add(ar); }
                        else
                        {
                            var update = DbContext.Attach(ar);
                            update.Property(x => x.ReportNumber).IsModified = true;
                            update.Property(x => x.AccidentDate).IsModified = true;
                            update.Property(x => x.AccidentHour).IsModified = true;
                            update.Property(x => x.Address).IsModified = true;
                            update.Property(x => x.IdState).IsModified = true;
                            update.Property(x => x.IdCity).IsModified = true;
                            update.Property(x => x.IdDriver).IsModified = true;
                            update.Property(x => x.Injuries).IsModified = true;
                            update.Property(x => x.Fatalities).IsModified = true;
                            update.Property(x => x.Hm).IsModified = true;
                        }

                        DbContext.SaveChanges();
                        return 0;
                    }
                    else { return 1; }
                }
            }
            catch (Exception) { return 1; }

        }

        public Table getAccidentRegistry(long id, int page, int size)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 1, NumberP = 1 };
            CityDAL cityDAL = new CityDAL();
            List<City> lstCities = new List<City>();
            lstCities = cityDAL.GetCities().ToList();

            try
            {

                using (var DbContext = new BAV02Context())
                {
                    var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == id).FirstOrDefault().IdCompany;

                    StatesDAL statesDAL = new StatesDAL();
                    List<State> lstStates = new List<State>();
                    lstStates = statesDAL.GetStates().ToList();

                    var list = (from ar in DbContext.AccidentRegister
                                join s in lstStates on ar.IdState equals s.Id
                                where ar.IdCompany == idCompany
                                select new
                                {
                                    ar.Id,
                                    ar.AccidentDate,
                                    ar.AccidentHour,
                                    City = lstCities.Where(x => x.Id == ar.IdCity).FirstOrDefault().Name + ", ",
                                    State1 = s.Name,
                                    s.Name,
                                    ar.Address,
                                    ar.Injuries,
                                    ar.Fatalities,
                                    ar.Hm,
                                    DriverName = DbContext.Users.Where(x => x.Id == DbContext.Driver.Where(xx => xx.Id == ar.IdDriver).FirstOrDefault().IdUser).FirstOrDefault().Name,
                                    DriverLastN = DbContext.Users.Where(x => x.Id == DbContext.Driver.Where(xx => xx.Id == ar.IdDriver).FirstOrDefault().IdUser).FirstOrDefault().LastName,
                                    ar.ReportNumber,
                                    ar.IdState

                                }).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList<Object>();

                    var count = Math.Ceiling((DbContext.AccidentRegister.Where(x => x.IdCompany == idCompany).Select(x => new { x.IdCompany }).Count() / (double)size));
                    t.Items = list;
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }

            }
            catch (Exception) { }
            return t;
        }

        /// <summary>
        /// Get Accindet data by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public AccidentRegister getAccidentData(long id)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    return DbContext.AccidentRegister.Where(x => x.Id == id).FirstOrDefault();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// download accident reports by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<string> accidentReportZip(long id)
        {
            CityDAL cityDAL = new CityDAL();
            StatesDAL statesDAL = new StatesDAL();
            List<City> lstCities = new List<City>();
            List<State> lstStates = new List<State>();
            lstCities = cityDAL.GetCities().ToList();
            lstStates = statesDAL.GetStates().ToList();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var hm = "";
                    var data = (from ar in DbContext.AccidentRegister
                                join s in lstStates on ar.IdState equals s.Id
                                where ar.Id == id
                                select new
                                {
                                    AccidentDate = ar.AccidentDate.ToString("MM/dd/yyyy"),
                                    ar.AccidentHour,
                                    City = lstCities.Where(x => x.Id == ar.IdCity).FirstOrDefault().Name,
                                    State = s.Name,
                                    ar.Address,
                                    ar.Injuries,
                                    ar.Fatalities,
                                    ar.Hm,
                                    DriverName = DbContext.Users.Where(x => x.Id == DbContext.Driver.Where(xx => xx.Id == ar.IdDriver).FirstOrDefault().IdUser).FirstOrDefault().Name,
                                    DriverLastN = DbContext.Users.Where(x => x.Id == DbContext.Driver.Where(xx => xx.Id == ar.IdDriver).FirstOrDefault().IdUser).FirstOrDefault().LastName,
                                    ar.ReportNumber,

                                }).FirstOrDefault();

                    if (data.Hm == false) { hm = "No"; } else { hm = "Yes"; }

                    string[] lines = { "Accident Number: " + data.ReportNumber,
                        "Accident Date: "+ data.AccidentDate,
                        "Accident Hour: " + data.AccidentHour,
                        "Street Address: " + data.Address,
                        "State: " + data.State,
                        "City: " + data.City,
                        "No. Deaths: " + data.Fatalities,
                        "No. Injuries: " + data.Injuries,
                        "HM: "  + hm,
                        "Driver: " + data.DriverName + " " + data.DriverLastN};
                    File.WriteAllLines(@"AccidentDetails.txt", lines);
                }

                using (var DbContext = new BAV02Context())
                {


                    var list = (from cd in DbContext.CompanyDocs
                                join a in DbContext.AccidentRegister on cd.IdAccidentRegister equals a.Id
                                where a.Id == id
                                select new
                                {
                                    cd.DocName
                                }).Select(x => x.DocName).ToList();

                    return list;

                }

            }
            catch (Exception) { return null; }
        }


        /// <summary>
        /// get accident register of date range
        /// </summary>
        /// <param name="c"></param>
        /// <returns></returns>
        public List<object> getAccidentsRegistryPDF(long id, DateTime fromD, DateTime toD)
        {
            CityDAL cityDAL = new CityDAL();
            StatesDAL statesDAL = new StatesDAL();
            List<City> lstCities = new List<City>();
            List<State> lstStates = new List<State>();
            lstCities = cityDAL.GetCities().ToList();
            lstStates = statesDAL.GetStates().ToList();

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == id).FirstOrDefault().IdCompany;

                    var list = (from ar in DbContext.AccidentRegister
                                join s in lstStates on ar.IdState equals s.Id
                                where ar.IdCompany == idCompany && (ar.AccidentDate >= fromD && ar.AccidentDate <= toD)
                                select new
                                {
                                    ar.Id,
                                    ar.AccidentDate,
                                    ar.AccidentHour,
                                    Street = ar.Address + ", ",
                                    City = lstCities.Where(x => x.Id == ar.IdCity).FirstOrDefault().Name + ", ",
                                    State1 = s.Name,
                                    s.Name,
                                    ar.Injuries,
                                    ar.Fatalities,
                                    ar.Hm,
                                    DriverName = DbContext.Users.Where(x => x.Id == DbContext.Driver.Where(xx => xx.Id == ar.IdDriver).FirstOrDefault().IdUser).FirstOrDefault().Name,
                                    DriverLastN = DbContext.Users.Where(x => x.Id == DbContext.Driver.Where(xx => xx.Id == ar.IdDriver).FirstOrDefault().IdUser).FirstOrDefault().LastName,
                                    ar.ReportNumber

                                }).OrderByDescending(x => x.Id).ToList<Object>();
                    return list;
                }
            }
            catch (Exception) { return null; }

        }

        public CompanyInsurance GetCompanyInsuranceInformation(long IdCompany)
        {
            var insuranceInfo = new CompanyInsurance();

            using (var dbContext = new BAV02Context())
            {
                insuranceInfo = dbContext.CompanyInsurance.Where(ci => ci.IdCompany == IdCompany).FirstOrDefault();
            }
            return insuranceInfo;
        }

        public int SaveCompanyInsuranceInformation(CompanyInsurance insuranceInfo, Boolean checkDomesticEnterpriseA)
        {
            insuranceInfo.checkDomesticEnterprise = checkDomesticEnterpriseA;
            int result = 0;

            using (var dbContext = new BAV02Context())
            {
                if (insuranceInfo.CompanyInsuranceID == 0)
                {
                    dbContext.CompanyInsurance.Add(insuranceInfo);
                }
                else
                {
                    var insurance = dbContext.CompanyInsurance.Attach(insuranceInfo);
                    insurance.Property(x => x.checkDomesticEnterprise).IsModified = true;
                    insurance.Property(x => x.Provider).IsModified = true;
                    insurance.Property(x => x.OtherProvider).IsModified = true;
                    insurance.Property(x => x.PolicyDate).IsModified = true;
                    insurance.Property(x => x.OperationRadius).IsModified = true;
                    insurance.Property(x => x.PortEntry).IsModified = true;
                    insurance.Property(x => x.PolicyTerm).IsModified = true;
                }

                result = dbContext.SaveChanges();
            }

            return result;
        }

        public int OnBoarding(Trailer trailers, Trailer trucks)
        {
            var context = new BAV02Context();
            var transaction = context.Database.BeginTransaction();

            try
            {
                context.Trailer.Add(trailers);
            }
            catch (Exception)
            {
                return 0;
            }
            return 1;
        }

        //DAL PARA MIS REPORT PRUEBA 1
        //Eliminar IdDriver
        //IdNumber = IdDriver
        public Table getAllMISReport(long idCompany, int page, int size)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 1, NumberP = 1 };
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    //var n = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idd).FirstOrDefault().IdCompany;
                    var list = (from d in DbContext.CompanyDocs
                                where d.IdCompany == idCompany/* && d.DocType == "MISReport"*/
                                select new
                                {
                                    d.Id,
                                    d.DescriptionDoc,
                                    d.DocName,
                                    d.DocType
                                }).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList<Object>();

                    var count = Math.Ceiling((DbContext.CompanyDocs.Where(x => x.IdCompany == idCompany).Select(x => new { x.IdCompany }).Count() / (double)size));
                    t.Items = list;
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }

            }
            catch (Exception) { }
            return t;
        }
        public CompanyNotifications getCompanyNotifications(long IdCompany)
        {
            try
            {
                //var CompanyNotificacion = new CompanyNotifications();
                using (var DbContext = new BAV02Context())
                {
                   var CompanyNotificacion = DbContext.CompanyNotifications.Where(ox => ox.IdCompany == IdCompany).FirstOrDefault();
                   return CompanyNotificacion;
                }
            }catch (Exception) { return null; }
        }

        public int updateCompanyNotifications(long IdCompany, string pestana, bool notification)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    //var CompNot = DbContext.CompanyNotifications.Where(ux => ux.IdCompany == IdCompany).FirstOrDefault();
                    switch (pestana)
                    {
                        case "PinNumber":
                            PinNumber(IdCompany, notification);
                            break;

                        case "CSA":
                            CSA(IdCompany, notification);
                            break;

                        case "MCS":
                            MCS(IdCompany, notification);
                            break;

                        case "PSP":
                            PSP(IdCompany, notification);
                            break;

                        case "Certificate":
                            Certificate(IdCompany, notification);
                            break;

                        case "Letters":
                            Letters(IdCompany, notification);
                            break;

                        case "SafetyReviews":
                            SafetyReviews(IdCompany, notification);
                            break;

                        case "StatePermits":
                            StatePermits(IdCompany, notification);
                            break;

                        case "CertificateEnrollment":
                            CertificateEnrollment(IdCompany, notification);
                            break;

                        case "CompanyPolicy":
                            CompanyPolicy(IdCompany, notification);
                            break;

                        case "SupervisorTraining":
                            SupervisorTraining(IdCompany, notification);
                            break;

                        case "ClearingHouse":
                            ClearingHouse(IdCompany, notification);
                            break;

                        case "AccidentRegistrer":
                            AccidentRegistrer(IdCompany, notification);
                            break;

                        case "Insurance":
                            Insurance(IdCompany, notification);
                            break;

                        case "FleetSafety":
                            FleetSafety(IdCompany, notification);
                            break;

                        case "DriverSafety":
                            DriverSafety(IdCompany, notification);
                            break;

                        case "SafetyCompliance":
                            SafetyCompliance(IdCompany, notification);
                            break;

                        case "MIS":
                            MIS(IdCompany, notification);
                            break;

                        case "LaboratorySummary":
                            LaboratorySummary(IdCompany, notification);
                            break;

                        case "DrugTestingPolicy":
                            DrugTestingPolicy(IdCompany, notification);
                            break;
                    }
                }
                return 1;
            }
            catch (Exception)
            {
                return 0;
            }
        }

        void PinNumber(long IdCompany, bool notification)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var CompNot = DbContext.CompanyNotifications.Where(ux => ux.IdCompany == IdCompany).FirstOrDefault();
                    var entrada = DbContext.Attach(CompNot);
                    entrada.Property(x => x.PinNumber).CurrentValue = notification;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) {  }
        }
        void CSA(long IdCompany, bool notification)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var CompNot = DbContext.CompanyNotifications.Where(ux => ux.IdCompany == IdCompany).FirstOrDefault();
                    var entrada = DbContext.Attach(CompNot);
                    entrada.Property(x => x.CSA).CurrentValue = notification;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { }
        }
        void MCS(long IdCompany, bool notification)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var CompNot = DbContext.CompanyNotifications.Where(ux => ux.IdCompany == IdCompany).FirstOrDefault();
                    var entrada = DbContext.Attach(CompNot);
                    entrada.Property(x => x.MCS).CurrentValue = notification;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { }
        }
        void PSP(long IdCompany, bool notification)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var CompNot = DbContext.CompanyNotifications.Where(ux => ux.IdCompany == IdCompany).FirstOrDefault();
                    var entrada = DbContext.Attach(CompNot);
                    entrada.Property(x => x.PSP).CurrentValue = notification;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { }
        }
        void Certificate(long IdCompany, bool notification)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var CompNot = DbContext.CompanyNotifications.Where(ux => ux.IdCompany == IdCompany).FirstOrDefault();
                    var entrada = DbContext.Attach(CompNot);
                    entrada.Property(x => x.Certificate).CurrentValue = notification;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { }
        }
        void Letters(long IdCompany, bool notification)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var CompNot = DbContext.CompanyNotifications.Where(ux => ux.IdCompany == IdCompany).FirstOrDefault();
                    var entrada = DbContext.Attach(CompNot);
                    entrada.Property(x => x.Letters).CurrentValue = notification;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { }
        }
        void SafetyReviews(long IdCompany, bool notification)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var CompNot = DbContext.CompanyNotifications.Where(ux => ux.IdCompany == IdCompany).FirstOrDefault();
                    var entrada = DbContext.Attach(CompNot);
                    entrada.Property(x => x.SafetyReviews).CurrentValue = notification;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { }
        }
        void StatePermits(long IdCompany, bool notification)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var CompNot = DbContext.CompanyNotifications.Where(ux => ux.IdCompany == IdCompany).FirstOrDefault();
                    var entrada = DbContext.Attach(CompNot);
                    entrada.Property(x => x.StatePermits).CurrentValue = notification;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { }
        }
        void CertificateEnrollment (long IdCompany, bool notification)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var CompNot = DbContext.CompanyNotifications.Where(ux => ux.IdCompany == IdCompany).FirstOrDefault();
                    var entrada = DbContext.Attach(CompNot);
                    entrada.Property(x => x.CertificateEnrollment).CurrentValue = notification;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { }
        }
        void CompanyPolicy(long IdCompany, bool notification)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var CompNot = DbContext.CompanyNotifications.Where(ux => ux.IdCompany == IdCompany).FirstOrDefault();
                    var entrada = DbContext.Attach(CompNot);
                    entrada.Property(x => x.CompanyPolicy).CurrentValue = notification;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { }
        }
        void SupervisorTraining(long IdCompany, bool notification)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var CompNot = DbContext.CompanyNotifications.Where(ux => ux.IdCompany == IdCompany).FirstOrDefault();
                    var entrada = DbContext.Attach(CompNot);
                    entrada.Property(x => x.SupervisorTraining).CurrentValue = notification;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { }
        }
        void ClearingHouse(long IdCompany, bool notification)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var CompNot = DbContext.CompanyNotifications.Where(ux => ux.IdCompany == IdCompany).FirstOrDefault();
                    var entrada = DbContext.Attach(CompNot);
                    entrada.Property(x => x.ClearingHouse).CurrentValue = notification;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { }
        }
        void AccidentRegistrer(long IdCompany, bool notification)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var CompNot = DbContext.CompanyNotifications.Where(ux => ux.IdCompany == IdCompany).FirstOrDefault();
                    var entrada = DbContext.Attach(CompNot);
                    entrada.Property(x => x.AccidentRegistrer).CurrentValue = notification;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { }
        }
        void Insurance(long IdCompany, bool notification)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var CompNot = DbContext.CompanyNotifications.Where(ux => ux.IdCompany == IdCompany).FirstOrDefault();
                    var entrada = DbContext.Attach(CompNot);
                    entrada.Property(x => x.Insurance).CurrentValue = notification;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { }
        }
        void FleetSafety(long IdCompany, bool notification)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var CompNot = DbContext.CompanyNotifications.Where(ux => ux.IdCompany == IdCompany).FirstOrDefault();
                    var entrada = DbContext.Attach(CompNot);
                    entrada.Property(x => x.FleetSafety).CurrentValue = notification;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { }
        }
        void DriverSafety(long IdCompany, bool notification)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var CompNot = DbContext.CompanyNotifications.Where(ux => ux.IdCompany == IdCompany).FirstOrDefault();
                    var entrada = DbContext.Attach(CompNot);
                    entrada.Property(x => x.DriverSafety).CurrentValue = notification;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { }
        }
        void SafetyCompliance(long IdCompany, bool notification)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var CompNot = DbContext.CompanyNotifications.Where(ux => ux.IdCompany == IdCompany).FirstOrDefault();
                    var entrada = DbContext.Attach(CompNot);
                    entrada.Property(x => x.SafetyCompliance).CurrentValue = notification;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { }
        }
        void MIS(long IdCompany, bool notification)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var CompNot = DbContext.CompanyNotifications.Where(ux => ux.IdCompany == IdCompany).FirstOrDefault();
                    var entrada = DbContext.Attach(CompNot);
                    entrada.Property(x => x.MIS).CurrentValue = notification;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { }
        }
        void LaboratorySummary(long IdCompany, bool notification)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var CompNot = DbContext.CompanyNotifications.Where(ux => ux.IdCompany == IdCompany).FirstOrDefault();
                    var entrada = DbContext.Attach(CompNot);
                    entrada.Property(x => x.LaboratorySummary).CurrentValue = notification;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { }
        }
        void DrugTestingPolicy(long IdCompany, bool notification)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var CompNot = DbContext.CompanyNotifications.Where(ux => ux.IdCompany == IdCompany).FirstOrDefault();
                    var entrada = DbContext.Attach(CompNot);
                    entrada.Property(x => x.DrugTestingPolicy).CurrentValue = notification;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { }
        }

        public List<DriverAlerts> getGDriversAlerts(long idCompany)
        {
            List<DriverAlerts> list = new List<DriverAlerts>();

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var items = DbContext.DriverAlerts.Where(x => x.IdCompany == idCompany).OrderByDescending(x => x.Id);
                    list = items.ToList();
                }
            }
            catch (Exception) { }
            return list;
        }

        public List<CompanyAlerts> getGCompanyAlerts(long idCompany)
        {
            List<CompanyAlerts> list = new List<CompanyAlerts>();

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var items = DbContext.CompanyAlerts.Where(x => x.IdCompany == idCompany).OrderByDescending(x => x.Id);
                    list = items.ToList();
                }
            }
            catch (Exception) { }
            return list;
        }

        public List<MaintenanceAlerts> getGMaintenanceAlerts(long idCompany)
        {
            List<MaintenanceAlerts> list = new List<MaintenanceAlerts>();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var items = DbContext.MaintenanceAlerts.Where(x => x.IdCompany == idCompany).OrderByDescending(x => x.Id);
                    list = items.ToList();
                }
            }
            catch (Exception) {  }
            return list;
        }

        public int countGAlerts(List<DriverAlerts> driversAlerts, List<CompanyAlerts> companyAlerts, List<MaintenanceAlerts> maintenanceAlerts)
        {
            //List<object> list = new List<object>();
            var items = 0; 
            try
            {
                items = driversAlerts.Count + companyAlerts.Count + maintenanceAlerts.Count;
                return items;
            }
            catch (Exception) { return items; }
        }
        public void RebootCompanyNotifications()
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var list = DbContext.CompanyNotifications.OrderByDescending(x => x.IdNotification).FirstOrDefault().IdNotification;
                    for (int i = 1; i <= list; i++)
                    {
                        var ComNot = DbContext.CompanyNotifications.Where(x => x.IdNotification == i).FirstOrDefault();
                        var entrada = DbContext.Attach(ComNot);
                        entrada.Property(e => e.MIS).CurrentValue = false;
                        DbContext.SaveChanges();
                    }
                }
            }
            catch (Exception) { }
        }

        public long companyCa(long idu)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    //1 si tiene ca
                    //2 no tiene ca
                    //0 error

                    var idc = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu && x.Status == "ACTIVE").Select(x => x.IdCompany).First();
                    string stateNumber = DbContext.Company.Where(x => x.Id == idc).FirstOrDefault().StateNumber;
                    return stateNumber == null ? (2) : (1);
                }
            }
            catch (Exception) { return 0; }
        }
        public void  updateFMCSA(string pass, string user, long idcompany)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var company = DbContext.Company.Where(x => x.Id == idcompany).FirstOrDefault();
                    company.FMCSApssw = pass;
                    company.FMCSAuser = user;
                    var update = DbContext.Attach(company);
                    update.Property(x => x.FMCSApssw).IsModified = true;
                    update.Property(x => x.FMCSAuser).IsModified = true;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception)
            {

                throw;
            }

        }
        public List<string> getFMCSA(long idcompany)
        {
            List<string> fmcsaData = new List<string>();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var company = DbContext.Company.Where(x => x.Id == idcompany).FirstOrDefault();
                    fmcsaData.Add(company.FMCSApssw);
                    fmcsaData.Add(company.FMCSAuser);
                }
                return fmcsaData;
            }
            catch (Exception)
            {

                throw;
            }

        }
        public String getCompanyUSer(long idu)
        {
            var dateSignature = "";
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var user = DbContext.Users.Where(x => x.Id == idu).FirstOrDefault();
                    dateSignature = ((DateTime)user.SignatureDate).ToString();
                }
                return dateSignature;
            }
            catch (Exception)
            {
                return dateSignature;
            }

        }
    }
}
