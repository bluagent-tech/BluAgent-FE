using BAv02.Models.Tools;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace BAv02.Models.DataAccessLayers
{
    public class DQFDAL
    {
        private IConfiguration Configuration { get; set; }
        public string AssetsDirectory { get; set; }

        public DQFDAL()
        {

            var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json");
            Configuration = builder.Build();

            //Assets Directory
            AssetsDirectory = Configuration["AssetsDirectory"];
        }

        /// <summary>
        /// Get all countries
        /// </summary>
        /// <returns></returns>
        public List<Country> GetCountries()
        {
            CountryDAL countryDAL = new CountryDAL();
            List<Country> list = new List<Country>();
            try
            {

                list = countryDAL.GetCountries().ToList();
                return list;

            }
            catch (Exception) { return list; }
        }

        /// <summary>
        /// Add new driver
        /// </summary>
        /// <param name="driver"></param>
        /// <param name="idu"></param>
        /// <param name="Password"></param>
        /// <returns></returns>
        public int AddNewDriver(Users driver, long idu, string Password, Driver dataDriver, string xNumber, string requesterCode, IHostingEnvironment _env)
        {
            int r = 0;

            if (dataDriver.QuestionDa == null) { dataDriver.QuestionDa = false; }

            using (var DbContext = new BAV02Context())
            {
                using (var transaction = DbContext.Database.BeginTransaction())
                {
                    try
                    {

                        var email = DbContext.Users.Where(x => x.Email == driver.Email).FirstOrDefault();
                        if (email == null)
                        {

                            driver.Status = "ACTIVE";
                            driver.Role = "DRIVER";
                            driver.Hazmat = dataDriver.QuestionHm;
                            driver.Deactivated = false;
                            driver.Password = (byte[])DbContext.Users.FromSql($"select PWDENCRYPT({Password}) as Password").Select(x => x.Password).FirstOrDefault();
                            DbContext.Add(driver);
                            DbContext.SaveChanges();
                            var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                            dataDriver.IdUser = driver.Id;
                            dataDriver.Status = "ACTIVE";
                            dataDriver.StatusWork = true;
                            var relation = new CompanyUsersRoles { IdCompany = idCompany, IdUser = driver.Id, Type = "DRIVER", DateStarted = DateTime.Now, Status = "ACTIVE" };
                            DbContext.Add(relation);
                            DbContext.Add(dataDriver);
                            DbContext.SaveChanges();
                            transaction.Commit();

                            var companyName = DbContext.Company.Where(x => x.Id == idCompany).Select(x => x.LegalName).FirstOrDefault();
                            var companyEmail = DbContext.Company.Where(x => x.Id == idCompany).Select(x => x.Email).FirstOrDefault();

                            if (dataDriver.QuestionDmv == true)
                            {
                                try
                                {
                                    EmailService sendEnrollToDMV = new EmailService(_env);
                                    sendEnrollToDMV.setEmailTemplateEnrollToDMV();
                                    sendEnrollToDMV.emailBody = sendEnrollToDMV.emailBody.Replace("[CompanyName]", companyName).Replace("[DriverName]", driver.Name + " " + driver.LastName).Replace("[License]", dataDriver.License).Replace("[xNumber]", xNumber).Replace("[CompanyEmail]", companyEmail).Replace("[RequesterCode]", requesterCode);
                                    sendEnrollToDMV.sendMail("sales@bluagent.com", "DMV EPN Enrollment");
                                    //sendEnrollToDMV.sendMail("danielaquino@bluagent.com", "Enroll To DMV");
                                }
                                catch (Exception) { return 1; }
                            }

                            if (dataDriver.QuestionDr == true)
                            {
                                try
                                {
                                    EmailService sendRDR = new EmailService(_env);
                                    sendRDR.setEmailTemplateRequestDrivingRecord();
                                    sendRDR.emailBody = sendRDR.emailBody.Replace("[CompanyName]", companyName).Replace("[DriverName]", driver.Name + " " + driver.LastName).Replace("[License]", dataDriver.License).Replace("[xNumber]", xNumber).Replace("[CompanyEmail]", companyEmail);
                                    sendRDR.sendMail("sales@bluagent.com", "Driving Record Request");
                                    //sendRDR.sendMail("danielaquino@bluagent.com", "Request Driving Record");
                                }

                                catch (Exception) { return 1; }
                            }

                            var CompanyName = DbContext.Company.Where(x => x.Id == idCompany).Select(x => x.LegalName).FirstOrDefault();
                            EmailService sendEmailWelcomeDriver = new EmailService(_env);
                            sendEmailWelcomeDriver.setEmailTemplateWelcomeDriver();
                            sendEmailWelcomeDriver.emailBody = sendEmailWelcomeDriver.emailBody
                                .Replace("[CompanyName]", CompanyName.ToString())
                                .Replace("[DriverName]", driver.Name + " " + driver.LastName);
                            sendEmailWelcomeDriver.sendMail(driver.Email, "Welcome to BluAgent");
                            //sendEmailWelcomeDriver.sendMail("danielaquino@bluagent.com", "Welcome to BluAgent");
                        }
                        else { r = 1; }
                    }
                    catch (Exception) { transaction.Rollback(); r = 2; }
                }
            }
            return r;
        }

        public object AddNewDriverAsync(List<Users> user, long idCompany, string password, List<Driver> dataDriver)
        {
            using (var DbContext = new BAV02Context())
            {

                object response;
                List<CompanyUsersRoles> usersRoles = new List<CompanyUsersRoles>();
                try
                {

                    for (int i = 0; i < user.Count(); i++)
                    {
                        user[i].Password = (byte[])DbContext.Users.FromSql($"select PWDENCRYPT({password}) as Password").Select(x => x.Password).FirstOrDefault();
                    }

                    DbContext.AddRange(user);
                    DbContext.SaveChanges();

                    for (int i = 0; i < user.Count(); i++)
                    {
                        dataDriver[i].IdUser = user[i].Id;
                        usersRoles.Add(new CompanyUsersRoles { IdCompany = idCompany, IdUser = user[i].Id, Type = "DRIVER", DateStarted = DateTime.Now, Status = "ACTIVE" });
                    }

                    DbContext.AddRange(usersRoles);
                    DbContext.SaveChanges();


                    DbContext.AddRange(dataDriver);
                    DbContext.SaveChanges();

                }
                catch (Exception ex) { return ex; }
                DbContext.SaveChanges();

                response = dataDriver;
                return response;


            }

        }

        /// <summary>
        /// Get Active Drivers
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public Table getDrivers(Int64 idu, int page, int size)
        {

            Table t = new Table { Items = new List<object>(), CurrentPage = 1, NumberP = 1 };
            try
            {
                CountryDAL countryDAL = new CountryDAL();
                List<Country> lstCountry = new List<Country>();
                lstCountry = countryDAL.GetCountries().ToList();

                using (var DbContext = new BAV02Context())
                {
                    var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                    var Users = (from r in DbContext.CompanyUsersRoles
                                 join u in DbContext.Users on r.IdUser equals u.Id
                                 join d in DbContext.Driver on u.Id equals d.IdUser
                                 join c in lstCountry on d.CountryLicense equals c.Id
                                 where r.IdCompany == idCompany && r.Type == "DRIVER" && r.Status == "ACTIVE"
                                 select new
                                 {
                                     d.IdUser,
                                     u.Email,
                                     Name = u.Name + " " + u.LastName,
                                     Image = u.FileImage,
                                     Country = c.Name,
                                     d.License,
                                     //d.CDL,
                                     DrugsTest = d.QuestionDa,
                                     DrugAlcoholTest = DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.IdUser && x.Reason == "Pre-employment").OrderByDescending(x => x.Id).FirstOrDefault().Result,
                                     r.Status
                                 }).Where(x => x.Status == "ACTIVE").OrderByDescending(x => x.IdUser).Skip((page - 1) * size).Take(size).ToList();
                    var count = Math.Ceiling(((from r in DbContext.CompanyUsersRoles
                                               join u in DbContext.Users on r.IdUser equals u.Id
                                               join d in DbContext.Driver on u.Id equals d.IdUser
                                               where r.IdCompany == idCompany && r.Type == "DRIVER" && r.Status == "ACTIVE"
                                               select new { Id = u.Id }).Count() / (double)size));
                    t.Items = Users.ToList<Object>();
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }
            }
            catch (Exception) { }
            return t;
        }

        public Table getDriversByIdCompany(Int64 idC, int page, int size)
        {

            Table t = new Table { Items = new List<object>(), CurrentPage = 1, NumberP = 1 };
            try
            {
                CountryDAL countryDAL = new CountryDAL();
                List<Country> lstCountry = new List<Country>();
                lstCountry = countryDAL.GetCountries().ToList();

                using (var DbContext = new BAV02Context())
                {
                    var idCompany = idC;
                    var Users = (from r in DbContext.CompanyUsersRoles
                                 join u in DbContext.Users on r.IdUser equals u.Id
                                 join d in DbContext.Driver on u.Id equals d.IdUser
                                 join c in lstCountry on d.CountryLicense equals c.Id
                                 where r.IdCompany == idCompany && r.Type == "DRIVER" && r.Status == "ACTIVE"
                                 select new
                                 {
                                     d.IdUser,
                                     u.Email,
                                     u.Name,
                                     u.LastName,
                                     Image = u.FileImage,
                                     Country = c.Name,
                                     d.License,
                                     u.Birthdate,
                                     DrugsTest = d.QuestionDa,
                                     DrugAlcoholTest = DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.IdUser && x.Reason == "Pre-employment").OrderByDescending(x => x.Id).FirstOrDefault().Result,
                                     r.Status
                                 }).Where(x => x.Status == "ACTIVE").OrderByDescending(x => x.IdUser).Skip((page - 1) * size).Take(size).ToList();
                    var count = Math.Ceiling(((from r in DbContext.CompanyUsersRoles
                                               join u in DbContext.Users on r.IdUser equals u.Id
                                               join d in DbContext.Driver on u.Id equals d.IdUser
                                               where r.IdCompany == idCompany && r.Type == "DRIVER" && r.Status == "ACTIVE"
                                               select new { Id = u.Id }).Count() / (double)size));
                    t.Items = Users.ToList<Object>();
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }
            }
            catch (Exception) { }
            return t;
        }
        public Table getHazmatDrivers(Int64 idu, int page, int size)
        {

            Table t = new Table { Items = new List<object>(), CurrentPage = 1, NumberP = 1 };
            try
            {
                CountryDAL countryDAL = new CountryDAL();
                List<Country> lstCountry = new List<Country>();
                lstCountry = countryDAL.GetCountries().ToList();

                using (var DbContext = new BAV02Context())
                {
                    var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                    var Users = (from r in DbContext.CompanyUsersRoles
                                 join u in DbContext.Users on r.IdUser equals u.Id
                                 join d in DbContext.Driver on u.Id equals d.IdUser
                                 join c in lstCountry on d.CountryLicense equals c.Id
                                 where r.IdCompany == idCompany && r.Type == "DRIVER" && r.Status == "ACTIVE" && u.Hazmat == true
                                 select new
                                 {
                                     d.IdUser,
                                     Name = u.Name + " " + u.LastName,
                                     Image = u.FileImage,
                                     Country = c.Name,
                                     d.License,
                                     DrugsTest = d.QuestionDa,
                                     DrugAlcoholTest = DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.IdUser && x.Reason == "Pre-employment").OrderByDescending(x => x.Id).FirstOrDefault().Result,
                                     r.Status,
                                     u.Hazmat
                                 }).Where(x => x.Status == "ACTIVE").OrderByDescending(x => x.IdUser).Skip((page - 1) * size).Take(size).ToList();
                    var count = Math.Ceiling(((from r in DbContext.CompanyUsersRoles
                                               join u in DbContext.Users on r.IdUser equals u.Id
                                               join d in DbContext.Driver on u.Id equals d.IdUser
                                               where r.IdCompany == idCompany && r.Type == "DRIVER" && r.Status == "ACTIVE"
                                               select new { Id = u.Id }).Count() / (double)size));
                    t.Items = Users.ToList<Object>();
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }
            }
            catch (Exception) { }
            return t;
        }

        /// <summary>
        /// Get Inactive Drivers
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public Table getDriversInactive(Int64 idu, int page, int size)
        {

            Table t = new Table { Items = new List<object>(), CurrentPage = 1, NumberP = 1 };
            try
            {
                CountryDAL countryDAL = new CountryDAL();
                List<Country> lstCountry = new List<Country>();
                lstCountry = countryDAL.GetCountries().ToList();

                using (var DbContext = new BAV02Context())
                {
                    var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                    var Users = (from r in DbContext.CompanyUsersRoles
                                 join u in DbContext.Users on r.IdUser equals u.Id
                                 join d in DbContext.Driver on u.Id equals d.IdUser
                                 join c in lstCountry on d.CountryLicense equals c.Id
                                 where r.IdCompany == idCompany && r.Type == "DRIVER" && r.Status == "INACTIVE"
                                 select new
                                 {
                                     d.IdUser,
                                     u.Email,
                                     Name = u.Name + " " + u.LastName,
                                     Image = u.FileImage,
                                     Country = c.Name,
                                     d.License,
                                     DrugsTest = d.QuestionDa,
                                     DrugAlcoholTest = DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.Id && x.Reason == "Pre-employment").FirstOrDefault().Result,
                                     r.Status
                                 }).Where(x => x.Status == "INACTIVE").OrderByDescending(x => x.IdUser).Skip((page - 1) * size).Take(size).ToList();
                    var count = Math.Ceiling(((from r in DbContext.CompanyUsersRoles
                                               join u in DbContext.Users on r.IdUser equals u.Id
                                               join d in DbContext.Driver on u.Id equals d.IdUser
                                               where r.IdCompany == idCompany && r.Type == "DRIVER" && r.Status == "INACTIVE"
                                               select new { Id = u.Id }).Count() / (double)size));
                    t.Items = Users.ToList<Object>();
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }
            }
            catch (Exception) { }
            return t;
        }

        /// <summary>
        /// update driver  status (active/ incative) by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int updateDriverStatus(long id, string status)
        {
            int r = 0;
            DriverHiringHistoryDate History = new DriverHiringHistoryDate();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var t = DbContext.CompanyUsersRoles.Where(x => x.IdUser == id).FirstOrDefault();
                    var driver = DbContext.Driver.Where(d => d.IdUser == id).FirstOrDefault();
                    t.Status = status;
                    driver.Status = status;
                    if (status == "INACTIVE") { t.DateEnd = DateTime.Today; }
                    else { t.DateEnd = null; }
                    var entrada = DbContext.Attach(t);
                    entrada.Property(x => x.Status).IsModified = true;
                    entrada.Property(x => x.DateEnd).IsModified = true;
                    DbContext.SaveChanges();
                    History.EventDate = DateTime.Today;
                    History.IdDriver = id;
                    History.Status = status;
                    DbContext.Attach(History);
                    DbContext.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                r = 1;
                throw new Exception($"Error: {ex} : {r}");
            }
            return r;
        }

        public int deactivateDriver(long id, string status, string deactivationReason, DateTime date)
        {
            Console.WriteLine(date);
            int r = 0;
            DriverHiringHistoryDate History = new DriverHiringHistoryDate();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var t = DbContext.CompanyUsersRoles.Where(x => x.IdUser == id).FirstOrDefault();
                    var driver = DbContext.Driver.Where(d => d.IdUser == id).FirstOrDefault();
                    t.Status = status;
                    driver.Status = status;
                    driver.DeactivationReason = deactivationReason;
                    if (status == "INACTIVE") { t.DateEnd = date; }
                    else { t.DateEnd = null; }
                    var entrada = DbContext.Attach(t);
                    entrada.Property(x => x.Status).IsModified = true;
                    entrada.Property(x => x.DateEnd).IsModified = true;
                    DbContext.SaveChanges();
                    History.EventDate = DateTime.Today;
                    History.IdDriver = id;
                    History.Status = status;
                    DbContext.Attach(History);
                    DbContext.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                r = 1;
                throw new Exception($"Error: {ex} : {r}");
            }
            return r;
        }

        /// <summary>
        /// Export drivers actives/incatives to excel
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public Table ExportDrivers(Int64 idu, string status)
        {
            Table t = new Table { Items = new List<object>() };
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    if (status == "INACTIVE")
                    {
                        var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                        var Users = (from h in DbContext.DriverHiringHistoryDates
                                     join d in DbContext.DriversCompany on h.IdDriver equals d.IdDriverUser
                                     where h.Status == status
                                     select new
                                     {
                                         Firtname = d.Name,
                                         LastNameame = d.LastName,
                                         License = d.License,
                                         StartDate = Convert.ToDateTime(d.HiringDate).ToString("MM/dd/yyyy"),
                                         FinishDate = Convert.ToDateTime(h.EventDate).ToString("MM/dd/yyyy")

                                     }).OrderBy(x => x.Firtname).ToList();
                        t.Items = Users.ToList<Object>();
                        System.Console.WriteLine(0);
                    }
                    else
                    {
                        var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                        var Users = (from r in DbContext.CompanyUsersRoles
                                     join u in DbContext.Users on r.IdUser equals u.Id
                                     join d in DbContext.Driver on u.Id equals d.IdUser
                                     //join c in DbContext.Country on d.Country equals c.Id
                                     where r.IdCompany == idCompany && r.Type == "DRIVER" && r.Status == status
                                     select new
                                     {
                                         Firtname = u.Name,
                                         LastNameame = u.LastName,
                                         License = d.License,
                                         StartDate = Convert.ToDateTime(d.HiringDate).ToString("MM/dd/yyyy"),
                                         FinishDate = Convert.ToDateTime(r.DateEnd).ToString("MM/dd/yyyy")

                                     }).OrderBy(x => x.Firtname).ToList();
                        t.Items = Users.ToList<Object>();
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error: {ex}");
            }
            return t;
        }

        public int sendSMS(string phoneNumber)
        {
            try
            {
                // Find your Account Sid and Token at twilio.com/console
                // DANGER! This is insecure. See http://twil.io/secure
                var accountSid = "AC0d8b03de66508e9b9e90409040df2b9a";
                var authToken = "8082161a86b92d080b60170f675cd8ae";
                TwilioClient.Init(accountSid, authToken);

                var message = MessageResource.Create(
         body: "The message to send is the follwoing: Hello [DER Name] has requested that you join[Company's Name] on BluAgent as a Driver. Approve[DER Name] Request here If you have any questions, you can contact us at 619 - 878 - 5852 or support@bluagent.com " + "https://apps.bluagent.com",
         from: new PhoneNumber("+16196482929"),
         to: new PhoneNumber(phoneNumber.Trim())
     );

                return 0;
            }
            catch (Exception) { return 1; }
        }

        public int sendEmail(string email, long idu, IHostingEnvironment _env)
        {
            using (var DbContext = new BAV02Context())
            {
                using (var transaction = DbContext.Database.BeginTransaction())
                {
                    try
                    {
                        var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                        var DbaName = DbContext.Company.Where(x => x.Id == idCompany).FirstOrDefault().DbaName;
                        var userName = DbContext.Users.Where(x => x.Id == idu).Select(x => x.Name).FirstOrDefault();

                        EmailService sendDriverInvitation = new EmailService(_env);

                        //sendDriverInvitation.setEmailTemplate($"ClientApp/{AssetsDirectory}/assets/emailTemplates/InvitationDriverSimple.html");
                        sendDriverInvitation.setEmailTemplateInvitation();
                        sendDriverInvitation.emailBody = sendDriverInvitation.emailBody.Replace("[DER Name]", userName).Replace("[Company Name]", DbaName);
                        //sendDriverInvitation.addAttacHment($"ClientApp/{AssetsDirectory}/assets/img/logo/BluAgent-Logo.png");
                        sendDriverInvitation.sendMail(email, "BluAgent Invitation Email");
                        return 0;
                    }

                    catch (Exception) { return 1; }
                }
            }
        }

        public List<EMPView> GetEmployerPN(long id)
        {
            List<EMPView> ListEPN = new List<EMPView>();
            using (var DbContext = new BAV02Context())
            {
                {
                    try
                    {
                        ListEPN = DbContext.EMPView.Where(x => x.IdCompany == id).ToList();
                        return ListEPN;
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex);
                        throw ex;
                    }
                }
            }
        }

        public int CompanyCA(long id)
        {
            using (var DbContext = new BAV02Context())
            {
                {
                    try
                    {
                        var ca = DbContext.Company.Where(x => x.Id == id).Select(x => x.StateNumber).FirstOrDefault();
                        //var ca = DbContext.EMPView.Where(x => x.IdCompany == id).FirstOrDefault();
                        if (ca == null)
                        {
                            return 0;
                        }
                        else { return 1; }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex);
                        throw ex;
                    }
                }
            }
        }

        public List<Dmv> DR(long id)
        {
            List<Dmv> ListDNV = new List<Dmv>();
            using (var DbContext = new BAV02Context())
            {
                try
                {
                    ListDNV = DbContext.Dmv.ToList();
                    return ListDNV;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                    throw ex;
                }
            }
        }

        internal object sendEmailMan(string email, long idu, IHostingEnvironment _env)
        {
            using (var DbContext = new BAV02Context())
            {
                using (var transaction = DbContext.Database.BeginTransaction())
                {
                    try
                    {
                        var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                        var DbaName = DbContext.Company.Where(x => x.Id == idCompany).FirstOrDefault().DbaName;
                        var userName = DbContext.Users.Where(x => x.Id == idu).Select(x => x.Name).FirstOrDefault();

                        EmailService sendDriverInvitation = new EmailService(_env);
                        sendDriverInvitation.setEmailTemplateMaintenance();
                        //sendDriverInvitation.setEmailTemplate($"ClientApp/{AssetsDirectory}/assets/emailTemplates/MaintenaceSchedule.html");
                        //sendDriverInvitation.emailBody = sendDriverInvitation.emailBody.Replace("[DER Name]", userName).Replace("[Company Name]", DbaName);
                        //sendDriverInvitation.addAttacHment($"ClientApp/{AssetsDirectory}/assets/img/logo/BluAgent-Logo.png");
                        sendDriverInvitation.sendMail(email, "BluAgent Maintenance Email");
                        return 0;
                    }
                    catch (Exception) { return 1; }
                }
            }
        }
        public int EmailSend(long idCompany, long idDriver, string email, string pdf, string name, string year, IHostingEnvironment _env)
        {
            string link = "";
            using (var DbContext = new BAV02Context())
            {
                using (var transaction = DbContext.Database.BeginTransaction())
                {
                    try
                    {
                        var description = "Driver Safety Manual " + year + ".pdf";
                        var docName = DbContext.CompanyDocs.Where(x => x.IdCompany == idCompany && x.DocType == "DriverSafetyManual" && x.DescriptionDoc == description).Select(x => x.DocName).FirstOrDefault();
                        var companyName = DbContext.Company.Where(x => x.Id == idCompany).Select(x => x.LegalName).FirstOrDefault();
                        if (pdf == "ELD Quick Reference")
                        {
                            link = "https://bluagent-files.s3.us-west-2.amazonaws.com/resources/EDLQR/BluAgent+Technologies%2C+Inc+Quick+Reference+Guide+1.pdf";
                        }
                        else if (pdf == "Driver Safety Manual")
                        {
                            link = "https://bluagent-files.s3.us-west-2.amazonaws.com/" + idCompany + "/DriverSafetyManual/" + docName;
                        }
                        EmailService sendInstructions = new EmailService(_env);
                        sendInstructions.setEmailTemplateSendManual();
                        sendInstructions.emailBody = sendInstructions.emailBody.Replace("[CompanyName]", companyName).Replace("[ManualName]", pdf).Replace("[Link]", link).Replace("[DERName]", name); //DERName es el nombre del driver
                        sendInstructions.sendMail(email, "BluAgent Driver Manual");
                        return 0;
                    }
                    catch (Exception) { return 1; }
                }
            }

        }
        public int EmailSendRDR(long idCompany, long idDriver, string name, string license, string xNumber, IHostingEnvironment _env)
        {
            //string link = "";
            using (var DbContext = new BAV02Context())
            {
                using (var transaction = DbContext.Database.BeginTransaction())

                {
                    var companyName = DbContext.Company.Where(x => x.Id == idCompany).Select(x => x.LegalName).FirstOrDefault();
                    var companyEmail = DbContext.Company.Where(x => x.Id == idCompany).Select(x => x.Email).FirstOrDefault();
                    try
                    {
                        EmailService sendRDR = new EmailService(_env);
                        sendRDR.setEmailTemplateRequestDrivingRecord();
                        sendRDR.emailBody = sendRDR.emailBody.Replace("[CompanyName]", companyName).Replace("[DriverName]", name).Replace("[License]", license).Replace("[xNumber]", xNumber).Replace("[CompanyEmail]", companyEmail);
                        sendRDR.sendMail("sales@bluagent.com", "Driving Record Request");
                        //sendRDR.sendMail("danielaquino@bluagent.com", "Request Driving Record");
                        return 0;
                    }

                    catch (Exception) { return 1; }
                }
            }
        }
        public int getCompanyDocsDQF(long idu)
        {
            using (var DbContext = new BAV02Context())
            {
                var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                try
                {
                    var description = "Driver Safety Manual " + DateTime.Now.Year.ToString() + ".pdf";
                    var DSM = DbContext.CompanyDocs.Where(x => x.IdCompany == idCompany && x.DocType == "DriverSafetyManual" && x.DescriptionDoc == description).FirstOrDefault();
                    if (DSM != null)
                    {
                        return 0;
                    }
                    return 2;
                }
                catch (Exception) { return 1; }
            }
        }
        public int EmailEnrollToDMV(long idCompany, long idDriver, string name, string license, string xNumber, string requesterCode, IHostingEnvironment _env)
        {
            //string link = "";
            using (var DbContext = new BAV02Context())
            {
                using (var transaction = DbContext.Database.BeginTransaction())

                {
                    var companyName = DbContext.Company.Where(x => x.Id == idCompany).Select(x => x.LegalName).FirstOrDefault();
                    var companyEmail = DbContext.Company.Where(x => x.Id == idCompany).Select(x => x.Email).FirstOrDefault();
                    try
                    {
                        EmailService sendEnrollToDMV = new EmailService(_env);
                        sendEnrollToDMV.setEmailTemplateEnrollToDMV();
                        sendEnrollToDMV.emailBody = sendEnrollToDMV.emailBody.Replace("[CompanyName]", companyName).Replace("[DriverName]", name).Replace("[License]", license).Replace("[xNumber]", xNumber).Replace("[CompanyEmail]", companyEmail).Replace("[RequesterCode]", requesterCode);
                        sendEnrollToDMV.sendMail("sales@bluagent.com", "DMV EPN Enrollment");
                        //sendEnrollToDMV.sendMail("danielaquino@bluagent.com", "Enroll To DMV");
                        return 0;
                    }
                    catch (Exception) { return 1; }
                }
            }
        }



        //using (var DbContext = new BAV02Context())
        //{
        //    try
        //    {
        //        
        //        if (ListSignatures != null)
        //        {
        //                for (int x = 0; x< 3; x++)
        //                {
        //                        EmailService sendNoSignature = new EmailService(_env);
        //sendNoSignature.SetEmailNoCompanySignature();
        //                        sendNoSignature.emailBody = sendNoSignature.emailBody.Replace("[CompanyName]", ListSignatures[x].Email).Replace("[ManualName]", ListSignatures[x].IdUser.ToString()).Replace("[Link]", ListSignatures[x].Email).Replace("[DriverName]", ListSignatures[x].IdCompany.ToString());
        //sendNoSignature.sendMail(ListSignatures[x].Email, "Company Need Atention");
        //                    //sendRDR.sendMail("ListSignatures[x].Email", "Company Need Atention");

        //                }
        //            return 1;
        //        }
        //        else
        //        {
        //            return 1;
        //        }
        //    }
        //    catch (Exception) { return 1; }
        //}

        public int EmailNeedToSign(IHostingEnvironment _env)
        {
            List<UserSignature> ListSignatures = new List<UserSignature>();
            using (var DbContext = new BAV02Context())
            {
                using (var transaction = DbContext.Database.BeginTransaction())
                {
                    try
                    {
                        ListSignatures = DbContext.UserSignature.ToList();
                        for (int x = 0; x < ListSignatures.Count; x++)
                        {
                            //string Company = ListSignatures[x].LegalName;
                            string Name = ListSignatures[x].Name + " " + ListSignatures[x].LastName;
                            string Email = ListSignatures[x].Email;

                            EmailService sendNeedToSign = new EmailService(_env);
                            sendNeedToSign.setEmailNeedToSign();
                            sendNeedToSign.emailBody = sendNeedToSign.emailBody.Replace("[DERName]", Name);
                            //sendNeedToSign.sendMail("danielaquino@bluagent.com", "Company Needs Work");
                            sendNeedToSign.sendMail(Email, "Company Needs Work");
                            //sendNeedToSign.sendMail("danielaquino@bluagent,pablo@bluagent,jose@bluagent.com,bedoy@bluagent.com", "hola");
                        }
                        return 0;
                    }
                    catch (Exception) { return 1; }
                }
            }
        }

        /// Se ocupa [DERName], [DateRandomSelection], [CompanyName]
        public int EmailRandomSelector(long idCompany, string Date, IHostingEnvironment _env)
        {
            //string link = "";
            using (var DbContext = new BAV02Context())
            {
                using (var transaction = DbContext.Database.BeginTransaction())

                {
                    var companyName = DbContext.Company.Where(x => x.Id == idCompany).Select(x => x.LegalName).FirstOrDefault();
                    var companyEmail = DbContext.Company.Where(x => x.Id == idCompany).Select(x => x.Email).FirstOrDefault();
                    var DER = DbContext.Company.Where(x => x.Id == idCompany).Select(x => x.Der).FirstOrDefault();
                    try
                    {
                        EmailService sendRandomSelector = new EmailService(_env);
                        sendRandomSelector.setEmailRandomSelected();
                        sendRandomSelector.emailBody = sendRandomSelector.emailBody.Replace("[CompanyName]", companyName).Replace("[DERName]", DER).Replace("[DateRandomSelection]", Date);
                        sendRandomSelector.sendMail(companyEmail, "Random Selection Notification");
                        //sendEnrollToDMV.sendMail("danielaquino@bluagent.com", "Enroll To DMV");
                        return 0;
                    }
                    catch (Exception) { return 1; }
                }
            }
        }

        /// Se ocupa [DERName], [DateRandomSelection], [CompanyName]
        public int EmailNoRandomSelector(long idCompany, string Date, IHostingEnvironment _env)
        {
            //string link = "";
            using (var DbContext = new BAV02Context())
            {
                using (var transaction = DbContext.Database.BeginTransaction())

                {
                    var companyName = DbContext.Company.Where(x => x.Id == idCompany).Select(x => x.LegalName).FirstOrDefault();
                    var companyEmail = DbContext.Company.Where(x => x.Id == idCompany).Select(x => x.Email).FirstOrDefault();
                    var DER = DbContext.Company.Where(x => x.Id == idCompany).Select(x => x.Der).FirstOrDefault();
                    try
                    {
                        EmailService sendNoRandomSelector = new EmailService(_env);
                        sendNoRandomSelector.setEmailNoRandomSelected();
                        sendNoRandomSelector.emailBody = sendNoRandomSelector.emailBody.Replace("[CompanyName]", companyName).Replace("[DERName]", DER).Replace("[DateRandomSelection]", Date);
                        sendNoRandomSelector.sendMail(companyEmail, "Random Selection Notification");
                        //sendEnrollToDMV.sendMail("danielaquino@bluagent.com", "Enroll To DMV");
                        return 0;
                    }
                    catch (Exception) { return 1; }
                }
            }
        }

        public int EmailComplianceReportNot(IHostingEnvironment _env)
        {
            List<Company> ListEmail = new List<Company>();
            List<CompanyUsersRoles> ListCompanyUserRoles = new List<CompanyUsersRoles>();
            List<Users> ListUsers = new List<Users>();

            using (var DbContext = new BAV02Context())
            {
                using (var transaction = DbContext.Database.BeginTransaction())
                {
                    try
                    {
                        ListEmail = DbContext.Company.ToList();

                        for (int x = 0; x < ListEmail.Count; x++)

                        {
                            //string Company = ListSignatures[x].LegalName;
                            string Email = ListEmail[x].Email;
                            EmailService sendComplianceReportNot = new EmailService(_env);
                            sendComplianceReportNot.SetEmailTemplateComplianceReportNot();
                            sendComplianceReportNot.emailBody = sendComplianceReportNot.emailBody.Replace("[DERName]", ListEmail[x].Der);
                            //sendComplianceReportNot.sendMail("danielaquino@bluagent.com", "Compliance report");
                            sendComplianceReportNot.sendMail(Email, "Compliance report");
                        }
                        return 0;
                    }
                    catch (Exception) { return 1; }
                }
            }
        }


        //public List<Dmv> DR(long id)
        //{
        //    List<Dmv> ListDNV = new List<Dmv>();
        //    using (var DbContext = new BAV02Context())
        //    {
        //        try
        //        {
        //            ListDNV = DbContext.Dmv.ToList();
        //            return ListDNV;
        //        }
        //        catch (Exception ex)
        //        {
        //            Console.WriteLine(ex);
        //            throw ex;
        //        }
        //    }
        //}

        //public int EmailNoSignatureCompany(IHostingEnvironment _env)
        //{
        //    List<UserSignature> ListSignatures = new List<UserSignature>();
        //    using (var DbContext = new BAV02Context())
        //    {
        //        try
        //        {
        //            ListSignatures = DbContext.UserSignature.ToList();
        //            if (ListSignatures != null)
        //            {
        //                for (int x = 0; x < 3; x++)
        //                {
        //                        EmailService sendNoSignature = new EmailService(_env);
        //                        sendNoSignature.SetEmailNoCompanySignature();
        //                        sendNoSignature.emailBody = sendNoSignature.emailBody.Replace("[CompanyName]", ListSignatures[x].Email).Replace("[ManualName]", ListSignatures[x].IdUser.ToString()).Replace("[Link]", ListSignatures[x].Email).Replace("[DriverName]", ListSignatures[x].IdCompany.ToString());
        //                        sendNoSignature.sendMail(ListSignatures[x].Email, "Company Need Atention");
        //                    //sendRDR.sendMail("ListSignatures[x].Email", "Company Need Atention");

        //                }
        //                return 1;
        //            }
        //            else
        //            {
        //                return 1;
        //            }
        //        }
        //        catch (Exception) { return 1; }
        //    }
        //}


    }
}
