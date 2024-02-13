using BAv02.Models.Tools;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using BAv02.Models;
using Newtonsoft.Json;

namespace BAv02.Models.DataAccessLayers
{
    public class DriversDAL
    {
        private readonly BAV02Context _context;
        Alerts a = new Alerts();
        DateTime dateOld;
        string color = "";
        string message = "";
        string fullName = "";
        DateTime currentDate = DateTime.Today;
        double days;
        static Boolean valid = true;
        static long idCompany = 0;

        private IConfiguration Configuration { get; set; }
        public string AssetsDirectory { get; set; }

        public DriversDAL()
        {
            _context = new BAV02Context();
            var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json");
            Configuration = builder.Build();

            //Assets Directory
            AssetsDirectory = Configuration["AssetsDirectory"];
        }
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

        public long getCompanyIdSignature(long id)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    long idCompany = (long)DbContext.LetterInquiry.Where(x => x.Id == id).FirstOrDefault().IdCompany;
                    return idCompany;
                }
            }
            catch (Exception) { return 0; }

        }

        public long getCompanyIdSignatureHistory(long id)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    long idCompany = (long)DbContext.EmploymentHistory.Where(x => x.Id == id).FirstOrDefault().IdCompany;
                    return idCompany;
                }
            }
            catch (Exception) { return 0; }

        }

        public long getIdUser(long userId)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    long idUser = (long)DbContext.Driver.Where(x => x.Id == userId).FirstOrDefault().IdUser;
                    return idUser;
                }
            }
            catch (Exception) { return 0; }

        }

        /// <summary>
        /// Get Driver data by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public DataDriver getDriverData(long id)
        {
            ////if (id == idUserValidation) { valid = false; }
            //if (valid == false)
            //{
            DataDriver driver = new DataDriver();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var address = DbContext.DriverAddress.Where(x => x.IdDriver == id && x.CurrentAddress == true).FirstOrDefault();
                    City city = new City();
                    State state = new State();
                    Country country = new Country();

                    CityDAL cityDAL = new CityDAL();
                    StatesDAL statesDAL = new StatesDAL();
                    CountryDAL countryDAL = new CountryDAL();
                    var lstCities = cityDAL.GetCities().ToList();
                    var lstStates = statesDAL.GetStates().ToList();
                    var lstCountry = countryDAL.GetCountries().ToList();
                    var HowLong = "";
                    if (address != null)
                    {
                        HowLong = address.HowLong;
                        city = lstCities.Where(x => x.Id == address.IdCity).FirstOrDefault();
                        state = lstStates.Where(x => x.Id == city.IdState).FirstOrDefault();
                        country = lstCountry.Where(x => x.Id == state.IdCountry).FirstOrDefault();
                    }
                    else
                    {
                        address = new DriverAddress();
                        address.Street = string.Empty;
                        city.Name = string.Empty;
                        state.Name = string.Empty;
                        country.Name = string.Empty;
                    }
                    driver.driver = (from d in DbContext.Driver
                                     join u in DbContext.Users on d.IdUser equals u.Id
                                     join r in DbContext.CompanyUsersRoles on u.Id equals r.IdUser
                                     where d.IdUser == id
                                     select new
                                     {
                                         d.Id,
                                         d.IdUser,
                                         u.Name,
                                         u.LastName,
                                         u.Birthdate,
                                         u.Gender,
                                         u.PhoneNumber,
                                         u.Email,
                                         Street = !string.IsNullOrEmpty(address.Street) ? address.Street + ", " : "",
                                         City = !string.IsNullOrEmpty(city.Name) ? city.Name + ", " : "",
                                         State = !string.IsNullOrEmpty(state.Name) ? state.Name + ", " : "",
                                         Country = !string.IsNullOrEmpty(country.Name) ? country.Name : "",
                                         address.ZipCode,
                                         HowLong = !string.IsNullOrEmpty(HowLong) ? HowLong : "",
                                         Image = u.FileImage,
                                         d.CountryLicense,
                                         u.FileSignature,
                                         u.Ia,
                                         d.License,
                                         d.Ssn,
                                         d.EmployeeId,
                                         d.StateLicense,
                                         d.TypeLicense,
                                         d.LicenseExpiration,
                                         d.LicenseFile,
                                         d.LicenseSuspended,
                                         d.DeniedLicense,
                                         d.LicenseSuspendedComments,
                                         d.DeniedLicenseComments,
                                         d.Roadtest,
                                         d.RoadtestDate,
                                         r.Status,
                                         d.HiringDate,
                                         d.DriverAgreement,
                                     }).FirstOrDefault();

                    //driver.Countries = DbContext.Country.ToList();
                    var c = DbContext.Driver.Where(x => x.IdUser == id).FirstOrDefault().CountryLicense;
                    driver.States = lstStates.Where(x => x.IdCountry == c).ToList();
                    return driver;
                }
            }
            catch (Exception)
            {
                return null;
            }
            //}
            //else { return null; }
        }

        public DataDriver getDriverDataById(long id, long idCompany)
        {
            var isDriver = new Users();

            DataDriver driver = new DataDriver();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    //Check if driver belongs to logged company
                    var isCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == id && x.IdCompany == idCompany).Select(x => x.Id).Count();
                    if (isCompany == 0) { return null; }

                    //Check if ID is type DRIVER, if not, return null
                    isDriver = DbContext.Users.Where(x => x.Id == id && x.Role == "DRIVER").FirstOrDefault();
                    if (isDriver.Role != "DRIVER") { return null; }

                    var address = DbContext.DriverAddress.Where(x => x.IdDriver == id && x.CurrentAddress == true).FirstOrDefault();
                    City city = new City();
                    State state = new State();
                    Country country = new Country();

                    CityDAL cityDAL = new CityDAL();
                    StatesDAL statesDAL = new StatesDAL();
                    CountryDAL countryDAL = new CountryDAL();
                    var lstCities = cityDAL.GetCities().ToList();
                    var lstStates = statesDAL.GetStates().ToList();
                    var lstCountry = countryDAL.GetCountries().ToList();
                    var HowLong = "";
                    if (address != null)
                    {
                        HowLong = address.HowLong;
                        city = lstCities.Where(x => x.Id == address.IdCity).FirstOrDefault();
                        state = lstStates.Where(x => x.Id == city.IdState).FirstOrDefault();
                        country = lstCountry.Where(x => x.Id == state.IdCountry).FirstOrDefault();
                    }
                    else
                    {
                        address = new DriverAddress();
                        address.Street = string.Empty;
                        city.Name = string.Empty;
                        state.Name = string.Empty;
                    }
                    driver.driver = (from d in DbContext.Driver
                                     join u in DbContext.Users on d.IdUser equals u.Id
                                     join r in DbContext.CompanyUsersRoles on u.Id equals r.IdUser
                                     where d.IdUser == id
                                     select new
                                     {
                                         u.Id,
                                         u.Name,
                                         u.LastName,
                                         u.Birthdate,
                                         u.Gender,
                                         u.PhoneNumber,
                                         u.Email,
                                         Street = !string.IsNullOrEmpty(address.Street) ? address.Street + ", " : string.Empty,
                                         City = !string.IsNullOrEmpty(city.Name) ? city.Name + ", " : string.Empty,
                                         State = !string.IsNullOrEmpty(state.Name) ? state.Name + ", " : string.Empty,
                                         Country = !string.IsNullOrEmpty(country.Name) ? country.Name : string.Empty,
                                         ZipCode = address.ZipCode,
                                         HowLong,
                                         Image = u.FileImage,
                                         d.CountryLicense,
                                         u.FileSignature,
                                         u.Ia,
                                         d.License,
                                         d.Ssn,
                                         d.EmployeeId,
                                         d.StateLicense,
                                         d.TypeLicense,
                                         d.LicenseExpiration,
                                         d.LicenseFile,
                                         d.LicenseSuspended,
                                         d.DeniedLicense,
                                         d.LicenseSuspendedComments,
                                         d.DeniedLicenseComments,
                                         d.Roadtest,
                                         d.HiringDate,
                                         d.RoadtestDate,
                                         r.Status,
                                         DriverLicenseFile = imgLicense(r.IdCompany, d.IdUser.Value),
                                         DriverSignature = imgSignature(r.IdCompany, d.IdUser.Value),
                                         d.DriverAgreement,
                                     }).FirstOrDefault();

                    //driver.Countries = DbContext.Country.ToList();
                    var c = DbContext.Driver.Where(x => x.IdUser == id).FirstOrDefault().CountryLicense;
                    driver.Countries = lstCountry.ToList();
                    driver.States = lstStates.Where(x => x.IdCountry == c).ToList();
                    return driver;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// save driver data
        /// </summary>
        /// <param name="u"></param>
        /// <param name="d"></param>
        /// <returns></returns>
        public int saveDriverData(Users u, Driver d)
        {
            int r = 0; var e = new Users();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    e = DbContext.Users.Where(x => x.Email == u.Email && x.Id != u.Id).FirstOrDefault();
                    if (e == null)
                    {
                        var entrada = DbContext.Attach(u);
                        entrada.Property(x => x.Name).IsModified = true;
                        entrada.Property(x => x.LastName).IsModified = true;
                        entrada.Property(x => x.Birthdate).IsModified = true;
                        entrada.Property(x => x.Gender).IsModified = true;
                        entrada.Property(x => x.PhoneNumber).IsModified = true;
                        entrada.Property(x => x.Email).IsModified = true;
                        if (u.FileImage != "") { entrada.Property(x => x.FileImage).IsModified = true; }
                        DbContext.SaveChanges();

                        dateOld = Convert.ToDateTime(DbContext.Driver.Where(x => x.IdUser == u.Id).FirstOrDefault().LicenseExpiration);
                    }
                    else { r = 1; }
                }
                using (var DbContext = new BAV02Context())
                {
                    d.Id = getIdDriver(u.Id);

                    if (e == null)
                    {
                        var entrada2 = DbContext.Attach(d);
                        entrada2.Property(x => x.Ssn).IsModified = true;
                        entrada2.Property(x => x.EmployeeId).IsModified = true;
                        entrada2.Property(x => x.LicenseSuspended).IsModified = true;
                        entrada2.Property(x => x.DeniedLicense).IsModified = true;
                        entrada2.Property(x => x.LicenseSuspendedComments).IsModified = true;
                        entrada2.Property(x => x.DeniedLicenseComments).IsModified = true;
                        entrada2.Property(x => x.License).IsModified = true;
                        entrada2.Property(x => x.LicenseExpiration).IsModified = true;
                        entrada2.Property(x => x.HiringDate).IsModified = true;
                        entrada2.Property(x => x.CountryLicense).IsModified = true;
                        if (d.LicenseFile != "") { entrada2.Property(x => x.LicenseFile).IsModified = true; }
                        entrada2.Property(x => x.StateLicense).IsModified = true;
                        entrada2.Property(x => x.TypeLicense).IsModified = true;
                        entrada2.Property(x => x.DriverAgreement).IsModified = true;
                        DbContext.SaveChanges();

                        var dateNew = d.LicenseExpiration;
                        if (dateOld < dateNew) { a.deleteDAlerts(d.IdUser, dateOld.ToString("MM/dd/yyyy")); }
                    }
                }
            }
            catch (Exception ex)
            {
                r = 2;
                throw ex;
            }
            return r;

        }

        public long getIdDriver(long idUser)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var idD = DbContext.Driver.Where(x => x.IdUser == idUser).FirstOrDefault().Id;
                    return (long)idD;
                }

            }
            catch (Exception)
            {
                return 0;
            }
        }

        /// <summary>
        /// Save Signature file
        /// </summary>
        /// <param name="id"></param>
        /// <param name="file"></param>
        /// <param name="ia"></param>
        /// <returns></returns>
        public int saveSignatureFile(Users u, long id)
        {

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    u.Id = (long)DbContext.Driver.Where(x => x.IdUser == id).FirstOrDefault().IdUser;
                    var entrada = DbContext.Attach(u);
                    entrada.Property(x => x.FileSignature).IsModified = true;
                    DbContext.SaveChanges();
                }
                return 0;
            }
            catch (Exception) { return 1; }

        }


        public long idSignature(long id)
        {
            using (var DbContext = new BAV02Context())
            {
                return (long)DbContext.LetterInquiry.Where(x => x.Id == id).FirstOrDefault().Id;
            }

        }

        public long idSignatureEmploymentHistory(long id)
        {
            using (var DbContext = new BAV02Context())
            {
                return (long)DbContext.EmploymentHistory.Where(x => x.Id == id).FirstOrDefault().Id;
            }
        }

        /// <summary>
        /// Save Signature file
        /// </summary>
        /// <param name="id"></param>
        /// <param name="file"></param>
        /// <param name="ia"></param>
        /// <returns></returns>
        public int saveSignatureFileEmployer(LetterInquiry l, long id)
        {

            var response = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    l.Id = idSignature(id);
                    var entrada = DbContext.Attach(l);
                    entrada.Property(x => x.Signature).IsModified = true;
                    DbContext.SaveChanges();
                }
                return response;
            }
            catch (Exception)
            {

                return 1;
            }

        }

        public int saveSignatureFileEmployerHistory(EmploymentHistory employmenHistory, long id)
        {
            var response = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    employmenHistory.Id = idSignatureEmploymentHistory(id);
                    var entrada = DbContext.Attach(employmenHistory);
                    entrada.Property(entry => entry.Signature).IsModified = true;
                    DbContext.SaveChanges();
                }
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        /// <summary>
        /// Get  Us states list
        /// </summary>
        /// <returns></returns>
        public List<State> GetStates()
        {
            List<State> lstStates = new List<State>();

            try
            {
                CountryDAL countryDAL = new CountryDAL();
                StatesDAL statesDAL = new StatesDAL();
                var lstCountries = countryDAL.GetCountries().ToList();
                var id = lstCountries.Where(x => x.Name == "US").Select(x => x.Id).FirstOrDefault();
                lstStates = statesDAL.GetStates(id).ToList();
                return lstStates;
            }
            catch (Exception) { return lstStates; }
        }

        /// <summary>
        /// Get states by country
        /// </summary>
        /// <returns></returns>
        public List<State> GetStates(long id)
        {
            StatesDAL statesDAL = new StatesDAL();
            List<State> lstStates = new List<State>();
            try
            {
                lstStates = statesDAL.GetStates(id).ToList();
                return lstStates;
            }
            catch (Exception) { return lstStates; }
        }

        /// <summary>
        /// Get Cities list
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<City> GetCities(long id)
        {
            List<City> lstCities = new List<City>();
            CityDAL cityDAL = new CityDAL();
            try
            {
                if (id > 0)
                {
                    using (var DbContext = new BAV02Context())
                    {
                        lstCities = cityDAL.GetCities(id).ToList();
                        return lstCities;
                    }
                }
                else { return lstCities; }
            }
            catch (Exception) { return lstCities; }
        }

        /// <summary>
        /// add y update address
        /// </summary>
        /// <param name="a"></param>
        /// <returns></returns>
        public int saveAddress(DriverAddress a)
        {
            int r = 0;
            using (var DbContext = new BAV02Context())
            {
                using (var transaction = DbContext.Database.BeginTransaction())
                {
                    try
                    {

                        if (a.CurrentAddress == true)
                        {
                            a.DateTo = DateTime.Now;
                            var pa = DbContext.DriverAddress.Where(x => x.CurrentAddress == true && x.IdDriver == a.IdDriver && x.Id != a.Id).FirstOrDefault();
                            if (pa != null) { pa.CurrentAddress = false; DbContext.Update(pa); DbContext.SaveChanges(); }
                        }

                        if (a.Id == 0) { DbContext.Add(a); }
                        else
                        {
                            var entrada = DbContext.Attach(a);
                            entrada.Property(x => x.Street).IsModified = true;
                            entrada.Property(x => x.IdCity).IsModified = true;
                            entrada.Property(x => x.ZipCode).IsModified = true;
                            entrada.Property(x => x.CurrentAddress).IsModified = true;
                            entrada.Property(x => x.DateTo).IsModified = true;
                            entrada.Property(x => x.DateOf).IsModified = true;
                            entrada.Property(x => x.HowLong).IsModified = true;
                        }
                        DbContext.SaveChanges();

                        transaction.Commit();
                    }
                    catch (Exception) { transaction.Rollback(); r = 1; }
                }
            }
            return r;

        }

        /// <summary>
        /// get list of addresses
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public Table getAddress(long idu, int page, int size)
        {

            Table t = new Table { Items = new List<object>(), CurrentPage = 0, NumberP = 0 };
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
                    var address = (from a in DbContext.DriverAddress
                                   join c in lstCities on a.IdCity equals c.Id
                                   join s in lstStates on c.IdState equals s.Id
                                   where a.IdDriver == idu
                                   select new
                                   {
                                       a.Id,
                                       a.Street,
                                       a.DateOf,
                                       a.DateTo,
                                       a.ZipCode,
                                       a.CurrentAddress,
                                       a.IdCity,
                                       c.IdState,
                                       s.IdCountry,
                                       a.HowLong,
                                       CurrentDate = DateTime.Today
                                   }).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList();
                    var count = Math.Ceiling((DbContext.DriverAddress.Where(x => x.IdDriver == idu).Select(x => x.Id).Count() / (double)size));
                    t.Items = address.ToList<Object>();
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }
            }
            catch (Exception) { }
            return t;
        }

        /// <summary>
        /// Get Addresses for Employment Aplication
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public List<Object> getAddressEA(long idu, int page, int size)
        {
            var list = new List<Object>();

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var address = DbContext.DriverAddress.Where(x => x.IdDriver == idu).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList();
                    return address.ToList<Object>();
                }
            }
            catch (Exception) { return list; }
        }

        /// <summary>
        /// add and update Employment Record
        /// </summary>
        /// <param name="er"></param>
        /// <returns></returns>
        public int saveEmploymentFull(EmploymentRecords er, IHostingEnvironment _env)
        {
            int r = 0;
            DateTime fecha = DateTime.Now;
            fecha = fecha.AddDays(30);

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var name = DbContext.Users.Where(x => x.Id == er.IdDriver).FirstOrDefault().Name;
                    var lastName = DbContext.Users.Where(x => x.Id == er.IdDriver).FirstOrDefault().LastName;
                    var fullName = name + " " + lastName;
                    var companyId = DbContext.CompanyUsersRoles.Where(x => x.IdUser == er.IdDriver).FirstOrDefault().IdCompany;
                    var companyName = DbContext.Company.Where(x => x.Id == companyId).FirstOrDefault().LegalName;
                    var address = er.Address + " " + er.Zip;
                    if (er.Address == null)
                    {
                        er.Address = "";
                        address = "";
                        er.EmployerName = "No Employer";
                        er.Leaving = "";
                        er.Salary = "";
                        er.Zip = "";
                        er.State = 0;
                        er.Country = 0;
                        er.PositionHeld = "";
                        er.City = 0;
                    }
                    var EH = new EmploymentHistory();
                    var LetterIn = new LetterInquiry();

                    LetterIn.DateMailed = fecha;
                    LetterIn.Email = er.Email;
                    LetterIn.PhoneNumber = er.Telephone;
                    LetterIn.Comment = "Letter of Inquiry Completed by Email";
                    LetterIn.IdDriver = er.IdDriver;
                    LetterIn.NewEmployerName = er.EmployerName;
                    LetterIn.NewEmployerAddress = address;
                    LetterIn.DriverName = fullName;
                    LetterIn.IdCompany = companyId;

                    EH.IdDriver = er.IdDriver;
                    EH.DateMailed = fecha;
                    EH.Email = er.Email;
                    EH.PhoneNumber = er.Telephone;
                    EH.NewEmployerName = er.EmployerName;
                    EH.NewEmployerAddress = address;
                    EH.DriverName = fullName;
                    EH.IdCompany = companyId;
                    if (er.Id == 0)
                    {
                        DbContext.Add(er);
                        DbContext.SaveChanges();

                        EH.IdEmploymentRecord = er.Id;
                        LetterIn.IdEmployeeRecord = er.Id;

                        DbContext.Add(EH);
                        DbContext.SaveChanges();
                        var idE = EH.Id;

                        DbContext.Add(LetterIn);
                        DbContext.SaveChanges();
                        var idL = LetterIn.Id;
                        string cadenaDeVal = "" + er.IdDriver + "," + idE + "," + er.Id + "," + fullName + "," + companyId + "," + fecha.ToString() + "";
                        string cadenaDeVal2 = "" + er.IdDriver + "," + idL + "," + er.Id + "," + fullName + "," + companyId + "," + fecha.ToString() + "";

                        var plainText = System.Text.Encoding.UTF8.GetBytes(cadenaDeVal);
                        var plainText2 = System.Text.Encoding.UTF8.GetBytes(cadenaDeVal2);

                        string link = System.Convert.ToBase64String(plainText);
                        string link2 = System.Convert.ToBase64String(plainText2);

                        //Aqui esta tood el merequetenge
                        //para local/qa
                        // string linkHistory = "https://localhost:52582/#/LetterInAndEmployHis/HmTpS" + link;

                        //para produccion
                        string linkHistory = "https://qa.bluagent.com/#/LetterInAndEmployHis/HmTpS" + link;

                        //string link2 = System.Convert.ToBase64String(plainText2);
                        //string linkLetter = "https://qa.bluagent.com/#/LetterInAndEmployHis/HmTpS" + link2;
                        //string linkLetter = "https://compliance.bluagent.com/#/LetterInAndEmployHis/HmTpS" + link2;

                        //sendEmailLetterinquiry(_env,fullName,er.EmployerName,linkLetter,er.PositionHeld,companyName,er.Email);

                        EmailService sendEmplymentHistory = new EmailService(_env);
                        sendEmplymentHistory.setEmailTemplateHistory();
                        sendEmplymentHistory.emailBody = sendEmplymentHistory.emailBody.Replace("[DERName]", er.EmployerName).Replace("[Link Survey]", linkHistory).Replace("[Employees Name]", fullName)
                            .Replace("[Previous Employer]", er.EmployerName)
                            // .Replace("[link]", linkLetter)
                            .Replace("[DERName]", er.EmployerName)
                            .Replace("[Title]", er.PositionHeld)
                            .Replace("[Company Name]", companyName); ;
                        sendEmplymentHistory.sendMail(er.Email, "Employment History Survey & Inquiry into Driver’s Safety Performance History");
                    }
                    else
                    {
                        var idE = DbContext.EmploymentHistory.Where(x => x.IdEmploymentRecord == er.Id).FirstOrDefault().Id;
                        var idL = DbContext.LetterInquiry.Where(x => x.IdEmployeeRecord == er.Id).FirstOrDefault().Id;
                        string cadenaDeVal = "" + er.IdDriver + "," + idE + "," + fullName + "," + companyId + "," + fecha.ToString() + "";
                        string cadenaDeVal2 = "" + er.IdDriver + "," + idL + "," + fullName + "," + companyId + "," + fecha.ToString() + "";

                        var plainText = System.Text.Encoding.UTF8.GetBytes(cadenaDeVal);
                        var plainText2 = System.Text.Encoding.UTF8.GetBytes(cadenaDeVal2);

                        string link = System.Convert.ToBase64String(plainText);
                        string linkHistory = "https://qa.bluagent.com/#/EmployHistory/HmTpS" + link;
                        //string linkHistory = "https://compliance.bluagent.com/#/LetterInAndEmployHis/HmTpS" + link;

                        string link2 = System.Convert.ToBase64String(plainText2);
                        string linkLetter = "https://qa.bluagent.com/#/LetterOfInquiry/HmTpS" + link2;
                        //string linkLetter = "https://compliance.bluagent.com/#/LetterInAndEmployHis/HmTpS" + link2;

                        //sendEmailLetterinquiry(_env,fullName,er.EmployerName,linkLetter,er.PositionHeld,companyName,er.Email);

                        EmailService sendEmplymentHistory = new EmailService(_env);
                        sendEmplymentHistory.setEmailTemplateHistory();
                        sendEmplymentHistory.emailBody = sendEmplymentHistory.emailBody.Replace("[DERName]", er.EmployerName).Replace("[Link Survey]", linkHistory).Replace("[Employees Name]", fullName)
                            .Replace("[Previous Employer]", er.EmployerName)
                            // .Replace("[link]", linkLetter)
                            .Replace("[DERName]", er.EmployerName)
                            .Replace("[Title]", er.PositionHeld)
                            .Replace("[Company Name]", companyName); ;
                        sendEmplymentHistory.sendMail(er.Email, "Employment History Survey & Inquiry into Driver’s Safety Performance History");

                        var entrada = DbContext.Attach(er);
                        entrada.Property(x => x.EmployerName).IsModified = true;
                        entrada.Property(x => x.Email).IsModified = true;
                        entrada.Property(x => x.Address).IsModified = true;
                        entrada.Property(x => x.Telephone).IsModified = true;
                        entrada.Property(x => x.PositionHeld).IsModified = true;
                        entrada.Property(x => x.DateFrom).IsModified = true;
                        entrada.Property(x => x.DateTo).IsModified = true;
                        entrada.Property(x => x.Salary).IsModified = true;
                        entrada.Property(x => x.Leaving).IsModified = true;
                        entrada.Property(x => x.SubjectToRegulation).IsModified = true;
                        entrada.Property(x => x.SubjectToTesting).IsModified = true;
                        entrada.Property(x => x.State).IsModified = true;
                        entrada.Property(x => x.City).IsModified = true;
                        entrada.Property(x => x.Zip).IsModified = true;
                        entrada.Property(x => x.Country).IsModified = true;
                        DbContext.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                r = 1;
                throw ex;
            }
            return r;
        }

        /// <summary>
        /// sadd and update driving experience
        /// </summary>
        /// <param name="d"></param>
        /// <returns></returns>
        public int saveDrivingExp(DrivingExperience d)
        {
            int r = 0;

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    using (var transaction = DbContext.Database.BeginTransaction())
                    {
                        try
                        {
                            if (d.IdDexperience == 0) { DbContext.Add(d); }
                            else
                            {
                                var entrada = DbContext.Attach(d);
                                entrada.Property(x => x.ClassEquipment).IsModified = true;
                                entrada.Property(x => x.TypeEquipment).IsModified = true;
                                entrada.Property(x => x.DateFrom).IsModified = true;
                                entrada.Property(x => x.DateTo).IsModified = true;
                                entrada.Property(x => x.TotalMilesDriven).IsModified = true;
                            }
                            DbContext.SaveChanges();
                            transaction.Commit();
                        }
                        catch (Exception)
                        {
                            transaction.Rollback();
                        }
                    }
                }
            }
            catch (Exception) { r = 1; }

            return r;
        }

        /// <summary>
        /// Get list of Driving Experience
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public Table getDrivingExp(long idu, int page, int size)
        {

            Table t = new Table { Items = new List<object>(), CurrentPage = 0, NumberP = 0 };

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var address = DbContext.DrivingExperience.Where(x => x.IdDriver == idu).OrderByDescending(x => x.IdDexperience).Skip((page - 1) * size).Take(size).ToList();
                    var count = Math.Ceiling((DbContext.DrivingExperience.Where(x => x.IdDriver == idu).Select(x => x.IdDexperience).Count() / (double)size));
                    t.Items = address.ToList<Object>();
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }
            }
            catch (Exception) { }
            return t;
        }

        /// <summary>
        /// add and update accident record
        /// </summary>
        /// <param name="ac"></param>
        /// <returns></returns>
        public int saveAccidentRec(AccidentRecord ac)
        {
            int r = 0;

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    if (ac.Id == 0) { DbContext.Add(ac); }
                    else
                    {
                        var entrada = DbContext.Attach(ac);
                        entrada.Property(x => x.DateAccident).IsModified = true;
                        entrada.Property(x => x.NatureAccident).IsModified = true;
                        entrada.Property(x => x.Fatalities).IsModified = true;
                        entrada.Property(x => x.Injuries).IsModified = true;
                    }
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { r = 1; }

            return r;
        }

        /// <summary>
        /// Get list of Accident records
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public Table getAccidentRec(long idu, int page, int size)
        {

            Table t = new Table { Items = new List<object>(), CurrentPage = 0, NumberP = 0 };

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var raccidents = DbContext.AccidentRecord.Where(x => x.IdDriver == idu).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList();
                    var count = Math.Ceiling((DbContext.AccidentRecord.Where(x => x.IdDriver == idu).Select(x => x.Id).Count() / (double)size));
                    t.Items = raccidents.ToList<Object>();
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }
            }
            catch (Exception) { }
            return t;
        }

        /// <summary>
        /// add and update traffic conviction
        /// </summary>
        /// <param name="tc"></param>
        /// <returns></returns>
        public int saveTrafficConv(TrafficConvictions tc)
        {
            int r = 0;

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    if (tc.Id == 0) { DbContext.Add(tc); }
                    else
                    {
                        var entrada = DbContext.Attach(tc);
                        entrada.Property(x => x.Locations).IsModified = true;
                        entrada.Property(x => x.ConvictionDate).IsModified = true;
                        entrada.Property(x => x.Change).IsModified = true;
                        entrada.Property(x => x.Penalty).IsModified = true;
                    }
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { r = 1; }


            return r;
        }

        /// <summary>
        /// Get Traffic Convictions list
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public Table getTrafficConv(long idu, int page, int size)
        {

            Table t = new Table { Items = new List<object>(), CurrentPage = 0, NumberP = 0 };

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var tconvictions = DbContext.TrafficConvictions.Where(x => x.IdDriver == idu).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList();
                    var count = Math.Ceiling((DbContext.TrafficConvictions.Where(x => x.IdDriver == idu).Select(x => x.Id).Count() / (double)size));
                    t.Items = tconvictions.ToList<Object>();
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }
            }
            catch (Exception) { }

            return t;
        }

        /// <summary>
        /// add and update Employment Record
        /// </summary>
        /// <param name="er"></param>
        /// <returns></returns>
        public int saveEmploymentR(EmploymentRecords er)
        {
            int r = 0;

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    if (er.Id == 0) { DbContext.Add(er); }
                    else
                    {
                        var entrada = DbContext.Attach(er);
                        entrada.Property(x => x.EmployerName).IsModified = true;
                        entrada.Property(x => x.Email).IsModified = true;
                        entrada.Property(x => x.Address).IsModified = true;
                        entrada.Property(x => x.Telephone).IsModified = true;
                        entrada.Property(x => x.PositionHeld).IsModified = true;
                        entrada.Property(x => x.DateFrom).IsModified = true;
                        entrada.Property(x => x.DateTo).IsModified = true;
                        entrada.Property(x => x.Salary).IsModified = true;
                        entrada.Property(x => x.Leaving).IsModified = true;
                        entrada.Property(x => x.SubjectToRegulation).IsModified = true;
                        entrada.Property(x => x.SubjectToTesting).IsModified = true;
                        entrada.Property(x => x.State).IsModified = true;
                        entrada.Property(x => x.City).IsModified = true;
                        entrada.Property(x => x.Zip).IsModified = true;
                        entrada.Property(x => x.Country).IsModified = true;
                    }
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { r = 1; }

            return r;
        }
        public void sendEmailLetterinquiry(IHostingEnvironment _env, string fullName, string EmployerName, string linkLetter, string PositionHeld, string companyName, string Email)
        {
            EmailService sendLetterInquiry = new EmailService(_env);
            sendLetterInquiry.setEmailTemplateLetter();
            sendLetterInquiry.emailBody = sendLetterInquiry.emailBody.Replace("[Employees Name]", fullName)
                .Replace("[Previous Employer]", EmployerName)
                .Replace("[link]", linkLetter)
                .Replace("[DerName]", EmployerName)
                .Replace("[Title]", PositionHeld)
                .Replace("[Company Name]", companyName);
            sendLetterInquiry.addAttacHment($"ClientApp/{AssetsDirectory}/assets/img/logo/BluAgent-Logo.png");
            sendLetterInquiry.sendMail(Email, "Inquiry into Driver’s Safety Performance History");
        }

        /// <summary>
        /// Get Employment Records list
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public Table getEmploymentR(long idu, int page, int size)
        {


            Table t = new Table { Items = new List<object>(), CurrentPage = 0, NumberP = 0 };

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var erecords = DbContext.EmploymentRecords.Where(x => x.IdDriver == idu).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList();
                    var count = Math.Ceiling((DbContext.EmploymentRecords.Where(x => x.IdDriver == idu).Select(x => x.Id).Count() / (double)size));
                    t.Items = erecords.ToList<Object>();
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }
            }
            catch (Exception) { }

            return t;
        }


        /// <summary>
        /// Save new DMV Record
        /// </summary>
        /// <param name="d"></param>
        /// <returns></returns>
        public int saveDMVRecord(Dmv d)
        {
            int r = 0;

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var xx = DbContext.Dmv.Where(x => x.IdDriver == d.IdDriver).OrderByDescending(x => x.Id).Take(1).FirstOrDefault();

                    DbContext.Add(d);
                    DbContext.SaveChanges();

                    if (xx != null)
                    {
                        dateOld = Convert.ToDateTime(xx.ExpirationDate);
                        var dateNew = d.ExpirationDate;
                        if (dateOld < dateNew) { a.deleteDAlerts((long)d.IdDriver, dateOld.ToString("MM/dd/yyyy")); }
                    }
                }
            }
            catch (Exception) { r = 1; }


            return r;
        }

        /// <summary>
        /// Get DMV records list
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public Table getDMVRecords(long idu, int page, int size)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 0, NumberP = 0 };

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var dmv = DbContext.Dmv.Where(x => x.IdDriver == idu)
                        .Select(x => new
                        {
                            x.IdDriver,
                            x.Id,
                            x.Dmv1,
                            x.ExpirationDate,
                            x.DmvFileName,
                            x.IssueDate
                        }).OrderByDescending(x => x.ExpirationDate).Skip((page - 1) * size)
                        .Take(size)
                        .ToList<Object>();

                    var count = Math.Ceiling((DbContext.Dmv.Where(x => x.IdDriver == idu).Select(x => x.Id).Count() / (double)size));
                    t.Items = dmv;
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }
            }
            catch (Exception) { }

            return t;
        }

        public int DeleteDmvRecord(long idDmv)
        {
            using (var DbContext = new BAV02Context())
            {
                var dmv = DbContext.Dmv.Where(d => d.Id == idDmv).SingleOrDefault();
                if (dmv != null)
                {
                    DbContext.Remove(dmv);
                    return DbContext.SaveChanges();
                }
                else
                {
                    return 0;
                }
            }
        }

        public int DeleteCHRecord(long idCH)
        {
            using (var DbContext = new BAV02Context())
            {
                var ch = DbContext.PreEmploymentInquery.Where(x => x.idCH == idCH).FirstOrDefault();
                if (ch != null)
                {
                    DbContext.PreEmploymentInquery.Remove(ch);
                    return DbContext.SaveChanges();
                }
                else
                {
                    return 0;
                }
            }
        }

        public int DeleteDCRecord(long idDC)
        {
            using (var DbContext = new BAV02Context())
            {
                var dc = DbContext.DriverConsent.Where(x => x.idDC == idDC).FirstOrDefault();
                if (dc != null)
                {
                    DbContext.DriverConsent.Remove(dc);
                    return DbContext.SaveChanges();
                }
                else
                {
                    return 0;
                }
            }
        }

        public int DeleteAIRecord(long idAI)
        {
            using (var DbContext = new BAV02Context())
            {
                var ai = DbContext.AnnualInquiry.Where(x => x.IdAnnualInquiry == idAI).FirstOrDefault();
                if (ai != null)
                {
                    DbContext.AnnualInquiry.Remove(ai);
                    return DbContext.SaveChanges();
                }
                else
                {
                    return 0;
                }
            }
        }

        public int DeleteEpnRecord(long idEpn)
        {
            using (var DbContext = new BAV02Context())
            {
                var epn = DbContext.EmployerPullNotice.Where(e => e.Id == idEpn).SingleOrDefault();
                if (epn != null)
                {
                    DbContext.Remove(epn);
                    return DbContext.SaveChanges();
                }
                else
                {
                    return 0;
                }

            }
        }


        /// <summary>
        /// Save new employer pull notice
        /// </summary>
        /// <param name="e"></param>
        /// <returns></returns>
        public int saveEmployerPullNotice(EmployerPullNotice e)
        {
            var response = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    DbContext.Add(e);
                    DbContext.SaveChanges();
                }
                return response;
            }
            catch (Exception ex)
            {
                response = 1;
                throw ex;
            }

        }

        /// <summary>
        /// Get employer pull notices list
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public Table getEmployerPullNotices(long idu, int page, int size)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 0, NumberP = 0 };

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var dmv = DbContext.EmployerPullNotice.Where(x => x.IdDriver == idu).Select(x => new { x.IdDriver, x.Id, x.DateReview, x.FileName, x.RecordDate, x.RequesterCode, x.ReviewedBy, x.Violations }).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList<Object>();
                    var count = Math.Ceiling((DbContext.EmployerPullNotice.Where(x => x.IdDriver == idu).Select(x => x.Id).Count() / (double)size));
                    t.Items = dmv;
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }
            }
            catch (Exception) { }

            return t;
        }

        /// <summary>
        /// Get data company for the employment aplication
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Object getDataCompanyC(long id)
        {
            CityDAL cityDAL = new CityDAL();
            StatesDAL statesDAL = new StatesDAL();
            List<City> lstCities = new List<City>();
            List<State> lstStates = new List<State>();
            lstCities = cityDAL.GetCities().ToList();
            lstStates = statesDAL.GetStates().ToList();


            var r = new Object();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var idu = DbContext.Driver.Where(x => x.IdUser == id).FirstOrDefault().IdUser;
                    var add = DbContext.DriverAddress.Where(x => x.IdDriver == id && x.CurrentAddress == true).FirstOrDefault();
                    //var hl = ""; if (add != null) { hl = add.Hlong; }
                    var idc = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                    var idA = DbContext.CompanyUsersRoles.Where(c => c.IdCompany == idc && c.Type == "ADMIN").FirstOrDefault().IdUser;
                    r = (from c in DbContext.Company
                         join s in lstStates
                         on c.PhysicalState equals s.Id
                         join ci in lstCities
                         on c.PhysicalCity equals ci.Id
                         join u in DbContext.Users
                         on idA equals u.Id
                         where c.Id == idc
                         select new
                         {
                             c.Der,
                             c.Title,
                             c.Id,
                             c.DbaName,
                             c.LegalName,
                             c.PhysicalAddress,
                             c.PhysicalCity,
                             c.PhysicalZip,
                             State = s.Name,
                             City = ci.Name,
                             //Hl = hl,
                             u.FileSignature
                         }).FirstOrDefault();
                    return r;
                }
            }
            catch (Exception) { r = null; return r; }

        }

        /// <summary> 
        /// save documment of driver
        /// </summary>
        /// <param name="d"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public int saveDoc(DriverDocs d, long idd)
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var n = DbContext.DriverDocs.Where(x => x.DocName == d.DocName & x.IdDriver == idd).FirstOrDefault();
                    if (n == null)
                    {
                        d.IdDriver = idd;
                        DbContext.Add(d);
                        DbContext.SaveChanges();
                    }
                    else { r = 1; }
                }
            }
            catch (Exception) { r = 2; }
            return r;
        }

        /// <summary>
        /// get 4 documment of driver with id
        /// </summary>
        /// <param name="idt"></param>
        /// <returns></returns>
        public Table getDocuments(long idd, long idu, int page, int size)
        {
            if (idd == idu) { valid = false; }
            Table t = new Table { Items = new List<object>(), CurrentPage = 0, NumberP = 0 };
            try
            {

                using (var DbContext = new BAV02Context())
                {
                    var list = DbContext.DriverDocs.Where(x => x.IdDriver == idd).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList<Object>();

                    var count = Math.Ceiling((DbContext.DriverDocs.Where(x => x.IdDriver == idd).Select(x => new { x.IdDriver }).Count() / (double)size));
                    t.Items = list;
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }

            }
            catch (Exception) { }

            return t;
        }

        /// <summary>
        /// delete document of driver
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int deleteDoc(long id)
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var d = DbContext.DriverDocs.Where(x => x.Id == id).FirstOrDefault();
                    if (d != null)
                    {
                        DbContext.DriverDocs.RemoveRange(d);
                        DbContext.SaveChanges();
                    }
                    else
                    {
                        r = 1;
                    }

                }
            }
            catch (Exception) { r = 1; }
            return r;
        }

        public List<DrugAlcoholCompliance> deleteDACompliance(long id)
        {
            List<DrugAlcoholCompliance> list = new List<DrugAlcoholCompliance>();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var d = DbContext.DrugAlcoholCompliance.Where(x => x.Id == id).FirstOrDefault();
                    if (d != null)
                    {
                        DbContext.DrugAlcoholCompliance.RemoveRange(d);
                        DbContext.SaveChanges();
                        list = DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.IdDriver && x.TypeTest == d.TypeTest).OrderByDescending(x => x.Id).ToList();
                        return list;
                    }
                    else
                    {
                        return list;
                    }
                }
            }
            catch (Exception ex) { throw ex; }
        }

        /// <summary>
        /// get all alerts of trailer with id
        /// </summary>
        /// <param name="idt"></param>
        /// <returns></returns>
        public List<DriverAlerts> getAllAlerts(long id)
        {
            List<DriverAlerts> list = new List<DriverAlerts>();

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var items = DbContext.DriverAlerts.Where(x => x.IdDriver == id).OrderByDescending(x => x.Id);
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
                    r = (int)DbContext.DriverAlerts.Where(x => x.IdDriver == id).Select(x => new { x.IdDriver }).Count();
                    return r;
                }
            }
            catch (Exception) { return r = 0; }

        }

        /// <summary>
        /// get all alerts of trailer with id
        /// </summary>
        /// <param name="idt"></param>
        /// <returns></returns>
        public List<DriverAlertsDto> getAllNotifications(int id)
        {
            List<DriverAlertsDto> list = new List<DriverAlertsDto>();

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    list = (from da in DbContext.DriverAlerts
                            join d in DbContext.Driver on da.IdDriver equals d.IdUser
                            join du in DbContext.Users on da.IdDriver equals du.Id
                            where da.IdCompany == id && d.Status == "ACTIVE"
                            select new DriverAlertsDto
                            {
                                Id = da.Id,
                                IdDriver = da.IdDriver,
                                Message = da.Message,
                                IdCompany = da.IdCompany,
                                DriverName = da.DriverName,
                                Severy = da.Severy,
                                License = d.License,
                                Phone = du.PhoneNumber,
                                Image = du.FileImage,
                                Status = du.Status,

                            }).ToList();
                }

            }
            catch (Exception ex) { throw new Exception($"Error: {ex}"); }

            return list;
        }

        public List<CompanyAlerts> getAllNotificationsCompany(long id)
        {
            List<CompanyAlerts> list = new List<CompanyAlerts>();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    list = DbContext.CompanyAlerts.Where(x => x.IdCompany == id).ToList();
                }

            }
            catch (Exception ex) { throw new Exception($"Error: {ex}"); }

            return list;
        }
        public int NotificationsCounter(int id)
        {
            var r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    r = (from da in DbContext.DriverAlerts
                         join d in DbContext.Driver on da.IdDriver equals d.IdUser
                         where da.IdCompany == id && d.Status == "ACTIVE"
                         orderby da.Id descending
                         select new DriverAlerts
                         {
                             Id = da.Id,
                             IdDriver = da.IdDriver,
                             Message = da.Message,
                             IdCompany = da.IdCompany,
                             DriverName = da.DriverName,
                             Severy = da.Severy
                         }).ToList().Count;
                    return r;
                }
            }
            catch (Exception) { }
            return r;
        }
        public int deleteDriverNotification(int id)
        {
            List<DriverAlerts> list = new List<DriverAlerts>();
            var r = 0;
            using (var DbContext = new BAV02Context())
            {
                try
                {
                    list = DbContext.DriverAlerts.Where(x => x.IdCompany == id).ToList();
                    DbContext.DriverAlerts.RemoveRange(list);
                    DbContext.SaveChanges();
                    return r = 1;
                }
                catch (Exception)
                {
                    return r;
                }
            }
        }

        public List<DriversCompany> generateDriverNotifications(long id)
        {
            List<DriversCompany> list = null;
            using (var DbContext = new BAV02Context())
            {
                var items = DbContext.DriversCompany.Where(x => x.IdCompany == id && x.Status).OrderByDescending(x => x.Id);
                var arreglo = items.ToArray();

                for (int i = 0; i < arreglo.Length; i++)
                {
                    var nameDriver = DbContext.Users.Where(x => x.Id == arreglo[i].IdDriverUser).ToArray();
                    var dmv = DbContext.Dmv.Where(x => x.IdDriver == arreglo[i].IdDriverUser).OrderByDescending(x => x.ExpirationDate).Take(1).FirstOrDefault();
                    var m = DbContext.MedicalCertificate.Where(x => x.IdDriver == arreglo[i].IdDriverUser).OrderByDescending(x => x.ExpirationDate).Take(1).FirstOrDefault();
                    var ch = DbContext.AnnualInquiry.Where(x => x.IdDriver == arreglo[i].IdDriverUser).OrderByDescending(x => x.DateOfReview).Take(1).FirstOrDefault();

                    try
                    {
                        if (nameDriver != null)
                        {
                            string n = arreglo[i].LicenseExpiration.ToString();
                            days = (Convert.ToDateTime(n) - currentDate).TotalDays;
                            fullName = nameDriver[0].Name + ' ' + nameDriver[0].LastName;
                            if (days <= 90 && days >= 61)
                            {
                                color = "info";
                                message = "The Driver's license expiring on " + Convert.ToDateTime(n).ToString("MM/dd/yyyy");
                                createDAlerts(id, arreglo[i].IdDriverUser, fullName);
                            }
                            else if (days <= 60 && days >= 16)
                            {
                                color = "warning"; message = "The Driver's license expiring on " + Convert.ToDateTime(n).ToString("MM/dd/yyyy");
                                createDAlerts(id, arreglo[i].IdDriverUser, fullName);
                            }
                            else if (days <= 15 && days >= 0)
                            {
                                color = "warning"; message = "The Driver's license expiring on " + Convert.ToDateTime(n).ToString("MM/dd/yyyy");
                                createDAlerts(id, arreglo[i].IdDriverUser, fullName);
                            }
                            else if (days < 0)
                            {
                                color = "danger";
                                message = "The Driver's license expired on " + Convert.ToDateTime(n).ToString("MM/dd/yyyy");
                                createDAlerts(id, arreglo[i].IdDriverUser, fullName);
                            }
                        }
                    }
                    catch (Exception)
                    {
                    }

                    try
                    {
                        if (dmv != null)
                        {
                            if (dmv.ExpirationDate != null)
                            {
                                string n = dmv.ExpirationDate.ToString();
                                days = (Convert.ToDateTime(n) - currentDate).TotalDays;
                                fullName = nameDriver[0].Name + ' ' + nameDriver[0].LastName;
                                if (days <= 90 && days >= 61)
                                {
                                    color = "info";
                                    message = "DMV Driving Record renewal is coming up on " + Convert.ToDateTime(n).ToString("MM/dd/yyyy");
                                    createDAlerts(id, arreglo[i].IdDriverUser, fullName);
                                }
                                else if (days <= 60 && days >= 16)
                                {
                                    color = "warning";
                                    message = "DMV Driving Record renewal is coming up on " + Convert.ToDateTime(n).ToString("MM/dd/yyyy");
                                    createDAlerts(id, arreglo[i].IdDriverUser, fullName);
                                }
                                else if (days <= 15 && days >= 0)
                                {
                                    color = "warning";
                                    message = "DMV Driving Record renewal is coming up on " + Convert.ToDateTime(n).ToString("MM/dd/yyyy");
                                    createDAlerts(id, arreglo[i].IdDriverUser, fullName);
                                }
                                else if (days < 0)
                                {
                                    color = "danger";
                                    message = "DMV Driving Record renewal is expired " + Convert.ToDateTime(n).ToString("MM/dd/yyyy");
                                    createDAlerts(id, arreglo[i].IdDriverUser, fullName);
                                }
                            }
                        }
                    }
                    catch (Exception)
                    {
                    }

                    try
                    {
                        if (m != null)
                        {
                            if (m.ExpirationDate != null)
                            {
                                string n = m.ExpirationDate.ToString();
                                days = (Convert.ToDateTime(n) - currentDate).TotalDays;
                                fullName = nameDriver[0].Name + ' ' + nameDriver[0].LastName;
                                if (days <= 90 && days >= 61)
                                {
                                    color = "info";
                                    message = "Medical Certificate expires on " + Convert.ToDateTime(n).ToString("MM/dd/yyyy");
                                    createDAlerts(id, arreglo[i].IdDriverUser, fullName);
                                }
                                else if (days <= 60 && days >= 16)
                                {
                                    color = "warning";
                                    message = "Medical Certificate expires on " + Convert.ToDateTime(n).ToString("MM/dd/yyyy");
                                    createDAlerts(id, arreglo[i].IdDriverUser, fullName);
                                }
                                else if (days <= 15 && days >= 0)
                                {
                                    color = "warning";
                                    message = "Medical Certificate expires on " + Convert.ToDateTime(n).ToString("MM/dd/yyyy");
                                    createDAlerts(id, arreglo[i].IdDriverUser, fullName);
                                }
                                else if (days < 0)
                                {
                                    color = "danger";
                                    message = "Medical Certificate expired on " + Convert.ToDateTime(n).ToString("MM/dd/yyyy");
                                    createDAlerts(id, arreglo[i].IdDriverUser, fullName);
                                }
                            }
                        }
                    }
                    catch (Exception)
                    {
                    }

                    try
                    {
                        if (ch != null)
                        {
                            if (ch.DateOfReview != null)
                            {
                                string n = ch.DateOfReview.ToString();
                                days = (Convert.ToDateTime(n) - currentDate).TotalDays;
                                days = days * -1;
                                fullName = nameDriver[0].Name + ' ' + nameDriver[0].LastName;
                                if (days >= 335 && days <= 365)
                                {
                                    color = "warning";
                                    message = "Annual inquiry is coming up on " + Convert.ToDateTime(n).ToString("MM/dd/yyyy");
                                    createDAlerts(id, arreglo[i].IdDriverUser, fullName);
                                }
                                else if (days > 365)
                                {
                                    color = "danger";
                                    message = "Annual inquiry is expired " + Convert.ToDateTime(n).ToString("MM/dd/yyyy");
                                    createDAlerts(id, arreglo[i].IdDriverUser, fullName);
                                }
                            }
                        }
                    }
                    catch (Exception)
                    {
                    }
                }

                list = items.ToList();
                return list;
            }

        }

        public int importNewDrivers()
        {
            int response = 0;
            List<Tabla_Drivers> list = new List<Tabla_Drivers>();

            using (var DbContext = new BAV02Context())
            {
                try
                {
                    list = DbContext.Tabla_Drivers.Where(x => x.NO > 0).ToList();
                    for (int i = 0; i < list.Count; i++)
                    {
                        Users u = new Users();
                        CompanyUsersRoles cur = new CompanyUsersRoles();
                        Driver d = new Driver();

                        var Password = "Driver123!";
                        u.Name = list[i].FIRST_NAME;
                        u.LastName = list[i].LAST_NAME;
                        u.Birthdate = Convert.ToDateTime(list[i].BIRTHDAY.ToString("MM/dd/yyyy"));
                        u.Email = list[i].EMAIL;
                        u.PhoneNumber = list[i].PHONE_NUMBER;
                        u.Role = "DRIVER";
                        u.Password = (byte[])DbContext.Users.FromSql($"select PWDENCRYPT({Password}) as Password").Select(x => x.Password).FirstOrDefault();
                        u.Status = "ACTIVE";
                        u.Gender = list[i].GENDER;
                        DbContext.Add(u);
                        DbContext.SaveChanges();

                        cur.IdCompany = list[i].COMPANY_ID;
                        cur.IdUser = u.Id;
                        cur.Type = "DRIVER";
                        cur.DateStarted = DateTime.Now;
                        cur.Status = "ACTIVE";
                        DbContext.Add(cur);
                        DbContext.SaveChanges();

                        d.IdUser = u.Id;
                        d.License = list[i].LICENCIA;
                        var dateLicense = list[i].LICENSE_EXPIRATION_DATE.Split("/");
                        d.LicenseExpiration = Convert.ToDateTime(dateLicense[1] + "/" + dateLicense[0] + "/" + dateLicense[2]);
                        d.Status = "ACTIVE";
                        d.StatusWork = true;
                        d.QuestionDa = true;
                        d.CountryLicense = 1;
                        var DateHiring = list[i].HIRING_DATE.Split("/");
                        d.HiringDate = Convert.ToDateTime(DateHiring[1] + "/" + DateHiring[0] + "/" + DateHiring[2]);
                        DbContext.Add(d);
                        DbContext.SaveChanges();

                    }
                    return response;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public List<LogsRandom> getLogsRandomsNotifications(int id, IHostingEnvironment _env)
        {
            List<ScheduleDrugTest> listShedule = new List<ScheduleDrugTest>();
            List<LogsRandom> listLogs = new List<LogsRandom>();
            LogsRandom newLog = new LogsRandom();
            double dias = 0;
            DateTime currentDate = DateTime.Today;

            using (var DbContext = new BAV02Context())
            {
                try
                {
                    listShedule = DbContext.ScheduleDrugTest.Where(x => x.IdCompany == id && x.Reason == "Random" && x.Status != "Draft").ToList();

                    if (listShedule.Count > 0)
                    {
                        for (int i = 0; i < listShedule.Count; i++)
                        {
                            var resultado = DbContext.LogsRandom.Where(x => x.IdCompany == listShedule[i].IdCompany && x.IdRandomList == listShedule[i].idRandomList && x.Reason == "has a random test in draft").FirstOrDefault();
                            if (resultado != null)
                            {

                                newLog.IdDriver = resultado.IdDriver;
                                newLog.IdRandomList = resultado.IdRandomList;
                                newLog.Reason = "Log Draft Remove";
                                newLog.Date = DateTime.Today;
                                newLog.Quarter = resultado.Quarter;
                                newLog.Year = resultado.Year;
                                newLog.Name = resultado.Name;
                                newLog.LastName = resultado.LastName;
                                newLog.IdCompany = resultado.IdCompany;
                                DbContext.Add(newLog);
                                DbContext.SaveChanges();

                                DbContext.Remove(resultado);
                                DbContext.SaveChanges();

                            }
                        }
                        listLogs = DbContext.LogsRandom.Where(x => x.IdCompany == id && x.Reason == "has a random test in draft").ToList();
                        var company = DbContext.Company.Where(x => x.Id == idCompany).FirstOrDefault();
                        if (listLogs.Count > 0)
                        {
                            for (int i = 0; i < listLogs.Count; i++)
                            {
                                string date = listLogs[i].Date.ToString();
                                dias = (Convert.ToDateTime(date) - currentDate).TotalDays;
                                //dias = 15;
                                if (dias > 0)
                                {
                                    if (dias == 15)
                                    {
                                        EmailService sendReminderEmail = new EmailService(_env);
                                        sendReminderEmail.setEmailRemainderRandomDraft();
                                        sendReminderEmail.emailBody = sendReminderEmail.emailBody.Replace("[Name]", listLogs[i].Name)
                                        .Replace("[LastName]", listLogs[i].LastName)
                                        .Replace("[Reason]", listLogs[i].Reason)
                                        .Replace("[Date]", listLogs[i].Date.ToString("dd/MM/yyyy"))
                                        .Replace("[Quarter]", listLogs[i].Quarter.ToString());
                                        sendReminderEmail.sendMail(company.Email, "Remainder Random Test in Draft");
                                        //sendReminderEmail.sendMail("danielaquino@bluagent.com", "Remainder Random Test in Draft");
                                    }
                                    else if (dias == 30)
                                    {
                                        EmailService sendReminderEmail = new EmailService(_env);
                                        sendReminderEmail.setEmailRemainderRandomDraft();
                                        sendReminderEmail.emailBody = sendReminderEmail.emailBody.Replace("[Name]", listLogs[i].Name)
                                        .Replace("[LastName]", listLogs[i].LastName)
                                        .Replace("[Reason]", listLogs[i].Reason)
                                        .Replace("[Date]", listLogs[i].Date.ToString("dd/MM/yyyy"))
                                        .Replace("[Quarter]", listLogs[i].Quarter.ToString());
                                        sendReminderEmail.sendMail(company.Email, "Remainder Random Test in Draft");
                                    }
                                    else if (dias == 45)
                                    {
                                        EmailService sendReminderEmail = new EmailService(_env);
                                        sendReminderEmail.setEmailRemainderRandomDraft();
                                        sendReminderEmail.emailBody = sendReminderEmail.emailBody.Replace("[Name]", listLogs[i].Name)
                                        .Replace("[LastName]", listLogs[i].LastName)
                                        .Replace("[Reason]", listLogs[i].Reason)
                                        .Replace("[Date]", listLogs[i].Date.ToString("dd/MM/yyyy"))
                                        .Replace("[Quarter]", listLogs[i].Quarter.ToString());
                                        sendReminderEmail.sendMail(company.Email, "Remainder Random Test in Draft");
                                    }
                                    else if (dias == 60)
                                    {
                                        EmailService sendReminderEmail = new EmailService(_env);
                                        sendReminderEmail.setEmailRemainderRandomDraft();
                                        sendReminderEmail.emailBody = sendReminderEmail.emailBody.Replace("[Name]", listLogs[i].Name)
                                        .Replace("[LastName]", listLogs[i].LastName)
                                        .Replace("[Reason]", listLogs[i].Reason)
                                        .Replace("[Date]", listLogs[i].Date.ToString("dd/MM/yyyy"))
                                        .Replace("[Quarter]", listLogs[i].Quarter.ToString());
                                        sendReminderEmail.sendMail(company.Email, "Remainder Random Test in Draft");
                                    }
                                    else if (dias == 75)
                                    {
                                        EmailService sendReminderEmail = new EmailService(_env);
                                        sendReminderEmail.setEmailRemainderRandomDraft();
                                        sendReminderEmail.emailBody = sendReminderEmail.emailBody.Replace("[Name]", listLogs[i].Name)
                                        .Replace("[LastName]", listLogs[i].LastName)
                                        .Replace("[Reason]", listLogs[i].Reason)
                                        .Replace("[Date]", listLogs[i].Date.ToString("dd/MM/yyyy"))
                                        .Replace("[Quarter]", listLogs[i].Quarter.ToString());
                                        sendReminderEmail.sendMail(company.Email, "Remainder Random Test in Draft");
                                    }
                                }
                            }
                        }
                        return listLogs;
                    }
                    else
                    {
                        listLogs = DbContext.LogsRandom.Where(x => x.IdCompany == id && x.Reason == "has a random test in draft").ToList();
                        var company = DbContext.Company.Where(x => x.Id == idCompany).FirstOrDefault();
                        if (listLogs.Count > 0)
                        {
                            for (int i = 0; i < listLogs.Count; i++)
                            {
                                string date = listLogs[i].Date.ToString();
                                dias = (Convert.ToDateTime(date) - currentDate).TotalDays;
                                if (dias > 0)
                                {
                                    if (dias == 15)
                                    {
                                        EmailService sendReminderEmail = new EmailService(_env);
                                        sendReminderEmail.setEmailRemainderRandomDraft();
                                        sendReminderEmail.emailBody = sendReminderEmail.emailBody.Replace("[Name]", listLogs[i].Name)
                                        .Replace("[LastName]", listLogs[i].LastName)
                                        .Replace("[Reason]", listLogs[i].Reason)
                                        .Replace("[Date]", listLogs[i].Date.ToString("dd/MM/yyyy"))
                                        .Replace("[Quarter]", listLogs[i].Quarter.ToString());
                                        sendReminderEmail.sendMail(company.Email, "Remainder Random Test in Draft");
                                    }
                                    else if (dias == 30)
                                    {
                                        EmailService sendReminderEmail = new EmailService(_env);
                                        sendReminderEmail.setEmailRemainderRandomDraft();
                                        sendReminderEmail.emailBody = sendReminderEmail.emailBody.Replace("[Name]", listLogs[i].Name)
                                        .Replace("[LastName]", listLogs[i].LastName)
                                        .Replace("[Reason]", listLogs[i].Reason)
                                        .Replace("[Date]", listLogs[i].Date.ToString("dd/MM/yyyy"))
                                        .Replace("[Quarter]", listLogs[i].Quarter.ToString());
                                        sendReminderEmail.sendMail(company.Email, "Remainder Random Test in Draft");
                                    }
                                    else if (dias == 45)
                                    {
                                        EmailService sendReminderEmail = new EmailService(_env);
                                        sendReminderEmail.setEmailRemainderRandomDraft();
                                        sendReminderEmail.emailBody = sendReminderEmail.emailBody.Replace("[Name]", listLogs[i].Name)
                                        .Replace("[LastName]", listLogs[i].LastName)
                                        .Replace("[Reason]", listLogs[i].Reason)
                                        .Replace("[Date]", listLogs[i].Date.ToString("dd/MM/yyyy"))
                                        .Replace("[Quarter]", listLogs[i].Quarter.ToString());
                                        sendReminderEmail.sendMail(company.Email, "Remainder Random Test in Draft");
                                    }
                                    else if (dias == 60)
                                    {
                                        EmailService sendReminderEmail = new EmailService(_env);
                                        sendReminderEmail.setEmailRemainderRandomDraft();
                                        sendReminderEmail.emailBody = sendReminderEmail.emailBody.Replace("[Name]", listLogs[i].Name)
                                        .Replace("[LastName]", listLogs[i].LastName)
                                        .Replace("[Reason]", listLogs[i].Reason)
                                        .Replace("[Date]", listLogs[i].Date.ToString("dd/MM/yyyy"))
                                        .Replace("[Quarter]", listLogs[i].Quarter.ToString());
                                        sendReminderEmail.sendMail(company.Email, "Remainder Random Test in Draft");
                                    }
                                    else if (dias == 75)
                                    {
                                        EmailService sendReminderEmail = new EmailService(_env);
                                        sendReminderEmail.setEmailRemainderRandomDraft();
                                        sendReminderEmail.emailBody = sendReminderEmail.emailBody.Replace("[Name]", listLogs[i].Name)
                                        .Replace("[LastName]", listLogs[i].LastName)
                                        .Replace("[Reason]", listLogs[i].Reason)
                                        .Replace("[Date]", listLogs[i].Date.ToString("dd/MM/yyyy"))
                                        .Replace("[Quarter]", listLogs[i].Quarter.ToString());
                                        sendReminderEmail.sendMail(company.Email, "Remainder Random Test in Draft");
                                    }
                                }
                            }
                        }
                        return listLogs;
                    }

                }
                catch (Exception)
                {
                    return null;
                }
            }
        }

        public int deleteMaintenanceNotification(int id)
        {
            List<MaintenanceAlerts> list = new List<MaintenanceAlerts>();
            var r = 0;
            using (var DbContext = new BAV02Context())
            {
                try
                {
                    list = DbContext.MaintenanceAlerts.Where(x => x.IdCompany == id).ToList();
                    DbContext.MaintenanceAlerts.RemoveRange(list);
                    DbContext.SaveChanges();
                    return r = 1;
                }
                catch (Exception)
                {
                    return r;
                }
            }
        }

        public List<Trailer> generateMaintenanceNotifications(long id)
        {
            List<Trailer> list = new List<Trailer>();

            using (var DbContext = new BAV02Context())
            {
                var t = DbContext.Trailer.Where(x => x.IdCompany == id && x.Status == "ACTIVE");
                var arreglo = t.ToArray();

                var v = DbContext.Vehicle.Where(x => x.IdCompany == id && x.Status == "ACTIVE");
                var arreglo2 = v.ToArray();

                for (int i = 0; i < arreglo.Length; i++)
                {

                    var annualInspection = DbContext.VehicleInspections.Where(x => x.IdVehicle == arreglo[i].IdTrailer && x.InspectionType == "AnnualInspection" && x.VehicleType == "TRAILER").OrderByDescending(x => x.InspectionDate).FirstOrDefault();
                    var inspection90 = DbContext.VehicleInspections.Where(x => x.IdVehicle == arreglo[i].IdTrailer && x.InspectionType == "90-dayInspection" && x.VehicleType == "TRAILER").OrderByDescending(x => x.InspectionDate).FirstOrDefault();
                    var inspection45 = DbContext.VehicleInspections.Where(x => x.IdVehicle == arreglo[i].IdTrailer && x.InspectionType == "45-dayInspection" && x.VehicleType == "TRAILER").OrderByDescending(x => x.InspectionDate).FirstOrDefault();
                    try
                    {
                        if (annualInspection != null)
                        {
                            if (annualInspection.InspectionDate != null)
                            {
                                var nextInspection = annualInspection.InspectionDate.AddDays(365);
                                days = (nextInspection - currentDate).TotalDays;
                                if (days >= -425)
                                {
                                    if (days <= 90 && days >= 61)
                                    {
                                        message = "Annual Inspection is due on " + annualInspection.InspectionDate.AddDays(365).ToString("MM/dd/yyyy"); color = "info"; createMAlerts(arreglo[i].IdTrailer, arreglo[i].IdCompany, "TRAILER", arreglo[i].TrailerNumber);
                                    }
                                    else if (days <= 60 && days >= 31)
                                    {
                                        message = "Annual Inspection is due on " + annualInspection.InspectionDate.AddDays(365).ToString("MM/dd/yyyy"); color = "warning"; createMAlerts(arreglo[i].IdTrailer, arreglo[i].IdCompany, "TRAILER", arreglo[i].TrailerNumber);
                                    }
                                    else if (days <= 30 && days >= 1)
                                    {
                                        message = "Annual Inspection is due on " + annualInspection.InspectionDate.AddDays(365).ToString("MM/dd/yyyy"); color = "danger"; createMAlerts(arreglo[i].IdTrailer, arreglo[i].IdCompany, "TRAILER", arreglo[i].TrailerNumber);
                                    }
                                    else if (days <= 0)
                                    {
                                        message = "Annual Inspection was due on " + annualInspection.InspectionDate.AddDays(365).ToString("MM/dd/yyyy"); color = "danger"; createMAlerts(arreglo[i].IdTrailer, arreglo[i].IdCompany, "TRAILER", arreglo[i].TrailerNumber);
                                    }
                                }
                            }
                        }
                    }
                    catch (Exception)
                    {
                    }

                    try
                    {
                        if (inspection90 != null)
                        {
                            if (inspection90.InspectionDate != null)
                            {
                                var nextInspection = inspection90.InspectionDate.AddDays(90);
                                days = (nextInspection - currentDate).TotalDays;
                                if (days >= -425)
                                {
                                    if (days <= 21 && days >= 15)
                                    {
                                        message = "90-Day Inspection is due on " + inspection90.InspectionDate.AddDays(90).ToString("MM/dd/yyyy");
                                        color = "info";
                                        createMAlerts(arreglo[i].IdTrailer, arreglo[i].IdCompany, "TRAILER", arreglo[i].TrailerNumber);
                                    }
                                    else if (days <= 14 && days >= 8)
                                    {
                                        message = "90-Day Inspection is due on " + inspection90.InspectionDate.AddDays(90).ToString("MM/dd/yyyy");
                                        color = "warning";
                                        createMAlerts(arreglo[i].IdTrailer, arreglo[i].IdCompany, "TRAILER", arreglo[i].TrailerNumber);
                                    }
                                    else if (days <= 7 && days >= 1)
                                    {
                                        message = "90-Day Inspection is due on " + inspection90.InspectionDate.AddDays(90).ToString("MM/dd/yyyy");
                                        color = "danger";
                                        createMAlerts(arreglo[i].IdTrailer, arreglo[i].IdCompany, "TRAILER", arreglo[i].TrailerNumber);
                                    }
                                    else if (days <= 0)
                                    {
                                        message = "90-Day Inspection was due on " + inspection90.InspectionDate.AddDays(90).ToString("MM/dd/yyyy");
                                        color = "danger";
                                        createMAlerts(arreglo[i].IdTrailer, arreglo[i].IdCompany, "TRAILER", arreglo[i].TrailerNumber);
                                    }
                                }
                            }
                        }
                    }
                    catch (Exception)
                    {
                    }

                    try
                    {
                        if (arreglo[i].PlateExpiration != null)
                        {
                            days = (arreglo[i].PlateExpiration - currentDate).TotalDays;
                            if (days <= 90 && days >= 61)
                            {
                                message = "Registration expires on " + arreglo[i].PlateExpiration.ToString("MM/dd/yyyy");
                                color = "info";
                                createMAlerts(arreglo[i].IdTrailer, arreglo[i].IdCompany, "TRAILER", arreglo[i].TrailerNumber);
                            }
                            else if (days <= 60 && days >= 31)
                            {
                                message = "Registration expires on " + arreglo[i].PlateExpiration.ToString("MM/dd/yyyy");
                                color = "warning";
                                createMAlerts(arreglo[i].IdTrailer, arreglo[i].IdCompany, "TRAILER", arreglo[i].TrailerNumber);
                            }
                            else if (days <= 30 && days >= 1)
                            {
                                message = "Registration expires on " + arreglo[i].PlateExpiration.ToString("MM/dd/yyyy");
                                color = "danger";
                                createMAlerts(arreglo[i].IdTrailer, arreglo[i].IdCompany, "TRAILER", arreglo[i].TrailerNumber);
                            }
                            else if (days < 0)
                            {
                                message = "Registration expired on " + arreglo[i].PlateExpiration.ToString("MM/dd/yyyy");
                                color = "danger";
                                createMAlerts(arreglo[i].IdTrailer, arreglo[i].IdCompany, "TRAILER", arreglo[i].TrailerNumber);
                            }
                        }
                    }
                    catch (Exception)
                    {
                    }


                    try
                    {
                        if (inspection45 != null)
                        {
                            if (inspection45.InspectionDate != null)
                            {
                                var nextInspection = inspection45.InspectionDate.AddDays(45);
                                days = (nextInspection - currentDate).TotalDays;
                                if (days >= -425)
                                {
                                    if (days <= 21 && days >= 15)
                                    {
                                        message = "45-Day Inspection is due on " + inspection45.InspectionDate.AddDays(45).ToString("MM/dd/yyyy");
                                        color = "info";
                                        createMAlerts(arreglo[i].IdTrailer, arreglo[i].IdCompany, "TRAILER", arreglo[i].TrailerNumber);
                                    }
                                    else if (days <= 14 && days >= 8)
                                    {
                                        message = "45-Day Inspection is due on " + inspection45.InspectionDate.AddDays(45).ToString("MM/dd/yyyy");
                                        color = "warning";
                                        createMAlerts(arreglo[i].IdTrailer, arreglo[i].IdCompany, "TRAILER", arreglo[i].TrailerNumber);
                                    }
                                    else if (days <= 7 && days >= 1)
                                    {
                                        message = "45-Day Inspection is due on " + inspection45.InspectionDate.AddDays(45).ToString("MM/dd/yyyy");
                                        color = "danger";
                                        createMAlerts(arreglo[i].IdTrailer, arreglo[i].IdCompany, "TRAILER", arreglo[i].TrailerNumber);
                                    }
                                    else if (days <= 0)
                                    {
                                        message = "45-Day Inspection was due on " + inspection45.InspectionDate.AddDays(45).ToString("MM/dd/yyyy");
                                        color = "danger";
                                        createMAlerts(arreglo[i].IdTrailer, arreglo[i].IdCompany, "TRAILER", arreglo[i].TrailerNumber);
                                    }
                                }
                            }
                        }
                    }
                    catch (Exception)
                    {

                    }
                    /* try
                     {
                         if (arreglo[i].InsuranceExpiration != null)
                         {
                             string n = arreglo[i].InsuranceExpiration.ToString();
                             int x = Convert.ToInt16(arreglo[i].PolicyTerm.Substring(0, 2));
                             days = (Convert.ToDateTime(n) - currentDate).TotalDays;
                             if (days <= -90 && days >= -61) { message = "Insurance Policy expires on " + Convert.ToDateTime(n).ToString("MM/dd/yyyy"); color = "info"; createMAlerts(arreglo[i].IdTrailer, arreglo[i].IdCompany, "TRAILER", arreglo[i].TrailerNumber); }
                             else if (days <= -60 && days >= -31) { message = "Insurance Policy expires on " + Convert.ToDateTime(n).ToString("MM/dd/yyyy"); color = "warning"; createMAlerts(arreglo[i].IdTrailer, arreglo[i].IdCompany, "TRAILER", arreglo[i].TrailerNumber); }
                             else if (days <= -30 && days >= -1) { message = "Insurance Policy expires on " + Convert.ToDateTime(n).ToString("MM/dd/yyyy"); color = "danger"; createMAlerts(arreglo[i].IdTrailer, arreglo[i].IdCompany, "TRAILER", arreglo[i].TrailerNumber); }
                             else if (days < 0) { message = "Insurance Policy expired on " + Convert.ToDateTime(n).ToString("MM/dd/yyyy"); color = "danger"; createMAlerts(arreglo[i].IdTrailer, arreglo[i].IdCompany, "TRAILER", arreglo[i].TrailerNumber); }
                         }
                     }
                     catch (Exception)
                     {
                     }*/
                }

                for (int i = 0; i < arreglo2.Length; i++)
                {

                    var annualInspection = DbContext.VehicleInspections.Where(x => x.IdVehicle == arreglo2[i].Id && x.InspectionType == "AnnualInspection" && x.VehicleType == "VEHICLE").OrderByDescending(x => x.InspectionDate).FirstOrDefault();
                    var inspection90 = DbContext.VehicleInspections.Where(x => x.IdVehicle == arreglo2[i].Id && x.InspectionType == "90-dayInspection" && x.VehicleType == "VEHICLE").OrderByDescending(x => x.InspectionDate).FirstOrDefault();
                    var inspection45 = DbContext.VehicleInspections.Where(x => x.IdVehicle == arreglo2[i].Id && x.InspectionType == "45-dayInspection" && x.VehicleType == "VEHICLE").OrderByDescending(x => x.InspectionDate).FirstOrDefault();

                    try
                    {
                        if (annualInspection != null)
                        {
                            if (annualInspection.InspectionDate != null)
                            {
                                var nextInspection = annualInspection.InspectionDate.AddDays(365);
                                days = (nextInspection - currentDate).TotalDays;
                                if (days >= -425)
                                {
                                    if (days <= 90 && days >= 61)
                                    {
                                        message = "Annual Inspection is due on " + annualInspection.InspectionDate.AddDays(365).ToString("MM/dd/yyyy"); color = "info"; createMAlerts(arreglo2[i].Id, arreglo2[i].IdCompany, "VEHICLE", arreglo2[i].VehicleNumber);
                                    }
                                    else if (days <= 60 && days >= 31)
                                    {
                                        message = "Annual Inspection is due on " + annualInspection.InspectionDate.AddDays(365).ToString("MM/dd/yyyy"); color = "warning"; createMAlerts(arreglo2[i].Id, arreglo2[i].IdCompany, "VEHICLE", arreglo2[i].VehicleNumber);
                                    }
                                    else if (days <= 30 && days >= 1)
                                    {
                                        message = "Annual Inspection is due on " + annualInspection.InspectionDate.AddDays(365).ToString("MM/dd/yyyy"); color = "danger"; createMAlerts(arreglo2[i].Id, arreglo2[i].IdCompany, "VEHICLE", arreglo2[i].VehicleNumber);
                                    }
                                    else if (days <= 0) { message = "Annual Inspection was due on " + annualInspection.InspectionDate.AddDays(365).ToString("MM/dd/yyyy"); color = "danger"; createMAlerts(arreglo2[i].Id, arreglo2[i].IdCompany, "VEHICLE", arreglo2[i].VehicleNumber); }
                                }
                            }
                        }
                    }
                    catch (Exception)
                    {
                    }

                    try
                    {
                        if (inspection90 != null)
                        {
                            if (inspection90.InspectionDate != null)
                            {
                                var nextInspection = inspection90.InspectionDate.AddDays(90);
                                days = (nextInspection - currentDate).TotalDays;
                                if (days >= -425)
                                {
                                    if (days <= 21 && days >= 15)
                                    {
                                        message = "90-Day Inspection is due on " + inspection90.InspectionDate.AddDays(90).ToString("MM/dd/yyyy"); color = "info"; createMAlerts(arreglo2[i].Id, arreglo2[i].IdCompany, "VEHICLE", arreglo2[i].VehicleNumber);
                                    }
                                    else if (days <= 14 && days >= 8)
                                    {
                                        message = "90-Day Inspection is due on " + inspection90.InspectionDate.AddDays(90).ToString("MM/dd/yyyy"); color = "warning"; createMAlerts(arreglo2[i].Id, arreglo2[i].IdCompany, "VEHICLE", arreglo2[i].VehicleNumber);
                                    }
                                    else if (days <= 7 && days >= 1)
                                    {
                                        message = "90-Day Inspection is due on " + inspection90.InspectionDate.AddDays(90).ToString("MM/dd/yyyy"); color = "danger"; createMAlerts(arreglo2[i].Id, arreglo2[i].IdCompany, "VEHICLE", arreglo2[i].VehicleNumber);
                                    }
                                    else if (days <= 0)
                                    {
                                        message = "90-Day Inspection was due on " + inspection90.InspectionDate.AddDays(90).ToString("MM/dd/yyyy"); color = "danger"; createMAlerts(arreglo2[i].Id, arreglo2[i].IdCompany, "VEHICLE", arreglo2[i].VehicleNumber);
                                    }
                                }
                            }
                        }
                    }
                    catch (Exception)
                    {
                    }

                    try
                    {
                        if (arreglo2[i].PlateExpiration != null)
                        {
                            days = (arreglo2[i].PlateExpiration - currentDate).TotalDays;
                            if (days <= 90 && days >= 61) { message = "Registration expires on " + arreglo2[i].PlateExpiration.ToString("MM/dd/yyyy"); color = "info"; createMAlerts(arreglo2[i].Id, arreglo2[i].IdCompany, "VEHICLE", arreglo2[i].VehicleNumber); }
                            else if (days <= 60 && days >= 16) { message = "Registration expires on " + arreglo2[i].PlateExpiration.ToString("MM/dd/yyyy"); color = "warning"; createMAlerts(arreglo2[i].Id, arreglo2[i].IdCompany, "VEHICLE", arreglo2[i].VehicleNumber); }
                            else if (days <= 15 && days >= 0) { message = "Registration expires on " + arreglo2[i].PlateExpiration.ToString("MM/dd/yyyy"); color = "danger"; createMAlerts(arreglo2[i].Id, arreglo2[i].IdCompany, "VEHICLE", arreglo2[i].VehicleNumber); }
                            else if (days < 0) { message = "Registration expired on " + arreglo2[i].PlateExpiration.ToString("MM/dd/yyyy"); color = "danger"; createMAlerts(arreglo2[i].Id, arreglo2[i].IdCompany, "VEHICLE", arreglo2[i].VehicleNumber); }
                        }
                    }
                    catch (Exception)
                    {
                    }
                    try
                    {
                        if (inspection45 != null)
                        {
                            if (inspection45.InspectionDate != null)
                            {
                                var nextInspection = inspection45.InspectionDate.AddDays(45);
                                days = (nextInspection - currentDate).TotalDays;
                                if (days >= -425)
                                {
                                    if (days <= 21 && days >= 15)
                                    {
                                        message = "45-Day Inspection is due on " + inspection45.InspectionDate.AddDays(45).ToString("MM/dd/yyyy");
                                        color = "info";
                                        createMAlerts(arreglo2[i].Id, arreglo2[i].IdCompany, "VEHICLE", arreglo2[i].VehicleNumber);
                                    }
                                    else if (days <= 14 && days >= 8)
                                    {
                                        message = "45-Day Inspection is due on " + inspection45.InspectionDate.AddDays(45).ToString("MM/dd/yyyy");
                                        color = "warning";
                                        createMAlerts(arreglo2[i].Id, arreglo2[i].IdCompany, "VEHICLE", arreglo2[i].VehicleNumber);
                                    }
                                    else if (days <= 7 && days >= 1)
                                    {
                                        message = "45-Day Inspection is due on " + inspection45.InspectionDate.AddDays(45).ToString("MM/dd/yyyy");
                                        color = "danger";
                                        createMAlerts(arreglo2[i].Id, arreglo2[i].IdCompany, "VEHICLE", arreglo2[i].VehicleNumber);
                                    }
                                    else if (days <= 0)
                                    {
                                        message = "45-Day Inspection was due on " + inspection45.InspectionDate.AddDays(45).ToString("MM/dd/yyyy");
                                        color = "danger";
                                        createMAlerts(arreglo2[i].Id, arreglo2[i].IdCompany, "VEHICLE", arreglo2[i].VehicleNumber);
                                    }
                                }
                            }
                        }
                    }
                    catch (Exception)
                    {

                    }
                    /*try
                    {
                        if (arreglo2[i].InsuranceExpiration != null)
                        {
                            string n = arreglo2[i].InsuranceExpiration.ToString();
                            int x = Convert.ToInt16(arreglo2[i].PolicyTerm.Substring(0, 2));
                            days = (Convert.ToDateTime(n) - currentDate).TotalDays;
                            if (days <= -90 && days >= -61) { message = "Insurance Policy expires on " + Convert.ToDateTime(n).ToString("MM/dd/yyyy"); color = "info"; createMAlerts(arreglo2[i].Id, arreglo2[i].IdCompany, "VEHICLE", arreglo2[i].VehicleNumber); }
                            else if (days <= -60 && days >= -16) { message = "Insurance Policy expires on " + Convert.ToDateTime(n).ToString("MM/dd/yyyy"); color = "warning"; createMAlerts(arreglo2[i].Id, arreglo2[i].IdCompany, "VEHICLE", arreglo2[i].VehicleNumber); }
                            else if (days <= -15 && days >= -1) { message = "Insurance Policy expires on " + Convert.ToDateTime(n).ToString("MM/dd/yyyy"); color = "danger"; createMAlerts(arreglo2[i].Id, arreglo2[i].IdCompany, "VEHICLE", arreglo2[i].VehicleNumber); }
                            else if (days < 0) { message = "Insurance Policy expired on " + Convert.ToDateTime(n).ToString("MM/dd/yyyy"); color = "danger"; createMAlerts(arreglo2[i].Id, arreglo2[i].IdCompany, "VEHICLE", arreglo2[i].VehicleNumber); }
                        }
                    }
                    catch (Exception)
                    {
                    }*/
                }
                list = t.ToList();
                return list;
            }

        }

        public int deleteCompanyNotification(int id)
        {
            List<CompanyAlerts> list = new List<CompanyAlerts>();
            var r = 0;
            using (var DbContext = new BAV02Context())
            {
                try
                {
                    list = DbContext.CompanyAlerts.Where(x => x.IdCompany == id).ToList();
                    DbContext.CompanyAlerts.RemoveRange(list);
                    DbContext.SaveChanges();
                    return r = 1;
                }
                catch (Exception)
                {
                    return r;
                }
            }
        }
        public bool generateCompanyNotifications(long id)
        {
            var r = false;

            using (var DbContext = new BAV02Context())
            {
                try
                {
                    var ci = DbContext.CompanyInsurance.Where(x => x.IdCompany == id).OrderByDescending(x => x.PolicyDate).FirstOrDefault();
                    Company c = new Company();

                    if (ci != null)
                    {
                        string insuranceDate = ci.PolicyDate.ToString();
                        days = (Convert.ToDateTime(insuranceDate).AddMonths(ci.PolicyTerm) - currentDate).TotalDays;

                        if (days <= 90 && days >= 61) { message = "Insurance Policy expires on " + Convert.ToDateTime(insuranceDate).AddMonths(ci.PolicyTerm).ToString("MM/dd/yyyy"); color = "info"; createCAlerts(ci.IdCompany); }
                        else if (days <= 60 && days >= 16) { message = "Insurance Policy expires on " + Convert.ToDateTime(insuranceDate).AddMonths(ci.PolicyTerm).ToString("MM/dd/yyyy"); color = "warning"; createCAlerts(ci.IdCompany); }
                        else if (days <= 15 && days >= 1) { message = "Insurance Policy expires on " + Convert.ToDateTime(insuranceDate).AddMonths(ci.PolicyTerm).ToString("MM/dd/yyyy"); color = "danger"; createCAlerts(ci.IdCompany); }
                        else if (days <= 0) { message = "Insurance Policy expired on " + Convert.ToDateTime(insuranceDate).AddMonths(ci.PolicyTerm).ToString("MM/dd/yyyy"); color = "danger"; createCAlerts(ci.IdCompany); }
                    }

                    c = DbContext.Company.Where(x => x.Id == id).FirstOrDefault();
                    a.validationCAlerts(c);
                    r = true;
                    return r;
                }
                catch
                {
                    return r;
                }

            }

        }

        public int createDAlerts(long id, long idd, string NameDriver)
        {
            var r = 0;
            try
            {
                DriverAlerts d = new DriverAlerts();
                using (var DbContext = new BAV02Context())
                {
                    var n = DbContext.DriverAlerts.Where(x => x.Message == message && x.IdDriver == idd).FirstOrDefault();
                    if (n == null)
                    {
                        d.IdDriver = idd;
                        d.IdCompany = Convert.ToInt32(id);
                        d.Message = message;
                        d.Severy = color;
                        d.DriverName = NameDriver;
                        DbContext.Add(d);
                    }
                    else
                    {
                        n.Severy = color;
                        var update = DbContext.Attach(n);
                        update.Property(x => x.Severy).IsModified = true;
                    }
                    DbContext.SaveChanges();
                }
            }
            catch (Exception e)
            {
                r = 1;
                Console.WriteLine("Hubo exception");
                Console.WriteLine(e);
            }
            return r;
        }

        public int createMAlerts(long idt, long idc, string type, string economicNumber)
        {
            var r = 0;
            try
            {
                MaintenanceAlerts m = new MaintenanceAlerts();
                using (var DbContext = new BAV02Context())
                {
                    var id = Convert.ToInt32(idc);
                    var n = DbContext.MaintenanceAlerts.Where(x => x.Message == message && x.TypeId == type && x.IdVehicle == idt).FirstOrDefault();
                    if (n == null)
                    {
                        m.Message = message;
                        m.Severy = color;
                        m.TypeId = type;
                        m.EconomicNumber = economicNumber;
                        m.IdCompany = id;
                        m.IdVehicle = idt;
                        DbContext.Add(m);
                    }
                    else
                    {
                        n.Severy = color;
                        var update = DbContext.Attach(n);
                        update.Property(x => x.Severy).IsModified = true;
                    }
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { r = 1; }


            return r;
        }

        public int createCAlerts(long idc)
        {
            var r = 0;
            try
            {
                CompanyAlerts c = new CompanyAlerts();
                using (var DbContext = new BAV02Context())
                {
                    var n = DbContext.CompanyAlerts.Where(x => x.Message == message && x.IdCompany == idc).FirstOrDefault();
                    if (n == null)
                    {
                        c.Message = message;
                        c.Severy = color;
                        c.IdCompany = idc;
                        DbContext.Add(c);
                    }
                    else
                    {
                        n.Severy = color;
                        var update = DbContext.Attach(n);
                        update.Property(x => x.Severy).IsModified = true;
                    }
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { r = 1; }


            return r;
        }

        /// <summary>
        /// Get Previous employer data
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Object getDataPEmployer(long id)
        {
            CityDAL cityDAL = new CityDAL();
            StatesDAL statesDAL = new StatesDAL();
            List<City> lstCities = new List<City>();
            List<State> lstStates = new List<State>();
            lstCities = cityDAL.GetCities().ToList();
            lstStates = statesDAL.GetStates().ToList();


            var r = new Object();
            try
            {
                using (var DbContext = new BAV02Context())
                {


                    r = (from e in DbContext.EmploymentRecords
                         join s in lstStates
                         on e.State equals s.Id
                         join ci in lstCities
                         on e.City equals ci.Id
                         where e.IdDriver == id
                         select new
                         {
                             e.Id,
                             e.EmployerName,
                             e.Address,
                             State = s.Name,
                             City = ci.Name,
                             e.Zip,
                             e.DateFrom,
                             e.DateTo,
                             e.PositionHeld,
                             e.Email,
                             e.Telephone
                         }).OrderByDescending(x => x.Id).FirstOrDefault();
                    return r;
                }
            }
            catch (Exception) { r = null; return r; }
        }


        /// <summary>
        /// save record of sent Letter of Inquiry  Flata de pasar
        /// </summary>
        /// <param name="i"></param>
        /// <returns></returns>
        public int saveLetterofInquiry(LetterInquiry i)
        {
            using (var DbContext = new BAV02Context())
            {
                using (var transaction = DbContext.Database.BeginTransaction())
                {

                    try
                    {
                        if (DbContext.LetterInquiry.Where(x => x.IdEmployeeRecord == i.IdEmployeeRecord).FirstOrDefault() == null)
                        {
                            DbContext.Add(i);
                            DbContext.SaveChanges();
                            var password = DbContext.Users.FromSql($"select PWDENCRYPT({"usert" + i.Id}) as Password").Select(x => x.Password).FirstOrDefault();
                            var u = new Users { Name = "User", LastName = "Temporary", Password = password, Email = "userT" + (i.Id + DateTime.Now.Millisecond / 2) + "@bluagent.com", Role = "TEMPORARY", Status = "ACTIVE", IdInquiry = i.Id };
                            DbContext.Add(u);
                            DbContext.SaveChanges();
                            transaction.Commit();
                            return 0;
                        }
                        else { return 1; }
                    }
                    catch (Exception)
                    {
                        transaction.Rollback();
                        return 2;

                    }
                }

            }
        }

        /// <summary>
        /// Get Letter of Inquiry
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public Table getLetterofInquiry(long idu, int page, int size)
        {
            CityDAL cityDAL = new CityDAL();
            StatesDAL statesDAL = new StatesDAL();
            List<City> lstCities = new List<City>();
            List<State> lstStates = new List<State>();

            lstCities = cityDAL.GetCities().ToList();
            lstStates = statesDAL.GetStates().ToList();

            Table t = new Table { Items = new List<object>(), CurrentPage = 0, NumberP = 0 };

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var inq = (from i in DbContext.LetterInquiry
                               join e in DbContext.EmploymentRecords
                               on i.IdEmployeeRecord equals e.Id
                               join s in lstStates
                               on e.State equals s.Id
                               join ci in lstCities
                               on e.City equals ci.Id
                               where i.IdDriver == idu
                               select new
                               {
                                   i.Id,
                                   i.IdEmployeeRecord,
                                   i.Comment,
                                   PreviousEmployerName = e.EmployerName,
                                   PreviousEmployerAddress = e.Address,
                                   PreviousEmployerEmail = e.Email,
                                   State = s.Name,
                                   City = ci.Name,
                                   e.Zip,
                                   e.DateFrom,
                                   e.DateTo,
                                   e.PositionHeld,
                                   PreviousEmployerPhone = e.Telephone,
                                   i.DateMailed,
                                   i.Question1,
                                   i.Question2,
                                   i.Question3,
                                   i.Question4,
                                   i.Question5,
                                   AddressInquiry = i.Address,
                                   i.Name,
                                   i.CompletedByName,
                                   i.Section382,
                                   i.CompletedByTitle,
                                   i.Signature,
                                   i.SapphoneNumber,
                                   i.NewEmployerName,
                                   i.NewEmployerAddress,
                                   i.DriverName,
                                   i.DateSent,
                                   i.CompletedBySignature,
                                   CompletedBySignatureFile = imgEmployer(i.IdCompany.Value, i.Id),
                                   CompleteAddress = GetAddress(i.Address, ci.Name, s.Name, e.Zip),
                                   NewEmployerEmail = i.Email,
                                   NewEmployerPhone = i.PhoneNumber,
                                   DateSignature = DateTime.Now.ToString("MM/dd/yyyy"),
                                   YearsActive = string.Format("{0} years - From {1} To {2}", e.DateTo.Year - e.DateFrom.Year, e.DateFrom.ToString("MM/dd/yyyy"), e.DateTo.Date.ToString("MM/dd/yyyy"))
                               }).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList<Object>();
                    var count = Math.Ceiling((DbContext.LetterInquiry.Where(x => x.IdDriver == idu).Select(x => x.Id).Count() / (double)size));
                    t.Items = inq;
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }
            }
            catch (Exception) { }

            return t;
        }
        /// <summary>
        /// ///////////////////////////////////////////////////
        public Table getLetterInAndEmployHis(long idu, long IdEmploymentRecord)
        {
            Table t = new Table { Items = new List<object>() };
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
                    var inq = (from eh in DbContext.EmploymentHistory
                               join er in DbContext.EmploymentRecords
                               on eh.IdEmploymentRecord equals er.Id
                               join s in lstStates
                               on er.State equals s.Id
                               join ci in lstCities
                               on er.City equals ci.Id
                               join u in DbContext.Users
                               on eh.IdDriver equals u.Id
                               join d in DbContext.Driver
                               on u.Id equals d.IdUser
                               join li in DbContext.LetterInquiry
                               on eh.IdEmploymentRecord equals li.IdEmployeeRecord
                               where eh.IdDriver == idu && eh.IdEmploymentRecord == IdEmploymentRecord
                               select new
                               {
                                   eh.Id,
                                   eh.IdEmploymentRecord,
                                   eh.DateMailed,
                                   eh.NewEmployerName,
                                   eh.NewEmployerAddress,
                                   NewEmployerEmail = eh.Email,
                                   NewEmployerPhone = eh.PhoneNumber,
                                   eh.IdDriver,
                                   eh.DriverName,
                                   DriverLicense = d.License,
                                   DriverLicenseFile = imgLicense(eh.IdCompany.Value, eh.IdDriver.Value),
                                   DriverBirthday = u.Birthdate.Value.Date,
                                   DriverPhone = u.PhoneNumber,
                                   PreviousEmployerName = er.EmployerName,
                                   PreviousEmployerAddress = er.Address,
                                   PreviousEmployerEmail = er.Email,
                                   PreviousEmployerPhone = er.Telephone,
                                   DriverSignature = imgSignature(eh.IdCompany.Value, eh.IdDriver.Value),
                                   DateSignature = DateTime.Now.ToString("MM/dd/yyyy"),
                                   er.PositionHeld,
                                   YearsActive = string.Format("{0} years - From {1} To {2}", er.DateTo.Year - er.DateFrom.Year, er.DateFrom.ToString("MM/dd/yyyy"), er.DateTo.Date.ToString("MM/dd/yyyy")),
                                   er.DateFrom,
                                   er.DateTo,
                                   eh.Question1,
                                   eh.Question2,
                                   eh.Question3,
                                   eh.Question4,
                                   eh.Question5,
                                   eh.Question6,
                                   eh.RemarkQuestion6,
                                   eh.Question7,
                                   eh.Question8,
                                   eh.Question9,
                                   QualityWork = eh.Quality,
                                   eh.Cooperation,
                                   SafetyHabits = eh.Safety,
                                   PersonalHabits = eh.Personal,
                                   DrivingSkill = eh.Driving,
                                   eh.Attitude,
                                   eh.Remarks,
                                   eh.Title,
                                   AccidentRecord = DbContext.AccidentRegister.Where(ar => ar.IdDriver == idu).ToList(),
                                   eh.Comment,
                                   eh.Signature,
                                   LIQuestion1 = li.Question1,
                                   LIQuestion2 = li.Question2,
                                   LIQuestion3 = li.Question3,
                                   LIQuestion4 = li.Question4,
                                   LIQuestion5 = li.Question5,
                                   li.Section382,
                                   li.CompletedByName,
                                   li.CompletedByTitle,
                                   CompletedBySignatureFile = imgEmployer(li.IdCompany.Value, li.Id),

                               }).ToList<Object>();
                    t.Items = inq;
                }
            }
            catch (Exception) { }
            return t;
        }
        /// </summary>
        /// <param name="idInquiry"></param>
        /// 
        /// <returns></returns>
        //////////////////////////////////////////////////////////////////////
        public Table getOneLetterofInquiry(long idInquiry)
        {
            Table t = new Table { Items = new List<object>() };
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
                    var inq = (from i in DbContext.LetterInquiry
                               join e in DbContext.EmploymentRecords
                               on i.Id equals e.Id
                               join s in lstStates
                               on e.State equals s.Id
                               join ci in lstCities
                               on e.City equals ci.Id
                               where i.IdDriver == idInquiry
                               select new
                               {
                                   i.Id,
                                   i.IdEmployeeRecord,
                                   i.Comment,
                                   e.EmployerName,
                                   e.Address,
                                   State = s.Name,
                                   City = ci.Name,
                                   e.Zip,
                                   e.DateFrom,
                                   e.DateTo,
                                   e.PositionHeld,
                                   e.Telephone,
                                   i.DateMailed,
                                   i.Email,
                                   i.PhoneNumber,
                                   i.Question1,
                                   i.Question2,
                                   i.Question3,
                                   i.Question4,
                                   i.Question5,
                                   AddressInquiry = i.Address,
                                   i.Name,
                                   i.CompletedByName,
                                   i.Section382,
                                   i.CompletedByTitle,
                                   i.Signature,
                                   i.SapphoneNumber,
                                   i.NewEmployerName,
                                   i.NewEmployerAddress,
                                   NewEmployerEmail = i.Email,
                                   NewEmployerPhone = i.PhoneNumber,
                                   i.DriverName,
                                   i.DateSent,
                                   i.CompletedBySignature,
                                   EmployerSignature = imgEmployer(i.IdCompany.Value, i.Id)
                               }).ToList<Object>();
                    t.Items = inq;
                }
            }
            catch (Exception) { }
            return t;
        }

        public Table getOneEmploymentHistory(long idu)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 0, NumberP = 0 };
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
                    var emph = (from eh in DbContext.EmploymentHistory
                                join er in DbContext.EmploymentRecords
                                on eh.IdEmploymentRecord equals er.Id
                                join s in lstStates
                                on er.State equals s.Id
                                join ci in lstCities
                                on er.City equals ci.Id
                                join u in DbContext.Users
                                on eh.IdDriver equals u.Id
                                join d in DbContext.Driver
                                on u.Id equals d.IdUser
                                where eh.IdDriver == idu
                                select new
                                {
                                    eh.Id,
                                    eh.IdEmploymentRecord,
                                    eh.DateMailed,
                                    eh.NewEmployerName,
                                    eh.NewEmployerAddress,
                                    NewEmployerEmail = eh.Email,
                                    NewEmployerPhone = eh.PhoneNumber,
                                    eh.IdDriver,
                                    eh.DriverName,
                                    DriverLicense = d.License,
                                    DriverLicenseFile = imgLicense(eh.IdCompany.Value, eh.IdDriver.Value),
                                    DriverBirthday = u.Birthdate.Value.Date,
                                    DriverPhone = u.PhoneNumber,
                                    PreviousEmployerName = er.EmployerName,
                                    PreviousEmployerAddress = er.Address,
                                    PreviousEmployerEmail = er.Email,
                                    PreviousEmployerPhone = er.Telephone,
                                    DriverSignature = imgSignature(eh.IdCompany.Value, eh.IdDriver.Value),
                                    DateSignature = DateTime.Now.ToString("MM/dd/yyyy"),
                                    er.PositionHeld,
                                    YearsActive = string.Format("{0} years - From {1} To {2}", er.DateTo.Year - er.DateFrom.Year, er.DateFrom.ToString("MM/dd/yyyy"), er.DateTo.Date.ToString("MM/dd/yyyy")),
                                    er.DateFrom,
                                    er.DateTo,
                                    eh.Question1,
                                    eh.Question2,
                                    eh.Question3,
                                    eh.Question4,
                                    eh.Question5,
                                    eh.Question6,
                                    eh.RemarkQuestion6,
                                    eh.Question7,
                                    eh.Question8,
                                    eh.Question9,
                                    QualityWork = eh.Quality,
                                    eh.Cooperation,
                                    SafetyHabits = eh.Safety,
                                    PersonalHabits = eh.Personal,
                                    DrivingSkill = eh.Driving,
                                    eh.Attitude,
                                    eh.Remarks,
                                    eh.Title,
                                    AccidentRecord = DbContext.AccidentRegister.Where(ar => ar.IdDriver == idu).ToList(),
                                    eh.Comment
                                }).ToList<Object>();
                    t.Items = emph;
                }
            }
            catch (Exception) { }
            return t;
        }

        /// <summary>
        /// save record of sent Employment History  Flata de pasar
        /// </summary>
        /// <param name="i"></param>
        /// <returns></returns>
        public int saveEmploymentHistory(EmploymentHistory eh)
        {

            using (var DbContext = new BAV02Context())
            {
                using (var transaction = DbContext.Database.BeginTransaction())
                {
                    try
                    {
                        if (DbContext.EmploymentHistory.Where(x => x.Id == eh.Id).FirstOrDefault() == null)
                        {
                            DbContext.Add(eh);
                            DbContext.SaveChanges();
                            transaction.Commit();
                            return 0;
                        }
                        else { return 1; }
                    }
                    catch (Exception) { transaction.Rollback(); return 2; }
                }
            }

        }

        /// <summary>
        ///                             Flata de pasar
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public Table getEmploymentHistory(long idu, int page, int size)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 0, NumberP = 0 };
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
                    var emph = (from eh in DbContext.EmploymentHistory
                                join er in DbContext.EmploymentRecords
                                on eh.IdEmploymentRecord equals er.Id
                                join s in lstStates
                                on er.State equals s.Id
                                join ci in lstCities
                                on er.City equals ci.Id
                                join u in DbContext.Users
                                on eh.IdDriver equals u.Id
                                join d in DbContext.Driver
                                on u.Id equals d.IdUser
                                where eh.IdDriver == idu
                                select new
                                {
                                    eh.Id,
                                    eh.IdEmploymentRecord,
                                    eh.DateMailed,
                                    eh.NewEmployerName,
                                    eh.NewEmployerAddress,
                                    NewEmployerEmail = eh.Email,
                                    NewEmployerPhone = eh.PhoneNumber,
                                    eh.IdDriver,
                                    eh.DriverName,
                                    DriverLicense = d.License,
                                    DriverLicenseFile = imgLicense(eh.IdCompany.Value, eh.IdDriver.Value),
                                    DriverBirthday = u.Birthdate.Value.Date,
                                    DriverPhone = u.PhoneNumber,
                                    PreviousEmployerName = er.EmployerName,
                                    PreviousEmployerAddress = er.Address,
                                    PreviousEmployerEmail = er.Email,
                                    PreviousEmployerPhone = er.Telephone,
                                    DriverSignature = imgSignature(eh.IdCompany.Value, eh.IdDriver.Value),
                                    DateSignature = DateTime.Now.ToString("MM/dd/yyyy"),
                                    er.PositionHeld,
                                    YearsActive = string.Format("{0} years - From {1} To {2}", er.DateTo.Year - er.DateFrom.Year, er.DateFrom.ToString("MM/dd/yyyy"), er.DateTo.Date.ToString("MM/dd/yyyy")),
                                    er.DateFrom,
                                    er.DateTo,
                                    eh.Question1,
                                    eh.Question2,
                                    eh.Question3,
                                    eh.Question4,
                                    eh.Question5,
                                    eh.Question6,
                                    eh.RemarkQuestion6,
                                    eh.Question7,
                                    eh.Question8,
                                    eh.Question9,
                                    QualityWork = eh.Quality,
                                    eh.Cooperation,
                                    SafetyHabits = eh.Safety,
                                    PersonalHabits = eh.Personal,
                                    DrivingSkill = eh.Driving,
                                    eh.Attitude,
                                    eh.Remarks,
                                    eh.Title,
                                    AccidentRecord = DbContext.AccidentRegister.Where(ar => ar.IdDriver == idu).ToList(),
                                    eh.Comment
                                }).Distinct().OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList<Object>();

                    var count = Math.Ceiling((DbContext.EmploymentHistory.Where(x => x.IdDriver == idu).Select(x => x.Id).Count() / (double)size));
                    t.Items = emph;
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }
            }
            catch (Exception) { }
            return t;
        }


        public Table getLetterInAndEmploymentHistory(long idu, int page, int size)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 0, NumberP = 0 };
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
                    var emph = (from eh in DbContext.EmploymentHistory
                                join er in DbContext.EmploymentRecords
                                on eh.IdEmploymentRecord equals er.Id
                                join s in lstStates
                                on er.State equals s.Id
                                join ci in lstCities
                                on er.City equals ci.Id
                                join u in DbContext.Users
                                on eh.IdDriver equals u.Id
                                join d in DbContext.Driver
                                on u.Id equals d.IdUser
                                join li in DbContext.LetterInquiry
                                on eh.IdEmploymentRecord equals li.IdEmployeeRecord
                                where eh.IdDriver == idu
                                select new
                                {
                                    eh.Id,
                                    eh.IdEmploymentRecord,
                                    eh.DateMailed,
                                    eh.NewEmployerName,
                                    eh.NewEmployerAddress,
                                    NewEmployerEmail = eh.Email,
                                    NewEmployerPhone = eh.PhoneNumber,
                                    eh.IdDriver,
                                    eh.DriverName,
                                    DriverLicense = d.License,
                                    DriverLicenseFile = imgLicense(eh.IdCompany.Value, eh.IdDriver.Value),
                                    DriverBirthday = u.Birthdate.Value.Date,
                                    DriverPhone = u.PhoneNumber,
                                    PreviousEmployerName = er.EmployerName,
                                    PreviousEmployerAddress = er.Address,
                                    PreviousEmployerEmail = er.Email,
                                    PreviousEmployerPhone = er.Telephone,
                                    DriverSignature = imgSignature(eh.IdCompany.Value, eh.IdDriver.Value),
                                    DateSignature = DateTime.Now.ToString("MM/dd/yyyy"),
                                    er.PositionHeld,
                                    YearsActive = string.Format("{0} years - From {1} To {2}", er.DateTo.Year - er.DateFrom.Year, er.DateFrom.ToString("MM/dd/yyyy"), er.DateTo.Date.ToString("MM/dd/yyyy")),
                                    er.DateFrom,
                                    er.DateTo,
                                    eh.Question1,
                                    eh.Question2,
                                    eh.Question3,
                                    eh.Question4,
                                    eh.Question5,
                                    eh.Question6,
                                    eh.RemarkQuestion6,
                                    eh.Question7,
                                    eh.Question8,
                                    eh.Question9,
                                    eh.Signature,
                                    QualityWork = eh.Quality,
                                    eh.Cooperation,
                                    SafetyHabits = eh.Safety,
                                    PersonalHabits = eh.Personal,
                                    DrivingSkill = eh.Driving,
                                    eh.Attitude,
                                    eh.Remarks,
                                    eh.Title,
                                    AccidentRecord = DbContext.AccidentRegister.Where(ar => ar.IdDriver == idu).ToList(),
                                    eh.Comment,
                                    LIQuestion1 = li.Question1,
                                    LIQuestion2 = li.Question2,
                                    LIQuestion3 = li.Question3,
                                    LIQuestion4 = li.Question4,
                                    LIQuestion5 = li.Question5,
                                    li.Section382,
                                    li.CompletedByName,
                                    li.CompletedByTitle,
                                    CompletedBySignatureFile = imgEmployer(eh.IdCompany.Value, eh.Id),

                                }).Distinct().OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList<Object>();

                    var count = Math.Ceiling((DbContext.EmploymentHistory.Where(x => x.IdDriver == idu).Select(x => x.Id).Count() / (double)size));
                    t.Items = emph;
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }
            }
            catch (Exception) { }
            return t;
        }

        /// <summary>
        /// Save Annual Review DMV Falta de pasar
        /// </summary>
        /// <param name="ar"></param>
        /// <returns></returns>
        public int saveAnnualReviewDMV(AnnualDmvreview ar)
        {

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    DateTime newDate = DateTime.Now;
                    var anr = DbContext.AnnualDmvreview.Where(x => x.IdDriver == ar.IdDriver).OrderByDescending(x => x.Id).FirstOrDefault();

                    if (anr == null)
                    {
                        var idC = DbContext.CompanyUsersRoles.Where(x => x.IdUser == ar.IdDriver && x.Status == "ACTIVE").FirstOrDefault().IdCompany;
                        ar.IdCompany = idC;
                        DbContext.Add(ar);
                        DbContext.SaveChanges();
                        return 0;
                    }
                    else
                    {
                        TimeSpan dif = newDate - (DateTime)anr.DateReview;
                        if (dif.Days >= 364)
                        {
                            var idC = DbContext.CompanyUsersRoles.Where(x => x.IdUser == ar.IdDriver && x.Status == "ACTIVE").FirstOrDefault().IdCompany;
                            ar.IdCompany = idC;
                            DbContext.Add(ar);
                            DbContext.SaveChanges();
                            return 0;
                        }
                        else { return 1; }
                    }
                }
            }
            catch (Exception) { return 2; }

        }

        /// <summary>
        /// Get Annual Review DMV list  Falta de pasar
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public Table getAnnualReviewDMV(long idu, int page, int size, int? idLoggedUser = null, int? idCompany = null)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 0, NumberP = 0 };

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
                    if (idLoggedUser.HasValue && idCompany.HasValue && idLoggedUser != 0 && idCompany != 0)
                    {
                        var user = DbContext.Users.Where(u => u.Id == idLoggedUser).SingleOrDefault();
                        var arL = (from ar in DbContext.AnnualDmvreview
                                   join c in DbContext.Company on ar.IdCompany equals c.Id
                                   join states in lstStates on c.PhysicalState equals states.Id
                                   join cities in lstCities on c.PhysicalCity equals cities.Id
                                   where ar.IdDriver == idu
                                   select new
                                   {
                                       ar.Id,
                                       ar.MotorCarrier,
                                       ar.DateReview,
                                       ar.QuestionA,
                                       ar.QuestionB,
                                       ReviewedBy = String.Concat(user.Name, " ", user.LastName),
                                       ReviewedBySignature = imgUserSignature(idCompany.Value, idLoggedUser.Value),
                                       CompanyPhone = c.PhoneNumber,
                                       CompanyEmail = c.Email,
                                       CompanyAddress = String.Concat(c.PhysicalAddress, ' ', cities.Name, ' ', states.Name, ' ', c.PhysicalZip),
                                       DateSignature = DateTime.Now.ToString("MM/dd/yyyy"),
                                   }).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList<Object>();
                        var count = Math.Ceiling((DbContext.AnnualDmvreview.Where(x => x.IdDriver == idu).Select(x => x.Id).Count() / (double)size));
                        t.Items = arL;
                        t.CurrentPage = page;
                        t.NumberP = (int)count;
                    }
                    else
                    {
                        var arL = (from ar in DbContext.AnnualDmvreview
                                   join c in DbContext.Company on ar.IdCompany equals c.Id
                                   join states in lstStates on c.PhysicalState equals states.Id
                                   join cities in lstCities on c.PhysicalCity equals cities.Id
                                   where ar.IdDriver == idu
                                   select new
                                   {
                                       ar.Id,
                                       ar.MotorCarrier,
                                       ar.DateReview,
                                       ar.QuestionA,
                                       ar.QuestionB,
                                       ReviewedBy = "",
                                       ReviewedBySignature = "",
                                       CompanyPhone = c.PhoneNumber,
                                       CompanyEmail = c.Email,
                                       CompanyAddress = String.Concat(c.PhysicalAddress, ' ', cities.Name, ' ', states.Name, ' ', c.PhysicalZip),
                                       DateSignature = DateTime.Now.ToString("MM/dd/yyyy"),
                                   }).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList<Object>();
                        var count = Math.Ceiling((DbContext.AnnualDmvreview.Where(x => x.IdDriver == idu).Select(x => x.Id).Count() / (double)size));
                        t.Items = arL;
                        t.CurrentPage = page;
                        t.NumberP = (int)count;
                    }

                }
            }
            catch (Exception) { }

            return t;
        }

        /// <summary>
        ///  save Violation  Falta de pasar
        /// </summary>
        /// <param name="ac"></param>
        /// <returns></returns>
        public int saveViolation(AnnualDriversCertification ac)
        {

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var idC = DbContext.CompanyUsersRoles.Where(x => x.IdUser == ac.IdDriver && x.Status == "ACTIVE").FirstOrDefault().IdCompany;
                    ac.IdCompany = idC;
                    ac.Status = "ACTIVE";
                    DbContext.Add(ac);
                    DbContext.SaveChanges();
                    return 0;
                }

            }
            catch (Exception) { return 1; }

        }

        /// <summary>
        /// Get Violations list  Falta de pasar
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public Table getViolations(long idu, int page, int size)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 0, NumberP = 0 };

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var v = DbContext.AnnualDriversCertification.Where(x => x.IdDriver == idu && x.Status == "ACTIVE").Select(x => new { x.Id, x.ViolationDate, x.Offense, x.Location }).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList<Object>();
                    var count = Math.Ceiling((DbContext.AnnualDriversCertification.Where(x => x.IdDriver == idu && x.Status == "ACTIVE").Select(x => x.Id).Count() / (double)size));
                    t.Items = v;
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }
            }
            catch (Exception) { }
            return t;
        }

        /// <summary>
        /// Get Certification Of Violations list  Falta de pasar
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public Table getCertificationOfViolations(long idu, int page, int size)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 0, NumberP = 0 };

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var cv = (from ac in DbContext.AnnualDriversCertification
                              join d in DbContext.Driver on ac.IdDriver equals d.IdUser
                              where ac.IdDriver == idu && ac.Status == "CERTIFICATE"
                              select new
                              {
                                  ac.CertificationDate,
                                  Company = (DbContext.Company.Where(x => x.Id == ac.IdCompany).FirstOrDefault().LegalName),
                                  CompanyAddress = (DbContext.Company.Where(x => x.Id == ac.IdCompany).FirstOrDefault().PhysicalAddress),
                                  ac.Id,
                                  ac.ViolationDate,
                                  ac.Offense,
                                  ac.Location,
                                  ac.TypeVehicleOperated,
                                  DriverLicenseFile = imgLicense(ac.IdCompany.Value, ac.IdDriver.Value),
                                  DriverSignature = imgSignature(ac.IdCompany.Value, ac.IdDriver.Value)
                              }).Distinct().OrderByDescending(x => x.CertificationDate).GroupBy(x => x.CertificationDate).Skip((page - 1) * size).Take(size).ToList<Object>();
                    var count = Math.Ceiling((DbContext.AnnualDriversCertification.Where(x => x.IdDriver == idu && x.Status == "CERTIFICATE").Select(x => new { x.CertificationDate }).OrderByDescending(x => x.CertificationDate).GroupBy(x => x.CertificationDate).ToList().Count() / (double)size));
                    t.Items = cv;
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }
            }
            catch (Exception) { }

            return t;
        }

        /// <summary>
        /// certify violations   Falta de subir
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int certificateViolations(long id)
        {

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    DateTime newDate = DateTime.Now;
                    var c = DbContext.AnnualDriversCertification.Where(x => x.IdDriver == id && x.Status == "CERTIFICATE").OrderByDescending(x => x.Id).FirstOrDefault();
                    var v = DbContext.AnnualDriversCertification.Where(x => x.IdDriver == id && x.Status == "ACTIVE").OrderByDescending(x => x.Id).FirstOrDefault();
                    if (c == null)
                    {
                        if (v != null)
                        {
                            var list = DbContext.AnnualDriversCertification.Where(x => x.IdDriver == id && x.Status == "ACTIVE").ToList();
                            foreach (AnnualDriversCertification p in list)
                            {
                                p.Status = "CERTIFICATE";
                                p.CertificationDate = DateTime.Now;
                            }
                            DbContext.UpdateRange(list);
                        }
                        else
                        {
                            var idC = DbContext.CompanyUsersRoles.Where(x => x.IdUser == id && x.Status == "ACTIVE").FirstOrDefault().IdCompany;
                            var a = new AnnualDriversCertification { IdDriver = id, IdCompany = idC, CertificationDate = DateTime.Now, Offense = "N/A", Location = "N/A", TypeVehicleOperated = "N/A", Status = "CERTIFICATE" };
                            DbContext.Add(a);
                        }
                        DbContext.SaveChanges();
                        return 0;
                    }
                    else
                    {
                        TimeSpan dif = newDate - (DateTime)c.CertificationDate;
                        if (dif.Days >= 365)
                        {
                            if (v != null)
                            {
                                var list = DbContext.AnnualDriversCertification.Where(x => x.IdDriver == id && x.Status == "ACTIVE").ToList();
                                foreach (AnnualDriversCertification p in list)
                                {
                                    p.Status = "CERTIFICATE";
                                    p.CertificationDate = DateTime.Now;
                                }
                                DbContext.UpdateRange(list);
                            }
                            else
                            {
                                var idd = DbContext.Driver.Where(x => x.Id == id).FirstOrDefault().IdUser;
                                var idC = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idd && x.Status == "ACTIVE").FirstOrDefault().IdCompany;
                                var a = new AnnualDriversCertification { IdDriver = id, IdCompany = idC, CertificationDate = DateTime.Now, Offense = "N/A", Location = "N/A", TypeVehicleOperated = "N/A", Status = "CERTIFICATE" };
                                DbContext.Add(a);
                            }
                            DbContext.SaveChanges();
                            return 0;
                        }
                        else { return 1; }
                    }

                }
            }
            catch (Exception ex)
            {
                throw ex;
                //return 2; 
            }

        }

        public List<DrugAlcoholCompliance> saveEditDrugAlcoholTest(DrugAlcoholCompliance compliance)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var resultado = DbContext.DrugAlcoholCompliance.Where(x => x.Id == compliance.Id).FirstOrDefault();
                    resultado.Reason = compliance.Reason;
                    resultado.Specimen = compliance.Specimen;
                    resultado.Result = compliance.Result;
                    resultado.DateApplication = compliance.DateApplication;
                    resultado.Form = compliance.Form;
                    DbContext.SaveChanges();
                    var listaDrugTestCompliance = DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == compliance.IdDriver && x.TypeTest == compliance.TypeTest).OrderByDescending(x => x.Id).ToList();
                    return listaDrugTestCompliance;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        ///  save the drug/alcohol test
        /// </summary>
        /// <param name="complience"></param>
        /// <param name="specimenNumber"></param>
        /// <returns></returns>
        public int saveDrugAlcoholTest(DrugAlcoholCompliance compliance, string specimenNumber, string typeTest)
        {
            if (specimenNumber != null) { valid = false; compliance.Specimen = specimenNumber; }

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    using (var transaction = DbContext.Database.BeginTransaction())
                    {
                        try
                        {
                            compliance.Created = DateTime.Now;
                            DbContext.Add(compliance);
                            DbContext.SaveChanges();

                            if (specimenNumber != null)
                            {
                                var IdCompliance = DbContext.DrugAlcoholCompliance.Where(x => x.Specimen == specimenNumber).OrderByDescending(x => x.Id).FirstOrDefault().Id;
                                if (typeTest == "Drug")
                                {
                                    var driver = DbContext.DrugTest.Where(x => x.SpecimenNumber == specimenNumber).FirstOrDefault();
                                    driver.IdDrugAlcoholCompliance = IdCompliance;
                                    var updateDrugTest = DbContext.Attach(driver);
                                    updateDrugTest.Property(x => x.IdDrugAlcoholCompliance).IsModified = true;
                                }
                                else
                                {
                                    var driver = DbContext.AlcoholTest.Where(x => x.TestNumber == specimenNumber).FirstOrDefault();
                                    driver.IdDrugAlcoholCompliance = IdCompliance;
                                    var updateAlcoholTest = DbContext.Attach(driver);
                                    updateAlcoholTest.Property(x => x.IdDrugAlcoholCompliance).IsModified = true;
                                }
                                DbContext.SaveChanges();

                            }
                            transaction.Commit();
                            return 0;
                        }
                        catch (Exception) { transaction.Rollback(); return 1; }
                    }
                }
            }
            catch (Exception) { return 1; }
        }

        /// <summary>
        ///  Get Drug and Alcohol Test for type of test       Falta de subir
        /// </summary>
        /// <param name="idu">user ID</param>
        /// <param name="page">number of page you wish to view from the data</param>
        /// <param name="size">number of records per page</param>
        /// <param name="type">type of test "drug or alcohol"</param>
        /// <returns></returns>
        public Table getDrugAndAlcoholTests(long idd, long idu, int page, int size, string type)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 0, NumberP = 0 };

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var pe = DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == idd && x.TypeTest == type).Select(x => new { x.IdDriver, x.Id, x.Specimen, x.DateApplication, x.ResultFile, x.Result, x.TypeTest, x.Reason, x.Form }).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList<Object>();
                    var count = Math.Ceiling((DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == idd && x.TypeTest == type).Select(x => x.Id).Count() / (double)size));
                    t.Items = pe;
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }
            }
            catch (Exception) { }

            return t;
        }

        /// <summary>
        /// save Mecical Certificate     Flata de pasar
        /// </summary>
        /// <param name="i"></param>
        /// <returns></returns>
        public int saveMecicalCertificate(MedicalCertificate m)
        {

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var xx = DbContext.MedicalCertificate.Where(x => x.IdDriver == m.IdDriver).OrderByDescending(x => x.Id).Take(1).FirstOrDefault();

                    DbContext.Add(m);
                    DbContext.SaveChanges();

                    if (xx != null)
                    {
                        dateOld = Convert.ToDateTime(xx.ExpirationDate);
                        var dateNew = m.ExpirationDate;
                        if (dateOld < dateNew) { a.deleteDAlerts((long)m.IdDriver, dateOld.ToString("MM/dd/yyyy")); }
                    }

                    return 0;
                }
            }
            catch (Exception) { return 1; }

        }

        public bool DeleteMedicalCertificate(long id, string medicalCertificateID, long idDriver)
        {
            using (var DbContext = new BAV02Context())
            {
                var medicalCertificate = DbContext.MedicalCertificate
                    .Where(mc => mc.Id == id && mc.MedicalCertificateId == medicalCertificateID && mc.IdDriver == idDriver)
                    .FirstOrDefault();

                if (medicalCertificate != null)
                {
                    DbContext.MedicalCertificate.Remove(medicalCertificate);
                    DbContext.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        /// <summary>
        ///  Get Medical Certificates          falta de pasar
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public Table getMedicalCertificates(long idu, int page, int size)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 0, NumberP = 0 };

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var mc = DbContext.MedicalCertificate.Where(x => x.IdDriver == idu).Select(x => new { x.IdDriver, x.Id, x.MedicalCertificateId, x.ExpirationDate, x.IssueDate, x.MedicalFile }).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList<Object>();
                    var count = Math.Ceiling((DbContext.MedicalCertificate.Where(x => x.IdDriver == idu).Select(x => x.Id).Count() / (double)size));
                    t.Items = mc;
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }
            }
            catch (Exception) { }

            return t;
        }

        /// <summary>
        /// Get Road Test Data  Falta de subir
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Object getRoadTestData(long id)
        {

            try
            {
                using (var DbContext = new BAV02Context())
                {

                    var e = DbContext.DrivingExperience
                        .Where(x => x.IdDriver == id)
                        .Select(x => new { x.IdDexperience, x.TypeEquipment, x.ClassEquipment })
                        .OrderByDescending(x => x.IdDexperience)
                        .FirstOrDefault();
                    return e;
                }
            }
            catch (Exception)
            {
                return 1;
            }
        }


        /// <summary>
        /// Get MultiEmployment Data  Falta de Subir
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int[] getDataME(long id)
        {
            var r = new int[2];
            r[0] = 0; r[1] = 0;

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var c = DbContext.MedicalCertificate.Where(x => x.IdDriver == id).OrderByDescending(x => x.Id).FirstOrDefault();
                    if (c != null && c.ExpirationDate > DateTime.Now) { r[0] = 1; }
                    var p = DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == id && x.Reason == "Pre-employment").FirstOrDefault();
                    if (p != null) { r[1] = 1; }
                }

            }
            catch (Exception) { }

            return r;
        }

        /// <summary>
        /// Chage Password
        /// </summary>
        /// <param name="password"></param>
        /// <param name="id"></param>
        /// <param name="newPassword"></param>
        /// <param name="cNewPassword"></param>
        /// <returns></returns>
        public int changePassword(string password, long id, string newPassword)
        {

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var idu = DbContext.Driver.Where(x => x.Id == id).Select(x => x.IdUser).FirstOrDefault();
                    Users user = DbContext.Users.FromSql($"select * from AC.Users where Id = {idu} and PWDCOMPARE({password},Password) = 1").Select(x => new Users { Id = x.Id }).FirstOrDefault();
                    if (user != null)
                    {
                        user.Password = (byte[])DbContext.Users.FromSql($"select PWDENCRYPT({newPassword}) as Password").Select(x => x.Password).FirstOrDefault();
                        var entrada = DbContext.Attach(user);
                        entrada.Property(x => x.Password).IsModified = true;
                        DbContext.SaveChanges();
                        return 0;
                    }
                    else { return 1; }
                }
            }
            catch (Exception) { return 2; }

        }

        /// <summary>
        /// Get Driver Fitness
        /// </summary>
        /// <param name="id"></param>
        /// <param name="license"></param>
        /// <returns></returns>
        public List<int> getDriverFitness(long id)
        {
            var list = new List<int>();

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    // 1 - Pre-Employment
                    var pe = DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == id && x.Reason == "Pre-employment").OrderByDescending(x => x.Id).FirstOrDefault();
                    if (pe == null)
                    {
                        list.Add(1);
                    }
                    else
                    {
                        list.Add(0);
                    }

                    // 2 - Employment Application
                    var eap = DbContext.EmploymentApplication.Where(x => x.IdDriver == id).OrderByDescending(x => x.Id).FirstOrDefault();
                    if (eap == null)
                    {
                        list.Add(1);
                    }
                    else
                    {
                        list.Add(0);
                    }

                    // //var li = DbContext.LetterInquiry.Where(x => x.IdDriver == id).OrderByDescending(x => x.Id).FirstOrDefault();
                    // //if (rec == null || li == null)
                    // if (rec == null)
                    // {
                    //     list.Add(1);
                    // }
                    // else
                    // {
                    //     if (li.IdEmployeeRecord == rec.Id)
                    //     {
                    //         list.Add(0);
                    //     }
                    //     else
                    //     {
                    //         list.Add(1);
                    //     }
                    // }

                    // 3 - Employment History
                    var rec = DbContext.EmploymentRecords.Where(x => x.IdDriver == id).OrderByDescending(x => x.Id).FirstOrDefault();
                    var eh = DbContext.EmploymentHistory.Where(x => x.IdDriver == id).OrderByDescending(x => x.Id).FirstOrDefault();
                    if (rec == null || eh == null)
                    {
                        list.Add(1);
                    }
                    else
                    {
                        if (eh.IdEmploymentRecord == rec.Id)
                        {
                            list.Add(0);
                        }
                        else
                        {
                            list.Add(1);
                        }
                    }

                    // 4 - DMV Record
                    var dmv = DbContext.Dmv.Where(x => x.IdDriver == id).OrderByDescending(x => x.ExpirationDate).FirstOrDefault();
                    if (dmv == null)
                    {
                        list.Add(1);
                    }
                    else
                    {
                        if (DateTime.Compare((DateTime)dmv.ExpirationDate, DateTime.Now) >= 0)
                        {
                            list.Add(0);
                        }
                        else
                        {
                            list.Add(1);
                        }
                    }

                    // 5 - Road Test
                    var road = DbContext.RoadTest.Where(x => x.IdDriver == id).FirstOrDefault();
                    if (road != null)
                    {
                        list.Add(0);
                    }
                    else
                    {
                        list.Add(1);
                    }

                    // 6 - Medical Certificate
                    var medical = DbContext.MedicalCertificate.Where(x => x.IdDriver == id).OrderByDescending(x => (DateTime)x.ExpirationDate >= DateTime.Now).FirstOrDefault();
                    //int count = 0;
                    if (medical == null)
                    {
                        list.Add(1);
                    }
                    else
                    {
                        Console.WriteLine(JsonConvert.SerializeObject(medical, Formatting.Indented));

                        if (DateTime.Compare((DateTime)medical.ExpirationDate, DateTime.Now) >= 0)
                        {
                            list.Add(0);
                        }
                        else
                        {
                            list.Add(1);
                        }


                    }

                    // 7 - Annual DMV Review
                    var ar = DbContext.AnnualDmvreview.Where(x => x.IdDriver == id).OrderByDescending(x => x.Id).FirstOrDefault();
                    if (ar == null)
                    {
                        list.Add(1);
                    }
                    else
                    {
                        if (DateTime.Compare(((DateTime)ar.DateReview).AddDays(365), DateTime.Now) >= 0)
                        {
                            list.Add(0);
                        }
                        else
                        {
                            list.Add(1);
                        }
                    }

                    // 8 - Annual Certification of Violations
                    var cv = DbContext.AnnualDriversCertification.Where(x => x.IdDriver == id && x.Status == "CERTIFICATE").OrderByDescending(x => x.Id).FirstOrDefault();
                    if (cv == null)
                    {
                        list.Add(1);
                    }
                    else
                    {
                        if (DateTime.Compare(((DateTime)cv.CertificationDate).AddDays(365), DateTime.Now) >= 0)
                        {
                            list.Add(0);
                        }
                        else
                        {
                            list.Add(1);
                        }
                    }

                    // var ch = DbContext.PreEmploymentInquery.Where(x => x.IdDriver == idDriver && x.Status == "Prohibited").OrderByDescending(x => x.Id).FirstOrDefault();
                    // if (ch == null)
                    // {
                    //     list.Add(1);
                    // }
                    // else
                    // {
                    //     if (DateTime.Compare(((DateTime)cv.Date).AddDays(365), DateTime.Now) >= 0)
                    //     {
                    //         list.Add(0);
                    //     }
                    //     else
                    //     {
                    //         list.Add(1);
                    //     }
                    // }

                    // 9 - Clearing House
                    var userDriver = DbContext.Driver.Where(x => x.IdUser == id).OrderByDescending(x => x.Id).FirstOrDefault();
                    if (userDriver.PasswordCH == null || userDriver.UserNameCH == null)
                    {
                        list.Add(1);
                    }
                    else
                    {
                        list.Add(0);
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return list;
        }

        /// <summary>
        /// Save RoadTest
        /// </summary>
        /// <param name="r"></param>
        /// <returns></returns>
        public int SaveRoadTest(RoadTest r)
        {

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    DbContext.Add(r);
                    DbContext.SaveChanges();

                    return 0;
                }
            }
            catch (Exception) { return 1; }

        }

        /// <summary>
        /// Get RoadTest list
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <param name="idc"></param>
        /// <returns></returns>
        public Table GetRoadTests(long idu, int page, int size, long idc, long idLoggedUser)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 0, NumberP = 0 };

            try
            {
                using (var DbContext = new BAV02Context())
                {


                    if (idc > 0)
                    {
                        var user = DbContext.Users.Where(u => u.Id == idLoggedUser).FirstOrDefault();

                        var mc = (from rt in DbContext.RoadTest
                                  where rt.IdDriver == idu
                                  select new
                                  {
                                      rt.Id,
                                      rt.IdDriver,
                                      rt.IdCompany,
                                      rt.DriverName,
                                      rt.Ssn,
                                      rt.License,
                                      rt.StateLicense,
                                      rt.TypeEquipment,
                                      rt.ClassEquipment,
                                      rt.TypeBus,
                                      rt.DateC,
                                      rt.CompanyName,
                                      rt.CompanyAddress,
                                      rt.Title,
                                      rt.PretripInspection,
                                      rt.CouplinAndUncoupling,
                                      rt.PlacingComercial,
                                      rt.CommercialMotorVehicle,
                                      rt.TourungCommercialMotor,
                                      rt.BreakingAndSlowCommercial,
                                      rt.BackingAndParkingCommercial,
                                      rt.RoadTestPerformedBy,
                                      rt.OperatingCommercialMotor,
                                      rt.FileSignatureDer,
                                      DerName = String.Concat(user.Name + " " + user.LastName),
                                      ReviewDate = DateTime.Now.ToString("MM/dd/yyyy"),
                                      DerSignature = imgUserSignature(idc, idLoggedUser),
                                      DriverLicenseFile = imgLicense(idc, idu),
                                  }).Distinct().OrderByDescending(x => x.Id).Skip((page - 1) * size)
                            .Take(size).ToList<object>();

                        var count = Math.Ceiling((DbContext.RoadTest
                            .Where(x => x.IdCompany == idc && x.IdDriver == idu)
                            .Select(x => x.Id).Count() / (double)size));
                        t.Items = mc;
                        t.CurrentPage = page;
                        t.NumberP = (int)count;
                    }
                    else
                    {
                        var mc = DbContext.RoadTest
                            .Where(x => x.IdDriver == idu)
                            .OrderByDescending(x => x.Id).Skip((page - 1) * size)
                            .Take(size).ToList<Object>();

                        var count = Math.Ceiling((DbContext.RoadTest
                            .Where(x => x.IdDriver == idu)
                            .Select(x => x.Id).Count() / (double)size));
                        t.Items = mc;
                        t.CurrentPage = page;
                        t.NumberP = (int)count;
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error: {ex}");
            }

            return t;
        }

        /// <summary>
        /// Save Employment Aplication
        /// </summary>
        /// <param name="ea"></param>
        /// <param name="de"></param>
        /// <param name="da"></param>
        /// <param name="dar"></param>
        /// <param name="dtc"></param>
        /// <param name="der"></param>
        /// <returns></returns>
        public int SaveEmploymentApplication(EmploymentApplication ea, List<object> de, List<object> da, List<object> dar, List<object> dtc, List<object> der)
        {
            StatesDAL statesDAL = new StatesDAL();
            List<State> lstStates = new List<State>();
            lstStates = statesDAL.GetStates().ToList();


            using (var DbContext = new BAV02Context())
            {
                using (var transaction = DbContext.Database.BeginTransaction())
                {
                    try
                    {
                        ea.StateLicense = lstStates.Where(x => x.Id == Convert.ToInt64(ea.StateLicense)).FirstOrDefault().Name;
                        DbContext.Add(ea);
                        DbContext.SaveChanges();
                        #region 
                        foreach (DrivingExperience i in de)
                        {
                            var rde = new Readexperience { IdEmploymentAplication = ea.Id, IdDrivingExperience = i.IdDexperience };
                            DbContext.Add(rde);
                        }
                        foreach (AccidentRecord ra in dar)
                        {
                            var rra = new Rearaccident { IdEmploymentAplication = ea.Id, IdDraccident = ra.Id };
                            DbContext.Add(rra);
                        }
                        foreach (TrafficConvictions tc in dtc)
                        {
                            var rtc = new Reatconvictions { IdEaplication = ea.Id, IdTrafficConvictions = tc.Id };
                            DbContext.Add(rtc);
                        }
                        foreach (EmploymentRecords er in der)
                        {
                            var rer = new Reaerecords { IdEmploymentAplication = ea.Id, IdEmploymentRecords = er.Id };
                            DbContext.Add(rer);
                        }
                        foreach (DriverAddress a in da)
                        {
                            var rda = new Reaaddress { IdEmploymentAplication = ea.Id, IdDaddress = a.Id };
                            DbContext.Add(rda);
                        }

                        DbContext.SaveChanges();
                        #endregion
                        transaction.Commit();
                        return 0;
                    }
                    catch (Exception) { transaction.Rollback(); return 1; }
                }
            }

        }

        /// <summary>
        /// Get Employment Application 
        /// </summary>
        /// <param name="idD"></param>
        /// <param name="idC"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public Table getEmploymentApplication(long idD, long idC, int page, int size)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 0, NumberP = 0 };

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var cv = (from ea in DbContext.EmploymentApplication
                              where ea.IdDriver == idD && ea.IdCompany == idC
                              select new
                              {
                                  ea.Id,
                                  ea.CompanyName,
                                  ea.CompanyAddress,
                                  Address = ea.City + ", " + ea.State + ", " + ea.ZipCode,
                                  ea.DriverName,
                                  ea.DriverLastName,
                                  ea.License,
                                  ea.StateLicense,
                                  ea.TypeLicense,
                                  ea.DateExpiration,
                                  ea.DriverDob,
                                  ea.FileSignatureD,
                                  ea.Ssn,
                                  ea.QuestionA,
                                  ea.QuestionB,
                                  //ea.Csz, TODO: cHANGE FOR CITY, STATE AND ZIPCODE
                                  ex = (from e in DbContext.Readexperience
                                        where e.IdEmploymentAplication == ea.Id
                                        join ex in DbContext.DrivingExperience on e.IdDrivingExperience equals ex.IdDexperience
                                        select new
                                        {
                                            ex.IdDexperience,
                                            ex.ClassEquipment,
                                            ex.TypeEquipment,
                                            ex.DateFrom,
                                            ex.DateTo,
                                            ex.TotalMilesDriven
                                        })
                                        .OrderByDescending(x => x.IdDexperience)
                                        .ToList(),
                                  ad = (from a in DbContext.Reaaddress
                                        where a.IdEmploymentAplication == ea.Id
                                        join ad in DbContext.DriverAddress on a.IdDaddress equals ad.Id
                                        select new
                                        {
                                            ad.Id,
                                            ad.Street,
                                            City = GetCityName(ad.IdCity.Value),
                                            State = GetStateNameByCityID(ad.IdCity.Value),
                                            ad.HowLong,
                                            ad.ZipCode,
                                            ad.DateOf,
                                            ad.DateTo
                                        })
                                        .OrderByDescending(x => x.Id)
                                        .ToList(),
                                  ac = (from ac in DbContext.Rearaccident
                                        where ac.IdEmploymentAplication == ea.Id
                                        join acd in DbContext.AccidentRecord on ac.IdDraccident equals acd.Id
                                        select new
                                        {
                                            acd.Id,
                                            acd.DateAccident,
                                            acd.NatureAccident,
                                            acd.Fatalities,
                                            acd.Injuries
                                        })
                                        .OrderByDescending(x => x.Id)
                                        .ToList(),
                                  tc = (from tc in DbContext.Reatconvictions
                                        where tc.IdEaplication == ea.Id
                                        join tcd in DbContext.TrafficConvictions on tc.IdTrafficConvictions equals tcd.Id
                                        select new
                                        {
                                            tcd.Id,
                                            tcd.Locations,
                                            tcd.ConvictionDate,
                                            tcd.Change,
                                            tcd.Penalty
                                        })
                                        .OrderByDescending(x => x.Id)
                                        .ToList(),
                                  dr = (from dr in DbContext.Reaerecords
                                        where dr.IdEmploymentAplication == ea.Id
                                        join drc in DbContext.EmploymentRecords on dr.IdEmploymentRecords equals drc.Id
                                        select new
                                        {
                                            drc.Id,
                                            drc.EmployerName,
                                            drc.Telephone,
                                            drc.Address,
                                            drc.PositionHeld,
                                            drc.DateFrom,
                                            drc.DateTo,
                                            drc.Salary,
                                            drc.SubjectToRegulation,
                                            drc.SubjectToTesting,
                                            drc.Zip
                                        })
                                        .OrderByDescending(x => x.Id)
                                        .ToList(),
                              })
                              .OrderByDescending(x => x.Id).Skip((page - 1) * size)
                              .Take(size)
                              .ToList<Object>();

                    var count = Math.Ceiling((DbContext.EmploymentApplication
                        .Where(x => x.IdDriver == idD && x.IdCompany == idC)
                        .Select(x => new { x.Id })
                        .OrderByDescending(x => x.Id)
                        .ToList()
                        .Count() / (double)size));

                    t.Items = cv;
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }
            }
            catch (Exception) { }

            return t;
        }

        /// <summary>
        /// Save  Inquiry Answer
        /// </summary>
        /// <param name="i"></param>
        /// <returns></returns>
        public int saveInquiryAnswer(LetterInAndEmpHis i)
        {
            int r = 0;

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var LetterInquiry = DbContext.LetterInquiry.Where(x => x.IdDriver == i.IdDriver && x.IdCompany == i.IdCompany && x.IdEmployeeRecord == i.IdEmployeeRecord).FirstOrDefault();

                    //LetterInquiry LetterInquiry = new LetterInquiry();
                    LetterInquiry.SapphoneNumber = i.SAPPhoneNumber;
                    LetterInquiry.Question1 = i.Question1;
                    LetterInquiry.Question2 = i.Question2;
                    LetterInquiry.Question3 = i.Question3;
                    LetterInquiry.Question4 = i.Question4;
                    LetterInquiry.Question5 = i.Question5;
                    LetterInquiry.Address = i.Address;
                    LetterInquiry.Section382 = i.Section382;
                    LetterInquiry.CompletedByTitle = i.CompletedByTitle;
                    LetterInquiry.Signature = i.Signature;
                    LetterInquiry.Name = i.Name;
                    LetterInquiry.DateSent = i.DateSent;
                    LetterInquiry.CompletedByName = i.CompletedByName;


                    var entrada = DbContext.Attach(LetterInquiry);
                    entrada.Property(x => x.SapphoneNumber).IsModified = true;
                    entrada.Property(x => x.Question1).IsModified = true;
                    entrada.Property(x => x.Question2).IsModified = true;
                    entrada.Property(x => x.Question3).IsModified = true;
                    entrada.Property(x => x.Question4).IsModified = true;
                    entrada.Property(x => x.Question5).IsModified = true;
                    entrada.Property(x => x.Address).IsModified = true;
                    entrada.Property(x => x.Section382).IsModified = true;
                    entrada.Property(x => x.CompletedByTitle).IsModified = true;
                    entrada.Property(x => x.Signature).IsModified = true;
                    entrada.Property(x => x.Name).IsModified = true;
                    entrada.Property(x => x.DateSent).IsModified = true;
                    entrada.Property(x => x.CompletedByName).IsModified = true;
                    DbContext.SaveChanges();
                }
                return r;
            }
            catch (Exception ex)
            {
                r = 1;
                throw ex;
            }
        }

        public List<Driver> saveCredentialsCH(Driver driver)
        {
            List<Driver> list = new List<Driver>();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var dr = DbContext.Driver.Where(x => x.IdUser == driver.IdUser).FirstOrDefault();
                    dr.UserNameCH = driver.UserNameCH;
                    dr.PasswordCH = driver.PasswordCH;
                    dr.Phone = driver.Phone;
                    dr.HaveAccount = driver.HaveAccount;
                    DbContext.SaveChanges();
                    return DbContext.Driver.Where(x => x.IdUser == driver.IdUser).ToList();
                }
            }
            catch (Exception error)
            {
                throw error;
            }
        }

        /// <summary>
        ///  Save EHistory Answer
        /// </summary>
        /// <param name="eh"></param>
        /// <returns></returns>
        public int saveEHistoryAnswer(LetterInAndEmpHis eh)
        {
            int r = 0;

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var EmploymentHistory = DbContext.EmploymentHistory.Where(x => x.IdDriver == eh.IdDriver && x.IdCompany == eh.IdCompany && x.IdEmploymentRecord == eh.IdEmployeeRecord).FirstOrDefault();
                    EmploymentHistory.Question1 = eh.Question6;
                    EmploymentHistory.Question2 = eh.Question7;
                    EmploymentHistory.Question3 = eh.Question8;
                    EmploymentHistory.Question4 = eh.Question9;
                    EmploymentHistory.Question5 = eh.Question10;
                    EmploymentHistory.Question6 = eh.Question11;
                    EmploymentHistory.Question7 = eh.Question12;
                    EmploymentHistory.Question8 = eh.Question13;
                    EmploymentHistory.Question9 = eh.Question14;
                    EmploymentHistory.Quality = eh.Quality;
                    EmploymentHistory.Safety = eh.Safety;
                    EmploymentHistory.Cooperation = eh.Cooperation;
                    EmploymentHistory.Attitude = eh.Attitude;
                    EmploymentHistory.Driving = eh.Driving;
                    EmploymentHistory.Personal = eh.Personal;
                    EmploymentHistory.Signature = eh.Signature;
                    EmploymentHistory.Name = eh.CompletedByName;
                    EmploymentHistory.Remarks = eh.Remarks;
                    EmploymentHistory.RemarkQuestion6 = eh.RemarkQuestion11;
                    EmploymentHistory.DateMailed = eh.DateSent;
                    EmploymentHistory.Title = eh.CompletedByTitle;

                    var entrada = DbContext.Attach(EmploymentHistory);
                    entrada.Property(x => x.Question1).IsModified = true;
                    entrada.Property(x => x.Question2).IsModified = true;
                    entrada.Property(x => x.Question3).IsModified = true;
                    entrada.Property(x => x.Question4).IsModified = true;
                    entrada.Property(x => x.Question5).IsModified = true;
                    entrada.Property(x => x.Question6).IsModified = true;
                    entrada.Property(x => x.Question7).IsModified = true;
                    entrada.Property(x => x.Question8).IsModified = true;
                    entrada.Property(x => x.Question9).IsModified = true;
                    entrada.Property(x => x.Quality).IsModified = true;
                    entrada.Property(x => x.Safety).IsModified = true;
                    entrada.Property(x => x.Cooperation).IsModified = true;
                    entrada.Property(x => x.Attitude).IsModified = true;
                    entrada.Property(x => x.Driving).IsModified = true;
                    entrada.Property(x => x.Personal).IsModified = true;
                    entrada.Property(x => x.Signature).IsModified = true;
                    entrada.Property(x => x.Name).IsModified = true;
                    entrada.Property(x => x.Remarks).IsModified = true;
                    entrada.Property(x => x.RemarkQuestion6).IsModified = true;
                    entrada.Property(x => x.DateMailed).IsModified = true;
                    entrada.Property(x => x.Title).IsModified = true;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception)
            {
                r = 1;
            }

            return r;
        }

        public int sendLetterOfInquiry(IHostingEnvironment _env, string email, string link, string companyName, string derName, string employee, string prevEmployer, string title)
        {
            int status = 0;
            using (var DbContext = new BAV02Context())
            {
                using (var transaction = DbContext.Database.BeginTransaction())
                {
                    try
                    {
                        EmailService sendLetterOfInquiry = new EmailService(_env);
                        sendLetterOfInquiry.setEmailTemplate($"ClientApp/{AssetsDirectory}/assets/emailTemplates/LetterOfInquiryRequest.html");

                        sendLetterOfInquiry.emailBody = sendLetterOfInquiry.emailBody.Replace("[Employees Name]", employee)
                            .Replace("[Previous Employer]", prevEmployer)
                            .Replace("[link]", link)
                            .Replace("[DerName]", derName)
                            .Replace("[Title]", title)
                            .Replace("[Company Name]", companyName);
                        sendLetterOfInquiry.addAttacHment($"ClientApp/{AssetsDirectory}/assets/img/logo/BluAgent-Logo.png");
                        sendLetterOfInquiry.sendMail(email, "Inquiry into Driver’s Safety Performance History");
                    }
                    catch (Exception)
                    {
                        transaction.Rollback(); status = 2;
                    }
                }
            }
            return status;
        }

        /// <summary>
        /// delete drug test compliance  that the collector uploads 
        /// </summary>
        /// <param name="id">id of the drug test to be eliminated</param>
        /// <returns></returns>
        public int deleteDurgTestCompliance(long id)
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var d = DbContext.DrugAlcoholCompliance.Where(x => x.Id == id).FirstOrDefault();

                    var driver = DbContext.DrugTest.Where(x => x.IdDrugAlcoholCompliance == d.Id).FirstOrDefault();
                    driver.IdDrugAlcoholCompliance = null;
                    var updateDrugTest = DbContext.Attach(driver);
                    updateDrugTest.Property(x => x.IdDrugAlcoholCompliance).IsModified = true;
                    DbContext.SaveChanges();

                    DbContext.DrugAlcoholCompliance.RemoveRange(d);
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { r = 1; }
            return r;
        }

        public int getAllDriversFitness(int idCompany)
        {
            try
            {
                var driversIds = _context.CompanyUsersRoles.Where(x => x.IdCompany == idCompany && x.Type == "DRIVER" && x.Status == "ACTIVE").Select(x => x.IdUser).ToList();
                int countZero = 0;
                var list = new List<int>();
                for (int i = 0; i < driversIds.Count(); i++)
                {
                    countZero += getDriverFitness(driversIds[i]).Count(ii => ii == 0);
                }

                return (int)Math.Ceiling(10.0 * countZero) / driversIds.Count();
            }
            catch (Exception error)
            {
                throw error;
            }
        }

        public List<Driver> GetAllDrivers()
        {

            List<Driver> list = new List<Driver>();
            try
            {
                return _context.Driver.ToList();
            }
            catch (Exception error)
            {
                throw error;
            }
        }
        public int GetAllDriversACTIVE()
        {
            List<Driver> list = new List<Driver>();
            try
            {
                return _context.Driver.Where(x => x.Status == "ACTIVE").ToList().Count();
            }
            catch (Exception error)
            {
                throw error;
            }
        }

        public int GetAllDriversINACTIVE()
        {
            List<Driver> list = new List<Driver>();
            try
            {
                return _context.Driver.Where(x => x.Status == "INACTIVE").ToList().Count();
            }
            catch (Exception error)
            {
                throw error;
            }
        }



        private string imgSignature(long idCompany, long idDriver)
        {
            string img = "";

            try
            {
                var webClient = new WebClient();
                string url = string.Format(@"https://bluagent-files.s3-us-west-2.amazonaws.com/{0}/Drivers/{1}/DriverSignature/signature.png", idCompany, idDriver);
                byte[] imageBytes = webClient.DownloadData(url);

                img = "data:image/png;base64, " + Convert.ToBase64String(imageBytes);
            }
            catch (Exception ex)
            {
                //img = "";
                //throw new Exception($"Error: {ex} - {img}");
                Console.WriteLine(ex);
                return null;
            }

            return img;
        }

        private string imgUserSignature(long idCompany, long idUser)
        {
            string img = "";

            try
            {
                var webClient = new WebClient();
                string url = string.Format(@"https://bluagent-files.s3-us-west-2.amazonaws.com/{0}/Users/{1}/signature.png", idCompany, idUser);
                byte[] imageBytes = webClient.DownloadData(url);

                img = "data:image/png;base64, " + Convert.ToBase64String(imageBytes);
            }
            catch (Exception ex)
            {
                //img = "";
                //throw new Exception($"Error: {ex} {img}");
                Console.WriteLine(ex);
                return null;
            }


            return img;
        }

        private string imgLicense(long idCompany, long idDriver)
        {
            string img = "";

            try
            {
                if (img != null)
                {
                    var webClient = new WebClient();
                    string url = string.Format(@"https://bluagent-files.s3-us-west-2.amazonaws.com/{0}/Drivers/{1}/license.png", idCompany, idDriver);
                    byte[] imageBytes = webClient.DownloadData(url);

                    img = "data:image/png;base64, " + Convert.ToBase64String(imageBytes);
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                //img = "";
                //throw new Exception($"Error: {ex} {img}");
                Console.WriteLine(ex);
                return null;
            }


            return img;
        }

        private string imgEmployer(long idCompany, long idLetterIn)
        {
            string img = "";

            try
            {
                var webClient = new WebClient();
                string url = string.Format(@"https://bluagent-files.s3-us-west-2.amazonaws.com/{0}/Drivers/EmployerSignature/{1}/signature.png", idCompany, idLetterIn);
                byte[] imageBytes = webClient.DownloadData(url);

                img = "data:image/png;base64, " + Convert.ToBase64String(imageBytes);
            }
            catch (Exception ex)
            {
                //img = "";
                //throw new Exception($"Error: {ex} {img}");
                Console.WriteLine(ex);
                return null;
            }


            return img;

        }

        private string GetAddress(string address, string city, string state, string zipCode)
        {
            return String.Concat(address, ", ", city, ", ", state, " ", zipCode);
        }

        private string GetCityName(long cityID)
        {
            string name = "";
            try
            {
                CityDAL cityDAL = new CityDAL();
                var lstCities = cityDAL.GetCities().ToList();
                name = lstCities.Where(c => c.Id == cityID).FirstOrDefault().Name;
            }
            catch (Exception ex)
            {
                name = "";
                throw new Exception($"Error: {ex} {name}");
            }

            return name;
        }

        private string GetStateNameByCityID(long cityID)
        {
            string name = "";

            try
            {
                City city = new City();
                CityDAL cityDAL = new CityDAL();
                var lstCities = cityDAL.GetCities().ToList();
                city = lstCities.Where(c => c.Id == cityID).FirstOrDefault();

                State state = new State();
                StatesDAL stateDAL = new StatesDAL();
                var lstStates = stateDAL.GetStates().ToList();
                name = lstStates.Where(s => s.Id == city.IdState).FirstOrDefault().Name;
            }
            catch (Exception ex)
            {
                name = "";
                throw new Exception($"Error: {ex} {name}");
            }

            return name;
        }

        public DataCompany GetDataCompany(Int64 idU, Boolean alert)
        {
            DataCompany c = new DataCompany();

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var Company = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idU).FirstOrDefault().IdCompany;

                    c.Company = DbContext.Company.Where(x => x.Id == (long)Company).FirstOrDefault();
                    return c;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error {ex.Message}");
            }
        }

        public List<PreEmploymentInquery> GetCH(long idDriver)
        {
            List<PreEmploymentInquery> list = new List<PreEmploymentInquery>();

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    list = DbContext.PreEmploymentInquery.Where(x => x.IdDriver == idDriver).OrderByDescending(x => x.Date).ToList();
                    return list;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Driver> GetCHCredentials(long idDriver)
        {
            List<Driver> list = new List<Driver>();

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    list = DbContext.Driver.Where(x => x.IdUser == idDriver).ToList();
                    return list;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<DriverConsent> GetDC(long idDriver)
        {
            List<DriverConsent> list = new List<DriverConsent>();

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    list = DbContext.DriverConsent.Where(x => x.IdDriver == idDriver).OrderByDescending(x => x.Date).ToList();
                    return list;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<AnnualInquiry> GetAI(long idDriver)
        {
            List<AnnualInquiry> list = new List<AnnualInquiry>();

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    list = DbContext.AnnualInquiry.Where(x => x.IdDriver == idDriver).OrderByDescending(x => x.DateOfReview).ToList();
                    return list;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<PreEmploymentInquery> saveCH(PreEmploymentInquery p)
        {
            List<PreEmploymentInquery> list = new List<PreEmploymentInquery>();

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    DbContext.Add(p);
                    DbContext.SaveChanges();
                    list = DbContext.PreEmploymentInquery.Where(x => x.IdDriver == p.IdDriver).OrderByDescending(x => x.Date).ToList();
                    return list;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<DriverConsent> saveDC(DriverConsent d)
        {
            List<DriverConsent> list = new List<DriverConsent>();

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    DbContext.Add(d);
                    DbContext.SaveChanges();
                    list = DbContext.DriverConsent.Where(x => x.IdDriver == d.IdDriver).OrderByDescending(x => x.Date).ToList();
                    return list;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<AnnualInquiry> saveAI(AnnualInquiry a)
        {
            List<AnnualInquiry> list = new List<AnnualInquiry>();

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    DbContext.Add(a);
                    DbContext.SaveChanges();
                    list = DbContext.AnnualInquiry.Where(x => x.IdDriver == a.IdDriver).OrderByDescending(x => x.DateOfReview).ToList();
                    return list;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

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

                    if (c.LegalName != null && c.DbaName != null && c.Dot != null && c.StateNumber != null && c.Tax != null && c.CarrierOperation != null && operationClass != null)
                    {
                        if (c.Region == "Not Applicable" || (c.Region != "Not Applicable" && c.McMx != null)) { list.Add(1); }
                    }
                    else { list.Add(0); }
                    if (c.PhysicalAddress != null && c.PhysicalCity != null && c.PhysicalState != null && c.PhysicalZip != null && c.PhysicalCountry != null && c.Title != null && c.Der != null && c.PhoneNumber != null &&
                        c.Email != null && c.MovilPhone != null) { list.Add(1); }
                    else { list.Add(0); }
                    if (classifications != null) { if (c.Hazmat == false || (c.Hazmat == true && hazardMaterial != null)) { list.Add(1); } } else { list.Add(0); }
                    if (c.DriverTotal != null && c.Powerunit != null) { list.Add(1); } else { list.Add(0); }
                    if (c.Mcs150Date != null && c.Mcs150Mileage != null && c.AddDate != null && c.PcFlag != null && c.Pinnumber != null) { list.Add(1); } else { list.Add(0); }
                }
            }
            catch (Exception) { }

            return list;
        }


        public DriverAuthorizationConsent getAuthorizationConsents(Int64 userId)
        {
            var authorizationConsent = new DriverAuthorizationConsent();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    authorizationConsent = DbContext.DriverAuthorizationConsent.Where(x => x.UserId == userId).FirstOrDefault();
                }
            }
            catch (Exception e) { throw e; }

            return authorizationConsent;
        }

        public Driver saveDriverLogo(Users u)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var entrada = DbContext.Attach(u);
                    entrada.Property(x => x.FileImage).IsModified = true;
                    DbContext.SaveChanges();

                }
                using (var DbContext = new BAV02Context())
                {
                    var newDriverInfo = DbContext.Driver.Where(x => x.IdUser == u.Id).FirstOrDefault();
                    return newDriverInfo;
                }

            }
            catch (Exception)
            {
                Driver user = null;
                return user;
            }
        }
    }

}