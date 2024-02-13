using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using BAv02.Models;
using BAv02.Models.DataAccessLayers;
using BAv02.Models.Tools;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace BAv02.Controllers
{
    [Route("api/[controller]")]
    public class DriversController : Controller
    {
        private DriversDAL _driversRepository;
        DriversDAL db = new DriversDAL();

        private IHostingEnvironment _env;
        private IConfiguration Configuration { get; set; }

        public string AwsAccessKeyId { get; set; }
        public string AwsSecretAccessKey { get; set; }
        public string AwsServer { get; set; }
        public string BucketName { get; set; }
        public string AssetsDirectory { get; set; }

        public DriversController(IHostingEnvironment env)
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

        /*     get / save notifications features are not currently being used but are for next use  (Twic, TwicExp, Fast, FastExp, UsaTag, UsaTagExp)
        /// <summary>
        /// Get all notifications per driver
        /// </summary>
        /// <param name="idu"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getNotifications(long idu)
        {
            try
            {
                var noti = db.getNotifications(idu);
                if (noti != null) { return Json("{\"status\": 0, \"notifications\": " + JsonConvert.SerializeObject(noti, Formatting.Indented) + " }"); }
                else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }


        /// <summary>
        /// Save notification data
        /// </summary>
        /// <param name="d"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult saveNotifications(Driver d)
        {
            try
            {
                var noti = db.saveNotifications(d);
                var alerts = db.getAllAlerts(d.IdDriver);
                var count = db.alertsCounter(d.IdDriver);
                if (noti != null) { return Json("{\"status\": 0, \"notifications\": " + JsonConvert.SerializeObject(noti, Formatting.Indented) + ", \"alertsCount\": " + JsonConvert.SerializeObject(count, Formatting.Indented) + ", \"alerts\": " + JsonConvert.SerializeObject(alerts, Formatting.Indented) + ", \"message\": \"Saved Correctly\" }"); }
                else { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }
        */

        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Driver>> GetAllDrivers()
        {
            try
            {
                return this.Ok(_driversRepository.GetAllDrivers());
            }
            catch (Exception)
            {

                return this.BadRequest("Invalid Data");
            }
        }

        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Driver>> GetAllDriversACTIVE()
        {
            try
            {
                return this.Ok(db.GetAllDriversACTIVE());
            }
            catch (Exception)
            {

                return this.BadRequest("Invalid Data");
            }
        }

        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Driver>> GetAllDriversINACTIVE()
        {
            try
            {
                return this.Ok(db.GetAllDriversINACTIVE());
            }
            catch (Exception)
            {

                return this.BadRequest("Invalid Data");
            }
        }

        /// <summary>
        /// Get driver data 
        /// </summary>
        /// <param name="id">driver id</param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getDriverData(long id)
        {
            try
            {
                var driver = db.getDriverData(id);
                var c = db.getDataCompanyC(id);
                if (driver != null) { return Json("{\"status\": 0, \"driver\": " + JsonConvert.SerializeObject(driver, Formatting.Indented) + ", \"company\": " + JsonConvert.SerializeObject(c, Formatting.Indented) + " }"); } else { return Json("{\"status\": 1,\"error\": \"Null Search Result\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }
        
        [HttpGet("[action]")]
        public JsonResult getDriverDataNew(long id, long idCompany)
        {
            try
            {
                var driver = db.getDriverDataById(id, idCompany);
                if (driver == null) { return Json("{\"status\": 2,\"error\": \"Error In The Server: user is not driver\"}"); }
                var c = db.getDataCompanyC(id);
                if (driver != null) { return Json("{\"status\": 0, \"driver\": " + JsonConvert.SerializeObject(driver, Formatting.Indented) + ", \"company\": " + JsonConvert.SerializeObject(c, Formatting.Indented) + " }"); } else { return Json("{\"status\": 1,\"error\": \"Null Search Result\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpGet("[action]")]
        public JsonResult generateDriverNotifications(int id)
        {
            try
            {
                var delNot = db.deleteDriverNotification(id);
                var driver = db.generateDriverNotifications(id);
                if (driver != null) { return Json("{\"status\": 0, \"notifications\": " + JsonConvert.SerializeObject(driver, Formatting.Indented) + " }"); } else { return Json("{\"status\": 1,\"error\": \"Null Search Result\"}"); }
            }
            catch (Exception)
            {
                return Json("{\"status\": 2,\"error\": \"An error occurred while generating driver notifications\"}");
            }
        }

        [HttpGet("[action]")]
        public JsonResult generateMaintenanceNotifications(int id)
        {
            try
            {
                var delNot = db.deleteMaintenanceNotification(id);
                var MA = db.generateMaintenanceNotifications(id);
                if (MA != null) { return Json("{\"status\": 0, \"notificationsM\": " + JsonConvert.SerializeObject(MA, Formatting.Indented) + " }"); } else { return Json("{\"status\": 1,\"error\": \"Null Search Result\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"An error occurred while generating Maintenance notifications\"}"); }
        }

        [HttpGet("[action]")]
        public JsonResult generateCompanyNotifications(int id)
        {
            try
            {
                var delNot = db.deleteCompanyNotification(id);
                var CA = db.generateCompanyNotifications(id);
                if (CA) { return Json("{\"status\": 0}"); } else { return Json("{\"status\": 1,\"error\": \"Null Search Result\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"An error occurred while generating Company notifications\"}"); }
        }

        /// <summary>
        /// Save driver data modifications
        /// </summary>
        /// <param name="u"></param>
        /// <param name="d"></param>
        /// <param name="Image"></param>
        /// <param name="file"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public async Task<JsonResult> saveDriverData(Users u, Driver d, long idCompany, string Image, string file)
        {

            string nameI = "";
            #region Image and File
            try
            {
                if (Image != null)
                {
                    string[] imag = Image.Split(',');
                    byte[] image = new byte[imag.Length];
                    int count = 0;
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
                                Key = $"{idCompany}/Drivers/{d.Id}/driverAvatar.png",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", "driverAvatar.png");

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                            nameI = "driverAvatar.png";
                        }
                    }
                }
                else { nameI = ""; }
            }
            catch (Exception) { nameI = ""; }
            try
            {
                if (file != null)
                {
                    string[] imag = file.Split(',');
                    byte[] image = new byte[imag.Length];
                    int count = 0;
                    foreach (string s in imag)
                    {
                        image[count] = Convert.ToByte(s);
                        count++;
                    }

                    d.LicenseFile = "license.png";
                    using (var client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, RegionEndpoint.USWest2))
                    {
                        using (var newMemoryStream = new MemoryStream(image))
                        {
                            var uploadRequest = new TransferUtilityUploadRequest
                            {
                                InputStream = newMemoryStream,
                                Key = $"{idCompany}/Drivers/{d.Id}/{d.LicenseFile}",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", d.LicenseFile);

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                        }
                    }
                }
            }
            catch (Exception) { }
            #endregion
            try
            {
                u.FileImage = nameI;
                var r = db.saveDriverData(u, d);
                var driver = db.getDriverDataById(u.Id, idCompany);
                var alerts = db.getAllAlerts(u.Id);
                var count = db.alertsCounter(u.Id);
                if (r == 0)
                {
                    return Json("{\"status\": 0, \"driver\": " + JsonConvert.SerializeObject(driver, Formatting.Indented) + ", \"alertsCount\": " + JsonConvert.SerializeObject(count, Formatting.Indented) + ", \"alerts\": " + JsonConvert.SerializeObject(alerts, Formatting.Indented) + " }");
                }
                else if (r == 1) { return Json("{\"status\": 1,\"error\": \"Email Duplicate\"}"); } else { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception ex) { return Json($"{{\"status\": 3,\"error\": \"Error In The Server: {ex}\"}}"); }
        }

        /// <summary>
        /// Save signature file
        /// </summary>
        /// <param name="id"></param>
        /// <param name="file"></param>
        /// <param name="ia"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public async Task<JsonResult> saveSignatureFile(long id, string file)
        {
            var nameF = "";
            var idCompany = db.getCompanyId(id);
            try
            {
                if (file != null)
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
                                Key = $"{idCompany}/Drivers/{id}/DriverSignature/signature.png",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", "signature.png");

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                            nameF = "signature.png";
                        }
                    }
                }
                else { nameF = ""; }
            }
            catch (Exception) { nameF = ""; }
            try
            {
                Users u = new Users { FileSignature = nameF };
                var r = db.saveSignatureFile(u, id);
                var driver = db.getDriverDataById(id, idCompany);
                if (r == 0) { return Json("{\"status\": 0,\"signature\": \"" + nameF + "\", \"driver\": " + JsonConvert.SerializeObject(driver, Formatting.Indented) + "}"); } else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Save signature file Employer
        /// </summary>
        /// <param name="id"></param>
        /// <param name="file"></param>
        /// <param name="ia"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public async Task<JsonResult> saveSignatureFileLastEmployer(long id, string file)
        {
            var nameF = "";
            try
            {
                var idCompany = db.getCompanyIdSignature(id);

                if (file != null)
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
                                Key = $"{idCompany}/Drivers/EmployerSignature/{id}/signature.png",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", "signature.png");

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                            nameF = "signature.png";
                        }
                    }
                }
                else { nameF = ""; }
            }
            catch (Exception) { nameF = ""; }
            try
            {
                LetterInquiry l = new LetterInquiry { Signature = nameF };
                var r = db.saveSignatureFileEmployer(l, id);
                if (r == 0)
                {
                    return Json("{\"status\": 0,\"signature\": \"" + nameF + "\"}");
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Error In The Server\"}");
                }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }


        /// <summary>
        /// Save signature file Employer
        /// </summary>
        /// <param name="id"></param>
        /// <param name="file"></param>
        /// <param name="ia"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public async Task<JsonResult> saveSignatureFileLastEmployerHistory(long id, string file)
        {
            var nameF = "";
            try
            {
                var idCompany = db.getCompanyIdSignatureHistory(id);

                if (file != null)
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
                                Key = $"{idCompany}/Drivers/EmployerSignatureHistory/{id}/signature.png",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", "signature.png");

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                            nameF = "signature.png";
                        }
                    }
                }
                else { nameF = ""; }
            }
            catch (Exception) { nameF = ""; }
            try
            {
                EmploymentHistory employmentHistory = new EmploymentHistory { Signature = nameF };
                var r = db.saveSignatureFileEmployerHistory(employmentHistory, id);
                if (r == 0)
                {
                    return Json("{\"status\": 0,\"signature\": \"" + nameF + "\"}");
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Error In The Server\"}");
                }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// add and update of address
        /// </summary>
        /// <param name="a"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult saveAddress(DriverAddress a)
        {
            try
            {
                var r = db.saveAddress(a);
                var address = db.getAddress(a.IdDriver, 1, 3);
                var c = db.getDataCompanyC(a.IdDriver);
                var driver = db.getDriverData(a.IdDriver);
                if (r == 0) { return Json("{\"status\": 0,\"address\": \"saved\", \"address\": " + JsonConvert.SerializeObject(address, Formatting.Indented) + ", \"driver\": " + JsonConvert.SerializeObject(driver, Formatting.Indented) + ", \"company\": " + JsonConvert.SerializeObject(c, Formatting.Indented) + "}"); } else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpGet("[action]")]
        public JsonResult getAddress(long id, int page, int size)
        {
            try
            {
                var address = db.getAddress(id, page, size);
                if (address.Items.Count > 0) { return Json("{\"status\": 0, \"address\": " + JsonConvert.SerializeObject(address, Formatting.Indented) + " }"); } else { return Json("{\"status\": 1,\"error\": \"Empty list\"}"); }

            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// add and update Driving experience
        /// </summary>
        /// <param name="d"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult saveDrivingExp(DrivingExperience d)
        {
            try
            {
                var r = db.saveDrivingExp(d);
                var de = db.getDrivingExp(d.IdDriver, 1, 3);
                if (r == 0) { return Json("{\"status\": 0,\"drivingExp\": \"Saved\", \"drivingExp\": " + JsonConvert.SerializeObject(de, Formatting.Indented) + "}"); } else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Getlist of Driving Experience
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getDrivingExp(long id, int page, int size)
        {
            try
            {
                var de = db.getDrivingExp(id, page, size);
                if (de.Items.Count > 0) { return Json("{\"status\": 0, \"drivingExp\": " + JsonConvert.SerializeObject(de, Formatting.Indented) + " }"); } else { return Json("{\"status\": 1,\"error\": \"Empty list\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// add and update accident record
        /// </summary>
        /// <param name="ac"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult saveAccidentRec(AccidentRecord ac)
        {
            try
            {
                var r = db.saveAccidentRec(ac);
                var a = db.getAccidentRec(ac.IdDriver, 1, 3);
                if (r == 0) { return Json("{\"status\": 0,\"accidentRec\": \"Saved\", \"accidentRec\": " + JsonConvert.SerializeObject(a, Formatting.Indented) + "}"); } else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get list of Accident of Records
        /// </summary>
        /// <param name="id"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getAccidentRec(long id, int page, int size)
        {
            try
            {
                var a = db.getAccidentRec(id, page, size);
                if (a.Items.Count > 0) { return Json("{\"status\": 0, \"accidentRec\": " + JsonConvert.SerializeObject(a, Formatting.Indented) + " }"); } else { return Json("{\"status\": 1,\"error\": \"Empty list\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// add and update Traffic Conviction
        /// </summary>
        /// <param name="tc"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult saveTrafficConv(TrafficConvictions tc)
        {
            try
            {
                var r = db.saveTrafficConv(tc);
                var t = db.getTrafficConv(tc.IdDriver, 1, 3);
                if (r == 0) { return Json("{\"status\": 0,\"TrafficConv\": \"Saved\", \"trafficConvL\": " + JsonConvert.SerializeObject(t, Formatting.Indented) + "}"); } else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get Traffic Convictions
        /// </summary>
        /// <param name="id"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getTrafficConv(long id, int page, int size)
        {
            try
            {
                var tc = db.getTrafficConv(id, page, size);
                if (tc.Items.Count > 0) { return Json("{\"status\": 0, \"trafficConv\": " + JsonConvert.SerializeObject(tc, Formatting.Indented) + " }"); } else { return Json("{\"status\": 1,\"error\": \"Empty list\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get  States and Cities
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getSAndC(long id)
        {
            try
            {
                var s = db.GetStates();
                var c = db.GetCities(id);
                return Json("{\"status\": 0, \"states\": " + JsonConvert.SerializeObject(s, Formatting.Indented) + ", \"cities\": " + JsonConvert.SerializeObject(c, Formatting.Indented) + " }");
            }
            catch (Exception) { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// add and update
        /// add and records Employmrnt Record
        /// </summary>
        /// <param name="tc"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult saveEmpoymentR(EmploymentRecords er)
        {
            try
            {
                var r = db.saveEmploymentR(er);
                var erl = db.getEmploymentR(er.IdDriver, 1, 3);
                if (r == 0) { return Json("{\"status\": 0,\"EmpoymentR\": \"Saved\", \"employmentRL\": " + JsonConvert.SerializeObject(erl, Formatting.Indented) + "}"); } else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpPost("[action]")]
        public JsonResult saveEmpoymentFull(EmploymentRecords er)
        {
            try
            {
                var r = db.saveEmploymentFull(er, _env);
                var erl = db.getEmploymentR(er.IdDriver, 1, 3);
                if (r == 0) { return Json("{\"status\": 0,\"EmpoymentR\": \"Saved\", \"employmentRL\": " + JsonConvert.SerializeObject(erl, Formatting.Indented) + "}"); } else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get a Employment Records list
        /// </summary>
        /// <param name="id"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getEmploymentR(long id, int page, int size)
        {
            try
            {
                var er = db.getEmploymentR(id, page, size);
                if (er.Items.Count > 0) { return Json("{\"status\": 0, \"employmentR\": " + JsonConvert.SerializeObject(er, Formatting.Indented) + " }"); } else { return Json("{\"status\": 1,\"error\": \"Empty list\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Saved new DMV Record
        /// </summary>
        /// <param name="d"></param>
        /// <param name="file"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public async Task<JsonResult> saveDMVRecord(Dmv d, long idCompany, string file, string fileName)
        {
            var jsonResult = new JsonResult("");
            try
            {
                if (file != null)
                {
                    d.DmvFileName = fileName;

                    string[] imag = file.Split(',');
                    byte[] image = new byte[imag.Length];
                    int count = 0;
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
                                Key = $"{idCompany}/Drivers/{d.IdDriver}/DrivingRecord/{d.DmvFileName}",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", d.DmvFileName);

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                        }
                    }

                    var r = db.saveDMVRecord(d);
                    var dmvl = db.getDMVRecords((long)d.IdDriver, 1, 3);
                    var alerts = db.getAllAlerts((long)d.IdDriver);
                    var alertCount = db.alertsCounter((long)d.IdDriver);
                    var fitness = db.getDriverFitness((long)d.IdDriver);
                    if (r == 0)
                    {
                        jsonResult = Json("{\"status\": 0,\"dmvR\": \"saved\", \"dmvL\": " + JsonConvert.SerializeObject(dmvl, Formatting.Indented)
                            + ", \"alertsCount\": " + JsonConvert.SerializeObject(alertCount, Formatting.Indented)
                            + ", \"alerts\": " + JsonConvert.SerializeObject(alerts, Formatting.Indented)
                            + ", \"message\": \"Saved Correctly\", \"fitness\": " + JsonConvert.SerializeObject(fitness, Formatting.Indented)
                            + "}");
                    }
                    else
                    {
                        jsonResult = Json("{\"status\": 1,\"error\": \"Error In The Server\"}");
                    }
                }
                else
                {
                    jsonResult = Json("{\"status\": 2,\"error\": \"Invalid File Type\"}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                jsonResult = Json("{\"status\": 2,\"error\": \"Error In The Server\"}");
            }

            return jsonResult;
        }

        /// <summary>
        /// Get DMV records list
        /// </summary>
        /// <param name="id"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getDMVRList(long id, int page, int size)
        {
            try
            {
                var dmv = db.getDMVRecords(id, page, size);
                var epnL = db.getEmployerPullNotices(id, 1, 3);
                if (dmv.Items.Count > 0 || epnL.Items.Count > 0)
                {
                    return Json("{\"status\": 0, \"dmvR\": " + JsonConvert.SerializeObject(dmv, Formatting.Indented)
                        + ", \"epnL\": " + JsonConvert.SerializeObject(epnL, Formatting.Indented) + " }");
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Empty list\"}");
                }
            }
            catch (Exception)
            {
                return Json("{\"status\": 2,\"error\": \"Error In The Server\"}");
            }
        }

        [HttpPost("[action]")]
        public JsonResult DeleteClearingHouse(long idUser, long idCH, long idCompany, string fileName)
        {
            var jsonResult = new JsonResult("");
            try
            {
                var filesDeleted = db.DeleteCHRecord(idCH);
                if (filesDeleted > 0)
                {
                    this.DeleteS3Document(idUser, idCompany, "PreEmploymentInquery", fileName);
                    var chlist = db.GetCH(idUser);
                     if (chlist.Count() > 0) 
                        { 
                           jsonResult = Json("{\"status\": 0, \"CHList\": " + JsonConvert.SerializeObject(chlist, Formatting.Indented) + " }"); 
                        } 
                    else 
                        { 
                           jsonResult = Json("{\"status\": 1,\"error\": \"Error Saving Clearing House\"}"); 
                        }
                }
                else
                {
                    jsonResult = Json("{\"status\": 1, \"error\": \"Delete unsuccessful: Clearing House Record not found\"}");
                }
            }
            catch (Exception ex)
            {
                jsonResult = Json("{\"status\": 2,\"error\": \"" + ex.Message + " \"}");
            }

            return jsonResult;
        }

        [HttpPost("[action]")]
        public JsonResult DeleteDriverConsent(long idUser, long idDC, long idCompany, string fileName)
        {
            var jsonResult = new JsonResult("");
            try
            {
                var filesDeleted = db.DeleteDCRecord(idDC);
                if (filesDeleted > 0)
                {
                    this.DeleteS3Document(idUser, idCompany, "DriverConsent", fileName);
                    var dclist = db.GetDC(idUser);
                     if (dclist.Count() > 0) 
                        { 
                           jsonResult = Json("{\"status\": 0, \"DCList\": " + JsonConvert.SerializeObject(dclist, Formatting.Indented) + " }"); 
                        } 
                    else 
                        { 
                           jsonResult = Json("{\"status\": 1,\"error\": \"Error Getting Driver's Consent\"}"); 
                        }
                }
                else
                {
                    jsonResult = Json("{\"status\": 1, \"error\": \"Delete unsuccessful: Driver Consent Record not found\"}");
                }
            }
            catch (Exception ex)
            {
                jsonResult = Json("{\"status\": 2,\"error\": \"" + ex.Message + " \"}");
            }

            return jsonResult;
        }

        [HttpPost("[action]")]
        public JsonResult DeleteAnnualInquiry(long idUser,long idAI, long idCompany, string fileName)
        {
            var jsonResult = new JsonResult("");
            try
            {
                var filesDeleted = db.DeleteAIRecord(idAI);
                if (filesDeleted > 0)
                {
                     this.DeleteS3Document(idUser, idCompany, "AnnualInquiry", fileName);
                     var ailist = db.GetAI(idUser);
                     if (ailist.Count() > 0) 
                        { 
                           jsonResult = Json("{\"status\": 0, \"AIList\": " + JsonConvert.SerializeObject(ailist, Formatting.Indented) + " }"); 
                        } 
                    else 
                        { 
                           jsonResult = Json("{\"status\": 1,\"error\": \"Not Annual Inquiry found\"}"); 
                        }
                }
                else
                {
                    jsonResult = Json("{\"status\": 1, \"error\": \"Delete unsuccessful: Annual Inquiry Record not found\"}");
                }
            }
            catch (Exception ex)
            {
                jsonResult = Json("{\"status\": 2,\"error\": \"" + ex.Message + " \"}");
            }

            return jsonResult;
        }

        [HttpPost("[action]")]
        public JsonResult DeleteDmvRecord(long idUser, long idDmv, long idCompany, string fileName)
        {
            var jsonResult = new JsonResult("");
            try
            {
                var filesDeleted = db.DeleteDmvRecord(idDmv);
                if (filesDeleted > 0)
                {
                    this.DeleteS3Document(idUser, idCompany, "DrivingRecord", fileName);
                    var dmvList = db.getDMVRecords(idUser, 1, 5);
                    var alerts = db.getAllAlerts(idUser);
                    var alertsCount = db.alertsCounter(idUser);
                    var fitness = db.getDriverFitness(idUser);


                    jsonResult = Json("{\"status\": 0,\"dmvR\": \"saved\", \"dmvL\": " + JsonConvert.SerializeObject(dmvList, Formatting.Indented)
                        + ", \"alertsCount\": " + JsonConvert.SerializeObject(alertsCount, Formatting.Indented)
                        + ", \"alerts\": " + JsonConvert.SerializeObject(alerts, Formatting.Indented)
                        + ", \"message\": \"Deleted Correctly\", \"fitness\": " + JsonConvert.SerializeObject(fitness, Formatting.Indented)
                        + "}");
                }
                else
                {
                    jsonResult = Json("{\"status\": 1, \"error\": \"Delete unsuccessful: DMV Record not found\"}");
                }
            }
            catch (Exception ex)
            {
                jsonResult = Json("{\"status\": 2,\"error\": \"" + ex.Message + " \"}");
            }

            return jsonResult;
        }

        /// <summary>
        /// Saved new employer pull notice
        /// </summary>
        /// <param name="e"></param>
        /// <param name="file"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public async Task<JsonResult> savePullNotice(EmployerPullNotice e, long idCompany, string file)
        {
            try
            {
                if (file != null)
                {
                    DateTime dt = DateTime.Now;
                    e.FileName = dt.Year + dt.Month + dt.Day + dt.Second + "EmployerPullNotice.pdf";

                    string[] imag = file.Split(',');
                    byte[] image = new byte[imag.Length];
                    int count = 0;
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
                                Key = $"{idCompany}/Drivers/{e.IdDriver}/EmployerPullNotice/{e.FileName}",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", e.FileName);

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                        }
                    }
                }
            }
            catch (Exception) { }
            try
            {

                var r = db.saveEmployerPullNotice(e);
                var epnL = db.getEmployerPullNotices(e.IdDriver, 1, 3);
                if (r == 0)
                {
                    return Json("{\"status\": 0, \"epnL\": " + JsonConvert.SerializeObject(epnL, Formatting.Indented) + "}");
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Error In The Server\"}");
                }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get employer pull notices list
        /// </summary>
        /// <param name="id"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getEPNList(long id, int page, int size)
        {
            try
            {
                var epnL = db.getEmployerPullNotices(id, page, size);
                if (epnL.Items.Count > 0) { return Json("{\"status\": 0, \"epnL\": " + JsonConvert.SerializeObject(epnL, Formatting.Indented) + " }"); } else { return Json("{\"status\": 1,\"error\": \"Empty list\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpPost("[action]")]
        public JsonResult DeleteEpnRecord(long idUser, long idEpn, long idCompany, string fileName)
        {
            var jsonResult = new JsonResult("");

            try
            {
                var filesDeleted = db.DeleteEpnRecord(idEpn);

                if (filesDeleted > 0)
                {
                    this.DeleteS3Document(idUser, idCompany, "EmployerPullNotice", fileName);
                    var epnL = db.getEmployerPullNotices(idUser, 1, 3);
                    jsonResult = Json("{\"status\": 0, \"epnL\": " + JsonConvert.SerializeObject(epnL, Formatting.Indented) + "}");
                }
                else
                {
                    jsonResult = Json("{\"status\": 1, \"error\": \"Delete unsuccessful: EPN Record not found\"}");
                }
            }
            catch (Exception ex)
            {
                jsonResult = Json("{\"status\": 2,\"error\": \"" + ex.Message.Replace("\n", "").Replace("\r", "") + "\"}");
            }

            return jsonResult;
        }

        /// <summary>
        /// Get Data Company for Employment Aplication  Falta De pasar
        /// </summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getDataCompanyC(long id, long idc)
        {
            try
            {
                var c = db.getEmploymentApplication(id, idc, 1, 3);
                if (id > 0) { return Json("{\"status\": 0, \"employmentApplications\": " + JsonConvert.SerializeObject(c, Formatting.Indented) + " }"); } else { return Json("{\"status\": 1,\"error\": \"Check your internet connection\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Save document of driver
        /// </summary>
        /// <param name="d"></param>
        /// <param name="id"></param>
        /// <param name="file"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public async Task<JsonResult> saveDoc(DriverDocs d, long idD, long idCompany, string file)
        {
            var r = 0;
            try
            {
                var files = Request.Form.Files;
                DateTime dt = DateTime.Now;

                if (file != null)
                {
                    
                    d.DocName = dt.Year.ToString() + dt.Month.ToString() + dt.Day.ToString() + dt.Second.ToString() + d.DescriptionDoc.Replace(" ", String.Empty) + ".pdf";

                    string[] imag = file.Split(',');
                    byte[] image = new byte[imag.Length];
                    int count = 0;
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
                                Key = $"{idCompany}/Drivers/{idD}/{d.DescriptionDoc.Replace(" ", String.Empty)}/{d.DocName}",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", d.DocName);

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                        }
                    }
                    r = db.saveDoc(d, idD);
                }
                else {
                    foreach (var archivo in files)
                    {
                        Guid obj = Guid.NewGuid();
                        d.DescriptionDoc = "Drug Testing Policy";
                        d.DocName = dt.Year.ToString() + "BluAgentDrugTestingPolicy" + ".pdf";

                        using (var client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, RegionEndpoint.USWest2))
                        {
                            using (var newMemoryStream = new MemoryStream())
                            {
                                archivo.CopyTo(newMemoryStream);

                                var uploadRequest = new TransferUtilityUploadRequest
                                {
                                    InputStream = newMemoryStream,
                                    Key = $"{idCompany}/Drivers/{idD}/{d.DescriptionDoc.Replace(" ", String.Empty)}/{d.DocName}",
                                    BucketName = BucketName,
                                    CannedACL = S3CannedACL.PublicRead,
                                };

                                uploadRequest.Metadata.Add("x-amz-meta-filename", d.DocName);

                                var fileTransferUtility = new TransferUtility(client);
                                await fileTransferUtility.UploadAsync(uploadRequest);
                            }
                        }

                        r = db.saveDoc(d, idD);
                    }
                }
                
                var doc = db.getDocuments(idD, 0, 1, 7);
                if (r == 0) { return Json("{\"status\": 0, \"docs\": " + JsonConvert.SerializeObject(doc, Formatting.Indented) + "}"); } 
                else if (r == 1) { return Json("{\"status\": 1,\"error\": \"Document Duplicate\"}"); } 
                else { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        //if (file != null)
        //{
        //DateTime dt = DateTime.Now;
        //d.DocName = dt.Year.ToString() + dt.Month.ToString() + dt.Day.ToString() + dt.Second.ToString() + d.DescriptionDoc.Replace(" ", String.Empty) + ".pdf";

        //string[] imag = file.Split(',');
        //byte[] image = new byte[imag.Length];
        //int count = 0;
        //foreach (string s in imag)
        //{
        //    image[count] = Convert.ToByte(s);
        //    count++;
        //}

        //using (var client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, RegionEndpoint.USWest2))
        //{
        //    using (var newMemoryStream = new MemoryStream(image))
        //    {
        //        var uploadRequest = new TransferUtilityUploadRequest
        //        {
        //            InputStream = newMemoryStream,
        //            Key = $"{idCompany}/Drivers/{idD}/{d.DescriptionDoc.Replace(" ", String.Empty)}/{d.DocName}",
        //            BucketName = BucketName,
        //            CannedACL = S3CannedACL.PublicRead,
        //        };

        //        uploadRequest.Metadata.Add("x-amz-meta-filename", d.DocName);

        //        var fileTransferUtility = new TransferUtility(client);
        //        await fileTransferUtility.UploadAsync(uploadRequest);
        //    }
        //}

        //    var r = db.saveDoc(d, idD);
        //var doc = db.getDocuments(idD, 0, 1, 7);
        //if (r == 0) { return Json("{\"status\": 0, \"docs\": " + JsonConvert.SerializeObject(doc, Formatting.Indented) + "}"); } else if (r == 1) { return Json("{\"status\": 1,\"error\": \"Document Duplicate\"}"); } else { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        //}
        //else { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        //    }
        //    catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        //}

        /// <summary>
        /// Get document of driver
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getDocuments(long id, int page, int size)
        {
            try
            {
                var doc = db.getDocuments(id, 0, page, size);
                if (doc.Items.Count > 0)
                {
                    return Json("{\"status\": 0, \"docs\": " + JsonConvert.SerializeObject(doc, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"docs\": \"[]\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Download a AWS S3 File inside the AMAZON.
        /// </summary>
        /// <param name="id">Id of document.</param>
        /// <param name="docType">DocType.</param>
        /// <param name="fileName">FileName.</param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public async Task<IActionResult> downloadDocument(long idd, long idCompany, string docType, string fileName)
        {
            try
            {
                var fileNameKey = $"";
                if (docType != null) { fileNameKey = $"{idCompany}/Drivers/{idd}/{docType}/{fileName}"; } else { fileNameKey = $"{idCompany}/Drivers/{idd}/{fileName}"; }

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
                            string extension = Path.GetExtension(fileName).ToLowerInvariant();

                            if (docType != null)
                            {
                                if (extension == ".jpg")
                                {
                                    return File(stream, "image/jpg", fileName);
                                }
                                else if (extension == ".jpeg")
                                {
                                    return File(stream, "image/jpeg", fileName);
                                }
                                else if (extension == ".png")
                                {
                                    return File(stream, "image/png", fileName);
                                }
                                else if (extension == ".pdf")
                                {
                                    return File(stream, "application/pdf", fileName);
                                }
                                else
                                {
                                    return File(stream, "application/unknown", fileName);
                                }
                            }
                            else
                            {
                                return File(stream, "application/unknown", fileName);
                            }
                        }
                    }
                }
            }
            catch (Exception)
            {

                { return BadRequest("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
            }

        }

        /// <summary>
        /// Method to validate if exists documents to delete in AWS S3 Bucket
        /// </summary>
        /// <param name="id">Id of document.</param>
        /// <param name="docType">DocType.</param>
        /// <param name="fileName">FileName.</param>
        /// <returns></returns>
        public bool DeleteS3Document(long idd, long idCompany, string docType, string fileName)
        {
            bool isValid = true;

            try
            {
                using (var client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, RegionEndpoint.USWest2))
                {
                    var deleteObjectRequest = new DeleteObjectRequest
                    {
                        BucketName = BucketName,
                        Key = $"{idCompany}/Drivers/{idd}/{docType.Replace(" ", String.Empty)}/{fileName}"
                    };

                    Console.WriteLine("Deleting an object");
                    client.DeleteObjectAsync(deleteObjectRequest);
                }

            }
            catch (AmazonS3Exception)
            {
                isValid = false;
            }
            catch (Exception)
            {
                isValid = false;
            }

            return isValid;
        }

        /// <summary>
        /// Delete document of driver
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("[action]")]
        public JsonResult deleteDoc(long id, long idCompany, long driverId, string docType, string fileName)
        {
            try
            {
                var r = db.deleteDoc(id);
                var doc = db.getDocuments(driverId, 0, 1, 7);
                if (r == 0)
                {
                    this.DeleteS3Document(driverId, idCompany, docType, fileName);
                    return Json("{\"status\": 0, \"docs\": " + JsonConvert.SerializeObject(doc, Formatting.Indented) + "}");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpDelete("[action]")]
        public JsonResult deleteDrugAlcoholCompliance(long id, long idCompany, long driverId, string docType, string fileName)
        {
            try
            {
                var r = db.deleteDACompliance(id);
                this.DeleteS3Document(driverId, idCompany, docType, fileName);
                if(docType == "DrugTestFile"){
                    return Json("{\"status\": 0, \"drugTest\": " + JsonConvert.SerializeObject(r, Formatting.Indented) + "}");
                }else{
                    return Json("{\"status\": 0, \"alcoholTest\": " + JsonConvert.SerializeObject(r, Formatting.Indented) + "}");
                }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get 4 alerts  of driver
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getAlerts(long id)
        {
            try
            {
                var alerts = db.getAllAlerts(id);
                var count = db.alertsCounter(id);
                if (alerts.Count > 0)
                {
                    return Json("{\"status\": 0, \"alertsCount\": " + JsonConvert.SerializeObject(count, Formatting.Indented) + ", \"alerts\": " + JsonConvert.SerializeObject(alerts, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"alert\": \"[]\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error in The Server\"}"); }
        }

        [HttpGet("[action]")]
        public JsonResult getNotifications(int id)
        {
            try
            {
                var alerts = db.getAllNotifications(id);
                var count = db.NotificationsCounter(id);
                if (alerts.Count > 0)
                {
                    return Json("{\"status\": 0, \"alertsCount\": " + JsonConvert.SerializeObject(count, Formatting.Indented) + ", \"alerts\": " + JsonConvert.SerializeObject(alerts, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"alert\": \"[]\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error in The Server\"}"); }
        }

        [HttpGet("[action]")]
        public JsonResult getNotificationsCompany(long id)
        {
            try
            {
                var alerts = db.getAllNotificationsCompany(id);
                if (alerts.Count > 0)
                {
                    return Json("{\"status\": 0, \"alertsCompany\": " + JsonConvert.SerializeObject(alerts, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"alertCompany\": \"[]\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error in The Server\"}"); }
        }

        [HttpGet("[action]")]
        public JsonResult getDriverNotificationsCounter(int id)
        {
            try
            {
                var count = db.NotificationsCounter(id);
                return Json("{\"status\": 0, \"alertsCount\": " + JsonConvert.SerializeObject(count, Formatting.Indented) + " }");
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error in The Server\"}"); }
        }
        /// <summary>
        /// Get Previous employer data        Flata de pasar
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getDataPEmployer(long id)
        {
            try
            {
                var e = db.getDataPEmployer(id);
                var lq = db.getLetterofInquiry(id, 1, 3);
                if (e != null) { return Json("{\"status\": 0, \"pEmployer\": " + JsonConvert.SerializeObject(e, Formatting.Indented) + ", \"list\": " + JsonConvert.SerializeObject(lq, Formatting.Indented) + " }"); } else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// save record of sent Letter of Inquiry                 Falata de pasar
        /// </summary>
        /// <param name="i"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult saveLetterofInquiry(LetterInquiry i)
        {
            try
            {
                var inq = db.saveLetterofInquiry(i);
                var inqL = db.getLetterofInquiry((long)i.IdDriver, 1, 3);
                var fitness = db.getDriverFitness((long)i.IdDriver);
                if (inq == 0) { return Json("{\"status\": 0, \"letter of Inquiry\": \"Sent\", \"list\":" + JsonConvert.SerializeObject(inqL, Formatting.Indented) + ", \"fitness\": " + JsonConvert.SerializeObject(fitness, Formatting.Indented) + " }"); } else if (inq == 1) { return Json("{\"status\": 1,\"error\": \"Letter Of Inquiry is completed\"}"); } else { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception ex)
            {
                return Json("{\"status\": 2,\"error\": \"Error In The Server\"}");
                throw ex;
            }
        }

        /// <summary>
        ///                               Falta de pasar
        /// </summary>
        /// <param name="id"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getLetterofInquiry(long id, int page, int size)
        {
            try
            {
                var lq = db.getLetterofInquiry(id, page, size);
                if (lq.Items.Count > 0) { return Json("{\"status\": 0, \"lQ\": " + JsonConvert.SerializeObject(lq, Formatting.Indented) + " }"); } else { return Json("{\"status\": 1,\"error\": \"Empty list\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpGet("[action]")]
        public JsonResult getLetterInAndEmployHis(long id, long IdEmploymentRecord)
        {
            try
            {
                var lqeh = db.getLetterInAndEmployHis(id, IdEmploymentRecord);
                if (lqeh.Items.Count > 0) { 
                    return Json("{\"status\": 0, \"lQeH\": " + JsonConvert.SerializeObject(lqeh, Formatting.Indented) + " }"); 
                } else { 
                    return Json("{\"status\": 1,\"error\": \"Not Found\"}"); 
                }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpGet("[action]")]
        public JsonResult getOneLetterofInquiry(long id)
        {
            try
            {
                var lq = db.getOneLetterofInquiry(id);
                if (lq.Items.Count > 0) { return Json("{\"status\": 0, \"lQ\": " + JsonConvert.SerializeObject(lq, Formatting.Indented) + " }"); } else { return Json("{\"status\": 1,\"error\": \"Not Found\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpGet("[action]")]
        public JsonResult getOneEmploymentHistory(long id)
        {
            try
            {
                var eh = db.getOneEmploymentHistory(id);
                if (eh.Items.Count > 0) { return Json("{\"status\": 0, \"eh\": " + JsonConvert.SerializeObject(eh, Formatting.Indented) + " }"); } else { return Json("{\"status\": 1,\"error\": \"Not Found\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get Previous employer data        Flata de pasar
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getDataPEmployerEH(long id)
        {
            try
            {
                var e = db.getDataPEmployer(id);
                var eh = db.getEmploymentHistory(id, 1, 3);
                if (e != null) { return Json("{\"status\": 0, \"pEmployer\": " + JsonConvert.SerializeObject(e, Formatting.Indented) + ", \"list\": " + JsonConvert.SerializeObject(eh, Formatting.Indented) + " }"); } else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get Previous employer data        Flata de pasar
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getDataPEmployerLIEH(long id)
        {
            try
            {
                var e = db.getDataPEmployer(id);
                var lieh = db.getLetterInAndEmploymentHistory(id, 1, 3);
                if (e != null) { return Json("{\"status\": 0, \"pEmployer\": " + JsonConvert.SerializeObject(e, Formatting.Indented) + ", \"list\": " + JsonConvert.SerializeObject(lieh, Formatting.Indented) + " }"); } else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// save record of sent Employment History                 Falata de pasar
        /// </summary>
        /// <param name="eh"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult saveEmploymentHistory(EmploymentHistory eh)
        {
            try
            {
                var emph = db.saveEmploymentHistory(eh);
                var ehL = db.getEmploymentHistory((long)eh.IdDriver, 1, 3);
                var fitness = db.getDriverFitness((long)eh.IdDriver);
                if (emph == 0) { return Json("{\"status\": 0, \"employmentH\": \"Sent\", \"list\": " + JsonConvert.SerializeObject(ehL, Formatting.Indented) + ", \"fitness\": " + JsonConvert.SerializeObject(fitness, Formatting.Indented) + " }"); } else if (emph == 1) { return Json("{\"status\": 1,\"error\": \"Employment History is completed\"}"); } else { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        ///                              Falta de pasar
        /// </summary>
        /// <param name="id"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public JsonResult getEmploymentHistoryList(long id, int page, int size)
        {
            try
            {
                var eh = db.getEmploymentHistory(id, page, size);
                if (eh.Items.Count > 0) { return Json("{\"status\": 0, \"EH\": " + JsonConvert.SerializeObject(eh, Formatting.Indented) + " }"); } else { return Json("{\"status\": 1,\"error\": \"Empty list\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// save Annual Review DMV                 Falata de pasar
        /// </summary>
        /// <param name="eh"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult saveAnnualReviewDMV(AnnualDmvreview ar)

        {
            try
            {
                var ard = db.saveAnnualReviewDMV(ar);
                var arL = db.getAnnualReviewDMV((long)ar.IdDriver, 1, 3);
                var fitness = db.getDriverFitness((long)ar.IdDriver);
                if (ard == 0) { return Json("{\"status\": 0, \"annualRDMV\": \"Saved\", \"list\": " + JsonConvert.SerializeObject(arL, Formatting.Indented) + ", \"fitness\": " + JsonConvert.SerializeObject(fitness, Formatting.Indented) + " }"); } else if (ard == 1) { return Json("{\"status\": 1,\"error\": \"Annual driving record review for this year is done!\"}"); } else { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }

        }

        /// <summary>
        /// Get Annual Review DMV list   Falta de Pasar
        /// </summary>
        /// <param name="id"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getAnnualReviewDMVList(long id, int page, int size, int idLoggedUser, int idCompany)
        {
            try
            {
                var ar = db.getAnnualReviewDMV(id, page, size, idLoggedUser, idCompany);
                var lits = db.getDMVRecords(id, 1, 1);
                Object dmv = null;
                foreach (Object d in lits.Items) { dmv = d; }
                if (ar.Items.Count > 0) { return Json("{\"status\": 0, \"ARDList\": " + JsonConvert.SerializeObject(ar, Formatting.Indented) + ", \"dmv\": " + JsonConvert.SerializeObject(dmv, Formatting.Indented) + " }"); } else { return Json("{\"status\": 1,\"error\": \"Empty list\", \"dmv\": " + JsonConvert.SerializeObject(dmv, Formatting.Indented) + " }"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\", \"CName\": \"N/A\"}"); }
        }

        /// <summary>
        /// Save a violation    Falata de pasar
        /// </summary>
        /// <param name="ar"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult saveViolation(AnnualDriversCertification ac)
        {
            try
            {
                var v = db.saveViolation(ac);
                var vL = db.getViolations((long)ac.IdDriver, 1, 3);
                if (v == 0) { return Json("{\"status\": 0, \"violation\": \"Saved\", \"list\": " + JsonConvert.SerializeObject(vL, Formatting.Indented) + " }"); } else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }

        }

        /// <summary>
        /// Get Violations list   Falta de Pasar
        /// </summary>
        /// <param name="id"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getViolationsList(long id, int page, int size)
        {
            try
            {
                var v = db.getViolations(id, page, size);
                if (v.Items.Count > 0) { return Json("{\"status\": 0, \"VList\": " + JsonConvert.SerializeObject(v, Formatting.Indented) + " }"); } else { return Json("{\"status\": 1,\"error\": \"Empty list\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get Violations and Certifications list   Falta de Pasar
        /// </summary>
        /// <param name="id"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getVAndClist(long id)
        {
            try
            {
                var v = db.getViolations(id, 1, 3);
                var cL = db.getCertificationOfViolations(id, 1, 3);
                var c = db.getDataCompanyC(id);
                if (v.Items.Count > 0 || cL.Items.Count > 0) { return Json("{\"status\": 0, \"VList\": " + JsonConvert.SerializeObject(v, Formatting.Indented) + ", \"CList\": " + JsonConvert.SerializeObject(cL, Formatting.Indented) + ", \"company\": " + JsonConvert.SerializeObject(c, Formatting.Indented) + " }"); } else { return Json("{\"status\": 1,\"error\": \"Empty list\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get Certifications list   Falta de Pasar
        /// </summary>
        /// <param name="id"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getCertificationsList(long id, int page, int size)
        {
            try
            {
                var v = db.getCertificationOfViolations(id, page, size);
                if (v.Items.Count > 0) { return Json("{\"status\": 0, \"CVList\": " + JsonConvert.SerializeObject(v, Formatting.Indented) + " }"); } else { return Json("{\"status\": 1,\"error\": \"Empty list\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        ///  certify violations   Falta de subir
        /// </summary>
        /// <param name="ac"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult certificateViolation(long id)

        {
            try
            {
                var v = db.certificateViolations(id);
                var vL = db.getViolations(id, 1, 3);
                var cL = db.getCertificationOfViolations(id, 1, 3);
                var fitness = db.getDriverFitness(id);
                if (v == 0) { return Json("{\"status\": 0, \"violation\": \"Certificated\", \"VList\": " + JsonConvert.SerializeObject(vL, Formatting.Indented) + ", \"CList\": " + JsonConvert.SerializeObject(cL, Formatting.Indented) + ", \"fitness\": " + JsonConvert.SerializeObject(fitness, Formatting.Indented) + " }"); } else if (v == 1) { return Json("{\"status\": 1,\"error\": \"Annual Driver's Certification Of Violations is Current\"}"); } else { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 3,\"error\": \"Error In The Server\"}"); }

        }

        [HttpPost("[action]")]
        public JsonResult saveEditDrugAlcoholTest(DrugAlcoholCompliance compliance)
        {
            try
            {
                var r = db.saveEditDrugAlcoholTest(compliance);
                if(compliance.TypeTest == "Drug"){
                    return Json("{\"status\": 0,\"drugTest\": " + JsonConvert.SerializeObject(r, Formatting.Indented) +"}");
                }else{
                    return Json("{\"status\": 0,\"alcoholTest\": " + JsonConvert.SerializeObject(r, Formatting.Indented) +"}");
                }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Saved new drug or alcohol test  
        /// </summary>
        /// <param name="compliance">the data of "DrugAlcoholCompliance" to be saved</param>
        /// <param name="idCompany">company id</param>
        /// <param name="file">drug/alcohol test result file</param>
        /// <param name="specimenNumber">Specimen number, sent only when the method is called by the collector</param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public async Task<JsonResult> saveDrugAlcoholTest(DrugAlcoholCompliance compliance, long idCompany, string file, string specimenNumber)
        {
            try
            {
                if (file != null)
                {
                    DateTime dt = DateTime.Now;
                    var url = "";
                    if (compliance.TypeTest == "Drug")
                    {
                        compliance.ResultFile = dt.Year + dt.Month + dt.Day + dt.Second + "DrugTest.pdf";
                        url = idCompany + "/Drivers/" + compliance.IdDriver + "/DrugTestFile/" + compliance.ResultFile;
                    }
                    else
                    {
                        compliance.ResultFile = dt.Year + dt.Month + dt.Day + dt.Second + "AlcoholTest.pdf";
                        url = idCompany + "/Drivers/" + compliance.IdDriver + "/AlcoholTestFile/" + compliance.ResultFile;
                    }

                    string[] imag = file.Split(',');
                    byte[] image = new byte[imag.Length];
                    int count = 0;
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
                                Key = $"{url}",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", compliance.ResultFile);

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                        }
                    }

                }
            }
            catch (Exception) { }
            try
            {
                if (compliance.Form == "Chain of Custody") { compliance.DateApplication = null; compliance.Result = null; }
                var r = db.saveDrugAlcoholTest(compliance, specimenNumber, compliance.TypeTest);
                var drug = db.getDrugAndAlcoholTests((long)compliance.IdDriver, 0, 1, 3, "Drug");
                var alcohol = db.getDrugAndAlcoholTests((long)compliance.IdDriver, 0, 1, 3, "Alcohol");
                var fitness = db.getDriverFitness((long)compliance.IdDriver);
                if (r == 0) { return Json("{\"status\": 0,\"DrugAlcoholTest\": \"Saved\", \"drugTest\": " + JsonConvert.SerializeObject(drug, Formatting.Indented) + ", \"alcoholTest\": " + JsonConvert.SerializeObject(alcohol, Formatting.Indented) + ", \"fitness\": " + JsonConvert.SerializeObject(fitness, Formatting.Indented) + "}"); } else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get DrugAlcoholTest list by driver        Falta de subir
        /// </summary>
        /// <param name="id"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getDrugAlcoholTestList(long id, int pageD, int sizeD, int pageA, int sizeA)
        {
            try
            {
                var drug = db.getDrugAndAlcoholTests(id, 0, pageD, sizeD, "Drug");
                var alcohol = db.getDrugAndAlcoholTests(id, 0, pageA, sizeA, "Alcohol");
                //var doc = db.getDocuments(id, 1, 7);
                if (drug.Items.Count > 0 || alcohol.Items.Count > 0)
                {
                    return Json("{\"status\": 0, \"drugTest\": " + JsonConvert.SerializeObject(drug, Formatting.Indented) + ", \"alcoholTest\": " + JsonConvert.SerializeObject(alcohol, Formatting.Indented) + " }");
                }
                else
                {
                    return Json("{\"status\": 0, \"drugTest\": \"[]\", \"alcoholTest\": \"[]\" }");
                }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Save Mecical Certificate             Flata de subir
        /// </summary>
        /// <param name="d"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public async Task<JsonResult> saveMedicalCertificate(MedicalCertificate m, long idCompany, string file)
        {
            try
            {
                if (file != null)
                {
                    DateTime dt = DateTime.Now;
                    m.MedicalFile = Request.Form.Files[0].FileName;

                    string[] imag = file.Split(',');
                    byte[] image = new byte[imag.Length];
                    int count = 0;
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
                                Key = $"{idCompany}/Drivers/{m.IdDriver}/MedicalExaminer/{Request.Form.Files[0].FileName}",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", Request.Form.Files[0].FileName);

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                        }
                    }
                }
            }
            catch (Exception) { }
            try
            {
                var r = db.saveMecicalCertificate(m);
                var list = db.getMedicalCertificates((long)m.IdDriver, 1, 3);
                var alerts = db.getAllAlerts((long)m.IdDriver);
                var count = db.alertsCounter((long)m.IdDriver);
                var fitness = db.getDriverFitness((long)m.IdDriver);
                if (r == 0)
                {
                    return Json("{\"status\": 0,\"DrugAlcoholTest\": \"Saved\", \"list\": " + JsonConvert.SerializeObject(list, Formatting.Indented)
                        + ", \"alertsCount\": " + JsonConvert.SerializeObject(count, Formatting.Indented)
                        + ", \"alerts\": " + JsonConvert.SerializeObject(alerts, Formatting.Indented)
                        + ", \"message\": \"Saved Correctly\", \"fitness\": "
                        + JsonConvert.SerializeObject(fitness, Formatting.Indented)
                        + "}");
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Error In The Server\"}");
                }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Save Mecical Certificate             Flata de subir
        /// </summary>
        /// <param name="d"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult DeleteMedicalCertificate(long id, string medicalCertificateID, long idDriver, long idCompany, string medicalFile)
        {
            try
            {
                var deleteSuccesful = db.DeleteMedicalCertificate(id, medicalCertificateID, idDriver);
                if (deleteSuccesful)
                {
                    var list = db.getMedicalCertificates(idDriver, 1, 3);

                    DeleteS3Document(idDriver, idCompany, "MedicalExaminer", medicalFile);
                    return Json("{\"status\": 0, \"MCList\": " + JsonConvert.SerializeObject(list, Formatting.Indented)
                       + ", \"message\": \"Medical Certificate Deleted Successfully\" "
                       + "}");
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"File not found\"}");
                }

            }
            catch (Exception ex)
            {
                return Json("{\"status\": 2,\"error\": \"" + ex.Message + "\"}");
            }
        }

        /// <summary>
        /// Get Medical Certificates        Falta de subir
        /// </summary>
        /// <param name="id"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getMedicalCertificates(long id, int page, int size)
        {
            try
            {
                var mc = db.getMedicalCertificates(id, page, size);
                if (mc.Items.Count > 0)
                {
                    return Json("{\"status\": 0, \"medicalC\": " + JsonConvert.SerializeObject(mc, Formatting.Indented) + " }");
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Empty list\"}");
                }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get Road Test Data  Falta de subir
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getRoadTestData(long id, long idS, long idc, long idLoggedUser)
        {
            try
            {

                var sL = db.GetStates(idS);
                var r = db.GetRoadTests(id, 1, 1000, idc, idLoggedUser);
                if (r.Items.Count > 0) { return Json("{\"status\": 0, \"states\": " + JsonConvert.SerializeObject(sL, Formatting.Indented) + ", \"roadTestList\": " + JsonConvert.SerializeObject(r, Formatting.Indented) + " }"); } else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get MultiEmployment Data  Falta de Subir
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getDataME(long id)
        {
            try
            {
                var r = db.getDataME(id);
                return Json("{\"status\": 0, \"data\": " + JsonConvert.SerializeObject(r, Formatting.Indented) + "}");
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpGet("[action]")]
        public JsonResult ImportNewDrivers()
        {
            try
            {
                var r = db.importNewDrivers();
                if (r == 0){
                    return Json("{\"status\": 200,\"Message\": \"Se Importaron Drivers Con Exito\"}");
                }else{
                    return Json("{\"status\": 200,\"error\": \"Error al intentar importar Drivers\"}");
                }
            }
            catch (Exception ex) { return Json("{\"status\": 201,\"error\": \""+ex+"\"}"); }
        }

        /// <summary>
        /// Get MultiEmployment Data  Falta de Subir
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult logsRandomNotifications(int id)
        {
            try
            {
                var r = db.getLogsRandomsNotifications(id, _env);
                return Json("{\"status\": 0, \"notificationsLR\": " + JsonConvert.SerializeObject(r, Formatting.Indented) + "}");
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Change Password
        /// </summary>
        /// <param name="idu"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult changePassword(string password, long id, string newPassword, string alert)
        {
            try
            {
                var returnString = "";
                switch (alert)
                {
                    case "good":
                        var cp = db.changePassword(password, id, newPassword);
                        if (cp == 0) { returnString = "{\"status\": 0, \"password\": \"changed\" }"; } else if (cp == 1) { returnString = "{\"status\": 1,\"error\": \"Current Password is incorrect\"}"; } else { returnString = "{\"status\": 1,\"error\": \"Error In The Server\"}"; }
                        break;
                    case "new":
                        returnString = "{\"status\": 2,\"error\": \"New Password is incorrect\"}";
                        break;
                    case "different":
                        returnString = "{\"status\": 4,\"error\": \"New password doesn't match\"}";
                        break;
                }
                return Json(returnString);
            }
            catch (Exception) { return Json("{\"status\": 4,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get Driver Fitness
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getDriverFitness(long id)
        {
            try
            {
                var r = db.getDriverFitness(id);
                return Json("{\"status\": 0, \"fitness\": " + JsonConvert.SerializeObject(r, Formatting.Indented) + "}");
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpGet("[action]")]
        public JsonResult getAllDriversFitness(int idCompany)
        {
            try
            {

                var driversIds = db.getAllDriversFitness(idCompany);
                //var r = db.getDriverFitness(idd);
                //return driversIds;
                return Json("{\"status\": 0, \"allDriversFitness\": " + JsonConvert.SerializeObject(driversIds, Formatting.Indented) + ", \"driversIds\": " + driversIds + "}");
            }
            catch (Exception)
            {
                return null; //Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); 
            }
        }
        /// <summary>
        /// Save Road Test
        /// </summary>
        /// <param name="d"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult SaveRoadTest2(RoadTest ro, long idLoggedUser)
        {
            try
            {
                var r = db.SaveRoadTest(ro);
                var rl = db.GetRoadTests((long)ro.IdDriver, 1, 3, (long)ro.IdCompany, idLoggedUser);
                var fitness = db.getDriverFitness((long)ro.IdDriver);
                if (r == 0) { return Json("{\"status\": 0,\"roadTest\": \"Saved\", \"roadTestList\": " + JsonConvert.SerializeObject(rl, Formatting.Indented) + ", \"fitness\": " + JsonConvert.SerializeObject(fitness, Formatting.Indented) + " }"); } else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Can't add Roead Test\"}"); }
        }

        /// <summary>
        /// Get Road Test list
        /// </summary>
        /// <param name="id"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <param name="idc"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getRoadTestList(long id, int page, int size, long idc, long idLoggedUser)
        {
            try
            {
                var r = db.GetRoadTests(id, page, size, idc, idLoggedUser);
                if (r.Items.Count > 0) { return Json("{\"status\": 0, \"roadTestList\": " + JsonConvert.SerializeObject(r, Formatting.Indented) + " }"); } else { return Json("{\"status\": 1,\"error\": \"Empty list\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }



        /// <summary>
        /// Save Employment Application
        /// </summary>
        /// <param name="ea"></param>
        /// <param name="de"></param>
        /// <param name="da"></param>
        /// <param name="dar"></param>
        /// <param name="dtc"></param>
        /// <param name="der"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult SaveEmploymentApplication(EmploymentApplication ea)
        {
            try
            {
                var add = db.getAddressEA((long)ea.IdDriver, 1, 3);
                var exp = db.getDrivingExp((long)ea.IdDriver, 1, 3);
                var aci = db.getAccidentRec((long)ea.IdDriver, 1, 3);
                var traff = db.getTrafficConv((long)ea.IdDriver, 1, 3);
                var er = db.getEmploymentR((long)ea.IdDriver, 1, 3);
                var r = db.SaveEmploymentApplication(ea, exp.Items, add, aci.Items, traff.Items, er.Items);
                var c = db.getEmploymentApplication((long)ea.IdDriver, (long)ea.IdCompany, 1, 3);
                var fitness = db.getDriverFitness((long)ea.IdDriver);
                if (r == 0) { return Json("{\"status\": 0, \"eAplication\": \"saved\", \"employmentApplications\": " + JsonConvert.SerializeObject(c, Formatting.Indented) + ", \"fitness\": " + JsonConvert.SerializeObject(fitness, Formatting.Indented) + " }"); } else { return Json("{\"status\": 1,\"error\": \"Please add Driver's License\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get Employment Application 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="idc"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getEmploymentApplications(long id, long idc, int page, int size)
        {
            try
            {
                var r = db.getEmploymentApplication(id, idc, page, size);
                if (r.Items.Count > 0) { return Json("{\"status\": 0, \"employmentApplications\": " + JsonConvert.SerializeObject(r, Formatting.Indented) + " }"); } else { return Json("{\"status\": 1,\"error\": \"Empty list\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Save  Inquiry Answer
        /// </summary>
        /// <param name="i"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult saveInquiryAnswer(LetterInAndEmpHis i)
        {
            try
            {
                var r = db.saveInquiryAnswer(i);
                if (r == 0)
                {
                    return Json("{\"status\": 0, \"answer\": \"saved\"  }");
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Database operation expected to affect 1 row(s) but actually affected 0 row(s). Data may have been modified or deleted since entities were loaded.\"}");
                }
            }
            catch (Exception ex)
            {

                return Json("{\"status\": 2,\"error\": \"Error In The Server\"}" + ex);

            }
        }

        /// <summary>
        /// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /// </summary>
        /// <param name="i"></param>
        /// <returns></returns>
        [HttpPut("[action]")]
        public JsonResult saveInquiryAnswerUpdate(LetterInAndEmpHis i)
        {
            try
            {
                var r = db.saveInquiryAnswer(i);
                if (r == 0)
                {
                    return Json("{\"status\": 0, \"answer\": \"saved\"  }");
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Database operation expected to affect 1 row(s) but actually affected 0 row(s). Data may have been modified or deleted since entities were loaded.\"}");
                }
            }
            catch (Exception ex)
            {

                return Json("{\"status\": 2,\"error\": \"Error In The Server\"}" + ex);

            }
        }

        /// <summary>
        /// Save EHistory Answer
        /// </summary>
        /// <param name="eh"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult saveEHistoryAnswer(LetterInAndEmpHis eh)
        {
            try
            {
                var r = db.saveEHistoryAnswer(eh);
                if (r == 0) { return Json("{\"status\": 0, \"answer\": \"saved\"  }"); } else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }


        /// <summary>
        /// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /// </summary>
        /// <param name="driver"></param>
        /// <returns></returns>

        [HttpPost("[action]")]
        public JsonResult saveClearingCredentials(Driver driver)
        {
            try
            {
                var saveCredentialsCH = db.saveCredentialsCH(driver);
                if (saveCredentialsCH.Count() > 0) 
                { 
                    return Json("{\"status\": 0, \"DriverData\": " + JsonConvert.SerializeObject(saveCredentialsCH, Formatting.Indented) + " }"); 
                } 
                else 
                { 
                    return Json("{\"status\": 1,\"error\": \"Error saving Clearing House Credentials\"}"); 
                }
            }
            catch (Exception ex) 
            { 
                return Json("{\"status\": 2,\"error\": \""+ex.Message+"\"}"); 
            }
        }



        [HttpPost("[action]")]
        public JsonResult GetClearingHouse(long idDriver)
        {
              try
            {
                var chlist = db.GetCH(idDriver);
                if (chlist.Count() > 0) 
                { 
                    return Json("{\"status\": 0, \"CHList\": " + JsonConvert.SerializeObject(chlist, Formatting.Indented) + " }"); 
                } 
                else 
                { 
                    return Json("{\"status\": 1,\"error\": \"Error getting Clearing House\"}"); 
                }
            }
            catch (Exception ex) { 
                return Json("{\"status\": 2,\"error\": \""+ex.Message+"\"}"); 
                }
        }

        [HttpPost("[action]")]
        public JsonResult GetClearingCredentials(long idDriver)
        {
              try
            {
                var CHCredentials = db.GetCHCredentials(idDriver);
                if (CHCredentials.Count() > 0) 
                { 
                    return Json("{\"status\": 0, \"DriverData\": " + JsonConvert.SerializeObject(CHCredentials, Formatting.Indented) + " }"); 
                } 
                else 
                { 
                    return Json("{\"status\": 1,\"error\": \"Error getting Clearing House Credentials\"}"); 
                }
            }
            catch (Exception ex) { 
                return Json("{\"status\": 2,\"error\": \""+ex.Message+"\"}"); 
                }
        }

        [HttpPost("[action]")]
        public JsonResult GetDriverConsent(long idDriver)
        {
              try
            {
                var dclist = db.GetDC(idDriver);
                if (dclist.Count() > 0) 
                { 
                    return Json("{\"status\": 0, \"DCList\": " + JsonConvert.SerializeObject(dclist, Formatting.Indented) + " }"); 
                } 
                else 
                { 
                    return Json("{\"status\": 1,\"error\": \"Error getting Driver's Consent\"}"); 
                }
            }
            catch (Exception ex) { 
                return Json("{\"status\": 2,\"error\": \""+ex.Message+"\"}"); 
                }
        }

        [HttpPost("[action]")]
        public JsonResult GetAnnualInquiry(long idDriver)
        {
              try
            {
                var ailist = db.GetAI(idDriver);
                if (ailist.Count() > 0) 
                { 
                    return Json("{\"status\": 0, \"AIList\": " + JsonConvert.SerializeObject(ailist, Formatting.Indented) + " }"); 
                } 
                else 
                { 
                    return Json("{\"status\": 1,\"error\": \"Not Annual Inquiry found\"}"); 
                }
            }
            catch (Exception ex) { 
                return Json("{\"status\": 2,\"error\": \""+ex.Message+"\"}"); 
                }
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> SaveClearingHouse(PreEmploymentInquery p, string file)
        {
            try
            {
                if (file != null)
                {
                    string extension = Request.Form.Files[0].FileName.Split(".")[1];
                    DateTime dt = DateTime.Now;
                    string month = DateTime.Now.ToString("MMM");
                    string mes = char.ToUpper(month[0]) + month.Substring(1).Split(".")[0];
                    
                    p.fileName = "QueryResult-" + mes + "_" + dt.Day.ToString("d2") + "_" + dt.Year + "_" + dt.Second + "." + extension;

                    string[] imag = file.Split(',');
                    byte[] image = new byte[imag.Length];
                    int count = 0;
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
                                Key = $"{p.IdCompany}/Drivers/{p.IdDriver}/PreEmploymentInquery/{p.fileName}",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", p.fileName);

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                        }
                    }
                }
            }
            catch (Exception) { }
            try
            {
                var chlist = db.saveCH(p);
                if (chlist.Count() > 0) 
                { 
                    return Json("{\"status\": 0, \"CHList\": " + JsonConvert.SerializeObject(chlist, Formatting.Indented) + " }"); 
                } 
                else 
                { 
                    return Json("{\"status\": 1,\"error\": \"Error Saving Clearing House\"}"); 
                }
            }
            catch (Exception ex) { 
                return Json("{\"status\": 2,\"error\": \""+ex.Message+"\"}"); 
                }
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> SaveDriverConsent(DriverConsent d, string file)
        {
            try
            {
                if (file != null)
                {
                    string extension = Request.Form.Files[0].FileName.Split(".")[1];
                    DateTime dt = DateTime.Now;
                    string month = DateTime.Now.ToString("MMM");
                    string mes = char.ToUpper(month[0]) + month.Substring(1).Split(".")[0];

                    d.fileName = "DriverConsent-" + mes + "_" + dt.Day.ToString("d2") + "_" + dt.Year + "_" + dt.Second + "." + extension;;

                    string[] imag = file.Split(',');
                    byte[] image = new byte[imag.Length];
                    int count = 0;
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
                                Key = $"{d.IdCompany}/Drivers/{d.IdDriver}/DriverConsent/{d.fileName}",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", d.fileName);

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                        }
                    }
                }
            }
            catch (Exception) { }
            try
            {
                var dclist = db.saveDC(d);
                if (dclist.Count() > 0) 
                { 
                    return Json("{\"status\": 0, \"DCList\": " + JsonConvert.SerializeObject(dclist, Formatting.Indented) + " }"); 
                } 
                else 
                { 
                    return Json("{\"status\": 1,\"error\": \"Error Saving Driver Consent\"}"); 
                }
            }
            catch (Exception ex) { 
                return Json("{\"status\": 2,\"error\": \""+ex.Message+"\"}"); 
                }
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> SaveAnnualInquiry(AnnualInquiry a, string file)
        {
        try
            {
                if (file != null)
                {
                    string extension = Request.Form.Files[0].FileName.Split(".")[1];
                    DateTime dt = DateTime.Now;
                    string month = DateTime.Now.ToString("MMM");
                    string mes = char.ToUpper(month[0]) + month.Substring(1).Split(".")[0];

                    a.DocName = "AnnualInquiry-" + mes + "_" + dt.Day.ToString("d2") + "_" + dt.Year + "_" + dt.Second + "." + extension;;

                    string[] imag = file.Split(',');
                    byte[] image = new byte[imag.Length];
                    int count = 0;
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
                                Key = $"{a.IdCompany}/Drivers/{a.IdDriver}/AnnualInquiry/{a.DocName}",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", a.DocName);

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                        }
                    }
                }
            }
            catch (Exception) { }
            try
            {
                var ailist = db.saveAI(a);
                if (ailist.Count() > 0) 
                { 
                    return Json("{\"status\": 0, \"AIList\": " + JsonConvert.SerializeObject(ailist, Formatting.Indented) + " }"); 
                } 
                else 
                { 
                    return Json("{\"status\": 1,\"error\": \"Error Saving Annual Inquiry\"}"); 
                }
            }
            catch (Exception ex) { 
                return Json("{\"status\": 2,\"error\": \""+ex.Message+"\"}"); 
                }
        }

        [HttpPost("[action]")]
        public JsonResult sendLetterOfInquiry(string email, string link, string companyName, string derName, string employee, string prevEmployer, string title)
        {
            try
            {
                var r = db.sendLetterOfInquiry(_env, email, link, companyName, derName, employee, prevEmployer, title);
                if (r == 0) { return Json("{\"status\": 0, \"answer\": \"sent\"  }"); } else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// deletes the drug test results and compliance data that the collector uploads (this method is used only for collectors)
        /// </summary>
        /// <param name="id">id of the drug test to be eliminated</param>
        /// <param name="idCompany">id of the company the driver belongs to</param>
        /// <param name="driverId">id of the driver to which the removed test belongs</param>
        /// <param name="docType">type of document to be deleted, this is to know from which folder it will be</param>
        /// <param name="fileName">name of the file to be deleted</param>
        /// <returns></returns>
        [HttpDelete("[action]")]
        public JsonResult deleteDurgTestResult(long id, long idCompany, long driverId, string docType, string fileName)
        {
            try
            {
                var r = db.deleteDurgTestCompliance(id);
                if (r == 0)
                {
                    this.DeleteS3Document(driverId, idCompany, docType, fileName);
                    return Json("{\"status\": 0, \"answer\": \"deleted\"}");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpGet("[action]")]
        public ActionResult getDataCompany(Int64 idU, Boolean alert)
        {
            try
            {
                DataCompany c = db.GetDataCompany(idU, alert);
                if (c.Company != null)
                {
                    var complet = db.getCompanyComplet(c.Company);
                    return Json("{\"status\": 0, \"company\": " + JsonConvert.SerializeObject(c, Formatting.Indented) + " }");
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Company null\"}");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet("[action]")]
        public ActionResult getDriverAuthorizationConsent(Int64 idU)
        {
            try
            {
                DriverAuthorizationConsent consent = db.getAuthorizationConsents(idU);
                if (consent != null)
                {
                    return Json("{\"status\": 0, \"driverAuthorizationConsent\": " + JsonConvert.SerializeObject(consent, Formatting.Indented) + " }");
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"User consent not found\"}");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> saveDriverLogo(long idCompany, string file, Int64 idU)
        {
            string nameImg = "";
            try
            {
                if (file != null)
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
                                Key = $"{idCompany}/Drivers/{idU}/driverAvatar.png",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", "companyLogo.png");

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                            nameImg = "driverAvatar.png";
                        }
                    }
                }
                else { nameImg = ""; }
            }
            catch (Exception) { nameImg = ""; }
            try
            {
                Users user = new Users();
                user.FileImage = nameImg;
                user.Id = idU;

                var r = db.saveDriverLogo(user);
                //DataCompany c = db.getDataCompany(idU, alert);
                //var alerts = db.getAllAlerts(idU);
                //var count = db.alertsCounter(idU);
                //var complet = db.getCompanyComplet(c.Company);
                if (r != null)
                {
                    return Json("{\"status\": 0, \"driver\": " + JsonConvert.SerializeObject(r, Formatting.Indented) +  "}");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error when saving\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }

        }

    }
}