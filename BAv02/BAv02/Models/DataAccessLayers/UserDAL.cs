using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Globalization;
using System.Linq.Dynamic.Core;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.AspNetCore.Http;
using Stripe;
using Microsoft.Extensions.Configuration;
using BAv02.Models.DOT;

namespace BAv02.Models.DataAccessLayers
{
    public class UserDAL
    {
        private IHostingEnvironment _env;


        private IConfiguration Configuration { get; set; }
        public string AssetsDirectory { get; set; }

        public UserDAL()
        {

            var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json");
            Configuration = builder.Build();

            //Assets Directory
            AssetsDirectory = Configuration["AssetsDirectory"];
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


        public long getCompanyInfo(long companyId)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    //1 si tiene ca
                    //2 no tiene ca
                    //0 error
                    string stateNumber = DbContext.Company.Where(x => x.Id == companyId).FirstOrDefault().StateNumber;
                    return stateNumber == null ? (2) : (1);
                }
            }
            catch (Exception) { return 0; }
        }

        public string getCompanyKey(long idCompany)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    string key = DbContext.Company.Where(x => x.Id == idCompany).FirstOrDefault().ApiKey;
                    return key;
                }
            }catch (Exception err) { return err.Message; }
        }

        public bool getCompanyCameraService(long companyId)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    bool? cameraService = DbContext.Company
                        .Where(x => x.Id == companyId)
                        .Select(x => x.hasCamera)
                        .FirstOrDefault();

                    return cameraService.HasValue ? cameraService.Value : false;
                }
            }
            catch (Exception)
            {
                return false; // Opcional: Puedes manejar el error de alguna otra forma si lo deseas.
            }
        }




        /*public long getRealCompanyId(long userId)
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

        public long getRealUserId(long userId)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    long realIdCompany = (long)DbContext.Driver.Where(x => x.Id == userId).FirstOrDefault().IdUser.Value;
                    return realIdCompany;
                }
            }
            catch (Exception) { return 0; }

        }*/

        /// <summary>
        /// Get user login data
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public Users GetRoleLogin(string email, string password, string tokenCode)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {

                    if (tokenCode != "undefined" && tokenCode != Guid.Empty.ToString())
                    {
                        Users user = DbContext.Users.FromSql($"select * from AC.Users where tokencode = {tokenCode} and Status = 'PENDING'").Select(x => new Users { Id = x.Id, Name = x.Name, LastName = x.LastName, Email = x.Email, PhoneNumber = x.PhoneNumber, Role = x.Role, Status = x.Status, FileImage = x.FileImage, TokenCode = x.TokenCode, ExpirationDate = x.ExpirationDate, InsuranceProvider = x.InsuranceProvider }).FirstOrDefault();
                        long idcompany = (long)DbContext.CompanyUsersRoles.Where(x => x.IdUser == user.Id).FirstOrDefault().IdCompany;
                        user.Hazmat = DbContext.Company.Where(x => x.Id == idcompany).FirstOrDefault().Hazmat;

                        if (user.TokenCode.ToString() != tokenCode || DateTime.Now > user.ExpirationDate) { Users u = null; return u; }
                        else
                        {
                            user.Status = "ACTIVE";
                            user.TokenCode = Guid.Empty;
                            var entrada = DbContext.Attach(user);
                            entrada.Property(x => x.Status).IsModified = true;
                            DbContext.SaveChanges();

                            Controllers.StripeController stripe = new Controllers.StripeController(_env);
                            stripe.UpdateMaintenanceSubscription(user.Id, 0);

                            return user;
                        }
                    }
                    else
                    {
                        Users user = DbContext.Users.FromSql($"select * from AC.Users where Status = 'ACTIVE' and Email = {email} and PWDCOMPARE({password},Password) = 1").
                            Select(x => new Users { Id = x.Id, Name = x.Name, LastName = x.LastName, Email = x.Email, PhoneNumber = x.PhoneNumber, Role = x.Role, Status = x.Status, FileImage = x.FileImage, InsuranceProvider = x.InsuranceProvider }).
                            FirstOrDefault();


                        //var sql = "select * from AC.Users where Status = 'ACTIVE' and Email = {email} and PWDCOMPARE({password},Password) = 1";
                        //var role = user.Role;
                        long idcompany = (long)DbContext.CompanyUsersRoles.Where(x => x.IdUser == user.Id).FirstOrDefault().IdCompany;

                        switch (user.Role)
                        {
                            case "SUPERADMIN":
                                //user.Hazmat = DbContext.Company.Where(x => x.Id == idcompany).FirstOrDefault().Hazmat;
                                user.Hazmat = false;
                                break;
                            case "ADMIN":
                                //user.Hazmat = DbContext.Company.Where(x => x.Id == idcompany).FirstOrDefault().Hazmat;
                                user.Hazmat = false;
                                break;
                            case "COLLECTOR":
                                //user.Hazmat = DbContext.Company.Where(x => x.Id == idcompany).FirstOrDefault().Hazmat;
                                break;
                            case "INSURANCE":
                                user.Hazmat = false;
                                break;
                            case "DRIVER":
                                var id = DbContext.Driver.Where(x => x.IdUser == user.Id).Select(x => x.IdUser).FirstOrDefault();
                                user.Id = id.Value;
                                break;
                            default:
                                break;
                        }
                        /*if (user.Role != "SUPERADMIN")
                        {

                        }

                        if (user.Role != "COLLECTOR")
                        {

                        }

                        if (user.Role == "DRIVER")
                        {

                        }*/
                        return user;
                    }
                }
            }
            catch (Exception)
            {
                Users u = null;
                return u;
            }
        }

        public string geRolePermits(long iduser)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var permits = DbContext.CompanyUsersRoles.Where(x => x.IdUser == iduser).Select(x => x.UserPermits).FirstOrDefault();
                    if (permits != null)
                    {

                        return permits;
                    }
                    else { return null; }
                }
            }
            catch (Exception) { return null; }
        }

        public string getUserType(long iduser)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var permits = DbContext.CompanyUsersRoles.Where(x => x.IdUser == iduser).Select(x => x.Type).FirstOrDefault().ToString();
                    if (permits != null)
                    {
                        return permits;
                    }
                    else { return null; }
                }
            }
            catch (Exception) { return null; }
        }

        public string SendEmailReport(IHostingEnvironment _env)
        {

            System.Console.WriteLine("environment: ", _env);
            System.Console.WriteLine("console del environment: ", _env);
            try
            {
                EmailService sendReport = new EmailService(_env);
                System.Console.WriteLine("environment: ", _env);
                System.Console.WriteLine("console del environment: ", _env);
                sendReport.setEmailReports();
                //sendReport.emailBody = sendReport.emailBody;
                sendReport.sendMail("jesus.bedoy92@gmail.com", "Report Requested");
                return "send message";
            }
            catch (Exception ex)
            {
                return Convert.ToString(ex);
            }

        }

        /// <summary>
        /// Save new user data
        /// </summary>
        /// <param name="user"></param>
        /// <param name="dot"></param>
        /// <param name="companyname"></param>
        /// <param name="Password"></param>
        /// <returns></returns>
        public int SaveNewUser(Users user, string Password, Company c, string city, string state, string country, IHostingEnvironment _env, HttpContext httpContext, string stripeToken)
        {
            CompanyNotifications newCompanyNotification = new CompanyNotifications();
            int r = 0;
            using (var DbContext = new BAV02Context())
            {
                using (var transaction = DbContext.Database.BeginTransaction())
                {
                    try
                    {
                        var email = DbContext.Users.Where(x => x.Email == user.Email).FirstOrDefault();
                        var dotv = DbContext.Company.Where(x => x.Dot == c.Dot && x.Dot != null).FirstOrDefault();
                        string bacode = getNewCompanyNumber();

                        if (email == null && dotv == null)
                        {
                            if (c.LegalName != "" && c.LegalName != null)
                            {
                                user.Role = "ADMIN";
                            }
                            else
                            {
                                user.Role = "DRIVER";
                            }
                            if (c.DbaName == "null") { c.DbaName = null; }
                            user.Password = (byte[])DbContext.Users.FromSql($"select PWDENCRYPT({Password}) as Password").Select(x => x.Password).FirstOrDefault();
                            user.Ia = true;
                            var tokenCode = Guid.NewGuid();
                            var expirationDate = DateTime.Now.AddDays(2);
                            user.ExpirationDate = expirationDate;
                            user.TokenCode = tokenCode;
                            user.Status = "ACTIVE";
                            user.Deactivated = false;
                            DbContext.Add(user);
                            DbContext.SaveChanges();
                            if (user.Role == "ADMIN")
                            {
                                var customers = new CustomerService();
                                var customer = customers.Create(new CustomerCreateOptions
                                {
                                    Description = "BA_STRIPE",
                                    Email = user.Email,
                                    Source = stripeToken
                                });

                                CityDAL cityDAL = new CityDAL();
                                StatesDAL statesDAL = new StatesDAL();
                                CountryDAL countryDAL = new CountryDAL();
                                //NOTE: When DOT is not valid/checked, PhysicalCity, PhysicalState, PhysicalCountry will not be inserted into AC.Company table

                                if (country != null && city != null && state != null)
                                {
                                    if (state == "CI")
                                    {
                                        state = "MX";
                                    } 
                                    Int64 phy_country = countryDAL.GetCountries().Where(x => x.Name == country).FirstOrDefault().Id;
                                    c.PhysicalCountry = phy_country;
                                    Int64 phy_state = statesDAL.GetStates().Where(y => y.Name == state && y.IdCountry == phy_country).FirstOrDefault().Id;
                                    c.PhysicalState = phy_state;
                                    Int64 phy_city = cityDAL.GetCities().Where(z => z.Name == city && z.IdState == phy_state).FirstOrDefault().Id;
                                    c.PhysicalCity = phy_city;
                                }

                                if (c.PhysicalState != null)
                                {
                                    c.PhysicalCountry = statesDAL.GetStates().Where(x => x.Id == c.PhysicalState).FirstOrDefault().IdCountry;
                                }

                                c.Tcompany = "MAIN"; c.PasswordSat = null;
                                c.PhysicalStatus = "ACTIVE";
                                c.CustomerId = customer.Id;
                                c.HaveAccount = false;
                                c.BACode = bacode;
                                c.IsDeactivated= false;
                                c.hasCamera = false;
                                DbContext.Add(c);
                                DbContext.SaveChanges();
                                var relation = new CompanyUsersRoles { IdCompany = c.Id, IdUser = user.Id, Type = "ADMIN", DateStarted = DateTime.Now, Status = "ACTIVE" };
                                DbContext.Add(relation);
                            }
                            else if (user.Role == "DRIVER")
                            {
                                var Driver = new Driver { IdUser = user.Id, Status = "PENDING", StatusWork = false };
                                DbContext.Add(Driver);
                            }
                            DbContext.SaveChanges();
                            transaction.Commit();

                            if (user.Role == "ADMIN")
                            {
                                sendConfirmationEmail(_env, httpContext, user.Email, user.Name, tokenCode);

                                EmailService sendNotification = new EmailService(_env);
                                sendNotification.setEmailNewCompany();
                                sendNotification.emailBody = sendNotification.emailBody
                                     .Replace("[Company Name]", c.LegalName)
                                    .Replace("[Company Identifier]", c.Id.ToString())
                                     .Replace("[DOT Number]", c.Dot)
                                     .Replace("[Address]", c.PhysicalAddress)
                                     .Replace("[Contact Name]", user.Name)
                                     .Replace("[Email]", user.Email)
                                     .Replace("[Phone Number]", c.PhoneNumber);
                                sendNotification.sendMail("supportbluagent.com", "New Company Registration");

                                //City city = new City();
                                //State state = new State();
                                //CityDAL cityDAL = new CityDAL();
                                //StatesDAL statesDAL = new StatesDAL();
                                //var lstCities = cityDAL.GetCities().ToList();
                                //var lstStates = statesDAL.GetStates().ToList();
                                //city = lstCities.Where(x => x.Id == company.PhysicalCity).FirstOrDefault();
                                //state = lstStates.Where(x => x.Id == company.PhysicalState).FirstOrDefault();

                                EmailService sendInstructions = new EmailService(_env);
                                sendInstructions.EmailTemplateForLabcorp();
                                sendInstructions.emailBody = sendInstructions.emailBody
                                    .Replace("[DotNumber]", c.Dot == null ? "" : c.Dot)
                                .Replace("[LocationCode]", bacode == null ? "" : bacode.ToString())
                                .Replace("[LocationAN]", c.LegalName == null ? "" : c.LegalName)
                                .Replace("[LocationA1]", c.DbaName == null ? "" : c.DbaName)
                                .Replace("[LocationA2]", c.PhysicalAddress == null ? "" : c.PhysicalAddress)
                                .Replace("[LocationC]", city == null ? "" : city.ToString())
                                .Replace("[LocationS]", state == null ? "" : state.ToString())
                                .Replace("[LocationZ]", c.PhysicalZip == null ? "" : c.PhysicalZip)
                                .Replace("[LocationP]", c.PhoneNumber == null ? "" : c.PhoneNumber);

                                sendInstructions.sendMail("support@bluagent.com,david@bluagent.com", "New user under BluAgent");
                                try {
                                    newCompanyNotification.PinNumber = false;
                                    newCompanyNotification.CSA = false;
                                    newCompanyNotification.MCS = false;
                                    newCompanyNotification.PSP = false;
                                    newCompanyNotification.Certificate = false;
                                    newCompanyNotification.Letters = false;
                                    newCompanyNotification.SafetyReviews = false;
                                    newCompanyNotification.StatePermits = false;
                                    newCompanyNotification.CertificateEnrollment = false;
                                    newCompanyNotification.CompanyPolicy = false;
                                    newCompanyNotification.SupervisorTraining = false;
                                    newCompanyNotification.ClearingHouse = false;
                                    newCompanyNotification.AccidentRegistrer = false;
                                    newCompanyNotification.Insurance = false;
                                    newCompanyNotification.FleetSafety = false;
                                    newCompanyNotification.DriverSafety = false;
                                    newCompanyNotification.SafetyCompliance = false;
                                    newCompanyNotification.MIS = false;
                                    newCompanyNotification.LaboratorySummary = false;
                                    newCompanyNotification.DrugTestingPolicy = false;
                                    newCompanyNotification.IdCompany = c.Id;
                                    DbContext.Add(newCompanyNotification);
                                    DbContext.SaveChanges();
                                }
                                catch (Exception) {
                                    transaction.Rollback();
                                }
                            }
                        }
                        else
                        {
                            if (email != null) {
                                transaction.Rollback();
                                r = 1; }
                            if (dotv != null) {
                                transaction.Rollback();
                                r = 2; }
                        }
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        r = 3;
                        throw new Exception($"Error: {ex} {r}");

                    }
                }
                return r;
            }
        }

        public int updateCompanyPassword(int idCompany, string password)
        {
            using (var DbContext = new BAV02Context())
            {
                try
                {
                    var idUser = DbContext.CompanyUsersRoles.Where(x => x.IdCompany == idCompany).FirstOrDefault().IdUser;

                    var user = DbContext.Users.Where(x => x.Id == idUser).FirstOrDefault();

                    user.Password = (byte[])DbContext.Users.FromSql($"select PWDENCRYPT({password}) as Password").Select(x => x.Password).FirstOrDefault();

                    var entrada = DbContext.Attach(user);
                    entrada.Property(x => x.Password).IsModified = true;

                    DbContext.SaveChanges();

                    return 0;
                }
                catch (Exception err)
                {
                    Console.WriteLine(err);
                    return 1;
                }
            }
        }
        public int updateUserPassword(int idUser, string password)
        {
            using (var DbContext = new BAV02Context())
            {
                try
                {
                    var user = DbContext.Users.Where(x => x.Id == idUser).FirstOrDefault();

                    user.Password = (byte[])DbContext.Users.FromSql($"select PWDENCRYPT({password}) as Password").Select(x => x.Password).FirstOrDefault();
                    var entrada = DbContext.Attach(user);
                    entrada.Property(x => x.Password).IsModified = true;
                    DbContext.SaveChanges();

                    return 0;
                }
                catch (Exception err)
                {
                    Console.WriteLine(err);
                    return 1;
                }
            }
        }
        public string sendConfirmationEmail(IHostingEnvironment _env, HttpContext httpContext, string userEmail, string userName, Guid tokenCode)
        {
            try
            {
                EmailService sendAccountConfirmation = new EmailService(_env);
                sendAccountConfirmation.setEmailTemplateWelcome();
                var callbackUrl = httpContext.Request.Scheme + "://" + httpContext.Request.Host + "/#/login?token=" + tokenCode;
                sendAccountConfirmation.emailBody = sendAccountConfirmation.emailBody.Replace("[Customer]", userName).Replace("#link", callbackUrl);
                sendAccountConfirmation.addAttacHment($"ClientApp/{AssetsDirectory}/assets/img/logo/BluAgent-Logo.png");
                sendAccountConfirmation.sendMail(userEmail, "Confirmation Email");
                return "Mail Sent";
            }
            catch (Exception ex) { return Convert.ToString(ex); }
        }

        /// <summary>
        /// Get data company by UsDot
        /// </summary>
        /// <param name="dot"></param>
        /// <returns></returns>
        /// 
        public int getCheckDuplicateDOT(string dot)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    //Check for duplicate
                    var dotCheck = DbContext.Company.Where(x => x.Dot == dot && x.Dot != null).ToList().Count();
                    if (dotCheck > 0)
                    {
                        return 1;
                    }
                }
            }
            catch (Exception) { }

            return 0;
        }
        public USDOT getDataCompanyByUsDot(string dot)
        {
            USDOT r = new USDOT();
            try
            {
                using (var _dotDbContext = new DotDBContext(Configuration))
                {
                    MySql.Data.MySqlClient.MySqlParameter
                        param = new MySql.Data.MySqlClient.MySqlParameter("@Dot", dot);
                    r = _dotDbContext.UsDot
                        .FromSql(
                            $"SELECT * FROM " + Configuration.GetSection("AuroraAWS")["TableDot"] +
                            " WHERE DOT_NUMBER = @Dot", param).FirstOrDefault();

                    if (r == null)
                    {
                        return r;
                    }

                    CountryDAL countryDAL = new CountryDAL();
                    StatesDAL statesDAL = new StatesDAL();
                    CityDAL cities = new CityDAL();

                    List<Country> lstCountries = new List<Country>();
                    List<State> lstStates = new List<State>();
                    List<City> lstCities = new List<City>();

                    //Load State, Country, Cities lists

                    lstCountries = countryDAL.GetCountries().ToList();
                    lstStates = statesDAL.GetStates().ToList();
                    lstCities = cities.GetCities().ToList();


                    var phyState = lstStates.Where(x => x.Name == r.PHY_STATE).FirstOrDefault().Id;
                    r.PHY_CITY = lstCities
                        .Where(x => x.Name == CultureInfo.CurrentCulture.TextInfo.ToTitleCase(r.PHY_CITY.ToLower()) &&
                                    x.IdState == phyState).FirstOrDefault().Id.ToString();

                }
            }
            catch (Exception ex)
            {
                r = null;
                throw new Exception($"Error: {ex} {r}");
            }

            return r;
        }

        /// <summary>
        /// Get User data by ID                     
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Object getRoleData(long id, long idu)
        {
            /*          if (id == idu) { valid = false; }
                      if (valid == false)
                      {*/
            try
            {
                using (var DbContext = new BAV02Context())
                {

                    var user = DbContext.Users.Where(x => x.Id == id).Select(x => new { x.Name, x.LastName, x.PhoneNumber, x.Birthdate, x.Email, x.Position, x.FileSignature, x.Gender, x.FileImage, x.Role, x.Id }).FirstOrDefault();
                    return user;
                }
            }
            catch (Exception) { return null; }
            /*}
            else { return null; }*/
        }


        /// <summary>
        /// Save Signature file
        /// </summary>
        /// <param name="id"></param>
        /// <param name="file"></param>
        /// <param name="ia"></param>
        /// <returns></returns>
        public int saveSignatureFile(Users u)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var entrada = DbContext.Attach(u);
                    entrada.Property(x => x.FileSignature).IsModified = true;
                    DbContext.SaveChanges();
                }
                return 0;
            }
            catch (Exception) { return 1; }
        }


        /// <summary>
        /// Update User data
        /// </summary>
        /// <param name="id"></param>
        /// <param name="file"></param>
        /// <param name="ia"></param>
        /// <returns></returns>
        public int updateUser(Users u)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var email = DbContext.Users.Where(x => x.Email == u.Email && x.Id != u.Id).FirstOrDefault();
                    if (email == null)
                    {
                        var entrada = DbContext.Attach(u);
                        entrada.Property(x => x.Name).IsModified = true;
                        entrada.Property(x => x.LastName).IsModified = true;
                        entrada.Property(x => x.Birthdate).IsModified = true;
                        entrada.Property(x => x.Gender).IsModified = true;
                        entrada.Property(x => x.PhoneNumber).IsModified = true;
                        entrada.Property(x => x.Email).IsModified = true;
                        entrada.Property(x => x.Position).IsModified = true;
                        if (u.FileImage != "") { entrada.Property(x => x.FileImage).IsModified = true; }
                        DbContext.SaveChanges();
                        return 0;
                    }
                    else { return 1; }
                }

            }
            catch (Exception) { return 2; }
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
                    Users user = DbContext.Users.FromSql($"select * from AC.Users where Id = {id} and PWDCOMPARE({password},Password) = 1").Select(x => new Users { Id = x.Id }).FirstOrDefault();
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

        public int GetAllSuperAdminUsersCount()
        {
            var DbContext = new BAV02Context();
            return DbContext.Users.Where(x => x.Role == "SUPERADMIN").ToList().Count();
        }

        public bool GetOnBoard(long idCompany)
        {
            bool onBoard = false;
            using (var dbContext = new BAV02Context())
            {
                var company = dbContext.Company.Where(c => c.Id == idCompany).SingleOrDefault();

                onBoard = company.OnBoard.HasValue ? company.OnBoard.Value : false;
            }
            return onBoard;
        }

        public bool OnBoardCompleted(long idCompany)
        {
            bool onBoardCompleted = false;
            using (var dbContext = new BAV02Context())
            {
                var company = dbContext.Company.Where(c => c.Id == idCompany).SingleOrDefault();
                company.OnBoard = true;
                dbContext.SaveChanges();
                onBoardCompleted = true;
            }
            return onBoardCompleted;
        }

        public object DeactivateCompany(long idCompany)
        {
            using (var dbContext = new BAV02Context())
            {

                using (var transaction = dbContext.Database.BeginTransaction())
                {

                    try
                    {
                        var users = dbContext.CompanyUsersRoles.Where(user => user.IdCompany == idCompany).ToList();
                        var list = (from u in dbContext.Users
                                    join r in dbContext.CompanyUsersRoles on u.Id equals r.IdUser
                                    where r.IdCompany == idCompany
                                    select u).ToList();

                        foreach (var user in list)
                        {
                            user.Deactivated = true;
                        }

                        dbContext.Users.UpdateRange(list);
                        dbContext.SaveChanges();

                        var company = dbContext.Company.Where(comp => comp.Id == idCompany).FirstOrDefault();

                        company.IsDeactivated = true;

                        dbContext.Company.Update(company);
                        dbContext.SaveChanges();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex);
                        transaction.Rollback();
                        return ex;
                    }
                    transaction.Commit();
                }


                return ($"{{\"status\":{0}}}");
            }
        }
        public object ActivateCompany(long idCompany)
        {
            using (var dbContext = new BAV02Context())
            {

                using (var transaction = dbContext.Database.BeginTransaction())
                {

                    try
                    {
                        var users = dbContext.CompanyUsersRoles.Where(user => user.IdCompany == idCompany).ToList();
                        var list = (from u in dbContext.Users
                                    join r in dbContext.CompanyUsersRoles on u.Id equals r.IdUser
                                    where r.IdCompany == idCompany
                                    select u).ToList();

                        foreach (var user in list)
                        {
                            user.Deactivated = false;
                        }

                        dbContext.Users.UpdateRange(list);
                        dbContext.SaveChanges();

                        var company = dbContext.Company.Where(comp => comp.Id == idCompany).FirstOrDefault();

                        company.IsDeactivated = false;

                        dbContext.Company.Update(company);
                        dbContext.SaveChanges();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex);
                        transaction.Rollback();
                        return ex;
                    }
                    transaction.Commit();
                }


                return ($"{{\"status\":{0}}}");
            }
        }
        public string getNewCompanyNumber()
        {
            string newStringNumber = "";
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    //Console.WriteLine("Entro al get test number");
                    string lastTestNumber = DbContext.Company.LastOrDefault<Company>().BACode;
                    if (lastTestNumber.StartsWith("BA"))
                    {
                        int newTestNumber = Int32.Parse(lastTestNumber.Substring(4)) + 1;
                        newStringNumber = "BA" + newTestNumber.ToString().PadLeft(7, '0');
                    }
                    else
                    {
                        newStringNumber = "BA0000200";
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error: {ex}");
            }
            return newStringNumber;
        }
        //public int EmailForLabcorp(string dot, string locationCode, string locationName, string locationAN, string locationA1, string locationA2, string city, string state, string zip, string phone)
        //{
        //    using (var DbContext = new BAV02Context())
        //    {
        //        using (var transaction = DbContext.Database.BeginTransaction())
        //        {
        //            try
        //            {
        //EmailService sendInstructions = new EmailService(_env);
        //sendInstructions.EmailTemplateForLabcorp();
        //                sendInstructions.emailBody = sendInstructions.emailBody.Replace("[DotNumber]", dot).Replace("[LocationCode]", locationCode).Replace("[LocationName]", locationName).Replace("[LocationAN]", locationAN).Replace("[LocationA1]", locationA1).Replace("[LocationA2]", locationA2);
        //sendInstructions.sendMail("david@bluagent.com", "BluAgent Driver Manual");
        //                return 0;
        //            }
        //            catch (Exception) { return 1; }
        //        }
        //    }

        //}
        /*   public long getCompanyId(long userId)
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

           }*/
    }
}
