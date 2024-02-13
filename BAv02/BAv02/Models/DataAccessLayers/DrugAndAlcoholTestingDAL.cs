using BAv02.Models.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using BAv02.Models.ViewModel;
using BAv02.Models.RandomStatus;
using System.Text.Json;
using System.ComponentModel;

namespace BAv02.Models.DataAccessLayers
{
    public class DrugAndAlcoholTestingDAL
    {
        private readonly Random _random = new Random();
        private readonly BAV02Context _context;
        private IConfiguration Configuration { get; set; }
        public string AssetsDirectory { get; set; }

        public DrugAndAlcoholTestingDAL()
        {
            _context = new BAV02Context();
            var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json");
            Configuration = builder.Build();

            //Assets Directory
            AssetsDirectory = Configuration["AssetsDirectory"];
        }

        public int getDrugTestTotal()
        {
            List<DrugTest> list = new List<DrugTest>();
            try
            {
                return _context.DrugTest.ToList().Count();
            }
            catch (Exception error)
            {
                throw error;
            }
        }

        public int getDrugTestCompleted()
        {
            List<DrugTest> list = new List<DrugTest>();
            try
            {
                return _context.DrugTest.Where(x => x.Status == "Colection Completed").ToList().Count();
            }
            catch (Exception error)
            {
                throw error;
            }
        }

        public int getDrugTestScheduled()
        {
            List<ScheduleDrugTest> list = new List<ScheduleDrugTest>();
            try
            {
                return _context.ScheduleDrugTest.Where(x => x.Status == "Scheduled").ToList().Count();
            }
            catch (Exception error)
            {
                throw error;
            }
        }

        public int getDrugTestInitialized()
        {
            List<ScheduleDrugTest> list = new List<ScheduleDrugTest>();
            try
            {
                return _context.ScheduleDrugTest.Where(x => x.Status == "Collection Initiated").ToList().Count();
            }
            catch (Exception error)
            {
                throw error;
            }
        }

