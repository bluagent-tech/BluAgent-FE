using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using BAv02.Models;
using BAv02.Models.DataAccessLayers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Amazon.S3.Model;
using Stripe;
using BAv02.Models.Response;
using BAv02.Models.ViewModel;
using System.ComponentModel;

namespace BAv02.Controllers
{
    [Route("api/[controller]")]
    public class DrugAndAlcoholTestingController : Controller
    {
        DrugAndAlcoholTestingDAL db = new DrugAndAlcoholTestingDAL();
        DQFDAL dbDQFDAL = new DQFDAL();
        DriversDAL dbDriver = new DriversDAL();
        StripeDAL dbStripe = new StripeDAL();

        private IHostingEnvironment _env;
        private IConfiguration Configuration { get; set; }
        public string AssetsDirectory { get; set; }

        public string AwsAccessKeyId { get; set; }
        public string AwsSecretAccessKey { get; set; }

        public string AwsServer { get; set; }

        public string BucketName { get; set; }


        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Collector>> getDrugTestTotal()
        {
            try
            {
                return this.Ok(db.getDrugTestTotal());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return this.BadRequest("Invalid Data");
            }
        }

        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Collector>> getDrugTestCompleted()
        {
            try
            {
                return this.Ok(db.getDrugTestCompleted());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return this.BadRequest("Invalid Data");
            }
        }

        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Collector>> getDrugTestScheduled()
        {
            try
            {
                return this.Ok(db.getDrugTestScheduled());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return this.BadRequest("Invalid Data");
            }
        }

        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Collector>> getDrugTestInitialized()
        {
            try
            {
                return this.Ok(db.getDrugTestInitialized());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return this.BadRequest("Invalid Data");
            }
        }

        public DrugAndAlcoholTestingController(IHostingEnvironment env)
        {
            _env = env;
            var builder = new ConfigurationBuilder()
           .SetBasePath(Directory.GetCurrentDirectory())
           .AddJsonFile("appsettings.json");
            Configuration = builder.Build();

            //AWS Configurations
            AwsAccessKeyId = Configuration["AwsAccessKeyId"];
            AwsSecretAccessKey = Configuration["AwsSecretAccessKey"];
            BucketName = Configuration["BucketName"];
            AwsServer = Configuration["AWSServer"];


            //Assets Directory
            AssetsDirectory = Configuration["AssetsDirectory"];
        }

        /// <summary>
        /// Get Drivers Collector list
        /// </summary>
        /// <param name="idC"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getDriversCollector(Int64 idC, int page, int size, Boolean s, Boolean dot)
        {
            try
            {

                var t = db.getDriversCollector(idC, page, size, s, dot);
                var export = db.ExportEnrolledDriversCollector(idC, s);
                if (t.Items.Count != 0)
                {
                    if (dot)
                    {
                        return Json("{\"status\": 0, \"Dot drivers\": " + JsonConvert.SerializeObject(t, Formatting.Indented) + ", \"enrolledExport\": " + JsonConvert.SerializeObject(export, Formatting.Indented) + " }");
                    }
                    else
                    {
                        return Json("{\"status\": 0, \"Non dot drivers\": " + JsonConvert.SerializeObject(t, Formatting.Indented) + ", \"enrolledExport\": " + JsonConvert.SerializeObject(export, Formatting.Indented) + " }");
                    }
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get Drivers list
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getDrivers(Int64 idu, int page, int size, Boolean s, Boolean dot)
        {
            try
            {

                var t = db.getDrivers(idu, page, size, s, dot);
                var export = db.ExportEnrolledDrivers(idu, s);
                if (t.Items.Count != 0)
                {
                    if (dot) {
                        return Json("{\"status\": 0, \"Dot drivers\": " + JsonConvert.SerializeObject(t, Formatting.Indented) + ", \"enrolledExport\": " + JsonConvert.SerializeObject(export, Formatting.Indented) + " }");
                    }
                    else {
                        return Json("{\"status\": 0, \"Non dot drivers\": " + JsonConvert.SerializeObject(t, Formatting.Indented) + ", \"enrolledExport\": " + JsonConvert.SerializeObject(export, Formatting.Indented) + " }");
                    }
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpGet("[action]")]
        public JsonResult validateRandomAlcohol(long idCompany, int year)
        {
            try
            {

                var response = db.validateRandomAlcohol(idCompany, year);
                if (response == 0)
                {
                    return Json("{\"status\": 0 }");
                }
                else
                {
                    return Json("{\"status\": 1 }");
                }
            }
            catch (Exception ex)
            {
                return Json("{\"status\": 1,\"error\": \"Fallo generacion de random\"}");
                throw ex;
            }
        }

        [HttpGet("[action]")]
        public JsonResult validateRandom(long idCompany, int year)
        {
            try
            {

                var response = db.validateRandom(idCompany, year);
                if (response == 0)
                {
                    return Json("{\"status\": 0 }");
                }
                else
                {
                    return Json("{\"status\": 1 }");
                }
            }
            catch (Exception ex)
            {
                return Json("{\"status\": 1,\"error\": \"Fallo generacion de random\"}");
                throw ex;
            }
        }

        [HttpPost("[action]")]
        public JsonResult Random(int q, long idCompany, int percentage, int year)
        {
            try
            {

                var RandomList = db.getRandomList(q, idCompany, year, percentage, _env);
                var LogsRandom = db.getLogsRandom(idCompany);
                if (RandomList != null)
                {
                    return Json("{\"status\": 0, \"driversRandomList\": " + JsonConvert.SerializeObject(RandomList, Formatting.Indented) + ", \"logsRandom\": " + JsonConvert.SerializeObject(LogsRandom, Formatting.Indented) + " }");
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Empty List\"}");
                }
            }
            catch (Exception ex)
            {
                return Json("{\"status\": 1,\"error\": \"Fallo generacion de random\"}");
                throw ex;
            }
        }

        [HttpPost("[action]")]
        public JsonResult RandomAlcohol(int q, long idCompany, int year)
        {
            try
            {
                var RandomList = db.getRandomListAlcohol(q, idCompany, year, _env);
                var LogsRandom = db.getLogsRandomAlcohol(idCompany);
                if (RandomList != null)
                {
                    return Json("{\"status\": 0, \"driversRandomList\": " + JsonConvert.SerializeObject(RandomList, Formatting.Indented) + ", \"logsRandom\": " + JsonConvert.SerializeObject(LogsRandom, Formatting.Indented) + " }");
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Empty List\"}");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost("[action]")]
        public JsonResult SendEmail(int q, long idCompany, int percentage, int year)
        {
            try
            {

                var RandomList = db.sendEmail(q, idCompany, year, percentage, _env);
                if (RandomList)
                {
                    return Json("{\"status\": 0,\"success\": \"Correo enviado\"}");
                }
                else
                {
                    return Json("{\"status\": 1,\"failure\": \"Correo no enviado\"}");
                }
            }
            catch (Exception ex)
            {
                return Json("{\"status\": 1,\"error\": \"Fallo envio de mail\"}");
                throw ex;
            }
        }

        [HttpPost("[action]")]
        public JsonResult ResetTest(long idCompany)
        {
            try
            {
                DateTime fecha = DateTime.Today;
                int year = fecha.Year;
                db.resetTests(idCompany, year);
                if (year == 2022)
                {
                    return Json("{\"status\": 0, \"driversRandomList\": " + JsonConvert.SerializeObject(true, Formatting.Indented) + ", \"logsRandom\": " + JsonConvert.SerializeObject(true, Formatting.Indented) + " }");
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Empty List\"}");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost("[action]")]
        public JsonResult DotDrivers(long idCompany)
        {
            try
            {
                var DotDrivers = db.getDotDrivers(idCompany);
                if (DotDrivers != null)
                {
                    return Json("{\"status\": 0, \"dotDriversList\": " + JsonConvert.SerializeObject(DotDrivers, Formatting.Indented) + " }");
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Empty List\"}");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost("[action]")]
        public JsonResult NonDotDrivers(long idCompany)
        {
            try
            {
                var DotDrivers = db.getNonDotDrivers(idCompany);
                if (DotDrivers != null)
                {
                    return Json("{\"status\": 0, \"nonDotDriversList\": " + JsonConvert.SerializeObject(DotDrivers, Formatting.Indented) + " }");
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Empty List\"}");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost("[action]")]
        public JsonResult generateReSchedule(string reason, long IdRandom, int q, long idCompany, long DriverID, string type)
        {
            try
            {
                List<RandomListView> ReScheduleList = new List<RandomListView>();
                List<RandomListAlcoholView> ReScheduleListAlcohol = new List<RandomListAlcoholView>();
                DateTime fecha = DateTime.Today;
                int year = fecha.Year;

                if (type == "drug")
                {
                    var LogsRandom = db.getLogsRandom(idCompany);
                    ReScheduleList = db.getReScheduleList(reason, IdRandom, q, idCompany, year, DriverID);
                    if (ReScheduleList != null)
                    {
                        return Json("{\"status\": 0, \"rescheduleList\": " + JsonConvert.SerializeObject(ReScheduleList, Formatting.Indented) + ", \"logsRandom\": " + JsonConvert.SerializeObject(LogsRandom, Formatting.Indented) + " }");
                    }
                    else
                    {
                        return Json("{\"status\": 1,\"error\": \"Empty List\"}");
                    }
                }
                else
                {
                    var LogsRandom = db.getLogsRandomAlcohol(idCompany);
                    ReScheduleListAlcohol = db.getReScheduleListAlcohol(reason, IdRandom, q, idCompany, year, DriverID);
                    if (ReScheduleListAlcohol != null)
                    {
                        return Json("{\"status\": 0, \"rescheduleList\": " + JsonConvert.SerializeObject(ReScheduleListAlcohol, Formatting.Indented) + ", \"logsRandom\": " + JsonConvert.SerializeObject(LogsRandom, Formatting.Indented) + " }");
                    }
                    else
                    {
                        return Json("{\"status\": 1,\"error\": \"Empty List\"}");
                    }
                }
                
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost("[action]")]
        public JsonResult RandomStats(long idCompany)
        {
            try
            {
                DateTime fecha = DateTime.Today;
                int year = fecha.Year;
                var RandomList = db.getRandomListStats(idCompany, year);
                if (RandomList != null)
                {
                    return Json("{\"status\": 0, \"Q1remainingDrivers\": " + RandomList[0] + ", \"Q1PercentageOfDrugtestDrivers\": " + RandomList[1] + ", \"Q2remainingDrivers\": " + RandomList[2] + ", \"Q2PercentageOfDrugtestDrivers\": " + RandomList[3] + ", \"Q3remainingDrivers\": " + RandomList[4] + ", \"Q3PercentageOfDrugtestDrivers\": " + RandomList[5] + ", \"Q4remainingDrivers\": " + RandomList[6] + ", \"Q4PercentageOfDrugtestDrivers\": " + RandomList[7] + ", \"countListDriverCompany\": " + RandomList[8] + " }");
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Empty List\"}");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost("[action]")]
        public JsonResult RandomStatsByYear(long idCompany, int year)
        {
            try
            {
                var RandomList = db.getRandomListStats(idCompany, year);
                int[] RandomCompleted = db.getRandomDrugComplete(idCompany, year);
                if (RandomList != null)
                {
                    return Json("{\"status\": 0, \"Q1remainingDrivers\": " + RandomList[0] + 
                        ", \"Q1PercentageOfDrugtestDrivers\": " + RandomList[1] + 
                        ", \"Q2remainingDrivers\": " + RandomList[2] + 
                        ", \"Q2PercentageOfDrugtestDrivers\": " + RandomList[3] + 
                        ", \"Q3remainingDrivers\": " + RandomList[4] + 
                        ", \"Q3PercentageOfDrugtestDrivers\": " + RandomList[5] + 
                        ", \"Q4remainingDrivers\": " + RandomList[6] + 
                        ", \"Q4PercentageOfDrugtestDrivers\": " + RandomList[7] + 
                        ", \"countListDriverCompany\": " + RandomList[8] + 
                        ", \"drugCompleted\": " + JsonConvert.SerializeObject(RandomCompleted, Formatting.Indented) +
                        " }");
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Empty List\"}");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost("[action]")]
        public JsonResult RandomStatsAlcohol(long idCompany)
        {
            try
            {
                DateTime fecha = DateTime.Today;
                int year = fecha.Year;
                var RandomList = db.getRandomListStatsAlcohol(idCompany, year);
                int[] RandomCompleted = db.getRandomDrugComplete(idCompany, year);
                if (RandomList != null)
                {
                    return Json("{\"status\": 0, \"Q1remainingDrivers\": " + RandomList[0] + 
                    ", \"Q1PercentageOfDrugtestDrivers\": " + RandomList[1] + 
                    ", \"Q2remainingDrivers\": " + RandomList[2] + 
                    ", \"Q2PercentageOfDrugtestDrivers\": " + RandomList[3] + 
                    ", \"Q3remainingDrivers\": " + RandomList[4] + 
                    ", \"Q3PercentageOfDrugtestDrivers\": " + RandomList[5] + 
                    ", \"Q4remainingDrivers\": " + RandomList[6] + 
                    ", \"Q4PercentageOfDrugtestDrivers\": " + RandomList[7] + 
                    ", \"countListDriverCompany\": " + RandomList[8] +
                    " }");
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Empty List\"}");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost("[action]")]
        public JsonResult RandomStatsAlcoholByYear(long idCompany, int year)
        {
            try
            {
                var RandomList = db.getRandomListStatsAlcohol(idCompany, year);
                int[] RandomAlcoholCompleted = db.getRandomAlcoholComplete(idCompany, year);
                if (RandomList != null)
                {
                    return Json("{\"status\": 0, \"Q1remainingDrivers\": " + RandomList[0] + 
                    ", \"Q1PercentageOfDrugtestDrivers\": " + RandomList[1] + 
                    ", \"Q2remainingDrivers\": " + RandomList[2] + 
                    ", \"Q2PercentageOfDrugtestDrivers\": " + RandomList[3] + 
                    ", \"Q3remainingDrivers\": " + RandomList[4] + 
                    ", \"Q3PercentageOfDrugtestDrivers\": " + RandomList[5] + 
                    ", \"Q4remainingDrivers\": " + RandomList[6] + 
                    ", \"Q4PercentageOfDrugtestDrivers\": " + RandomList[7] + 
                    ", \"countListDriverCompany\": " + RandomList[8] + 
                    ", \"alcoholCompleted\": " + JsonConvert.SerializeObject(RandomAlcoholCompleted, Formatting.Indented) + " }");
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Empty List\"}");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost("[action]")]
        public JsonResult RandomQuarterDriverList(int q, long idCompany)
        {
            try
            {
                DateTime fecha = DateTime.Today;
                int year = fecha.Year;
                var RandomList = db.getQuarterRandomList(q, idCompany, year);
                if (RandomList != null)
                {
                    return Json("{\"status\": 0, \"driversRandomList\": " + JsonConvert.SerializeObject(RandomList, Formatting.Indented) + " }");
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Empty List\"}");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// export Drivers enroll active/inactive list
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="s"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult ExportEnrolledDrivers(Int64 idu, Boolean s)
        {
            try
            {
                var export = db.ExportEnrolledDrivers(idu, s);
                if (export != null)
                {
                    return Json("{\"status\": 0, \"enrolledExport\": " + JsonConvert.SerializeObject(export, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Enroll driver
        /// </summary>
        /// <param name="id"></param>
        /// <param name="idu"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult enrollDriver(long id, long idu, Boolean enroll)
        {
            try
            {

                var e = db.enrollDriver(id, enroll);
                var t = db.getDrivers(idu, 1, 10, true, true);
                var t2 = db.getDrivers(idu, 1, 7, false, true);
                var drivers = dbDQFDAL.getDrivers(idu, 1, 10);
                if (e == 0)
                {
                    return Json("{\"status\": 0, \"driver\": \"enrolled\",\"driversE\": " + JsonConvert.SerializeObject(t, Formatting.Indented) + ",\"driversNE\": " + JsonConvert.SerializeObject(t2, Formatting.Indented) + ",\"drivers\": " + JsonConvert.SerializeObject(drivers, Formatting.Indented) + "  }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error to enroll\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// save documments of drugs and alcohol for company
        /// </summary>
        /// <param name="dt"></param>
        /// <param name="idu"></param>
        /// <param name="file"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult saveDoc(Company c, CertificateEnrollment ce, SupervisorTraining st, long id, string certificate, string policy, string training)
        {
            #region Files
            try
            {
                if (policy != null)
                {
                    string[] f2 = policy.Split(',');
                    byte[] file2 = new byte[f2.Length]; int count = 0;
                    foreach (string s in f2)
                    {
                        file2[count] = Convert.ToByte(s);
                        count++;
                    }
                    c.DrugsPolicy = "DrugsPolicy.pdf";
                    var webRoot = _env.ContentRootPath;
                    string oPath = Path.Combine(webRoot, $"ClientApp/{AssetsDirectory}/assets/img/Images/DrugsTest/docs/" + c.DrugsPolicy);
                    System.IO.File.WriteAllBytes(oPath, file2);
                }
                if (training != null)
                {
                    string[] f3 = training.Split(',');
                    byte[] file3 = new byte[f3.Length]; int count = 0;
                    foreach (string s in f3)
                    {
                        file3[count] = Convert.ToByte(s);
                        count++;
                    }
                    DateTime dtt = DateTime.Now;
                    st.FileName = "SuperTraining" + dtt.Second + ".pdf";
                    var webRoot = _env.ContentRootPath;
                    string oPath = Path.Combine(webRoot, $"ClientApp/{AssetsDirectory}/assets/img/Images/DrugsTest/docs/" + st.FileName);
                    System.IO.File.WriteAllBytes(oPath, file3);
                }
                if (certificate != null)
                {
                    string[] f = certificate.Split(',');
                    byte[] file1 = new byte[f.Length]; int count = 0;
                    foreach (string s in f)
                    {
                        file1[count] = Convert.ToByte(s);
                        count++;
                    }
                    DateTime dtt = DateTime.Now;
                    ce.CertificateEnrollment1 = "CertEnroll" + dtt.Second + ".pdf";
                    var webRoot = _env.ContentRootPath;
                    string oPath = Path.Combine(webRoot, $"ClientApp/{AssetsDirectory}/assets/img/Images/DrugsTest/docs/" + ce.CertificateEnrollment1);
                    System.IO.File.WriteAllBytes(oPath, file1);
                }
            }
            catch (Exception) { }
            #endregion
            try
            {
                var x = db.saveDoc(c, ce, st, id);
                var docs = db.getDocs(id);
                var cert = db.getCertificates(id, 1, 3);
                var train = db.getTraining(id, 1, 3);
                if (x == 0)
                {
                    if (docs != null) { return Json("{\"status\": 0, \"docs\": " + JsonConvert.SerializeObject(docs, Formatting.Indented) + ", \"certificate\": " + JsonConvert.SerializeObject(cert, Formatting.Indented) + ", \"training\": " + JsonConvert.SerializeObject(train, Formatting.Indented) + "}"); }
                    else { return Json("{\"status\": 0, \"certificate\": " + JsonConvert.SerializeObject(cert, Formatting.Indented) + ", \"training\": " + JsonConvert.SerializeObject(train, Formatting.Indented) + " }"); }
                }
                else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get docs for company
        /// </summary>
        /// <param name="idu"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getDocs(long idu)
        {
            try
            {
                var docs = db.getDocs(idu);
                var cert = db.getCertificates(idu, 1, 3);
                var train = db.getTraining(idu, 1, 3);
                if (docs != null) { return Json("{\"status\": 0, \"docs\": " + JsonConvert.SerializeObject(docs, Formatting.Indented) + ", \"certificate\": " + JsonConvert.SerializeObject(cert, Formatting.Indented) + ", \"training\": " + JsonConvert.SerializeObject(train, Formatting.Indented) + " }"); }
                else { return Json("{\"status\": 1,\"docs\": \"{}\", \"certificate\": " + JsonConvert.SerializeObject(cert, Formatting.Indented) + ", \"training\": " + JsonConvert.SerializeObject(train, Formatting.Indented) + " }"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get certificate list
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getCertificates(long idu, int page, int size)
        {
            try
            {

                var t = db.getCertificates(idu, page, size);
                if (t.Items.Count != 0)
                {
                    return Json("{\"status\": 0, \"certificate\": " + JsonConvert.SerializeObject(t, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Delete Certificate of company
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("[action]")]
        public JsonResult deleteCertificate(long id, long idu)
        {
            try
            {
                var r = db.deleteCertificate(id);
                var cert = db.getCertificates(idu, 1, 3);
                if (r == 0) { return Json("{\"status\": 0, \"certificate\": " + JsonConvert.SerializeObject(cert, Formatting.Indented) + "}"); }
                else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get Supervisor Training list
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getTraining(long idu, int page, int size)
        {
            try
            {

                var t = db.getTraining(idu, page, size);
                if (t.Items.Count != 0)
                {
                    return Json("{\"status\": 0, \"training\": " + JsonConvert.SerializeObject(t, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Delete document of company
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("[action]")]
        public JsonResult deleteTraining(long id, long idu)
        {
            try
            {
                var r = db.deleteTraining(id);
                var t = db.getTraining(idu, 1, 3);
                if (r == 0) { return Json("{\"status\": 0,\"training\": " + JsonConvert.SerializeObject(t, Formatting.Indented) + "}"); }
                else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get Supervisor Training list
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getDrugAlcholDoc(long idD, long idu)
        {
            try
            {
                var docs = dbDriver.getDocuments(idD, idu, 1, 7);
                var drug = dbDriver.getDrugAndAlcoholTests(idD, idu, 1, 3, "Drug");
                var alcohol = dbDriver.getDrugAndAlcoholTests(idD, idu, 1, 3, "Alcohol");
                if (drug.Items.Count > 0 || alcohol.Items.Count > 0 || docs.Items.Count > 0) { return Json("{\"status\": 0, \"drugTest\": " + JsonConvert.SerializeObject(drug, Formatting.Indented) + ", \"alcoholTest\": " + JsonConvert.SerializeObject(alcohol, Formatting.Indented) + ", \"docs\": " + JsonConvert.SerializeObject(docs, Formatting.Indented) + " }"); }
                else { return Json("{\"status\": 1,\"error\": \"Empty list\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// save and get Schedule Drug Test
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult createScheduleDrugTest(ScheduleDrugTest s, long idU)
        {
            try
            {
                if (s.StepProcessCode == null)
                {
                    DateTime d = DateTime.Now;
                    s.StepProcessCode = d.Year + d.Month + d.Day + d.Second + "-" + s.IdCompany + s.IdDriver;
                }
                if(s.TypeTest != "Alcohol")
                {
                    var schedule = db.createScheduleDrugTest(s, idU);
                    var days = db.busyDays();
                    if (schedule != null && s.Status == "Donor Data")
                    {
                        var aSchedule = db.appointmentSchedule(DateTime.Now);
                        return Json("{\"status\": 0, \"schedule\": " + JsonConvert.SerializeObject(schedule, Formatting.Indented) + ", \"aSchedule\": " + JsonConvert.SerializeObject(aSchedule, Formatting.Indented) + ", \"busyDays\": " + JsonConvert.SerializeObject(days, Formatting.Indented) + " }");
                    }
                    else if (schedule != null)
                    {
                        Console.WriteLine("Entra al else if de drug>>>>>>" + s.Provider);
                        return Json("{\"status\": 0, \"schedule\": " + JsonConvert.SerializeObject(schedule, Formatting.Indented) + ", \"aSchedule\": " + JsonConvert.SerializeObject(null, Formatting.Indented) + ", \"busyDays\": " + JsonConvert.SerializeObject(days, Formatting.Indented) + " }");
                    }
                    else {
                        return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); 
                    }
                }else
                {
                    ScheduleAlcoholTest alcohol = new ScheduleAlcoholTest(s);
                    var schedule = db.CreateScheduleAlcoholTest(alcohol, idU);
                    var days = db.busyDaysAlcohol();
                    if (schedule != null && s.Status == "Donor Data")
                    {
                        var aSchedule = db.appointmentScheduleAlcohol(DateTime.Now);
                        return Json("{\"status\": 0, \"schedule\": " + JsonConvert.SerializeObject(schedule, Formatting.Indented) + ", \"aSchedule\": " + JsonConvert.SerializeObject(aSchedule, Formatting.Indented) + ", \"busyDays\": " + JsonConvert.SerializeObject(days, Formatting.Indented) + " }");
                    }
                    else if (schedule != null)
                    {
                        return Json("{\"status\": 0, \"schedule\": " + JsonConvert.SerializeObject(schedule, Formatting.Indented) + ", \"aSchedule\": " + JsonConvert.SerializeObject(null, Formatting.Indented) + ", \"busyDays\": " + JsonConvert.SerializeObject(days, Formatting.Indented) + " }");
                    }
                    else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
                }

            }
            catch (Exception) { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
        }

        [HttpPost("[action]")]
        public JsonResult FinishScheduleDrugTest(ScheduleDrugTest s, long idU, long amount, string paymentMethod)
        {
            db.getScheduledTests(idU);

            try
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = amount,
                    Currency = "usd",
                    Description = "Drug Test",
                    Customer = dbStripe.getCustomerId(idU),
                    PaymentMethod = paymentMethod
                };
                var service = new PaymentIntentService();
                var intent = service.Create(options);

                var confirmOptions = new PaymentIntentConfirmOptions
                {
                    PaymentMethod = paymentMethod
                };

                var confirm = service.Confirm(intent.Id, confirmOptions);

                if (confirm.Status == "succeeded")
                {
                    var schedule = db.createScheduleDrugTest(s, idU);
                    var days = db.busyDays();

                    if (schedule != null)
                    {
                        return Json("{\"status\": 0, \"schedule\": " + JsonConvert.SerializeObject(schedule, Formatting.Indented) + ",\"aSchedule\": \"\", \"busyDays\": " + JsonConvert.SerializeObject(days, Formatting.Indented) + " }");
                    }
                    else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Payment failed with status: " + confirm.Status + "\"}");
                }
            }
            catch (Exception ex)
            {
                return Json("{\"status\": 2,\"error\": \"Error In The Server: " + ex.Message + "\"}");
            }
        }

        [HttpPost("[action]")]
        public JsonResult FinishScheduleAlcoholTest(ScheduleAlcoholTest s, long idU, long amount, string paymentMethod)
        {
            db.GetScheduledAlcoholTests(idU);

            try
            {
                string paymentStatus = dbStripe.PayTest(idU, amount, paymentMethod, "Alcohol Test");

                if (paymentStatus == "succeeded")
                {
                    var schedule = db.CreateScheduleAlcoholTest(s, idU);
                    var days = db.busyDays();

                    if (schedule != null)
                    {
                        return Json("{\"status\": 0, \"schedule\": " + JsonConvert.SerializeObject(schedule, Formatting.Indented) + ",\"aSchedule\": \"\", \"busyDays\": " + JsonConvert.SerializeObject(days, Formatting.Indented) + " }");
                    }
                    else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}" + schedule); }
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Payment failed with status: " + paymentStatus + "\"}");
                }
            }
            catch (Exception ex)
            {
                return Json("{\"status\": 2,\"error\": \"Error In The Server: " + ex.Message + "\"}");
            }
        }

        /// <summary>
        /// Get scheduled hours for day
        /// </summary>
        /// <param name="selectedDay"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult appointmentScheduleForDay(DateTime selectedDay, string type)
        {
            try
            {
                if(type != "Alcohol"){
                    var hours = db.appointmentSchedule(selectedDay);
                    return Json("{\"status\": 0, \"hours\": " + JsonConvert.SerializeObject(hours, Formatting.Indented) + " }");
                }else {
                    var hours = db.appointmentScheduleAlcohol(selectedDay);
                    return Json("{\"status\": 0, \"hours\": " + JsonConvert.SerializeObject(hours, Formatting.Indented) + " }");
                }
               }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// get Scheduled Tests for company Collector
        /// </summary>
        /// <param name="idC"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getScheduledTestsCollector(long idC)
        {
            try
            {
                var list = db.getScheduledTestsCollector(idC);
                var complete = db.getScheduledTestsCompleteCollector(idC);
                var inProcess = db.GetScheduledTestsInProcessCollector(idC);
                if (list != null)
                {
                    return Json("{\"status\": 0, \"schedule\": " + JsonConvert.SerializeObject(list, Formatting.Indented)
                        + ", \"scheduledData\": " + complete
                        + ", \"scheduleTestInProcess\": " + inProcess
                        + "}");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// get Scheduled Tests for company
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getScheduledTests(long idu)
        {
            try
            {
                var list = db.getScheduledTests(idu);
                var complete = db.getScheduledTestsComplete(idu);
                var inProcess = db.GetScheduledTestsInProcess(idu);
                if (list != null)
                {
                    return Json("{\"status\": 0, \"schedule\": " + JsonConvert.SerializeObject(list, Formatting.Indented)
                        + ", \"scheduledData\": " + complete
                        + ", \"scheduleTestInProcess\": " + inProcess
                        + "}");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// cancel scheduled 
        /// </summary>
        /// <param name="idS">schedule id that goes to cancelar</param>
        /// <param name="cancelDetails">details of why the schedule is cancelled</param>
        /// <param name="idu">user ID</param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult cancelScheduled(long idS, string cancelDetails, long idu)
        {
            try
            {
                var s = db.updatStatusScheduleDrugTest(idS, "Canceled", cancelDetails);
                if (s == 0)
                {
                    var t = db.getScheduledTests(idu);
                    var complete = db.getScheduledTestsComplete(idu);
                    var inProcess = db.GetScheduledTestsInProcess(idu);

                    return Json("{\"status\": 0, \"schedule\": " + JsonConvert.SerializeObject(t, Formatting.Indented)
                        + ", \"scheduledData\" :" + complete
                        + ", \"scheduleTestInProcess\": " + inProcess
                        + " }");
                }
                else { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }



        /// <summary>
        /// get Scheduled Test data
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getScheduledTestData(long ids)
        {
            try
            {

                var scheduledData = db.getScheduledTestData(ids);
                if (scheduledData != null)
                {
                    return Json("{\"status\": 0, \"scheduledData\": " + JsonConvert.SerializeObject(scheduledData, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// get Scheduled Test data
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getScheduledTestDataAlcohol(long ids)
        {
            try
            {
                var scheduledData = db.getScheduledTestDataAlcohol(ids);
                if (scheduledData != null)
                {
                    return Json("{\"status\": 0, \"scheduledData\": " + JsonConvert.SerializeObject(scheduledData, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error Getting Scheduled Test Data\"}"); }
        }

        /// <summary>
        /// get scheduled tests by provider
        /// </summary>
        /// <param name="provider">name of the provider through which the filtering will be done</param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getProviderScheduledTests(string provider)
        {
            try
            {
                var providerDrugTest = db.getProviderScheduledTests(provider);
                if (providerDrugTest != null)
                {
                    return Json("{\"status\": 0, \"providerDrugTest\": " + JsonConvert.SerializeObject(providerDrugTest, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// get the drug test scheduled according to the provider and by schedule id
        /// </summary>
        /// <param name="idScheduledTest">the primary key of ScheduleDrugTest, with which the information consultation will be made</param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getProviderScheduledDrugTestData(long idScheduledTest)
        {
            try
            {
                var scheduleDrugTest = db.getProviderScheduledDrugTestData(idScheduledTest);
                if (scheduleDrugTest != null)
                {
                    var DrugTestData = db.getDrugTestData(idScheduledTest);
                    var fileCompliance = "";
                    if (DrugTestData != null && DrugTestData.IdDrugAlcoholCompliance != null) { fileCompliance = db.getFileComplianceByDrugTest((long)DrugTestData.IdDrugAlcoholCompliance); }
                    return Json("{\"status\": 0, \"scheduleData\": " + JsonConvert.SerializeObject(scheduleDrugTest, Formatting.Indented) + ", \"DrugTestData\": " + JsonConvert.SerializeObject(DrugTestData, Formatting.Indented) + ", \"FileCompliance\": " + JsonConvert.SerializeObject(fileCompliance, Formatting.Indented) + "  }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpPost("[action]")]
        public JsonResult updateScheduleDrugTestData(long idScheduleTest, Users users, Driver d)
        {
            try
            {
                var updateUser = db.updateScheduleDrugTestData(idScheduleTest, users, d);
                if (updateUser != null)
                {
                    return Json("{\"status\": 0, \"scheduleData\": " + JsonConvert.SerializeObject(updateUser, Formatting.Indented) + "  }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }


        public async Task<String> SaveCollectorSignature(string file, string specimenNumber)
        {
            try
            {
                if (file != null)
                {
                    if (specimenNumber != null && specimenNumber != String.Empty)
                    {
                        string[] imag = file.Split(',');
                        byte[] image = new byte[imag.Length]; int count = 0;
                        foreach (string s in imag)
                        {
                            image[count] = Convert.ToByte(s);
                            count++;
                        }

                        using (var client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, RegionEndpoint.USWest2))
                        {
                            using (var newMemoryStream = new MemoryStream(image))
                            {
                                var uploadRequest = new TransferUtilityUploadRequest
                                {
                                    InputStream = newMemoryStream,
                                    Key = $"Collectors/DrugTestSignatures/{specimenNumber}/CollectorSignature.png",
                                    BucketName = BucketName,
                                    CannedACL = S3CannedACL.PublicRead,
                                };

                                uploadRequest.Metadata.Add("x-amz-meta-filename", "CollectorSignature.png");

                                var fileTransferUtility = new TransferUtility(client);
                                await fileTransferUtility.UploadAsync(uploadRequest);
                            }
                        }
                        return "successfully saved";
                    }
                    else
                    {
                        return "No Specimen Number";
                    }
                }
                else
                {
                    return "No Signature";
                }
            }
            catch (Exception ex) { return Convert.ToString(ex); }
        }
        public async Task<String> SaveAlcoholCollectorSignature(string file, string testNumber)
        {
            try
            {
                if (file != null)
                {
                    if (testNumber != null && testNumber != String.Empty)
                    {
                        string[] imag = file.Split(',');
                        byte[] image = new byte[imag.Length]; int count = 0;
                        foreach (string s in imag)
                        {
                            image[count] = Convert.ToByte(s);
                            count++;
                        }

                        using (var client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, RegionEndpoint.USWest2))
                        {
                            Console.WriteLine("Entro al insertar imagen de collector signature");
                            using (var newMemoryStream = new MemoryStream(image))
                            {
                                var uploadRequest = new TransferUtilityUploadRequest
                                {
                                    InputStream = newMemoryStream,
                                    Key = $"Collectors/AlcoholTestSignatures/{testNumber}/CollectorSignature.png",
                                    BucketName = BucketName,
                                    CannedACL = S3CannedACL.PublicRead,
                                };

                                uploadRequest.Metadata.Add("x-amz-meta-filename", "CollectorSignature.png");

                                var fileTransferUtility = new TransferUtility(client);
                                await fileTransferUtility.UploadAsync(uploadRequest);
                            }
                        }
                        return "successfully saved";
                    }
                    else
                    {
                        return "No Test Number";
                    }
                }
                else
                {
                    return "No Signature";
                }
            }
            catch (Exception ex) { return Convert.ToString(ex); }
        }
        public async Task<String> SaveDonorSignature(string file, string specimenNumber)
        {
            try
            {

                if (file != null)
                {
                    if (specimenNumber != null && specimenNumber != String.Empty)
                    {

                        string[] imag = file.Split(',');
                        byte[] image = new byte[imag.Length]; int count = 0;
                        foreach (string s in imag)
                        {
                            image[count] = Convert.ToByte(s);
                            count++;
                        }

                        using (var client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, RegionEndpoint.USWest2))
                        {
                            using (var newMemoryStream = new MemoryStream(image))
                            {
                                var uploadRequest = new TransferUtilityUploadRequest
                                {
                                    InputStream = newMemoryStream,
                                    Key = $"Collectors/DrugTestSignatures/{specimenNumber}/DonorSignature.png",
                                    BucketName = BucketName,
                                    CannedACL = S3CannedACL.PublicRead,
                                };

                                uploadRequest.Metadata.Add("x-amz-meta-filename", "DonorSignature.png");

                                var fileTransferUtility = new TransferUtility(client);
                                await fileTransferUtility.UploadAsync(uploadRequest);
                            }
                        }
                        return "successfully saved";
                    }
                    else
                    {
                        return "No Specimen Number";
                    }
                }
                else
                {
                    return "No Specimen Number";
                }
            }
            catch (Exception ex) { return Convert.ToString(ex); }
        }
        public async Task<String> SaveAlcoholDonorSignature(string file, string testNumber)
        {
            try
            {

                if (file != null)
                {
                    if (testNumber != null && testNumber != String.Empty)
                    {

                        string[] imag = file.Split(',');
                        byte[] image = new byte[imag.Length]; int count = 0;
                        foreach (string s in imag)
                        {
                            image[count] = Convert.ToByte(s);
                            count++;
                        }

                        using (var client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, RegionEndpoint.USWest2))
                        {
                            using (var newMemoryStream = new MemoryStream(image))
                            {
                                var uploadRequest = new TransferUtilityUploadRequest
                                {
                                    InputStream = newMemoryStream,
                                    Key = $"Collectors/AlcoholTestSignatures/{testNumber}/DonorSignature.png",
                                    BucketName = BucketName,
                                    CannedACL = S3CannedACL.PublicRead,
                                };

                                uploadRequest.Metadata.Add("x-amz-meta-filename", "DonorSignature.png");

                                var fileTransferUtility = new TransferUtility(client);
                                await fileTransferUtility.UploadAsync(uploadRequest);
                            }
                        }
                        return "successfully saved";
                    }
                    else
                    {
                        return "No Specimen Number";
                    }
                }
                else
                {
                    return "No Specimen Number";
                }
            }
            catch (Exception ex) { return Convert.ToString(ex); }
        }

        /// <summary>
        /// save a new drug test, edit the status of the scheduled test and update the Scheduled Test table
        /// </summary>
        /// <param name="test">drugtest table data to be saved</param>
        /// <param name="cancelDetails">details of why the schedule or drug test is cancelled</param>
        /// <param name="provider">name of the provider through which the filtering will be done</param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public async Task<JsonResult> createDrugTest(DrugTest test, string provider, string fileDonorSignature, string fileCollectorSignature)
        {
            try
            {
                test.DonorSignature = "DonorSignature.png";
                test.CollectorSignature = "CollectorSignature.png";
                var newDrugTest = db.createDrugTest(test);
                await SaveCollectorSignature(fileCollectorSignature, test.SpecimenNumber);
                await SaveDonorSignature(fileDonorSignature, test.SpecimenNumber);
                if (test.Status != "Canceled") { db.updatStatusScheduleDrugTest((long)test.IdScheduleDrugTest, test.Status, ""); }
                if (newDrugTest != null)
                {
                    var providerDrugTest = db.getProviderScheduledTests(provider);
                    return Json("{\"status\": 0, \"providerDrugTest\": " + JsonConvert.SerializeObject(providerDrugTest, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// save a new drug test, edit the status of the scheduled test and update the Scheduled Test table
        /// </summary>
        /// <param name="test">drugtest table data to be saved</param>
        /// <param name="cancelDetails">details of why the schedule or drug test is cancelled</param>
        /// <param name="provider">name of the provider through which the filtering will be done</param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public async Task<JsonResult> createAlcoholTest(AlcoholTest test, string provider, string fileDonorSignature, string fileCollectorSignature)
        {
            try
            {
                test.DonorSignature = "DonorSignature.png";
                test.CollectorSignature = "CollectorSignature.png";

                var testNumber = db.getAlcoholTestNumber();
                test.TestNumber = testNumber;

                test.IdDrugAlcoholCompliance = 0;
                //test.IdScheduleTest = 0;
                test.DeviceName = "";
                test.ConfirmTest = "";
                test.AlcoholResult = 0;
                test.Identification = false;
                test.SerialNumber = "";

                var newAlcoholTest = db.CreateAlcoholTest(test);
                await SaveAlcoholCollectorSignature(fileCollectorSignature, testNumber);
                await SaveAlcoholDonorSignature(fileDonorSignature, testNumber);
                if (test.Status != "Canceled") { db.UpdateStatusScheduleAlcoholTest((long)test.IdScheduleTest, test.Status, ""); }
                if (newAlcoholTest != null)
                {
                    var providerDrugTest = db.GetProviderScheduledAlcoholTests(provider);
                    return Json("{\"status\": 0, \"providerAlcoholTest\": " + JsonConvert.SerializeObject(providerDrugTest, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception ex) {
                Console.WriteLine(ex);
                return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); 
            }
        }

        [HttpGet("[action]")]
        public JsonResult updatStatusScheduleDrugTest(long idSchedule, string status, string cancelDetails)
        {
            try
            {
                var updateData = db.updatStatusScheduleDrugTest(idSchedule, status, cancelDetails);
                if (updateData == 0)
                {
                    return Json("{\"status\": 0 \" }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// 
        /// eliminates the schedule cancelled according to idSchedule as long as they have
        /// </summary>
        /// <param name="idSchedule">id of schedule that is going to eliminate</param>
        /// <param name="iduser">id of the user who is logged in with whom the schedule list will be updated</param>
        /// <returns></returns>
        [HttpDelete("[action]")]
        public JsonResult deleteScheduleDrugTest(long idSchedule, long iduser)
        {
            try
            {
                var scheduleDrug = db.deleteScheduleDrugTest(idSchedule);
                if (scheduleDrug == 0)
                {
                    var t = db.getScheduledTests(iduser);
                    return Json("{\"status\": 0,\"schedule\": " + JsonConvert.SerializeObject(t, Formatting.Indented) + "}");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception ex) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}" + ex); }
        }
        [HttpDelete("[action]")]
        public JsonResult deleteScheduleAlcoholTest(long idSchedule, long iduser)
        {
            try
            {
                var scheduleDrug = 0; //db.deleteScheduleDrugTest(idSchedule);
                if (scheduleDrug == 0)
                {
                    var t = db.GetScheduledAlcoholTests(iduser);
                    return Json("{\"status\": 0,\"schedule\": " + JsonConvert.SerializeObject(t, Formatting.Indented) + "}");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception ex) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}" + ex); }
        }


        [HttpGet("[action]")]
        public async Task<IActionResult> downloadDrugTestResult(long idCompliance, long idDriver, long idUser, string docType)
        {
            try
            {
                var fileName = db.getFileComplianceByDrugTest(idCompliance);
                var fileNameKey = $"{dbDriver.getCompanyId(idUser)}/Drivers/{idDriver}/{docType.Replace(" ", String.Empty)}/{fileName}";

                using (var client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, RegionEndpoint.USWest2))
                {
                    GetObjectRequest request = new GetObjectRequest()
                    {
                        Key = fileNameKey,
                        BucketName = BucketName,

                    };

                    using (GetObjectResponse response = await client.GetObjectAsync(request))
                    {
                        var stream = new MemoryStream();
                        using (Stream responseStream = response.ResponseStream)
                        {

                            responseStream.CopyTo(stream);
                            stream.Position = 0;

                            if (docType != null) { return File(stream, "application/pdf", fileName); }
                            else { return File(stream, "image/png", fileName); }
                        }
                    }
                }
            }
            catch (Exception)
            {
                { return BadRequest("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
            }
        }

        [HttpGet("[action]")]
        public JsonResult GetScheduledAlcoholTests(long idu)
        {
            try
            {
                var list = db.GetScheduledAlcoholTests(idu);
                var listDrivers = db.GetScheduledAlcoholDriverList(idu);
                var complete = db.GetScheduledAlcoholTestsComplete(idu);
                var inProcess = db.GetScheduledAlcoholTestsInProcess(idu);
                var reached = (complete * 100) / listDrivers;

                return Json("{\"status\": 0, \"scheduledAlcoholTests\": " + JsonConvert.SerializeObject(list, Formatting.Indented)
                        + ", \"scheduledAlcoholTestsCompleted\": " + complete
                        + ", \"scheduledAlcoholTestsInProcess\": " + inProcess
                        + ", \"scheduledAlcoholTestsReached\": " + reached
                        + "}");
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpPost("[action]")]
        public JsonResult CreateScheduleAlcoholTest(ScheduleAlcoholTest s, long idU)
        {
            try
            {
                db.GetScheduledAlcoholTests(idU);

                if (s.StepProcessCode == null)
                {
                    DateTime d = DateTime.Now;
                    s.StepProcessCode = d.Year + d.Month + d.Day + d.Second + "-" + s.IdCompany + s.IdDriver;
                }

                var schedule = db.CreateScheduleAlcoholTest(s, idU);
                var days = db.busyDays();
                if (schedule != null && s.Status == "Donor Data")
                {
                    var aSchedule = db.AppointmentScheduleAlcohol(DateTime.Now);
                    return Json("{\"status\": 0, \"scheduledAlcoholTest\": "
                        + JsonConvert.SerializeObject(schedule, Formatting.Indented)
                        + ", \"aSchedule\": " + JsonConvert.SerializeObject(aSchedule, Formatting.Indented)
                        + ", \"busyDays\": " + JsonConvert.SerializeObject(days, Formatting.Indented)
                        + " }");
                }
                else if (schedule != null)
                {
                    return Json("{\"status\": 0, \"scheduledAlcoholTest\": "
                        + JsonConvert.SerializeObject(schedule, Formatting.Indented) + ",\"aSchedule\": \"null\", \"busyDays\": "
                        + JsonConvert.SerializeObject(days, Formatting.Indented) + " }");
                }
                else
                {
                    return Json("{\"status\": 1,\"success\": \"Step 1 Saved Ok\"}");
                }
            }
            catch (Exception ex) { return Json("{\"status\": 1,\"error\": \"Error: Saving Info Step 1\"}" + ex); }
        }

        [HttpGet("[action]")]
        public JsonResult CancelAlcoholScheduled(long idS, string cancelDetails, long idu)
        {
            try
            {
                var s = db.UpdateStatusScheduleAlcoholTest(idS, "Canceled", cancelDetails);
                if (s == 0)
                {
                    var t = db.GetScheduledAlcoholTests(idu);
                    var complete = db.GetScheduledAlcoholTestsComplete(idu);
                    var inProcess = db.GetScheduledAlcoholTestsInProcess(idu);

                    return Json("{\"status\": 0, \"scheduledAlcoholTests\": " + JsonConvert.SerializeObject(t, Formatting.Indented)
                        + ", \"scheduledAlcoholTestsCompleted\" :" + complete
                        + ", \"scheduledAlcoholTestsInProcess\": " + inProcess
                        + " }");
                }
                else { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception ex) { return Json("{\"status\": 2,\"error\":}" + ex); }
        }

        [HttpGet("[action]")]
        public JsonResult GetProviderScheduledAlcoholTests(string provider)
        {
            try
            {
                var providerDrugTest = db.GetProviderScheduledAlcoholTests(provider);
                if (providerDrugTest != null)
                {
                    return Json("{\"status\": 0, \"providerAlcoholTests\": " + JsonConvert.SerializeObject(providerDrugTest, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpGet("[action]")]
        public JsonResult GetProviderScheduledAlcoholTestData(long idScheduledTest)
        {
            Console.WriteLine("idScheduledTest>>>>>>>" + idScheduledTest);
            try
            {
                var scheduleAlcoholTest = db.GetProviderScheduledAlcoholTestData(idScheduledTest);
                if (scheduleAlcoholTest != null)
                {
                    var alcoholTestData = db.GetAlcoholTestData(idScheduledTest);
                    var fileCompliance = "";
                    if (alcoholTestData != null && alcoholTestData.IdDrugAlcoholCompliance != 0)
                    {
                        Console.WriteLine("Entra a la validacion>>>");
                        fileCompliance = db.getFileComplianceByDrugTest((long)alcoholTestData.IdDrugAlcoholCompliance);
                    }

                    return Json("{\"status\": 0, \"scheduledAlcoholTestData\": " + JsonConvert.SerializeObject(scheduleAlcoholTest, Formatting.Indented)
                        + ", \"alcoholTest\": " + JsonConvert.SerializeObject(alcoholTestData, Formatting.Indented)
                        + ", \"FileCompliance\": " + JsonConvert.SerializeObject(fileCompliance, Formatting.Indented) + "  }");
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Empty List\"}");
                }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpGet("[action]")]
        public JsonResult UpdateStatusScheduleAlcoholTest(long idSchedule, string status, string cancelDetails)
        {
            try
            {
                var updateData = db.UpdateStatusScheduleAlcoholTest(idSchedule, status, cancelDetails);
                if (updateData == 0)
                {
                    return Json("{\"status\":0 }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
        }


        [HttpPost("[action]")]
        public IActionResult addScheduleAlcoholTest(ScheduleAlcoholTest schedule)
        {
            Response oResponse = new Response();
            try
            {
                using (BAV02Context db = new BAV02Context())
                {
                    ScheduleAlcoholTest ScheduleAlcoholTest = new ScheduleAlcoholTest();
                    ScheduleAlcoholTest.FederalTest = ScheduleAlcoholTest.FederalTest;
                    ScheduleAlcoholTest.IdDriver = ScheduleAlcoholTest.IdDriver;
                    ScheduleAlcoholTest.TestingAuthority = ScheduleAlcoholTest.TestingAuthority;
                    ScheduleAlcoholTest.Performed = ScheduleAlcoholTest.Performed;
                    ScheduleAlcoholTest.IdCompany = ScheduleAlcoholTest.IdCompany;
                    ScheduleAlcoholTest.Status = ScheduleAlcoholTest.Status;
                    db.SaveChanges();
                    oResponse.Success = 1;
                }
            }
            catch (Exception ex)
            {
                oResponse.Message = ex.Message;
            }

            return Ok(oResponse);
        }

        [HttpPost("[action]")]
        public JsonResult SaveDriverInformationCollector(DriverCollectorViewModel driverInfo)
        {
            JsonResult result = new JsonResult("");

            try
            {
                var res = db.UpdateDriverCollector(driverInfo);
                if (res > 0)
                {

                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Update unsuccesful. Driver not found.\"}");
                }
            }
            catch (Exception ex)
            {
                return Json("{\"status\": 1,\"error\": \"" + ex.Message + "\"}");
            }

            return result;
        }
        [HttpGet("[action]")]
        public JsonResult GetCompanyDerName(long companyId){
            try
            {
                Company company = db.GetCompanyDerName(companyId);
                if (company != null)
                {
                    return Json("{\"status\": 0,\"derName\": "+ JsonConvert.SerializeObject(company.Der, Formatting.Indented)+",\"newCompany\": "+ JsonConvert.SerializeObject(company.NewCompany, Formatting.Indented)+ "  }");
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Company Data not found.\"}");
                }
            }
            catch (Exception ex)
            {
                return Json("{\"status\": 1,\"error\": \"" + ex.Message + "\"}");
            }

        }
            
        [HttpPost("[action]")]
        public JsonResult SetPreviousRandoms(long companyId, long drugTest, long alcoholTest)
        {
            JsonResult result = new JsonResult("");
            Console.WriteLine("id de compañia " + companyId);
            try
            {
                string res = db.SetPreviousRandoms(companyId, drugTest, alcoholTest);
                if (res != null)
                {
                    return Json("{\"status\": 0,\"random status\": "+ JsonConvert.SerializeObject(res, Formatting.Indented)+ "  }");
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Randoms not set.\"}");
                }
            }
            catch (Exception ex)
            {
                return Json("{\"status\": 1,\"error\": \"" + ex.Message + "\"}");
            }

        }

        [HttpGet("[action]")]
        public JsonResult MISData(int idCompany, DateTime date, DateTime topDate)
        {
            try
            {
                var MISDataCollection = db.ComplianceMIS(idCompany, date, topDate);
                var DotDrivers = db.getDotDrivers(idCompany);
                var CompanyData = db.CompanyData(idCompany);



                if (DotDrivers != null )
                {
                    return Json("{\"status\": 0, \"MISCollectionReport\": " + JsonConvert.SerializeObject(MISDataCollection, Formatting.Indented)
                        + ", \"dotDriversList\": " + JsonConvert.SerializeObject(DotDrivers, Formatting.Indented)
                        + ", \"CompanyData\": " + JsonConvert.SerializeObject(CompanyData, Formatting.Indented) + " }");
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Empty List\"}");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //////////////////////////////////////////////////////////////////////////////////////////
                [HttpGet("[action]")]
        public JsonResult getDOTDrivers(long idCompany)
        {
            try
            {
                var DotDrivers = db.getDotDrivers(idCompany);

                if (DotDrivers != null || DotDrivers.Count !=0)
                {
                    return Json("{\"status\": 0, \"dotDriversList\": " + JsonConvert.SerializeObject(DotDrivers, Formatting.Indented) + " }");
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Empty List\"}");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //////////////////////////////////////////////////////////////////////////////////////////

        [HttpGet("[action]")]
        public JsonResult GetAlcoholTestNumber()
        {
            try
            {
                var response = db.getAlcoholTestNumber();
                if(response != "")
                {
                    return Json("{\"status\": 0, \"TestNumber\": " + JsonConvert.SerializeObject(response, Formatting.Indented) + " }");
                }else
                {
                    return Json("{\"status\": 1,\"error\": \"Error in generate test number\"}");
                }
                
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /////////////////////////////////////////////////////////////////////////////////////////
        [HttpPost("[action]")]
        public JsonResult updateDOTDriver(long idu, bool value, string inactivate)
        {
            try
            {
               var update = db.updateDOTDriver(idu, value, inactivate);
                if (update != null)
                {
                    return Json("{\"status\": 0, \"driverList\": " + JsonConvert.SerializeObject(update, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error when saving\"}"); }
            }
            catch (Exception)
            {
                return Json("{\"status\": 2,\"error\": \"Error In The Server\"}");
            }

        }
    }
}