        /// <summary>
        /// Get drivers Collector list 
        /// </summary>
        /// <param name="idC"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public Table getDriversCollector(Int64 idC, int page, int size, Boolean s, Boolean dot)
        {

            Table t = new Table { Items = new List<object>(), CurrentPage = 0, NumberP = 0 };
            try
            {
                if (dot)
                {
                    using (var DbContext = new BAV02Context())
                    {
                        var idCompany = idC;
                        var Users = (from r in DbContext.CompanyUsersRoles
                                     join u in DbContext.Users on r.IdUser equals u.Id
                                     join d in DbContext.Driver on u.Id equals d.IdUser
                                     where r.IdCompany == idCompany && r.Type == "DRIVER" && r.Status == "ACTIVE"
                                     select new
                                     {
                                         d.IdUser,
                                         Name = u.Name + " " + u.LastName,
                                         Image = u.FileImage,
                                         d.License,
                                         MRO = DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.IdUser).OrderByDescending(x => x.DateApplication).FirstOrDefault().DateApplication,
                                         Type = DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.IdUser).OrderByDescending(x => x.DateApplication).FirstOrDefault().TypeTest,
                                         DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.IdUser).OrderByDescending(x => x.DateApplication).FirstOrDefault().Reason,
                                         DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.IdUser).OrderByDescending(x => x.DateApplication).FirstOrDefault().Result,
                                         DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.IdUser).OrderByDescending(x => x.DateApplication).FirstOrDefault().Specimen,
                                         r.Status,
                                         d.QuestionDa,
                                         d.HiringDate,
                                         d.CDL,
                                         d.CMV,
                                         d.QuestionHm,
                                         d.Passenger
                                     }).Where(x => x.Status == "ACTIVE" && x.QuestionDa == true).OrderByDescending(x => x.IdUser).Skip((page - 1) * size).Take(size).ToList();
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
                else
                {
                    using (var DbContext = new BAV02Context())
                    {
                        var idCompany = idC;
                        var Users = (from r in DbContext.CompanyUsersRoles
                                     join u in DbContext.Users on r.IdUser equals u.Id
                                     join d in DbContext.Driver on u.Id equals d.IdUser
                                     where r.IdCompany == idCompany && r.Type == "DRIVER" && r.Status == "ACTIVE"
                                     select new
                                     {
                                         d.IdUser,
                                         Name = u.Name + " " + u.LastName,
                                         Image = u.FileImage,
                                         d.License,
                                         MRO = DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.IdUser).OrderByDescending(x => x.DateApplication).FirstOrDefault().DateApplication,
                                         Type = DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.IdUser).OrderByDescending(x => x.DateApplication).FirstOrDefault().TypeTest,
                                         DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.IdUser).OrderByDescending(x => x.DateApplication).FirstOrDefault().Reason,
                                         DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.IdUser).OrderByDescending(x => x.DateApplication).FirstOrDefault().Result,
                                         DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.IdUser).OrderByDescending(x => x.DateApplication).FirstOrDefault().Specimen,
                                         r.Status,
                                         d.QuestionDa,
                                         d.HiringDate,
                                         d.CDL,
                                         d.CMV,
                                         d.QuestionHm,
                                         d.Passenger
                                     }).Where(x => x.Status == "ACTIVE" && x.QuestionDa == false).OrderByDescending(x => x.IdUser).Skip((page - 1) * size).Take(size).ToList();
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
            }
            catch (Exception) { }
            return t;
        }

        /// <summary>
        /// Get drivers list 
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public Table getDrivers(Int64 idu, int page, int size, Boolean s, Boolean dot)
        {

            Table t = new Table { Items = new List<object>(), CurrentPage = 0, NumberP = 0 };
            try
            {
                if (dot)
                {
                    using (var DbContext = new BAV02Context())
                    {
                        var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                        var Users = (from r in DbContext.CompanyUsersRoles
                                     join u in DbContext.Users on r.IdUser equals u.Id
                                     join d in DbContext.Driver on u.Id equals d.IdUser
                                     where r.IdCompany == idCompany && r.Type == "DRIVER" && r.Status == "ACTIVE"
                                     select new
                                     {
                                         d.IdUser,
                                         Name = u.Name + " " + u.LastName,
                                         Image = u.FileImage,
                                         d.License,
                                         MRO = DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.IdUser).OrderByDescending(x => x.DateApplication).FirstOrDefault().DateApplication,
                                         Type = DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.IdUser).OrderByDescending(x => x.DateApplication).FirstOrDefault().TypeTest,
                                         DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.IdUser).OrderByDescending(x => x.DateApplication).FirstOrDefault().Reason,
                                         DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.IdUser).OrderByDescending(x => x.DateApplication).FirstOrDefault().Result,
                                         DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.IdUser).OrderByDescending(x => x.DateApplication).FirstOrDefault().Specimen,
                                         r.Status,
                                         d.QuestionDa,
                                         d.HiringDate,
                                         d.CDL,
                                         d.CMV,
                                         d.QuestionHm,
                                         d.Passenger
                                     }).Where(x => x.Status == "ACTIVE" && x.QuestionDa == true).OrderByDescending(x => x.IdUser).Skip((page - 1) * size).Take(size).ToList();
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
                else
                {
                    using (var DbContext = new BAV02Context())
                    {
                        var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                        var Users = (from r in DbContext.CompanyUsersRoles
                                     join u in DbContext.Users on r.IdUser equals u.Id
                                     join d in DbContext.Driver on u.Id equals d.IdUser
                                     where r.IdCompany == idCompany && r.Type == "DRIVER" && r.Status == "ACTIVE"
                                     select new
                                     {
                                         d.IdUser,
                                         Name = u.Name + " " + u.LastName,
                                         Image = u.FileImage,
                                         d.License,
                                         MRO = DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.IdUser).OrderByDescending(x => x.DateApplication).FirstOrDefault().DateApplication,
                                         Type = DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.IdUser).OrderByDescending(x => x.DateApplication).FirstOrDefault().TypeTest,
                                         DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.IdUser).OrderByDescending(x => x.DateApplication).FirstOrDefault().Reason,
                                         DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.IdUser).OrderByDescending(x => x.DateApplication).FirstOrDefault().Result,
                                         DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.IdUser).OrderByDescending(x => x.DateApplication).FirstOrDefault().Specimen,
                                         r.Status,
                                         d.QuestionDa,
                                         d.HiringDate,
                                         d.CDL,
                                         d.CMV,
                                         d.QuestionHm,
                                         d.Passenger
                                     }).Where(x => x.Status == "ACTIVE" && x.QuestionDa == false).OrderByDescending(x => x.IdUser).Skip((page - 1) * size).Take(size).ToList();
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
            }
            catch (Exception) { }
            return t;
        }

        /// <summary>
        /// Get enrolled drivers list Collector
        /// </summary>
        /// <param name="idC"></param>
        /// <returns></returns>
        public object ExportEnrolledDriversCollector(Int64 idC, Boolean s)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var idCompany = idC;
                    var Users = (from r in DbContext.CompanyUsersRoles
                                 join u in DbContext.Users on r.IdUser equals u.Id
                                 join d in DbContext.Driver on u.Id equals d.IdUser
                                 where r.IdCompany == idCompany && r.Type == "DRIVER" && r.Status == "ACTIVE" && d.QuestionDa == s
                                 select new
                                 {
                                     IdUser = d.Id,
                                     Name = u.Name + " " + u.LastName,
                                     d.License,
                                     MRO = Convert.ToDateTime(DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.Id).FirstOrDefault().DateApplication).ToString("MM/dd/yyyy"),
                                     Type = DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.Id).FirstOrDefault().TypeTest,
                                     Reason = DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.Id).FirstOrDefault().Reason,
                                     Result = DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.Id).FirstOrDefault().Result,
                                     Specimen = DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.Id).FirstOrDefault().Specimen,
                                     Status = r.Status,
                                     d.QuestionDa
                                 }).Where(x => x.Status == "ACTIVE" && x.QuestionDa == s).OrderByDescending(x => x.IdUser).ToList();

                    return Users;
                }
            }
            catch (Exception) { return null; }
        }

        /// <summary>
        /// Get enrolled drivers list 
        /// </summary>
        /// <param name="idu"></param>
        /// <returns></returns>
        public object ExportEnrolledDrivers(Int64 idu, Boolean s)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var idCompany = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                    var Users = (from r in DbContext.CompanyUsersRoles
                                 join u in DbContext.Users on r.IdUser equals u.Id
                                 join d in DbContext.Driver on u.Id equals d.IdUser
                                 where r.IdCompany == idCompany && r.Type == "DRIVER" && r.Status == "ACTIVE" && d.QuestionDa == s
                                 select new
                                 {
                                     IdUser = d.Id,
                                     Name = u.Name + " " + u.LastName,
                                     d.License,
                                     MRO = Convert.ToDateTime(DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.Id).FirstOrDefault().DateApplication).ToString("MM/dd/yyyy"),
                                     Type = DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.Id).FirstOrDefault().TypeTest,
                                     Reason = DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.Id).FirstOrDefault().Reason,
                                     Result = DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.Id).FirstOrDefault().Result,
                                     Specimen = DbContext.DrugAlcoholCompliance.Where(x => x.IdDriver == d.Id).FirstOrDefault().Specimen,
                                     Status = r.Status,
                                     d.QuestionDa
                                 }).Where(x => x.Status == "ACTIVE" && x.QuestionDa == s).OrderByDescending(x => x.IdUser).ToList();

                    return Users;
                }
            }
            catch (Exception) { return null; }
        }

        /// <summary>
        /// Enroll active/inactive Driver
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int enrollDriver(long id, Boolean enroll)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var driver = DbContext.Driver.Where(x => x.IdUser == id).FirstOrDefault();
                    // Driver driver = new Driver { IdUser = id, QuestionDa = enroll };
                    driver.QuestionDa = enroll;
                    var entrada = DbContext.Attach(driver);
                    entrada.Property(x => x.QuestionDa).IsModified = true;
                    DbContext.SaveChanges();
                    return 0;
                }
            }
            catch (Exception)
            {
                return 1;
            }
        }

        /// <summary> 
        /// save documments of drugs and alcohol for company
        /// </summary>
        /// <param name="c"></param>
        /// <param name="idu"></param>
        /// <returns></returns>
        public int saveDoc(Company c, CertificateEnrollment ce, SupervisorTraining st, long idu)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    c.Id = (long)DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                    var docs = DbContext.Company.Where(x => x.Id == c.Id).FirstOrDefault();
                    if (docs != null)
                    {
                        docs.CreatedDate = DateTime.Today;
                        docs.DrugsPolicy = c.Id + c.DrugsPolicy;
                        var entrada = DbContext.Attach(docs);
                        if (c.DrugsPolicy != null) { entrada.Property(x => x.DrugsPolicy).IsModified = true; }
                        else { entrada.Property(x => x.DrugsPolicy).IsModified = false; }
                        DbContext.SaveChanges();
                    }

                    if (ce.CertificateEnrollment1 != null && ce.EnrollmentDate != null)
                    {
                        ce.IdCompany = c.Id;
                        ce.CertificateEnrollment1 = c.Id + ce.CertificateEnrollment1;
                        DbContext.Add(ce);
                        DbContext.SaveChanges();
                    }
                    if (st.FileName != null && st.TrainingDate != null && st.SupervisorsName != null)
                    {
                        st.IdCompany = c.Id;
                        st.FileName = c.Id + st.FileName;
                        DbContext.Add(st);
                        DbContext.SaveChanges();
                    }
                }
                return 0;
            }
            catch (Exception) { return 1; }
        }

        /// <summary>
        /// Get drugs test docs by id of company
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Company getDocs(long id)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var idc = DbContext.CompanyUsersRoles.Where(x => x.IdUser == id).FirstOrDefault().IdCompany;
                    return DbContext.Company.Where(x => x.Id == idc).FirstOrDefault();
                }
            }
            catch (Exception) { return null; }
        }

        /// <summary>
        /// Get certificate for company
        /// </summary>
        /// <param name="idu"></param>
        /// <returns></returns>
        public Table getCertificates(long idu, int page, int size)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 1, NumberP = 1 };

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var idc = (long)DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;

                    var list = (from c in DbContext.CertificateEnrollment
                                where c.IdCompany == idc
                                select new
                                {
                                    c.Id,
                                    c.CertificateEnrollment1,
                                    c.EnrollmentDate

                                }).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList<Object>();

                    var count = Math.Ceiling((DbContext.CertificateEnrollment.Where(x => x.IdCompany == idc).Select(x => new { x.Id }).Count() / (double)size));
                    t.Items = list;
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }

            }
            catch (Exception) { }
            return t;
        }

        /// <summary>
        /// Get Supervisor Training for company
        /// </summary>
        /// <param name="idu"></param>
        /// <returns></returns>
        public Table getTraining(long idu, int page, int size)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 1, NumberP = 1 };

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var idc = (long)DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;

                    var list = (from st in DbContext.SupervisorTraining
                                where st.IdCompany == idc
                                select new
                                {
                                    st.Id,
                                    st.FileName,
                                    st.TrainingDate,
                                    st.SupervisorsName

                                }).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList<Object>();

                    var count = Math.Ceiling((DbContext.SupervisorTraining.Where(x => x.IdCompany == idc).Select(x => new { x.Id }).Count() / (double)size));
                    t.Items = list;
                    t.CurrentPage = page;
                    t.NumberP = (int)count;
                }

            }
            catch (Exception) { }
            return t;
        }

        /// <summary>
        /// delete Certificate of company
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int deleteCertificate(long id)
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var d = DbContext.CertificateEnrollment.Where(x => x.Id == id).FirstOrDefault();
                    DbContext.CertificateEnrollment.RemoveRange(d);
                    DbContext.SaveChanges();

                    System.IO.File.Delete($"ClientApp/{AssetsDirectory}/assets/img/Images/DrugsTest/docs/" + d.CertificateEnrollment1);
                }
            }
            catch (Exception) { r = 1; }
            return r;
        }

        /// <summary>
        /// delete Training of company
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int deleteTraining(long id)
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var d = DbContext.SupervisorTraining.Where(x => x.Id == id).FirstOrDefault();
                    DbContext.SupervisorTraining.RemoveRange(d);
                    DbContext.SaveChanges();

                    System.IO.File.Delete($"ClientApp/{AssetsDirectory}/assets/img/Images/DrugsTest/docs/" + d.FileName);
                }
            }
            catch (Exception) { r = 1; }
            return r;
        }

        /// <summary>
        /// save Schedule a Drug Test
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        public ScheduleDrugTest createScheduleDrugTest(ScheduleDrugTest s, long idu)
        {
            LogsRandom logRandom = new LogsRandom();

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    //s.IdCompany = (long)DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                    var exists = DbContext.ScheduleDrugTest.Where(x => x.StepProcessCode == s.StepProcessCode && x.IdCompany == s.IdCompany).FirstOrDefault();

                    if (exists == null && s.Status == "Donor Data")
                    {
                        s.Status = "Draft";
                        s.TypeTest = s.Performed == "Alcohol" ? "Alcohol" : "Drug";
                        DbContext.Add(s);
                        DbContext.SaveChanges();
                    }
                    else
                    {
                        switch (s.Status)
                        {
                            case "Donor Data":
                                Console.WriteLine("Entra al case del donor DATA>>>");
                                exists.TestingAuthority = s.TestingAuthority;
                                exists.IdDriver = s.IdDriver;
                                exists.Performed = s.Performed;
                                exists.Reason = s.Reason;
                                exists.FederalTest = s.FederalTest;

                                var updateIdDriver = DbContext.Attach(exists);
                                updateIdDriver.Property(x => x.TestingAuthority).IsModified = true;
                                updateIdDriver.Property(x => x.IdDriver).IsModified = true;
                                updateIdDriver.Property(x => x.Performed).IsModified = true;
                                updateIdDriver.Property(x => x.Reason).IsModified = true;
                                updateIdDriver.Property(x => x.FederalTest).IsModified = true;

                                DbContext.SaveChanges();
                                break;

                            case "Assigned":
                                exists.DateTimeExpiration = s.DateTimeExpiration;
                                exists.DateTimeTest = s.DateTimeTest;
                                exists.Lab = s.Lab;

                                var updateAssigned = DbContext.Attach(exists);
                                updateAssigned.Property(x => x.DateTimeTest).IsModified = true;
                                updateAssigned.Property(x => x.DateTimeExpiration).IsModified = true;
                                updateAssigned.Property(x => x.Lab).IsModified = true;
                                DbContext.SaveChanges();
                                break;

                            case "Collections Site":
                                exists.Provider = s.Provider;

                                var updateCollections = DbContext.Attach(exists);
                                updateCollections.Property(x => x.Provider).IsModified = true;
                                DbContext.SaveChanges();
                                break;

                            case "Detail":
                                exists.Status = "Scheduled";

                                var updateDetail = DbContext.Attach(exists);
                                updateDetail.Property(x => x.Status).IsModified = true;
                                DbContext.SaveChanges();

                                logRandom.IdDriver = exists.IdDriver;
                                logRandom.IdRandomList = exists.idRandomList;
                                logRandom.Date = DateTime.Today;
                                logRandom.Year = DateTime.Today.Year;
                                var userInfo = DbContext.Users.Where(x => x.Id == exists.IdDriver).FirstOrDefault();
                                logRandom.Name = userInfo.Name;
                                logRandom.LastName = userInfo.LastName;
                                logRandom.IdCompany = exists.IdCompany;
                                DbContext.Add(logRandom);
                                DbContext.SaveChanges();

                                break;
                        }
                    }

                    return DbContext.ScheduleDrugTest.Where(x => x.StepProcessCode == s.StepProcessCode).FirstOrDefault();
                }
            }
            catch (Exception) { return null; }
        }

        /// <summary>
        /// get busy Days of Schedule a Drug Test
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        public List<DateTime> busyDays()
        {
            try
            {
                int totalHours = 32;
                List<DateTime> busyDays = new List<DateTime>();

                using (var DbContext = new BAV02Context())
                {
                    Console.WriteLine("Entra al busyDays>>>");
                    var countHrs = (from s in DbContext.ScheduleDrugTest
                                    where s.DateTimeTest != null
                                    group s by s.DateTimeTest.Value.Date into d
                                    select new
                                    {
                                        Date = d.Key,
                                        Count = d.Count()

                                    }).ToList();

                    foreach (dynamic i in countHrs)
                    {
                        if (i.Count == totalHours)
                        {
                            busyDays.Add(i.Date);
                        }
                    }

                }
                return busyDays;
            }
            catch (Exception) { return null; }
        }

        /// <summary>
        /// get busy Days of Schedule a alcohol Test
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        public List<DateTime> busyDaysAlcohol()
        {
            try
            {
                int totalHours = 32;
                List<DateTime> busyDays = new List<DateTime>();

                using (var DbContext = new BAV02Context())
                {
                    var countHrs = (from s in DbContext.ScheduleAlcoholTest
                                    where s.DateTimeTest != null
                                    group s by s.DateTimeTest.Value.Date into d
                                    select new
                                    {
                                        Date = d.Key,
                                        Count = d.Count()

                                    }).ToList();

                    foreach (dynamic i in countHrs)
                    {
                        if (i.Count == totalHours)
                        {
                            busyDays.Add(i.Date);
                        }
                    }

                }
                return busyDays;
            }
            catch (Exception) { return null; }
        }
        /// <summary>
        /// get scheduled hours per day
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        public object appointmentSchedule(DateTime selectedDay)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    Console.WriteLine("Entro al appointmenSchedule");
                    var hoursList = DbContext.ScheduleDrugTest.Where(x => x.DateTimeTest.Value.Date == selectedDay.Date && x.Status != "Canceled").Select(x => new { x.DateTimeTest.Value.TimeOfDay }).ToList();
                    Console.WriteLine("Result del appointmenSchedule>>>>>>" + hoursList);
                    return hoursList;

                }
            }
            catch (Exception) { return null; }
        }
        /// <summary>
        /// get scheduled alcohol hours per day
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        public object appointmentScheduleAlcohol(DateTime selectedDay)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {

                    var hoursList = DbContext.ScheduleAlcoholTest.Where(x => x.DateTimeTest.Value.Date == selectedDay.Date && x.Status != "Canceled").Select(x => new { x.DateTimeTest.Value.TimeOfDay }).ToList();
                    return hoursList;

                }
            }
            catch (Exception) { return null; }
        }

        /// <summary>
        /// get Scheduled Tests for company
        /// </summary>
        /// <param name="idu"></param>
        /// <returns></returns>
        public List<Object> getScheduledTests(long idu)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var company = (long)DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;

                    var list = (from s in DbContext.ScheduleDrugTest
                                join d in DbContext.Driver on s.IdDriver equals d.IdUser
                                join u in DbContext.Users on d.IdUser equals u.Id
                                join dt in DbContext.DrugTest on s.Id equals dt.IdScheduleDrugTest into dtlj
                                from dt in dtlj.DefaultIfEmpty()
                                join dac in DbContext.DrugAlcoholCompliance on dt.IdDrugAlcoholCompliance equals dac.Id into daclj
                                from dac in daclj.DefaultIfEmpty()
                                where s.IdCompany == company
                                select new
                                {
                                    s.Id,
                                    IdDriver = d.IdUser,
                                    DonorName = u.Name + " " + u.LastName,
                                    s.DateTimeTest,
                                    s.DateTimeExpiration,
                                    s.Status,
                                    s.Reason,
                                    s.CancelDetails,
                                    dt.SpecimenNumber,
                                    dt.IdDrugAlcoholCompliance,
                                    Result = dac.Result != null ? dac.Result : s.Status != "Canceled" ? "Pending" : "Canceled",
                                    Image = u.FileImage,
                                    FileName = dac.ResultFile,
                                    s.IdCompany,
                                    s.TypeTest
                                }).OrderByDescending(x => x.DateTimeTest).ToList<Object>();


                    var Alcohollist = (from s in DbContext.ScheduleAlcoholTest
                                       join d in DbContext.Driver on s.IdDriver equals d.IdUser
                                       join u in DbContext.Users on d.IdUser equals u.Id
                                       join dt in DbContext.AlcoholTest on s.Id equals dt.IdScheduleTest into dtlj
                                       from dt in dtlj.DefaultIfEmpty()
                                       join dac in DbContext.DrugAlcoholCompliance on dt.IdDrugAlcoholCompliance equals dac.Id into daclj
                                       from dac in daclj.DefaultIfEmpty()
                                       where s.IdCompany == company
                                       select new
                                       {
                                           s.Id,
                                           IdDriver = d.IdUser,
                                           DonorName = u.Name + " " + u.LastName,
                                           s.DateTimeTest,
                                           s.DateTimeExpiration,
                                           s.Status,
                                           s.Reason,
                                           s.CancelDetails,
                                           dt.TestNumber,
                                           dt.IdDrugAlcoholCompliance,
                                           Result = dac.Result != null ? dac.Result : s.Status != "Canceled" ? "Pending" : "Canceled",
                                           Image = u.FileImage,
                                           FileName = dac.ResultFile,
                                           s.IdCompany,
                                           s.TypeTest
                                       }).OrderByDescending(x => x.DateTimeTest).ToList<Object>();

                    var unionList = list.Union(Alcohollist).ToList<Object>();
                    return unionList;
                }

            }
            catch (Exception) { return null; }
        }

        /// <summary>
        /// get Scheduled Tests for company Collector
        /// </summary>
        /// <param name="idC"></param>
        /// <returns></returns>
        public List<Object> getScheduledTestsCollector(long idC)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var company = (long)idC;

                    var list = (from s in DbContext.ScheduleDrugTest
                                join d in DbContext.Driver on s.IdDriver equals d.IdUser
                                join u in DbContext.Users on d.IdUser equals u.Id
                                join dt in DbContext.DrugTest on s.Id equals dt.IdScheduleDrugTest into dtlj
                                from dt in dtlj.DefaultIfEmpty()
                                join dac in DbContext.DrugAlcoholCompliance on dt.IdDrugAlcoholCompliance equals dac.Id into daclj
                                from dac in daclj.DefaultIfEmpty()
                                where s.IdCompany == company
                                select new
                                {
                                    s.Id,
                                    IdDriver = d.IdUser,
                                    DonorName = u.Name + " " + u.LastName,
                                    s.DateTimeTest,
                                    s.DateTimeExpiration,
                                    s.Status,
                                    s.Reason,
                                    s.CancelDetails,
                                    dt.SpecimenNumber,
                                    dt.IdDrugAlcoholCompliance,
                                    Result = dac.Result != null ? dac.Result : s.Status != "Canceled" ? "Pending" : "Canceled",
                                    Image = u.FileImage,
                                    FileName = dac.ResultFile,
                                    s.IdCompany,
                                    s.TypeTest
                                }).OrderByDescending(x => x.DateTimeTest).ToList<Object>();


                    var Alcohollist = (from s in DbContext.ScheduleAlcoholTest
                                       join d in DbContext.Driver on s.IdDriver equals d.IdUser
                                       join u in DbContext.Users on d.IdUser equals u.Id
                                       join dt in DbContext.AlcoholTest on s.Id equals dt.IdScheduleTest into dtlj
                                       from dt in dtlj.DefaultIfEmpty()
                                       join dac in DbContext.DrugAlcoholCompliance on dt.IdDrugAlcoholCompliance equals dac.Id into daclj
                                       from dac in daclj.DefaultIfEmpty()
                                       where s.IdCompany == company
                                       select new
                                       {
                                           s.Id,
                                           IdDriver = d.IdUser,
                                           DonorName = u.Name + " " + u.LastName,
                                           s.DateTimeTest,
                                           s.DateTimeExpiration,
                                           s.Status,
                                           s.Reason,
                                           s.CancelDetails,
                                           dt.TestNumber,
                                           dt.IdDrugAlcoholCompliance,
                                           Result = dac.Result != null ? dac.Result : s.Status != "Canceled" ? "Pending" : "Canceled",
                                           Image = u.FileImage,
                                           FileName = dac.ResultFile,
                                           s.IdCompany,
                                           s.TypeTest
                                       }).OrderByDescending(x => x.DateTimeTest).ToList<Object>();

                    var unionList = list.Union(Alcohollist).ToList<Object>();
                    return unionList;
                }

            }
            catch (Exception) { return null; }
        }

        public int getScheduledTestsCompleteCollector(long idC)
        {
            var complete = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var company = (long)idC;
                    var RandomComplete = DbContext.ScheduleDrugTest.Where(x => x.Status == "Collection Completed" && x.IdCompany == company).ToList();
                    complete = RandomComplete.Count;
                    return complete;
                }

            }
            catch (Exception)
            {
                return 0;
            }
        }

        public int getScheduledTestsComplete(long idu)
        {
            var complete = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var company = (long)DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                    var RandomComplete = DbContext.ScheduleDrugTest.Where(x => x.Status == "Collection Completed" && x.IdCompany == company).ToList();
                    complete = RandomComplete.Count;
                    return complete;
                }

            }
            catch (Exception)
            {
                return 0;
            }
        }

        public int GetScheduledTestsInProcess(long idu)
        {
            var inProcess = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var company = (long)DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                    var inProcesslist = DbContext.ScheduleDrugTest.Where(x => x.Status == "Scheduled" && x.IdCompany == company).ToList();
                    inProcess = inProcesslist.Count;
                    return inProcess;
                }

            }
            catch (Exception)
            {
                return 0;
            }
        }

        public int GetScheduledTestsInProcessCollector(long idC)
        {
            var inProcess = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var company = (long)idC;
                    var inProcesslist = DbContext.ScheduleDrugTest.Where(x => x.Status == "Scheduled" && x.IdCompany == company).ToList();
                    inProcess = inProcesslist.Count;
                    return inProcess;
                }

            }
            catch (Exception)
            {
                return 0;
            }
        }

        /// <summary>
        /// update status of Scheduled 
        /// </summary>
        /// <param name="idScheduleDrugTest">id of the table ScheduleDrugTest with which the validation for the update will be done</param>
        /// <param name="status">new status of the schedule to be edited</param>
        /// <param name="cancelDetails">details for which the schedule is cancelled (will only bring message if status is "cancelled" and previous status is not "draft")</param>
        /// <returns></returns>
        public int updatStatusScheduleDrugTest(long idScheduleDrugTest, string status, string cancelDetails)
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var scheleduled = DbContext.ScheduleDrugTest.Where(x => x.Id == idScheduleDrugTest).FirstOrDefault();
                    scheleduled.Status = status;
                    var updateStatus = DbContext.Attach(scheleduled);
                    if (scheleduled.Status == "Canceled")
                    {
                        scheleduled.CancelDetails = cancelDetails;
                        updateStatus.Property(x => x.CancelDetails).IsModified = true;
                    }
                    updateStatus.Property(x => x.Status).IsModified = true;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { r = 1; }
            return r;
        }

        /// <summary>
        /// eliminates the schedule cancelled according to idSchedule as long as they have
        /// </summary>
        /// <param name="idSchedule">id of schedule that is going to eliminate</param>
        /// <returns></returns>
        public int deleteScheduleDrugTest(long idSchedule)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var schedule = DbContext.ScheduleDrugTest.Where(x => x.Id == idSchedule).FirstOrDefault();
                    if (schedule.CancelDetails == null)
                    {
                        DbContext.ScheduleDrugTest.RemoveRange(schedule);
                        DbContext.SaveChanges();
                    }

                    return 0;
                }
            }
            catch (Exception) { return 1; }
        }

        /// <summary>
        /// get Scheduled Test data
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public ScheduleDrugTest getScheduledTestData(long ids)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    return DbContext.ScheduleDrugTest.Where(x => x.Id == ids).FirstOrDefault();
                }
            }
            catch (Exception) { return null; }
        }
        /// <summary>
        /// get Scheduled Alcohol Test data
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public ScheduleAlcoholTest getScheduledTestDataAlcohol(long ids)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    return DbContext.ScheduleAlcoholTest.Where(x => x.Id == ids).FirstOrDefault();
                }
            }
            catch (Exception) { return null; }
        }

        public static (DateTime fecha1, DateTime fecha2) getDateRandom(int q, int year)
        {
            DateTime Q1First = new DateTime(year, 1, 1);
            DateTime Q1Last = new DateTime(year, 3, 31);
            DateTime Q2First = new DateTime(year, 4, 1);
            DateTime Q2Last = new DateTime(year, 6, 30);
            DateTime Q3First = new DateTime(year, 7, 1);
            DateTime Q3Last = new DateTime(year, 9, 30);
            DateTime Q4First = new DateTime(year, 10, 1);
            DateTime Q4Last = new DateTime(year, 12, 31);

            if (q == 1)
            {
                return (Q1First, Q1Last);
            }
            else if (q == 2)
            {
                return (Q2First, Q2Last);
            }
            else if (q == 3)
            {
                return (Q3First, Q3Last);
            }
            else
            {
                return (Q4First, Q4Last);
            }
        }

        public double getQuaterDriversCount(int q, double Cantidad)
        {
            if (q == 1)
            {
                return Cantidad / 4;
            }
            else if (q == 2)
            {
                return Cantidad / 3;
            }
            else if (q == 3)
            {
                return Cantidad / 2;
            }
            else if (q == 4)
            {
                return Cantidad / 1;
            }
            return 0;
        }

        public List<RandomLogs> getLogsRandom(long idCompany)
        {
            List<RandomLogs> logsRandom = new List<RandomLogs>();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    logsRandom = DbContext.RandomLogs.Where(x => x.IdCompany == idCompany && x.Type == "Drug").ToList();
                    return logsRandom;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<RandomLogs> getLogsRandomAlcohol(long idCompany)
        {
            List<RandomLogs> logsRandom = new List<RandomLogs>();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    logsRandom = DbContext.RandomLogs.Where(x => x.IdCompany == idCompany && x.Type == "Alcohol").ToList();
                    return logsRandom;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<RandomListView> getReScheduleList(string reason, long IdRandom, int q, long idCompany, int year, long IdDriver)
        {
            List<RandomListView> listDrugTesting = new List<RandomListView>();
            List<DriversCompany> listDriverCompany = new List<DriversCompany>();
            LogsRandom logsRandom = new LogsRandom();
            DateTime fecha = DateTime.Today;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    listDriverCompany = DbContext.DriversCompany.Where(x => x.IdCompany == idCompany && x.Status).ToList();
                    var countListDriverCompany = listDriverCompany.Count;

                    int randomNumber;
                    int c = countListDriverCompany - 1;
                    int random = _random.Next(0, c);
                    if (listDriverCompany[random].IdDriverUser == IdDriver)
                    {
                        while (listDriverCompany[random].IdDriverUser == IdDriver)
                        {
                            random = _random.Next(0, c);
                        }
                        randomNumber = random;
                    }
                    else
                    {
                        randomNumber = random;
                    }

                    var randomlist = DbContext.RandomList.Where(x => x.IdRandomList == IdRandom).FirstOrDefault();
                    logsRandom.IdDriver = IdDriver;
                    logsRandom.IdRandomList = IdRandom;
                    logsRandom.Reason = reason;
                    logsRandom.Date = fecha;
                    logsRandom.Quarter = q;
                    logsRandom.Year = year;
                    logsRandom.Name = randomlist.Name;
                    logsRandom.LastName = randomlist.LastName;
                    logsRandom.IdCompany = idCompany;
                    logsRandom.Type = "Random";
                    DbContext.LogsRandom.Add(logsRandom);
                    DbContext.SaveChanges();


                    randomlist.IdDriver = listDriverCompany[random].IdDriverUser;
                    randomlist.Name = listDriverCompany[random].Name;
                    randomlist.LastName = listDriverCompany[random].LastName;
                    DbContext.SaveChanges();

                    var scheduleDrugTest = DbContext.ScheduleDrugTest.Where(x => x.idRandomList == IdRandom && x.Reason == "Random" && x.Status == "Draft").FirstOrDefault();
                    scheduleDrugTest.IdDriver = listDriverCompany[random].IdDriverUser;
                    DbContext.SaveChanges();



                    listDrugTesting = DbContext.RandomListView.Where(x => x.Quarter == q && x.DateYear == year && x.IdCompany == idCompany).ToList();
                    return listDrugTesting;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<RandomListAlcoholView> getReScheduleListAlcohol(string reason, long IdRandom, int q, long idCompany, int year, long IdDriver)
        {
            List<RandomListAlcoholView> listDrugTesting = new List<RandomListAlcoholView>();
            List<DriversCompany> listDriverCompany = new List<DriversCompany>();
            LogsRandom logsRandom = new LogsRandom();
            DateTime fecha = DateTime.Today;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    listDriverCompany = DbContext.DriversCompany.Where(x => x.IdCompany == idCompany && x.Status).ToList();
                    var countListDriverCompany = listDriverCompany.Count;

                    int randomNumber;
                    int c = countListDriverCompany - 1;
                    int random = _random.Next(0, c);
                    if (listDriverCompany[random].IdDriverUser == IdDriver)
                    {
                        while (listDriverCompany[random].IdDriverUser == IdDriver)
                        {
                            random = _random.Next(0, c);
                        }
                        randomNumber = random;
                    }
                    else
                    {
                        randomNumber = random;
                    }

                    var randomlist = DbContext.RandomListAlcohol.Where(x => x.IdRandomList == IdRandom).FirstOrDefault();
                    logsRandom.IdDriver = IdDriver;
                    logsRandom.IdRandomList = IdRandom;
                    logsRandom.Reason = reason;
                    logsRandom.Date = fecha;
                    logsRandom.Quarter = q;
                    logsRandom.Year = year;
                    logsRandom.Name = randomlist.Name;
                    logsRandom.LastName = randomlist.LastName;
                    logsRandom.IdCompany = idCompany;
                    logsRandom.Type = "Alcohol";
                    DbContext.LogsRandom.Add(logsRandom);
                    DbContext.SaveChanges();


                    randomlist.IdDriver = listDriverCompany[random].IdDriverUser;
                    randomlist.Name = listDriverCompany[random].Name;
                    randomlist.LastName = listDriverCompany[random].LastName;
                    DbContext.SaveChanges();

                    var scheduleDrugTest = DbContext.ScheduleAlcoholTest.Where(x => x.idRandomList == IdRandom && x.Reason == "Random" && x.Status == "Draft").FirstOrDefault();
                    scheduleDrugTest.IdDriver = listDriverCompany[random].IdDriverUser;
                    DbContext.SaveChanges();



                    listDrugTesting = DbContext.RandomListAlcoholView.Where(x => x.Quarter == q && x.DateYear == year && x.IdCompany == idCompany).ToList();
                    return listDrugTesting;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<DriversCompany> getDotDrivers(long idCompany)
        {
            List<DriversCompany> listDriverCompany = new List<DriversCompany>();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    listDriverCompany = DbContext.DriversCompany.Where(x => x.IdCompany == idCompany && x.Status && (x.CDL == true || x.CMV == true)).ToList();
                }
                return listDriverCompany;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<DriversCompany> getNonDotDrivers(long idCompany)
        {
            List<DriversCompany> listDriverCompany = new List<DriversCompany>();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    listDriverCompany = DbContext.DriversCompany.Where(x => x.IdCompany == idCompany && x.Status && (x.CDL == false && x.CMV == false)).ToList();
                }
                return listDriverCompany;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Boolean sendEmail(int q, long idCompany, int year, int percentage, IHostingEnvironment _env)
        {
            DateTime fecha = DateTime.Today;
            List<RandomListView> listDrugTesting = new List<RandomListView>();
            try
            {
                using (var DbContext = new BAV02Context())
                {

                    var companyName = DbContext.Company.Where(x => x.Id == idCompany).FirstOrDefault().LegalName;
                    var Emailcompany = DbContext.Company.Where(x => x.Id == idCompany).FirstOrDefault().Email;

                    EmailService sendRandomList = new EmailService(_env);
                    sendRandomList.setEmailTemplateRandomList();
                    sendRandomList.emailBody = sendRandomList.emailBody.Replace("[COMPANYNAME]", companyName)
                        .Replace("[DATERANDOMSELECTION]", fecha.ToString());
                    sendRandomList.sendMail(Emailcompany, "Generated Random List");

                    listDrugTesting = DbContext.RandomListView.Where(x => x.Quarter == q && x.DateYear == year && x.IdCompany == idCompany).ToList();

                    if (listDrugTesting.Count == 0)
                    {
                        EmailService sendNoRamdomSelect = new EmailService(_env);
                        sendNoRamdomSelect.setEmailNoRandomSelected();
                        sendNoRamdomSelect.emailBody = sendNoRamdomSelect.emailBody.Replace("[DERName]", companyName)
                            .Replace("[DATERANDOMSELECTION]", fecha.ToString());
                        sendNoRamdomSelect.sendMail(Emailcompany, "Generated Random List");
                    }
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
        }

        public void resetTests(long idCompany, int year)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    List<RandomList> listSheduleDrugtest = DbContext.RandomList.Where(x => x.DateNotified.ToString().Contains(year.ToString()) && x.IdCompany == idCompany).ToList();
                    foreach (RandomList sch in listSheduleDrugtest)
                    {
                        DbContext.RandomList.Attach(sch);
                        DbContext.RandomList.Remove(sch);
                    }
                    List<ScheduleDrugTest> listSchedule = DbContext.ScheduleDrugTest.Where(x => x.IdCompany == idCompany && x.Reason == "Random").ToList();
                    foreach (ScheduleDrugTest sche in listSchedule)
                    {
                        DbContext.ScheduleDrugTest.Attach(sche);
                        DbContext.ScheduleDrugTest.Remove(sche);
                    }
                    DbContext.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public double validateRandomAlcohol(long idCompany, int year)
        {
            List<DriversCompany> listDriverCompany = new List<DriversCompany>();
            List<ScheduleAlcoholTest> listSheduleDrugtest = new List<ScheduleAlcoholTest>();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    listDriverCompany = DbContext.DriversCompany.Where(x => x.IdCompany == idCompany && x.Status).ToList();
                    var countListDriverCompany = listDriverCompany.Count;

                    listSheduleDrugtest = DbContext.ScheduleAlcoholTest.Where(x => x.DateTimeTest.ToString().Contains(year.ToString()) && x.IdCompany == idCompany && x.Reason == "Random").ToList();
                    var countListSheduleDrugTest = listSheduleDrugtest.Count;

                    var PercentageOfDrugtestDrivers = (countListSheduleDrugTest * 100) / countListDriverCompany;

                    if (PercentageOfDrugtestDrivers < 15)
                    {
                        return 0;
                    }
                    else
                    {
                        return 1;
                    }
                }

            }
            catch (Exception ex)
            {
                return 1;
            }
        }
        public double validateRandom(long idCompany, int year)
        {
            List<DriversCompany> listDriverCompany = new List<DriversCompany>();
            List<ScheduleDrugTest> listSheduleDrugtest = new List<ScheduleDrugTest>();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    listDriverCompany = this.getDotDrivers(idCompany);
                    var countListDriverCompany = listDriverCompany.Count;

                    listSheduleDrugtest = DbContext.ScheduleDrugTest.Where(x => x.DateTimeTest.ToString().Contains(year.ToString()) && x.IdCompany == idCompany && x.Reason == "Random").ToList();
                    var countListSheduleDrugTest = listSheduleDrugtest.Count;

                    var PercentageOfDrugtestDrivers = (countListSheduleDrugTest * 100) / countListDriverCompany;

                    if (PercentageOfDrugtestDrivers < 60)
                    {
                        return 0;
                    }
                    else
                    {
                        return 1;
                    }
                }
            }
            catch (Exception ex)
            {
                return 1;
            }
        }
        public List<RandomListView> getRandomList(int q, long idCompany, int year, int percentage, IHostingEnvironment _env)
        {
            double remainingPercentage = 0;
            double remainingDrivers = 0;
            List<RandomList> list = new List<RandomList>();
            List<DriversCompany> listDriverCompany = new List<DriversCompany>();
            List<RandomListView> listDrugTesting = new List<RandomListView>();
            List<ScheduleDrugTest> listSheduleDrugtest = new List<ScheduleDrugTest>();
            DateTime fecha = DateTime.Today;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    listDrugTesting = DbContext.RandomListView.Where(x => x.Quarter == q && x.DateYear == year && x.IdCompany == idCompany).ToList();
                    var countListDrugTest = listDrugTesting.Count;

                    if (countListDrugTest == 0)
                    {
                        listDriverCompany = this.getDotDrivers(idCompany);
                        var countListDriverCompany = listDriverCompany.Count;

                        listSheduleDrugtest = DbContext.ScheduleDrugTest.Where(x => x.DateTimeTest.ToString().Contains(year.ToString()) && x.IdCompany == idCompany && x.Reason == "Random").ToList();
                        var countListSheduleDrugTest = listSheduleDrugtest.Count;

                        var PercentageOfDrugtestDrivers = (countListSheduleDrugTest * 100) / countListDriverCompany;

                        if (PercentageOfDrugtestDrivers < percentage)
                        {

                            remainingPercentage = percentage - PercentageOfDrugtestDrivers;
                            remainingDrivers = (countListDriverCompany * remainingPercentage) / 100;
                            double cantidadDrivers = Math.Round(getQuaterDriversCount(q, remainingDrivers), MidpointRounding.AwayFromZero);
                            int cantQuaterDriver = Convert.ToInt32(cantidadDrivers);
                            if (cantQuaterDriver == 0)
                            {
                                cantQuaterDriver = cantQuaterDriver + 1;
                            }
                            int[] randomNumbers = new int[cantQuaterDriver];

                            for (int i = 0; i < cantQuaterDriver; i++)
                            {
                                int c = countListDriverCompany;
                                int random = _random.Next(0, c);
                                if (randomNumbers.Contains(random))
                                {
                                    while (randomNumbers.Contains(random))
                                    {
                                        random = _random.Next(0, c);
                                    }
                                    randomNumbers[i] = random;
                                }
                                else
                                {
                                    randomNumbers[i] = random;
                                }
                            }
                            for (int i = 0; i < randomNumbers.Length; i++)
                            {
                                randomNumbers[i] = randomNumbers[i] - 1;
                            }
                            for (int i = 0; i < cantQuaterDriver; i++)
                            {
                                RandomList lista = new RandomList();
                                ScheduleDrugTest shedule = new ScheduleDrugTest();
                                LogsRandom logs = new LogsRandom();

                                var idDriver = randomNumbers[i];
                                lista.DateYear = year;
                                lista.Type = "DrugTest";
                                lista.IdCompany = idCompany;
                                lista.Quarter = q;
                                lista.DateNotified = fecha;
                                lista.IdDriver = listDriverCompany[idDriver].IdDriverUser;
                                lista.Name = listDriverCompany[idDriver].Name;
                                lista.LastName = listDriverCompany[idDriver].LastName;
                                lista.PhoneNumber = listDriverCompany[idDriver].PhoneNumber;
                                DbContext.Add(lista);
                                DbContext.SaveChanges();

                                shedule.idRandomList = lista.IdRandomList;
                                shedule.FederalTest = true;
                                shedule.TestingAuthority = "DOT_FMCSA";
                                shedule.IdDriver = listDriverCompany[idDriver].IdDriverUser;
                                shedule.Performed = "DRUGS - THC, COC, PCP, OPI, AMP";
                                shedule.Reason = "Random";
                                shedule.TypeTest = "Drug";
                                shedule.Status = "Draft";
                                DateTime d = DateTime.Now;
                                shedule.StepProcessCode = d.Year + d.Month + d.Day + d.Second + "-" + idCompany + listDriverCompany[idDriver].IdDriverUser;
                                shedule.IdCompany = idCompany;
                                DbContext.Add(shedule);
                                DbContext.SaveChanges();

                                logs.IdDriver = listDriverCompany[idDriver].IdDriverUser;
                                logs.IdRandomList = lista.IdRandomList;
                                logs.Reason = "has a random test in draft";
                                logs.Date = d;
                                logs.Quarter = q;
                                logs.Year = d.Year;
                                logs.Name = listDriverCompany[idDriver].Name;
                                logs.LastName = listDriverCompany[idDriver].LastName;
                                logs.IdCompany = idCompany;
                                logs.Type = "Drug";
                                DbContext.Add(logs);
                                DbContext.SaveChanges();
                            }
                            var companyName = DbContext.Company.Where(x => x.Id == idCompany).FirstOrDefault().LegalName;
                            var Emailcompany = DbContext.Company.Where(x => x.Id == idCompany).FirstOrDefault().Email;

                            EmailService sendRandomList = new EmailService(_env);
                            sendRandomList.setEmailTemplateRandomList();
                            sendRandomList.emailBody = sendRandomList.emailBody.Replace("[COMPANYNAME]", companyName)
                                .Replace("[DATERANDOMSELECTION]", fecha.ToString());
                            sendRandomList.sendMail(Emailcompany, "Generated Random List");

                            listDrugTesting = DbContext.RandomListView.Where(x => x.Quarter == q && x.DateYear == year && x.IdCompany == idCompany).ToList();

                            if (listDrugTesting.Count == 0)
                            {
                                EmailService sendNoRamdomSelect = new EmailService(_env);
                                sendNoRamdomSelect.setEmailNoRandomSelected();
                                sendNoRamdomSelect.emailBody = sendNoRamdomSelect.emailBody.Replace("[DERName]", companyName)
                                    .Replace("[DATERANDOMSELECTION]", fecha.ToString());
                                sendNoRamdomSelect.sendMail(Emailcompany, "Generated Random List");
                            }

                            return listDrugTesting;
                        }
                        else
                        {
                            listDrugTesting = DbContext.RandomListView.Where(x => x.Quarter == q && x.DateYear == year && x.IdCompany == idCompany).ToList();
                            return listDrugTesting;
                        }

                    }
                    else
                    {
                        return listDrugTesting;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<RandomListAlcoholView> getRandomListAlcohol(int q, long idCompany, int year, IHostingEnvironment _env)
        {
            double remainingPercentage = 0;
            double remainingDrivers = 0;
            List<RandomListAlcohol> list = new List<RandomListAlcohol>();
            List<DriversCompany> listDriverCompany = new List<DriversCompany>();
            List<RandomListAlcoholView> listDrugTesting = new List<RandomListAlcoholView>();
            List<ScheduleAlcoholTest> listSheduleDrugtest = new List<ScheduleAlcoholTest>();
            DateTime fecha = DateTime.Today;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    listDrugTesting = DbContext.RandomListAlcoholView.Where(x => x.Quarter == q && x.DateYear == year && x.IdCompany == idCompany).ToList();
                    var countListDrugTest = listDrugTesting.Count;

                    if (countListDrugTest == 0)
                    {
                        listDriverCompany = this.getDotDrivers(idCompany);
                        var countListDriverCompany = listDriverCompany.Count;

                        listSheduleDrugtest = DbContext.ScheduleAlcoholTest.Where(x => x.DateTimeTest.ToString().Contains(year.ToString()) && x.IdCompany == idCompany && x.Reason == "Random").ToList();
                        var countListSheduleDrugTest = listSheduleDrugtest.Count;

                        var PercentageOfDrugtestDrivers = (countListSheduleDrugTest * 100) / countListDriverCompany;

                        if (PercentageOfDrugtestDrivers < 15)
                        {

                            remainingPercentage = 15 - PercentageOfDrugtestDrivers;
                            remainingDrivers = (countListDriverCompany * remainingPercentage) / 100;
                            double cantidadDrivers = Math.Round(getQuaterDriversCount(q, remainingDrivers), MidpointRounding.AwayFromZero);
                            int cantQuaterDriver = Convert.ToInt32(cantidadDrivers);
                            if (cantQuaterDriver == 0)
                            {
                                cantQuaterDriver = cantQuaterDriver + 1;
                            }
                            int[] randomNumbers = new int[cantQuaterDriver];

                            for (int i = 0; i < cantQuaterDriver; i++)
                            {
                                int c = countListDriverCompany;
                                int random = _random.Next(0, c);
                                if (randomNumbers.Contains(random))
                                {
                                    while (randomNumbers.Contains(random))
                                    {
                                        random = _random.Next(0, c);
                                    }
                                    randomNumbers[i] = random;
                                }
                                else
                                {
                                    randomNumbers[i] = random;
                                }
                            }
                            Console.WriteLine(randomNumbers.Length + "CANTIDAD ");

                            for (int i = 0; i < randomNumbers.Length; i++)
                            {
                                randomNumbers[i] = randomNumbers[i] - 1;
                            }
                            for (int i = 0; i < cantQuaterDriver; i++)
                            {
                                RandomListAlcohol lista = new RandomListAlcohol();
                                ScheduleAlcoholTest shedule = new ScheduleAlcoholTest();
                                LogsRandom logs = new LogsRandom();

                                var idDriver = randomNumbers[i];
                                lista.DateYear = year;
                                lista.Type = "AlcoholTest";
                                lista.IdCompany = idCompany;
                                lista.Quarter = q;
                                lista.DateNotified = fecha;
                                lista.IdDriver = listDriverCompany[idDriver].IdDriverUser;
                                lista.Name = listDriverCompany[idDriver].Name;
                                lista.LastName = listDriverCompany[idDriver].LastName;
                                lista.PhoneNumber = listDriverCompany[idDriver].PhoneNumber;
                                DbContext.Add(lista);
                                DbContext.SaveChanges();

                                shedule.idRandomList = lista.IdRandomList;
                                shedule.FederalTest = true;
                                shedule.TestingAuthority = "DOT_FMCSA";
                                shedule.IdDriver = listDriverCompany[idDriver].IdDriverUser;
                                shedule.Performed = "Alcohol";
                                shedule.Reason = "Random";
                                shedule.TypeTest = "Alcohol";
                                shedule.Status = "Draft";
                                DateTime d = DateTime.Now;
                                shedule.StepProcessCode = d.Year + d.Month + d.Day + d.Second + "-" + idCompany + listDriverCompany[idDriver].IdDriverUser;
                                shedule.IdCompany = idCompany;
                                DbContext.Add(shedule);
                                DbContext.SaveChanges();

                                logs.IdDriver = listDriverCompany[idDriver].IdDriverUser;
                                logs.IdRandomList = lista.IdRandomList;
                                logs.Reason = "has a random test in draft";
                                logs.Date = d;
                                logs.Quarter = q;
                                logs.Year = d.Year;
                                logs.Name = listDriverCompany[idDriver].Name;
                                logs.LastName = listDriverCompany[idDriver].LastName;
                                logs.IdCompany = idCompany;
                                logs.Type = "Alcohol";
                                DbContext.Add(logs);
                                DbContext.SaveChanges();
                            }

                            var companyName = DbContext.Company.Where(x => x.Id == idCompany).FirstOrDefault().LegalName;
                            var Emailcompany = DbContext.Company.Where(x => x.Id == idCompany).FirstOrDefault().Email;

                            EmailService sendRandomList = new EmailService(_env);
                            sendRandomList.setEmailTemplateRandomList();
                            sendRandomList.emailBody = sendRandomList.emailBody.Replace("[COMPANYNAME]", companyName)
                                .Replace("[DATERANDOMSELECTION]", fecha.ToString());
                            sendRandomList.sendMail(Emailcompany, "Generated Alcohol Random List");

                            listDrugTesting = DbContext.RandomListAlcoholView.Where(x => x.Quarter == q && x.DateYear == year && x.IdCompany == idCompany).ToList();

                            if (listDrugTesting.Count == 0)
                            {
                                EmailService sendNoRamdomSelect = new EmailService(_env);
                                sendNoRamdomSelect.setEmailNoRandomSelected();
                                sendNoRamdomSelect.emailBody = sendNoRamdomSelect.emailBody.Replace("[DERName]", companyName)
                                    .Replace("[DATERANDOMSELECTION]", fecha.ToString());
                                sendNoRamdomSelect.sendMail(Emailcompany, "Generated Random List");
                            }
                            return listDrugTesting;
                        }
                        else
                        {
                            listDrugTesting = DbContext.RandomListAlcoholView.Where(x => x.Quarter == q && x.DateYear == year && x.IdCompany == idCompany).ToList();
                            return listDrugTesting;
                        }

                    }
                    else
                    {
                        return listDrugTesting;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<RandomListView> getQuarterRandomList(int q, long idCompany, int year)
        {
            List<RandomListView> listDrugTesting = new List<RandomListView>();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    listDrugTesting = DbContext.RandomListView.Where(x => x.Quarter == q && x.DateYear == year && x.IdCompany == idCompany).ToList();
                    return listDrugTesting;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int[] getRandomListStats(long idCompany, int year)
        {
            int remainingPercentage = 0;
            int remainingDrivers = 0;
            int[] objeto = new int[9];
            int quarter;
            List<DriversCompany> listDriverCompany = new List<DriversCompany>();
            List<RandomList> listDrugTesting = new List<RandomList>();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    listDriverCompany = DbContext.DriversCompany.Where(x => x.IdCompany == idCompany).ToList();

                    for (int i = 1; i <= 4; i++)
                    {
                        quarter = i;
                        listDrugTesting = DbContext.RandomList.Where(x => x.Quarter == quarter && x.DateYear == year && x.IdCompany == idCompany).ToList();
                        var countListDrugTest = listDrugTesting.Count;
                        var PercentageOfDrugtestDrivers = (countListDrugTest * 100) / listDriverCompany.Count;
                        remainingPercentage = 50 - PercentageOfDrugtestDrivers;
                        remainingDrivers = countListDrugTest;
                        //int cantQuaterDriver = getQuaterDriversCount(quarter,remainingDrivers);
                        if (i == 1)
                        {
                            objeto[0] = remainingDrivers;
                            objeto[1] = PercentageOfDrugtestDrivers;
                        }
                        else if (i == 2)
                        {
                            objeto[2] = remainingDrivers;
                            objeto[3] = PercentageOfDrugtestDrivers;
                        }
                        else if (i == 3)
                        {
                            objeto[4] = remainingDrivers;
                            objeto[5] = PercentageOfDrugtestDrivers;
                        }
                        else
                        {
                            objeto[6] = remainingDrivers;
                            objeto[7] = PercentageOfDrugtestDrivers;
                        }
                    }
                    objeto[8] = listDriverCompany.Count;
                    return objeto;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //-------------------------------------------------------------------------------------------

        public int[] getRandomListStatsAlcohol(long idCompany, int year)
        {
            int remainingPercentage = 0;
            int remainingDrivers = 0;
            int[] objeto = new int[9];
            int quarter;
            List<DriversCompany> listDriverCompany = new List<DriversCompany>();
            List<RandomListAlcohol> listDrugTesting = new List<RandomListAlcohol>();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    listDriverCompany = DbContext.DriversCompany.Where(x => x.IdCompany == idCompany).ToList();
                    var countListDriverCompany = listDriverCompany.Count;

                    for (int i = 1; i <= 4; i++)
                    {
                        quarter = i;
                        listDrugTesting = DbContext.RandomListAlcohol.Where(x => x.Quarter == quarter && x.DateYear == year && x.IdCompany == idCompany).ToList();
                        var countListDrugTest = listDrugTesting.Count;
                        var PercentageOfDrugtestDrivers = (countListDrugTest * 100) / countListDriverCompany;
                        remainingPercentage = 10 - PercentageOfDrugtestDrivers;
                        remainingDrivers = countListDrugTest;
                        //int cantQuaterDriver = getQuaterDriversCount(quarter,remainingDrivers);
                        if (i == 1)
                        {
                            objeto[0] = remainingDrivers;
                            objeto[1] = PercentageOfDrugtestDrivers;
                        }
                        else if (i == 2)
                        {
                            objeto[2] = remainingDrivers;
                            objeto[3] = PercentageOfDrugtestDrivers;
                        }
                        else if (i == 3)
                        {
                            objeto[4] = remainingDrivers;
                            objeto[5] = PercentageOfDrugtestDrivers;
                        }
                        else
                        {
                            objeto[6] = remainingDrivers;
                            objeto[7] = PercentageOfDrugtestDrivers;
                        }
                    }
                    objeto[8] = countListDriverCompany;
                    return objeto;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        ///get all scheduled tests according to the provider 
        /// </summary>
        /// <param name="provider">name of the provider through which the filtering will be done</param>
        /// <returns></returns>
        public List<Object> getProviderScheduledTests(string provider)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var listSchedules = (from s in DbContext.ScheduleDrugTest
                                         join d in DbContext.Driver on s.IdDriver equals d.IdUser
                                         join u in DbContext.Users on d.IdUser equals u.Id
                                         join r in DbContext.CompanyUsersRoles on u.Id equals r.IdUser
                                         join c in DbContext.Company on r.IdCompany equals c.Id
                                         join dt in DbContext.DrugTest on s.Id equals dt.IdScheduleDrugTest into dtlj
                                         from dt in dtlj.DefaultIfEmpty()
                                         join dac in DbContext.DrugAlcoholCompliance on dt.IdDrugAlcoholCompliance equals dac.Id into daclj
                                         from dac in daclj.DefaultIfEmpty()
                                         where s.Provider == provider
                                         select new
                                         {
                                             s.Id,
                                             IdDriver = d.IdUser,
                                             Driver = u.Name + " " + u.LastName,
                                             s.IdCompany,
                                             c.LegalName,
                                             c.Der,
                                             s.DateTimeTest,
                                             s.DateTimeExpiration,
                                             s.Performed,
                                             s.Reason,
                                             s.Provider,
                                             s.CancelDetails,
                                             s.Status,
                                             Result = dac.Result != null ? dac.Result : s.Status != "Canceled" ? "Pending" : "Canceled",
                                             s.TypeTest
                                         }).OrderByDescending(x => x.DateTimeTest).ToList();

                    var listNoDraft = listSchedules.Where(x => x.Status != "Draft" && x.Status != "Canceled").ToList();
                    var listCanceled = listSchedules.Where(x => x.Status == "Canceled" && x.CancelDetails != null).ToList();

                    var listScheduleDrugTest = listNoDraft.Union(listCanceled).ToList<Object>();

                    return listScheduleDrugTest;
                }

            }
            catch (Exception) { return null; }
        }

        public Object updateScheduleDrugTestData(long idScheduledTest, Users u, Driver d)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var UserData = (from s in DbContext.ScheduleDrugTest
                                    join Driver in DbContext.Driver on s.IdDriver equals d.IdUser
                                    join Users in DbContext.Users on d.IdUser equals u.Id
                                    join r in DbContext.CompanyUsersRoles on u.Id equals r.IdUser
                                    join c in DbContext.Company on r.IdCompany equals c.Id
                                    where s.Id == idScheduledTest
                                    select new
                                    {
                                        s.Id,
                                        IdDriver = d.IdUser,
                                        d.License,
                                        u.Birthdate,
                                        DriverPhoneNumber = u.PhoneNumber
                                    }
                                    ).FirstOrDefault();
                    DbContext.Add(UserData);
                    DbContext.SaveChanges();
                    return UserData;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error:{ex}");
            }
        }

        /// <summary>
        /// get the drug test scheduled according to the provider and by schedule id
        /// </summary>
        /// <param name="idScheduledTest"></param>
        /// <returns></returns>the primary key of ScheduleDrugTest, with which the information consultation will be made</param>
        public Object getProviderScheduledDrugTestData(long idScheduledTest)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    CityDAL cityDAL = new CityDAL();
                    StatesDAL statesDAL = new StatesDAL();
                    var lstCities = cityDAL.GetCities().ToList();
                    var lstStates = statesDAL.GetStates().ToList();

                    var ScheduleData = (from s in DbContext.ScheduleDrugTest
                                        join d in DbContext.Driver on s.IdDriver equals d.IdUser
                                        join u in DbContext.Users on d.IdUser equals u.Id
                                        join r in DbContext.CompanyUsersRoles on u.Id equals r.IdUser
                                        join c in DbContext.Company on r.IdCompany equals c.Id
                                        where s.Id == idScheduledTest
                                        select new
                                        {
                                            s.Id,
                                            IdDriver = d.IdUser,
                                            u.FileImage,
                                            Driver = u.Name + " " + u.LastName,
                                            FirstName = u.Name,
                                            LastName = u.LastName,
                                            UserPhone = u.PhoneNumber,
                                            d.License,
                                            d.EmployeeId,
                                            u.Birthdate,
                                            UserEmail = u.Email,
                                            DriverPhoneNumber = u.PhoneNumber,
                                            s.IdCompany,
                                            c.Dot,
                                            c.LegalName,
                                            c.Der,
                                            c.Email,
                                            CompanyPhoneNumber = c.PhoneNumber,
                                            CompanyAddress = c.PhysicalAddress,
                                            CompanyCity = lstCities.Where(x => x.Id == c.PhysicalCity).FirstOrDefault().Name,
                                            CompanyState = lstStates.Where(x => x.Id == c.PhysicalState).FirstOrDefault().Name,
                                            c.PhysicalZip,
                                            s.FederalTest,
                                            s.TestingAuthority,
                                            s.DateTimeTest,
                                            s.DateTimeExpiration,
                                            s.Performed,
                                            s.Reason,
                                            s.Provider,
                                            s.CancelDetails,
                                            s.Status
                                        }).FirstOrDefault();


                    return ScheduleData;
                }

            }
            catch (Exception) { return null; }
        }

        /// <summary>
        /// get drug Test data and the result of the drug test by idScheduledTest
        /// </summary>
        /// <param name="idScheduledTest">the foreign key with ScheduleDrugTest, with which the information consultation will be made</param>
        /// <returns></returns>
        public DrugTest getDrugTestData(long idScheduledTest)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    return DbContext.DrugTest.Where(x => x.IdScheduleDrugTest == idScheduledTest && x.Status != "Canceled").FirstOrDefault();
                }
            }
            catch (Exception) { return null; }
        }

        /// <summary>
        /// save new drug test according schedule
        /// </summary>
        /// <param name="test">drugtest table data to be saved</param>
        /// <returns></returns>
        public DrugTest createDrugTest(DrugTest test)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    DbContext.Add(test);
                    DbContext.SaveChanges();
                }
                return getDrugTestData((long)test.IdScheduleDrugTest);
            }
            catch (Exception) { return null; }
        }

        public string getFileComplianceByDrugTest(long idCompliance)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    return DbContext.DrugAlcoholCompliance.Where(x => x.Id == idCompliance).FirstOrDefault().ResultFile;
                }
            }
            catch (Exception) { return null; }
        }

        public List<Object> GetScheduledAlcoholTests(long idu)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var company = (long)DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;

                    var list = (from s in DbContext.ScheduleAlcoholTest
                                join d in DbContext.Driver on s.IdDriver equals d.IdUser
                                join u in DbContext.Users on d.IdUser equals u.Id
                                join at in DbContext.AlcoholTest on s.Id equals at.IdScheduleTest into atlj
                                from at in atlj.DefaultIfEmpty()
                                join dac in DbContext.DrugAlcoholCompliance on at.IdDrugAlcoholCompliance equals dac.Id into daclj
                                from dac in daclj.DefaultIfEmpty()
                                where s.IdCompany == company
                                select new
                                {
                                    s.Id,
                                    IdDriver = d.IdUser,
                                    DonorName = u.Name + " " + u.LastName,
                                    s.DateTimeTest,
                                    s.DateTimeExpiration,
                                    s.Status,
                                    s.StepProcessCode,
                                    s.Reason,
                                    s.CancelDetails,
                                    at.SerialNumber,
                                    at.IdDrugAlcoholCompliance,
                                    Result = dac.Result != null ? dac.Result : s.Status != "Canceled" ? "Pending" : "Canceled",
                                    Image = u.FileImage,
                                    FileName = dac.ResultFile,
                                    s.IdCompany
                                }).OrderByDescending(x => x.Id).ToList<Object>();
                    return list;
                }

            }
            catch (Exception) { return null; }
        }

        public int GetScheduledAlcoholTestsComplete(long idu)
        {
            var testCompleted = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var company = (long)DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                    var listComplete = DbContext.ScheduleAlcoholTest.Where(x => x.Status == "Collection Completed" && x.IdCompany == company).ToList();
                    testCompleted = listComplete.Count;
                }
            }
            catch (Exception)
            {
                return 0;
            }

            return testCompleted;
        }

        public int GetScheduledAlcoholDriverList(long idu)
        {
            var driverList = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var company = (long)DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                    var list = DbContext.DriversCompany.Where(x => x.IdCompany == company).ToList();
                    driverList = list.Count;
                }
            }
            catch (Exception)
            {
                return 0;
            }

            return driverList;
        }

        public int GetScheduledAlcoholTestsInProcess(long idu)
        {
            var inProcess = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var company = (long)DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                    var inProcesslist = DbContext.ScheduleAlcoholTest.Where(x => x.Status == "Scheduled" && x.IdCompany == company).ToList();
                    inProcess = inProcesslist.Count;
                    return inProcess;
                }
            }
            catch (Exception)
            {
                return 0;
            }
        }

        public ScheduleAlcoholTest CreateScheduleAlcoholTest(ScheduleAlcoholTest s, long idu)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    s.IdCompany = (long)DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
                    var exists = DbContext.ScheduleAlcoholTest.Where(x => x.StepProcessCode == s.StepProcessCode && x.IdCompany == s.IdCompany).FirstOrDefault();

                    //if (exists.Count() == 0) exists = null; 

                    if (exists == null && s.Status == "Donor Data")
                    {
                        s.Status = "Draft";
                        DbContext.Add(s);
                        DbContext.SaveChanges();
                    }
                    else
                    {
                        switch (s.Status)
                        {
                            case "Donor Data":
                                exists.TestingAuthority = s.TestingAuthority;
                                exists.IdDriver = s.IdDriver;
                                exists.Performed = s.Performed;
                                exists.Reason = s.Reason;

                                var updateIdDriver = DbContext.Attach(exists);
                                updateIdDriver.Property(x => x.TestingAuthority).IsModified = true;
                                updateIdDriver.Property(x => x.IdDriver).IsModified = true;
                                updateIdDriver.Property(x => x.Performed).IsModified = true;
                                updateIdDriver.Property(x => x.Reason).IsModified = true;

                                DbContext.SaveChanges();
                                break;

                            case "Assigned":
                                exists.DateTimeExpiration = s.DateTimeExpiration;
                                exists.DateTimeTest = s.DateTimeTest;
                                exists.Lab = s.Lab;

                                var updateAssigned = DbContext.Attach(exists);
                                updateAssigned.Property(x => x.DateTimeTest).IsModified = true;
                                updateAssigned.Property(x => x.DateTimeExpiration).IsModified = true;
                                updateAssigned.Property(x => x.Lab).IsModified = true;
                                DbContext.SaveChanges();
                                break;

                            case "Collections Site":
                                Console.WriteLine(">>>>>> " + s.Provider);
                                exists.Provider = s.Provider;

                                var updateCollections = DbContext.Attach(exists);
                                updateCollections.Property(x => x.Provider).IsModified = true;
                                DbContext.SaveChanges();
                                break;

                            case "Detail":
                                exists.Status = "Scheduled";

                                var updateDetail = DbContext.Attach(exists);
                                updateDetail.Property(x => x.Status).IsModified = true;
                                DbContext.SaveChanges();
                                break;
                        }
                    }

                    return DbContext.ScheduleAlcoholTest.Where(x => x.StepProcessCode == s.StepProcessCode).FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                throw ex;
                //return null;
            }
        }

        public object AppointmentScheduleAlcohol(DateTime selectedDay)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {

                    var hoursList = DbContext.ScheduleAlcoholTest
                        .Where(x => x.DateTimeTest.Value.Date == selectedDay.Date && x.Status != "Canceled")
                        .Select(x => new { x.DateTimeTest.Value.TimeOfDay })
                        .ToList();
                    return hoursList;

                }
            }
            catch (Exception) { return null; }
        }

        public int UpdateStatusScheduleAlcoholTest(long idScheduleDrugTest, string status, string cancelDetails)
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var scheleduled = DbContext.ScheduleAlcoholTest.Where(x => x.Id == idScheduleDrugTest).FirstOrDefault();
                    scheleduled.Status = status;
                    var updateStatus = DbContext.Attach(scheleduled);
                    if (scheleduled.Status == "Canceled")
                    {
                        scheleduled.CancelDetails = cancelDetails;
                        updateStatus.Property(x => x.CancelDetails).IsModified = true;
                    }
                    updateStatus.Property(x => x.Status).IsModified = true;
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { r = 1; }
            return r;
        }

        public List<Object> GetProviderScheduledAlcoholTests(string provider)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var listSchedules = (from s in DbContext.ScheduleAlcoholTest
                                         join d in DbContext.Driver on s.IdDriver equals d.IdUser
                                         join u in DbContext.Users on d.IdUser equals u.Id
                                         join r in DbContext.CompanyUsersRoles on u.Id equals r.IdUser
                                         join c in DbContext.Company on r.IdCompany equals c.Id
                                         join at in DbContext.AlcoholTest on s.Id equals at.IdScheduleTest into atlj
                                         from dt in atlj.DefaultIfEmpty()
                                         join dac in DbContext.DrugAlcoholCompliance on dt.IdDrugAlcoholCompliance equals dac.Id into daclj
                                         from dac in daclj.DefaultIfEmpty()
                                         where s.Provider == provider
                                         select new
                                         {
                                             s.Id,
                                             IdDriver = d.IdUser,
                                             Driver = u.Name + " " + u.LastName,
                                             s.IdCompany,
                                             c.LegalName,
                                             c.Der,
                                             s.DateTimeTest,
                                             s.DateTimeExpiration,
                                             s.Performed,
                                             s.Reason,
                                             s.Provider,
                                             s.CancelDetails,
                                             s.Status,
                                             Result = dac.Result != null ? dac.Result : s.Status != "Canceled" ? "Pending" : "Canceled"
                                         }).OrderByDescending(x => x.DateTimeTest).ToList();

                    var listNoDraft = listSchedules.Where(x => x.Status != "Draft" && x.Status != "Canceled").ToList();
                    var listCanceled = listSchedules.Where(x => x.Status == "Canceled" && x.CancelDetails != null).ToList();

                    var listScheduleAlcoholTest = listNoDraft.Union(listCanceled).ToList<Object>();

                    return listScheduleAlcoholTest;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        public Object GetProviderScheduledAlcoholTestData(long idScheduledTest)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    CityDAL cityDAL = new CityDAL();
                    StatesDAL statesDAL = new StatesDAL();
                    var lstCities = cityDAL.GetCities().ToList();
                    var lstStates = statesDAL.GetStates().ToList();

                    var ScheduleData = (from s in DbContext.ScheduleAlcoholTest
                                        join d in DbContext.Driver on s.IdDriver equals d.IdUser
                                        join u in DbContext.Users on d.IdUser equals u.Id
                                        join r in DbContext.CompanyUsersRoles on u.Id equals r.IdUser
                                        join c in DbContext.Company on r.IdCompany equals c.Id
                                        where s.Id == idScheduledTest
                                        select new
                                        {
                                            s.Id,
                                            IdDriver = d.IdUser,
                                            u.FileImage,
                                            Driver = u.Name + " " + u.LastName,
                                            d.License,
                                            d.EmployeeId,
                                            u.Birthdate,
                                            DriverPhoneNumber = u.PhoneNumber,
                                            s.IdCompany,
                                            c.Dot,
                                            c.LegalName,
                                            c.Der,
                                            c.Email,
                                            CompanyPhoneNumber = c.PhoneNumber,
                                            CompanyAddress = c.PhysicalAddress,
                                            CompanyCity = lstCities.Where(x => x.Id == c.PhysicalCity).FirstOrDefault().Name,
                                            CompanyState = lstStates.Where(x => x.Id == c.PhysicalState).FirstOrDefault().Name,
                                            c.PhysicalZip,
                                            s.FederalTest,
                                            s.TestingAuthority,
                                            s.DateTimeTest,
                                            s.DateTimeExpiration,
                                            s.Performed,
                                            s.Reason,
                                            s.Provider,
                                            s.CancelDetails,
                                            s.Status
                                        }).FirstOrDefault();


                    return ScheduleData;
                }

            }
            catch (Exception) { return null; }
        }
        

        public AlcoholTest GetAlcoholTestData(long idScheduledTest)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    return DbContext.AlcoholTest.Where(x => x.IdScheduleTest == idScheduledTest && x.Status != "Canceled").FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }

        public AlcoholTest CreateAlcoholTest(AlcoholTest test)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    //Console.WriteLine("entro al create alcohol test");
                    foreach (PropertyDescriptor descriptor in TypeDescriptor.GetProperties(test))
                    {
                        string name = descriptor.Name;
                        object value = descriptor.GetValue(test);
                        Console.WriteLine("{0}={1}", name, value);
                    }
                    DbContext.Add(test);
                    DbContext.SaveChanges();
                }
                return GetAlcoholTestData((long)test.IdScheduleTest);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error: {ex}");
            }
        }

        public int UpdateDriverCollector(DriverCollectorViewModel driverInfo)
        {
            int respuesta = 0;

            using (var DbContext = new BAV02Context())
            {
                var driver = DbContext.Driver.Where(d => d.IdUser == driverInfo.IdDriver).SingleOrDefault();
                var user = DbContext.Users.Where(u => u.Id == driverInfo.IdDriver).SingleOrDefault();

                if (driver != null && user != null)
                {
                    user.Birthdate = driverInfo.Birtdate;
                    user.PhoneNumber = driverInfo.PhoneNumber;
                    driver.License = driverInfo.DriverLicense;

                    respuesta = DbContext.SaveChanges();
                }
            }

            return respuesta;
        }



        public List<Company> CompanyData(int idCompany)
        {// por ejemplo eso que dice company, seria lo que quieres o que tipo de dato va a regresar el DAL y el ejemplo es que estamos regresando un tipo company, si nos vamos
         //al controler, podremos poner el mouse arriba y te pondra e tipo de dato que esta regresando,
            int regresa = idCompany;


            List<Company> CompanyData = new List<Company>();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    CompanyData = DbContext.Company.Where(x => x.Id == idCompany).ToList();
                    return CompanyData;
                    //return DbContext.ScheduleDrugTest.Where(x => x.IdCompany == idCompany).FirstOrDefault(); 
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }



        public List<MISDataCollectionView> ComplianceMIS(int IdCompany, DateTime date, DateTime topDate)
        {
            List<MISDataCollectionView> ListsMISview = new List<MISDataCollectionView>();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    //var Random = DbContext.ScheduleDrugTest.Where(x => x.IdCompany == idCompany).ToList();

                    ListsMISview = DbContext.MISDataCollectionView.Where(x => x.Company == IdCompany && x.DateApplication >= date && x.DateApplication <= topDate).ToList();
                    return ListsMISview;
                    //return DbContext.ScheduleDrugTest.Where(x => x.IdCompany == idCompany).FirstOrDefault(); 
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Company GetCompanyDerName(long companyId)
        {
            Company company;

            try
            {
                using (var DbContext = new BAV02Context())
                {
                    company = DbContext.Company.Where(x => x.Id == companyId).FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error: {ex}");
            }

            return company;
        }
        public string SetPreviousRandoms(long companyId, long drugTest, long alcoholTest)
        {
            List<RandomList> drugList = new List<RandomList>();
            List<RandomListAlcohol> alcoholList = new List<RandomListAlcohol>();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    DateTime d = DateTime.Now;
                    for (int x = 0; x < drugTest; x++)
                    {
                        RandomList random = new RandomList();
                        random.IdCompany = companyId;
                        random.Type = "PreviousTest";
                        random.Quarter = 1;
                        random.DateYear = d.Year;
                        random.IdDriver = 191;
                        random.DateNotified = d;
                        drugList.Add(random);
                    }
                    for (int x = 0; x < alcoholTest; x++)
                    {
                        RandomListAlcohol random = new RandomListAlcohol();
                        random.IdCompany = companyId;
                        random.Type = "PreviousTest";
                        random.Quarter = 1;
                        random.DateYear = d.Year;
                        random.IdDriver = 191;
                        random.DateNotified = d;
                        alcoholList.Add(random);
                    }
                    Company company = DbContext.Company.Where(x => x.Id == companyId).FirstOrDefault();


                    DbContext.RandomList.AddRange(drugList);
                    DbContext.RandomListAlcohol.AddRange(alcoholList);

                    if (company.NewCompany == null)
                    {
                        company.NewCompany = true;
                        DbContext.Company.Attach(company);
                        DbContext.Entry(company).Property(p => p.NewCompany).IsModified = true;
                    }
                    else
                    {
                        Console.WriteLine("No se pudo obtener objeto de compañía");
                    }
                    DbContext.SaveChanges();
                    List<RandomList> updatedDrugList = new List<RandomList>();
                    List<RandomListAlcohol> updatedAlcoholList = new List<RandomListAlcohol>();
                    List<ScheduleDrugTest> relDrugList = new List<ScheduleDrugTest>();
                    List<ScheduleAlcoholTest> relAlcoholList = new List<ScheduleAlcoholTest>();
                    updatedDrugList = DbContext.RandomList.Where(x => x.IdCompany == companyId && x.DateYear == d.Year).ToList();
                    updatedAlcoholList = DbContext.RandomListAlcohol.Where(x => x.IdCompany == companyId && x.DateYear == d.Year).ToList();
                    foreach (RandomList r in updatedDrugList)
                    {
                        ScheduleDrugTest sch = new ScheduleDrugTest();
                        sch.FederalTest = false;
                        sch.IdDriver = r.IdDriver;
                        sch.Performed = "THC, COC, PCP, OPI, AMP";
                        sch.Reason = "PreviousTest";
                        sch.DateTimeTest = d;
                        sch.DateTimeExpiration = d;
                        sch.Lab = "Labcorp";
                        sch.Provider = "BluAgent";
                        sch.Status = "Collection Completed";
                        sch.StepProcessCode = "2000-5000";
                        sch.IdCompany = r.IdCompany;
                        sch.TypeTest = "Drug";
                        sch.idRandomList = r.IdRandomList;
                        relDrugList.Add(sch);
                    }
                    foreach (RandomListAlcohol r in updatedAlcoholList)
                    {
                        ScheduleAlcoholTest sch = new ScheduleAlcoholTest();
                        sch.FederalTest = false;
                        sch.IdDriver = r.IdDriver;
                        sch.Performed = "Alcohol";
                        sch.Reason = "PreviousTest";
                        sch.DateTimeTest = d;
                        sch.DateTimeExpiration = d;
                        sch.Lab = "Labcorp";
                        sch.Provider = "BluAgent";
                        sch.Status = "Collection Completed";
                        sch.StepProcessCode = "2000-300";
                        sch.IdCompany = r.IdCompany;
                        sch.TypeTest = "Alcohol";
                        sch.idRandomList = r.IdRandomList;
                        relAlcoholList.Add(sch);
                    }
                    DbContext.ScheduleDrugTest.AddRange(relDrugList);
                    DbContext.ScheduleAlcoholTest.AddRange(relAlcoholList);
                    DbContext.SaveChanges();
                    return "success";
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return "failure";
            }
        }

        public int[] getRandomDrugComplete(long companyId, long year)
        {
            int[] quartersCount = { 0, 0, 0, 0 };
            List<RandomDrugStatus> drugStatus = new List<RandomDrugStatus>();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    drugStatus = DbContext.RandomDrugStatus.Where(x => x.IdCompany == companyId && x.DateYear == year && x.Status == "Collection Completed").ToList();
                    quartersCount[0] = drugStatus.Where(x => x.Quarter == 1).Count();
                    quartersCount[1] = drugStatus.Where(x => x.Quarter == 2).Count();
                    quartersCount[2] = drugStatus.Where(x => x.Quarter == 3).Count();
                    quartersCount[3] = drugStatus.Where(x => x.Quarter == 4).Count();
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error: {ex}");
            }
            return quartersCount;
        }

        public int[] getRandomAlcoholComplete(long companyId, long year)
        {
            int[] quartersCount = { 0, 0, 0, 0 };
            List<RandomAlcoholStatus> alcoholStatus = new List<RandomAlcoholStatus>();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    alcoholStatus = DbContext.RandomAlcoholStatus.Where(x => x.IdCompany == companyId && x.DateYear == year && x.Status == "Collection Completed").ToList();
                    quartersCount[0] = alcoholStatus.Where(x => x.Quarter == 1).Count();
                    quartersCount[1] = alcoholStatus.Where(x => x.Quarter == 2).Count();
                    quartersCount[2] = alcoholStatus.Where(x => x.Quarter == 3).Count();
                    quartersCount[3] = alcoholStatus.Where(x => x.Quarter == 4).Count();
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error: {ex}");
            }
            return quartersCount;
        }

        public string getAlcoholTestNumber()
        {
            string newStringTestNumber = "";
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    //Console.WriteLine("Entro al get test number");
                    string lastTestNumber = DbContext.AlcoholTest.LastOrDefault<AlcoholTest>().TestNumber;
                    if (lastTestNumber.StartsWith("BA"))
                    {
                        int newTestNumber = Int32.Parse(lastTestNumber.Substring(4)) + 1;
                        newStringTestNumber = "BA-A" + newTestNumber.ToString().PadLeft(7, '0');
                    }
                    else
                    {
                        newStringTestNumber = "BA-A0000001";
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error: {ex}");
            }
            return newStringTestNumber;
        }


        public object updateDOTDriver(long idu, bool value, string inactivate)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    //Conectar las tablas
                    var user = DbContext.Users.Where(u => u.Id == idu).FirstOrDefault();
                    var Driver = DbContext.Driver.Where(DCMV => DCMV.IdUser == idu).FirstOrDefault();
                    var userRol = DbContext.CompanyUsersRoles.Where(r => r.IdUser == user.Id).FirstOrDefault();
                    //Amarrar las tablas
                    var entradaU = DbContext.Attach(user);
                    var entradaD = DbContext.Attach(Driver);
                    var entradaUR = DbContext.Attach(userRol);
                    //Cambiar los valores
                    entradaUR.Property(w => w.Status).CurrentValue = inactivate;
                    entradaU.Property(x => x.Hazmat).CurrentValue = value;
                    entradaD.Property(q => q.Status).CurrentValue = inactivate;
                    entradaD.Property(y => y.CMV).CurrentValue = value;
                    entradaD.Property(z => z.Passenger).CurrentValue = value;
                    entradaD.Property(a => a.QuestionDa).CurrentValue = value;
                    entradaD.Property(b => b.QuestionHm).CurrentValue = value;

                    //var CompNot = DbContext.CompanyNotifications.Where(ux => ux.IdCompany == IdCompany).FirstOrDefault();
                    //var entrada = DbContext.Attach(CompNot);
                    //entradaU.Property(x => x.PinNumber).CurrentValue = value;
                    DbContext.SaveChanges();


                    var Company = DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany;
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
            catch (Exception er) { return null; throw er; }
        }
    }
}


