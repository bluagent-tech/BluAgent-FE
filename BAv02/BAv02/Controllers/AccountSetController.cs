using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using BAv02.Models;
using BAv02.Models.DataAccessLayers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using BAv02.Models.Tools;
using System.Net;
using Microsoft.Extensions.FileProviders;
using Stripe;
using Amazon.S3;
using Amazon.S3.Transfer;
using Amazon;
using Amazon.S3.Model;
using Microsoft.Extensions.Configuration;
using Ionic.Zip;

namespace BAv02.Controllers
{
    [Route("api/[controller]")]
    public class AccountSetController : Controller
    {

        AccountSetDAL db = new AccountSetDAL();
        private IHostingEnvironment _env;
        private IConfiguration Configuration { get; set; }

        public string AwsAccessKeyId { get; set; }
        public string AwsSecretAccessKey { get; set; }

        public string AwsServer { get; set; }

        public string BucketName { get; set; }

        public string AssetsDirectory { get; set; }

        private const int Page = 1;
        private const int Size = 7;


        public AccountSetController(IHostingEnvironment env)
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



        [HttpPost("[action]")]
        public JsonResult SaveCompanyClearingCredentials(Company company)
        {
            try
            {
                var saveCompanyCredentialsCH = db.saveCompanyCredentialsCH(company);
                if (saveCompanyCredentialsCH.Count() > 0)
                {
                    return Json("{\"status\": 0, \"CompanyData\": " + JsonConvert.SerializeObject(saveCompanyCredentialsCH, Formatting.Indented) + " }");
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Error saving Clearing House Credentials\"}");
                }
            }
            catch (Exception ex)
            {
                return Json("{\"status\": 2,\"error\": \"" + ex.Message + "\"}");
            }
        }

        [HttpPost("[action]")]
        public JsonResult GetCompanyClearingCredentials(long idCompany)
        {
            try
            {
                var CHCredentials = db.GetCompanyCHCredentials(idCompany);
                if (CHCredentials.Count() > 0)
                {
                    return Json("{\"status\": 0, \"CompanyData\": " + JsonConvert.SerializeObject(CHCredentials, Formatting.Indented) + " }");
                }
                else
                {
                    return Json("{\"status\": 1,\"error\": \"Error getting Clearing House Credentials\"}");
                }
            }
            catch (Exception ex)
            {
                return Json("{\"status\": 2,\"error\": \"" + ex.Message + "\"}");
            }
        }

        /// <summary>
        /// Get the company data
        /// </summary>
        /// <param name="idU"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public ActionResult getDataCompany(Int64 idU, Boolean alert)
        {
            try
            {
                DataCompany c = db.getDataCompany(idU, alert);
                var alerts = db.getAllAlerts(idU);
                var count = db.alertsCounter(idU);
                var cR = db.getCompanyRating(idU);
                var docs = db.getDocuments(idU);
                var user = db.getCompanyUSer(idU);
                if (c.Company != null)
                {
                    db.getAddAccidentsBD(idU);
                    var complet = db.getCompanyComplet(c.Company);
                    return Json("{\"status\": 0, \"company\": " + JsonConvert.SerializeObject(c, Formatting.Indented) + ", \"alerts\": " + JsonConvert.SerializeObject(alerts, Formatting.Indented) + ", \"alertsCount\": " + JsonConvert.SerializeObject(count, Formatting.Indented) + ", \"complet\": " + JsonConvert.SerializeObject(complet, Formatting.Indented) + ", \"companyRating\": " + JsonConvert.SerializeObject(cR, Formatting.Indented)  + ", \"signatureDate\": " + JsonConvert.SerializeObject(user, Formatting.Indented) + ", \"CompanyDocs\": " + JsonConvert.SerializeObject(docs, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Company null\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpGet("[action]")]
        public JsonResult getVehiclesActive(long IdCompany)
        {
            try
            {
                var Vehicles = db.getVehiclesActive(IdCompany);
                if (Vehicles != null)
                {
                    return Json("{\"status\": 0, \"VehicleList\": " + JsonConvert.SerializeObject(Vehicles, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }
        /// <summary>
        /// Get driver per company
        /// </summary>
        /// <param name="idstate"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getDrivers(long id)
        {
            try
            {
                var drivers = db.getDrivers(id);
                if (drivers != null)
                {
                    return Json("{\"status\": 0, \"driverList\": " + JsonConvert.SerializeObject(drivers, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get States per country
        /// </summary>
        /// <param name="idstate"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getStates(Int64 idc)
        {
            try
            {
                var states = db.getStates(idc);
                if (states.Count != 0)
                {
                    return Json("{\"status\": 0, \"states\": " + JsonConvert.SerializeObject(states, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get cities per state
        /// </summary>
        /// <param name="idstate"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getCities(Int64 idstate)
        {
            try
            {
                var cities = db.getCities(idstate);
                if (cities.Count != 0)
                {
                    return Json("{\"status\": 0, \"cities\": " + JsonConvert.SerializeObject(cities, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get the list of users per company
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getRoles(Int64 idu, int page, int size)
        {
            try
            {

                var t = db.getRoles(idu, page, size);
                var i = db.getInactiveRoles(idu, page, size);
                if (t.Items.Count != 0 || i.Items.Count !=0)
                {
                    return Json("{\"status\": 0, \"users\": " + JsonConvert.SerializeObject(t, Formatting.Indented) + ", \"inactiveUsers\":" + JsonConvert.SerializeObject(i, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Save the change in the company data 
        /// </summary>
        /// <param name="company"></param>
        /// <param name="file"></param>
        /// <param name="idu"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult saveDataCompany(Company company, Int64 idu, Boolean mailing)
        {
            try
            {
                if (mailing == false)
                {
                    company.MailAddress = company.PhysicalAddress;
                    company.MailZip = company.PhysicalZip;
                    company.MailCity = company.PhysicalCity;
                    company.MailState = company.PhysicalState;
                    company.MailCountry = company.PhysicalCountry;
                }

                var r = db.saveDataCompany(company, idu);
                var alerts = db.getAllAlerts(idu);
                var count = db.alertsCounter(idu);
                var ca = db.companyCa(idu);
                if (r != null)
                {
                    var complet = db.getCompanyComplet(company);
                    return Json("{\"status\": 0, \"company\": " + JsonConvert.SerializeObject(r, Formatting.Indented) + ", \"alertsCount\": " + JsonConvert.SerializeObject(count, Formatting.Indented) + ", \"alerts\": " + JsonConvert.SerializeObject(alerts, Formatting.Indented) + ", \"stateNumber\": " + JsonConvert.SerializeObject(ca, Formatting.Indented) + ", \"complet\": " + JsonConvert.SerializeObject(complet, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error when saving\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }


        /// <summary>
        /// Save the change in the company logo 
        /// </summary>
        /// <param name="company"></param>
        /// <param name="file"></param>
        /// <param name="idu"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public async Task<JsonResult> saveCompanyLogo(long idCompany, string file, Int64 idU, Boolean alert)
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
                                Key = $"{idCompany}/companyLogo.png",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", "companyLogo.png");

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                            nameImg = "companyLogo.png";
                        }
                    }
                }
                else { nameImg = ""; }
            }
            catch (Exception) { nameImg = ""; }
            try
            {
                Company company = new Company();
                company.Image = nameImg;
                company.Id = idCompany;

                var r = db.saveCompanyLogo(company);
                DataCompany c = db.getDataCompany(idU, alert);
                var alerts = db.getAllAlerts(idU);
                var count = db.alertsCounter(idU);
                var complet = db.getCompanyComplet(c.Company);
                if (r != null)
                {
                    return Json("{\"status\": 0, \"company\": " + JsonConvert.SerializeObject(r, Formatting.Indented) + ", \"complet\":" + JsonConvert.SerializeObject(complet, Formatting.Indented) + ", \"alerts\": " + JsonConvert.SerializeObject(alerts, Formatting.Indented) + ", \"alertsCount\": " + JsonConvert.SerializeObject(count, Formatting.Indented) + "}");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error when saving\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }

        }

        /// <summary>
        /// Save signature file
        /// </summary>
        /// <param name="id"></param>
        /// <param name="file"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public async Task<JsonResult> saveSignatureFile(long id, string file)
        {
            var nameF = "";
            try
            {
                var idCompany = db.getCompanyId(id);

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
                                Key = $"{idCompany}/signature.png",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", "userAvatar.png");

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
                Users u = new Users { FileSignature = nameF, Id = id, SignatureDate = DateTime.Today };
                var r = db.saveSignatureFile(u);
                if (r == 0) { return Json("{\"status\": 0,\"signature\": \"" + nameF + "\"}"); }
                else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Created a new user
        /// </summary>
        /// <param name="u"></param>
        /// <param name="Password"></param>
        /// <param name="idu"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult addUser(Users u, string permits, string Password, Int64 idu)
        {
            try
            {
                var r = db.addUser(u, permits, Password, idu);
                var t = db.getRoles(idu, 1, 10);
                if (r == 0) { return Json("{\"status\": 0, \"user\": \"Created\", \"users\": " + JsonConvert.SerializeObject(t, Formatting.Indented) + " }"); }
                else { return Json("{\"status\": 1,\"error\": \"Email Duplicate\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }


        /// <summary>
        /// Inactive user
        /// </summary>
        /// <param name="u"></param>
        /// <param name="Password"></param>
        /// <param name="idu"></param>
        /// <returns></returns>
        [HttpDelete("[action]")]
        public JsonResult inactiveUser(long id, long idU)
        {
            try
            {
                var r = db.inactiveUser(id);
                var t = db.getRoles(idU, 1, 100);
                var i = db.getInactiveRoles(idU, 1, 100);
                if (r == 0)
                {
                    return Json("{\"status\": 0, \"users\": " + JsonConvert.SerializeObject(t, Formatting.Indented) + ", \"inactiveUsers\":" + JsonConvert.SerializeObject(i, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpPut("[action]")]
        public JsonResult activeUser(long id, long idU)
        {
            try
            {
                var r = db.activeUser(id);
                var t = db.getRoles(idU, 1, 100);
                var i = db.getInactiveRoles(idU, 1, 100);
                if (r == 0)
                {
                    return Json("{\"status\": 0, \"users\": " + JsonConvert.SerializeObject(t, Formatting.Indented) + ", \"inactiveUsers\":" + JsonConvert.SerializeObject(i, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get list of States and Cities
        /// </summary>
        /// <param name="idS"></param>
        /// <param name="idC"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getSAndC(long idS, long idC)
        {

            try
            {
                var states = db.getStates(idC);
                var cities = db.getCities(idS);
                return Json("{\"status\": 0, \"states\": " + JsonConvert.SerializeObject(states, Formatting.Indented) + ", \"cities\": " + JsonConvert.SerializeObject(cities, Formatting.Indented) + " }");
            }
            catch (Exception) { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
        }

        //[HttpPost("[action]")]
        //public JsonResult saveDoc(CompanyDocs d, long id, string file, string name)
        //{
        //    try
        //    {
        //        var r = db.saveDoc(d, id, name);
        //        var doc = db.getDocuments(id);
        //        var docs = db.getAllDocuments(id, Page, Size);
        //        if (r == 0)
        //        {
        //            string[] imag = file.Split(',');
        //            byte[] image = new byte[imag.Length]; int count = 0;
        //            foreach (string s in imag)
        //            {
        //                image[count] = Convert.ToByte(s);
        //                count++;
        //            }
        //            var webRoot = _env.ContentRootPath;
        //            string oPath = Path.Combine(webRoot, $"ClientApp/{AssetsDirectory}/assets/docs/" + (id + name));
        //            System.IO.File.WriteAllBytes(oPath, image);

        //            return Json("{\"status\": 0, \"docs\": " + JsonConvert.SerializeObject(docs, Formatting.Indented) + ", \"doc\": " + JsonConvert.SerializeObject(doc, Formatting.Indented) + "}");
        //        }
        //        else if (r == 1) { return Json("{\"status\": 1,\"error\": \"Document Duplicate\"}"); }
        //        else { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }

        //    }
        //    catch (Exception ex) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        //}

        /// <summary>
        /// Get Documents inside the AWS S3 buckets.
        /// </summary>
        /// <param name="id">Id of document.</param>
        /// <param name="docType">Document Type.</param>
        /// <param name="fileName">Name of file.</param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public async Task<ActionResult> getDocuments(long id, string docType, string fileName)
        {
            try
            {

                var keyName = AwsSecretAccessKey;

                // Build the request with the bucket name and the keyName (name of the file)
                var request = new GetObjectRequest
                {
                    BucketName = BucketName,
                    Key = $"{id.ToString()}/{docType}/{fileName}"
                };

                using (var client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, RegionEndpoint.USWest2))
                {
                    using (var response = await client.GetObjectAsync(request))
                    {
                        var title = response.Metadata["x-amz-meta-title"];
                        var filename = response.Metadata["x-amz-meta-filename"];
                        var contentType = response.Headers["Content-Type"];

                        Console.WriteLine($"Object meta, Title: {title}");
                        Console.WriteLine($"Content type, Title: {contentType}");

                        var stream = new MemoryStream();
                        response.ResponseStream.CopyTo(stream);
                        stream.Position = 0;
                        return File(stream, contentType, filename);
                    }
                }

            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpGet("[action]")]
        public JsonResult getAllDocuments(long id, int page, int size)
        {
            try
            {
                var docs = db.getAllDocuments(id, page, size);
                //var signature = db.getSignature(id);
                if (docs.Items.Count > 0)
                {
                    return Json("{\"status\": 0, \"docs\": " + JsonConvert.SerializeObject(docs, Formatting.Indented) + " }");
                    //return Json("{\"status\": 0, \"docs\": " + JsonConvert.SerializeObject(docs, Formatting.Indented) + ", \"signature\": " + JsonConvert.SerializeObject(signature, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"docs\": \"[]\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpGet("[action]")]
        public JsonResult getDotDocuments(long idCompany)
        {
            try
            {
                var docs = db.getDotDocuments(idCompany);
                if (docs.Count > 0)
                {
                    return Json("{\"status\": 0, \"docs\": " + JsonConvert.SerializeObject(docs, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"docs\": \"[]\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }


        [HttpGet("[action]")]
        public JsonResult getAllDocumentsDriver(long id, int page, int size)
        {
            try
            {
                var docs = db.getAllDocumentsDrivers(id, page, size);
                if (docs.Items.Count > 0)
                {
                    return Json("{\"status\": 0, \"docsDrivers\": " + JsonConvert.SerializeObject(docs, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"docsDrivers\": \"[]\"}"); }
            }
            catch (Exception ex) { return Json($"{{\"status\": 2,\"error\": \"Error In The Server {ex} \"}}"); }
        }


        [HttpGet("[action]")]
        public JsonResult getAccidentRegisterDocuments(long id, long idAccidentRegister)
        {
            try
            {
                var docs = db.getAccidentRegisterDocuments(id, 1, 100, idAccidentRegister);
                if (docs.Items.Count > 0)
                {
                    return Json("{\"status\": 0, \"accidentDocs\": " + JsonConvert.SerializeObject(docs, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"accidentDocs\": \"[]\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Delete documents inside the AWS S3 Bucket.
        /// </summary>
        /// <param name="id">Id Document.</param>
        /// <param name="userId">User Id.</param>
        /// <param name="docType">DocType.</param>
        /// <param name="fileName">FileName.</param>
        /// <returns></returns>
        [HttpDelete("[action]")]
        public JsonResult deleteDoc(long id, long userId, string docType, string fileName)
        {
            try
            {
                var isValid = this.DeleteS3Document(userId, docType, fileName);

                if (isValid)
                {
                    var r = db.deleteDoc(id);
                    if (r == 0)
                    {
                        var docs = db.getAllDocuments(userId, 1, 100);
                        return Json("{\"status\": 0, \"docs\": " + JsonConvert.SerializeObject(docs, Formatting.Indented) + "}");
                    }
                    else { return Json("{\"status\": 1, \"error\": \"Deleted\" }"); }
                }
                else
                {
                    return Json("{\"status\": 2,\"error\": \"Error In The Server\"}");
                }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }


        /////////////////////////////////////////////////////////////////////////////////////////////
        [HttpDelete("[action]")]
        public JsonResult DeleteDocTrainingCert(long id, long userId, string docType, string fileName)
        {
            try
            {
                var isValid = this.DeleteS3Document(userId, docType, fileName);

                if (isValid)
                {
                    var r = db.deleteDocTrainingC(id);
                    if (r == 0)
                    {
                        using (BAV02Context db = new BAV02Context())
                        {
                            //var list = db.DriverTrainingCertificateDocs.ToList();
                            var list = db.DriversTrainingCertificateDocs.ToList();
                            return Json("{\"status\": 0, \"docs\": " + JsonConvert.SerializeObject(list, Formatting.Indented) + "}");
                        }
                        //var docs = db.getAllDocuments(userId, 1, 100);
                        //return Json("{\"status\": 0, \"docs\": " + JsonConvert.SerializeObject(docs, Formatting.Indented) + "}");
                    }
                    else { return Json("{\"status\": 1, \"error\": \"Deleted\" }"); }
                }
                else
                {
                    return Json("{\"status\": 2,\"error\": \"Error In The Server\"}");
                }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }
        /////////////////////////////////////////////////////////////////////////////////////////////
        ///
        [HttpDelete("[action]")]
        public JsonResult deleteDocDrivers(long id, long userId, string docType, string fileName)
        {
            try
            {
                var isValid = this.DeleteS3Document(userId, docType, fileName);

                if (isValid)
                {
                    var r = db.deleteDocDrivers(id);
                    if (r == 0)
                    {
                        var docs = db.getAllDocumentsDrivers(userId, 1, 100);
                        return Json("{\"status\": 0, \"docs\": " + JsonConvert.SerializeObject(docs, Formatting.Indented) + "}");
                    }
                    else { return Json("{\"status\": 1, \"error\": \"Deleted\" }"); }
                }
                else
                {
                    return Json("{\"status\": 2,\"error\": \"Error In The Server\"}");
                }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpDelete("[action]")]
        public JsonResult deleteDocHazmat(long id, long userId, string docType, string fileName)
        {
            try
            {
                var isValid = this.DeleteS3Document(userId, docType, fileName);

                if (isValid)
                {
                    var r = db.deleteHazmatDoc(id);
                    if (r == 0)
                    {
                        var docs = db.getAllDocuments(userId, 1, 100);
                        return Json("{\"status\": 0, \"docs\": " + JsonConvert.SerializeObject(docs, Formatting.Indented) + "}");
                    }
                    else { return Json("{\"status\": 1, \"error\": \"Deleted\" }"); }
                }
                else
                {
                    return Json("{\"status\": 2,\"error\": \"Error In The Server\"}");
                }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Method to validate if exists documents to delete in AWS S3 Bucket
        /// </summary>
        /// <param name="id">Id of document.</param>
        /// <param name="docType">DocType.</param>
        /// <param name="fileName">FileName.</param>
        /// <returns></returns>
        public bool DeleteS3Document(long idUser, string docType, string fileName)
        {
            bool isValid = true;

            try
            {
                var idCompany = db.getCompanyId(idUser);
                using (var client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, RegionEndpoint.USWest2))
                {
                    var deleteObjectRequest = new DeleteObjectRequest
                    {
                        BucketName = BucketName,
                        Key = $"{idCompany}/{docType}/{fileName}"
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
        /// Save operation classfication of company
        /// </summary>
        /// <param name="operationC">Operation Classification.</param>
        /// <param name="idC">Id Classification.</param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult saveOperationClassification(OperationClassification operationC, long idC)
        {
            try
            {
                var r = db.saveOperationClassification(operationC, idC);

                if (r != null)
                {
                    return Json("{\"status\": 0, \"OperationC\": " + JsonConvert.SerializeObject(r, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error when saving\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }

        }

        /// <summary>
        /// Get operation classification of company
        /// </summary>
        /// <param name="id">trailer id</param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getOperationClassification(long id)
        {
            try
            {
                var oC = db.getOperationClassification(id);
                if (oC != null)
                {
                    return Json("{\"status\": 0, \"OperationC\": " + JsonConvert.SerializeObject(oC, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Null Search Result\"}"); }

            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Save CARGO classfication of company
        /// </summary>
        /// <param name="operationC"></param>
        /// <param name="idC"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult saveCargoClassification(CargoClassification cargoC, long idC)
        {
            try
            {
                var r = db.saveCargoClassification(cargoC, idC);

                if (r != null)
                {
                    return Json("{\"status\": 0, \"cargoC\": " + JsonConvert.SerializeObject(r, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error when saving\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }

        }

        /// <summary>
        /// Get cargo classification of company
        /// </summary>
        /// <param name="id">trailer id</param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getCargoClassification(long id)
        {
            try
            {
                var cC = db.getCargoClassification(id);
                if (cC != null)
                {
                    return Json("{\"status\": 0, \"cargoC\": " + JsonConvert.SerializeObject(cC, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Null Search Result\"}"); }

            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get hazard material of mcs 150 form
        /// </summary>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult SaveHazardMaterials(HazardMaterialOptions hmO, HazardMaterialStates hmS, string hmC, long idu)
        {
            try
            {
                var HM = db.saveHazardMaterial(hmO, hmS, hmC, idu);
                DataHazardMaterial getHM = db.GetHazardMaterials(idu);
                if (HM == 0)
                {
                    return Json("{\"status\": 0, \"hazardMaterial\": " + JsonConvert.SerializeObject(getHM, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get hazard material of mcs 150 form
        /// </summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult GetHazardMaterials(long id)
        {
            try
            {
                DataHazardMaterial HM = db.GetHazardMaterials(id);
                if (HM.HazardMaterialOptions != null)
                {
                    return Json("{\"status\": 0, \"hazardMaterial\": " + JsonConvert.SerializeObject(HM, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get  mcs 150 form data 
        /// </summary>
        /// <param name="idU"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getMCS150FormData(long id)
        {
            try
            {
                Object d = db.getMCS150FormData(id);
                if (d != null)
                {
                    return Json("{\"status\": 0, \"formData\": " + JsonConvert.SerializeObject(d, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Company null\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Upload documents in AWS S3 bucket
        /// </summary>
        /// <param name="id">Id.</param>
        /// <param name="docType">Doctype.</param>
        /// <param name="idAccident">id for accident.</param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public async Task<ActionResult> UploadDocs(long id, string docType, long idAccident)
        {
            var Year = DateTime.Now.Year;
            var r = 0;
            try 
            {
                var idCompany = db.getCompanyId(id);
                var files = Request.Form.Files;

                if (files != null)
                {
                }

                foreach (var file in files)
                {
                    Guid obj = Guid.NewGuid();

                    CompanyDocs companyDoc = new CompanyDocs();
                    if (idAccident > 0) { companyDoc.IdAccidentRegister = idAccident; }
                    companyDoc.DocType = docType.Trim();
                    companyDoc.DocName = obj.ToString() + ".pdf";

                    using (var client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, RegionEndpoint.USWest2))
                    {
                        using (var newMemoryStream = new MemoryStream())
                        {
                            file.CopyTo(newMemoryStream);

                            var uploadRequest = new TransferUtilityUploadRequest
                            {
                                InputStream = newMemoryStream,
                                Key = $"{idCompany}/{docType.Trim()}/{companyDoc.DocName}",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", companyDoc.DocName);

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                        }
                    }

                    r = db.saveDoc(companyDoc, idCompany, file.FileName, _env, Year);
                }

                //CompanyDocs.URL = $"{AwsServer}/{docType}/{files[0].FileName}"; FIX ME: Bad URL Generated



                if (r == 0)
                {
                    var docs = db.getAllDocuments(id, 1, 100);
                    return Json("{\"status\": 0, \"docs\": " + JsonConvert.SerializeObject(docs, Formatting.Indented) + "}");
                }
                else
                {
                    return BadRequest("{\"status\": 2,\"error\": \"Error In The Server\"}");
                }

            }
            catch (Exception) { return BadRequest("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> UploadDocsUCR(long id, string docType, int Date, long idAccident)
        {
            var r = 0;
            try
            {
                var idCompany = db.getCompanyId(id);
                var files = Request.Form.Files;

                if (files != null)
                {
                }

                foreach (var file in files)
                {
                    Guid obj = Guid.NewGuid();

                    CompanyDocs companyDoc = new CompanyDocs();
                    if (idAccident > 0) { companyDoc.IdAccidentRegister = idAccident; }
                    companyDoc.DocType = docType.Trim();
                    companyDoc.DocName = obj.ToString() + ".pdf";

                    using (var client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, RegionEndpoint.USWest2))
                    {
                        using (var newMemoryStream = new MemoryStream())
                        {
                            file.CopyTo(newMemoryStream);

                            var uploadRequest = new TransferUtilityUploadRequest
                            {
                                InputStream = newMemoryStream,
                                Key = $"{idCompany}/{docType.Trim()}/{companyDoc.DocName}",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", companyDoc.DocName);

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                        }
                    }

                    r = db.saveDoc(companyDoc, idCompany, file.FileName, _env, Date);
                }

                //CompanyDocs.URL = $"{AwsServer}/{docType}/{files[0].FileName}"; FIX ME: Bad URL Generated



                if (r == 0)
                {
                    var docs = db.getAllDocuments(id, 1, 100);
                    return Json("{\"status\": 0, \"docsUCR\": " + JsonConvert.SerializeObject(docs, Formatting.Indented) + "}");
                }
                else
                {
                    return BadRequest("{\"status\": 2,\"error\": \"Error In The Server\"}");
                }

            }
            catch (Exception) { return BadRequest("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Upload xlsx documents in AWS S3 bucket
        /// </summary>
        /// <param name="id">Id.</param>
        /// <param name="docType">Doctype.</param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public async Task<ActionResult> UploadDotDocs(string docType, long idCompany)
        {
            var Year = DateTime.Now.Year;

            var r = 0;
            try
            {
                var files = Request.Form.Files;

                if (files != null)
                {
                }
                foreach (var file in files)
                {
                    Guid obj = Guid.NewGuid();

                    CompanyDocs companyDoc = new CompanyDocs();
                    companyDoc.DocType = docType.Trim();
                    companyDoc.DocName = obj.ToString() + ".xlsx";

                    using (var client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, RegionEndpoint.USWest2))
                    {
                        using (var newMemoryStream = new MemoryStream())
                        {
                            file.CopyTo(newMemoryStream);

                            var uploadRequest = new TransferUtilityUploadRequest
                            {
                                InputStream = newMemoryStream,
                                Key = $"{idCompany}/{docType.Trim()}/{companyDoc.DocName}",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", companyDoc.DocName);

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                        }
                    }

                    r = db.saveDoc(companyDoc, idCompany, file.FileName, _env, Year);

                    if(docType == "DotReport")
                    {
                        var x = db.EmailDotReport(_env, idCompany);
                    }
                }

                if (r == 0)
                {
                    return Json("{\"status\": 0  }");
                }
                else
                {
                    return BadRequest("{\"status\": 2,\"error\": \"Error In The Server\"}");
                }

            }
            catch (Exception) { return BadRequest("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> UploadTrainingCertificate(int id, string docType, long idDriver, string date)
        {
            var r = 0;
            try
            {
                var idCompany = db.getCompanyId(id);

                var files = Request.Form.Files;

                foreach (var file in files)
                {
                    Guid obj = Guid.NewGuid();

                    DriversTrainingCertificateDocs driversDocs = new DriversTrainingCertificateDocs();
                    if (idDriver > 0) { driversDocs.IdDriver = idDriver; }
                    driversDocs.DocType = docType.Trim();
                    driversDocs.DocName = obj.ToString() + ".pdf";

                    using (var client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, RegionEndpoint.USWest2))
                    {
                        using (var newMemoryStream = new MemoryStream())
                        {
                            file.CopyTo(newMemoryStream);

                            var uploadRequest = new TransferUtilityUploadRequest
                            {
                                InputStream = newMemoryStream,
                                Key = $"{idCompany}/{docType.Trim()}/{driversDocs.DocName}",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", driversDocs.DocName);

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                        }
                    }
                    r = db.saveDriverTrainingCertificateDocs(driversDocs, idCompany, file.FileName, date);
                }

                if (r == 0)
                {
                    var docs = db.getAllDocumentsDriversTrainig(id, 1, 100);
                    return Json("{\"status\": 0, \"docsTraining\": " + JsonConvert.SerializeObject(docs, Formatting.Indented) + "}");
                }
                else
                {
                    return BadRequest("{\"status\": 2,\"error\": \"Error In The Server\"}");
                }

            }
            catch (Exception ex) { return BadRequest($"{{\"status\": 2,\"error\": \"Error In The Server{ex}\"}}"); }
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> UploadDocsDrivers(int id, string docType, long idDriver)
        {
            var r = 0;
            try
            {
                var idCompany = db.getCompanyId(id);


                var files = Request.Form.Files;

                foreach (var file in files)
                {
                    Guid obj = Guid.NewGuid();

                    DriversDocs driversDocs = new DriversDocs();
                    if (idDriver > 0) { driversDocs.IdDriver = idDriver; }
                    driversDocs.DocType = docType.Trim();
                    driversDocs.DocName = obj.ToString() + ".pdf";

                    using (var client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, RegionEndpoint.USWest2))
                    {
                        using (var newMemoryStream = new MemoryStream())
                        {
                            file.CopyTo(newMemoryStream);

                            var uploadRequest = new TransferUtilityUploadRequest
                            {
                                InputStream = newMemoryStream,
                                Key = $"{idCompany}/{docType.Trim()}/{driversDocs.DocName}",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", driversDocs.DocName);

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                        }
                    }

                    r = db.saveDriversDocs(driversDocs, idCompany, file.FileName);
                }

                if (r == 0)
                {
                    var docs = db.getAllDocumentsDrivers(id, 1, 100);
                    return Json("{\"status\": 0, \"docsDrivers\": " + JsonConvert.SerializeObject(docs, Formatting.Indented) + "}");
                }
                else
                {
                    return BadRequest("{\"status\": 2,\"error\": \"Error In The Server\"}");
                }

            }
            catch (Exception ex) { return BadRequest($"{{\"status\": 2,\"error\": \"Error In The Server{ex}\"}}"); }
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> TrainingUploadDocs(long IdCompany, string DocumentType, long DriverId, string DocumentNameOriginal, DateTime DocumentExpireDate)
        {
            var r = 0;
            try
            {
                var files = Request.Form.Files;

                foreach (var file in files)
                {
                    Guid obj = Guid.NewGuid();
                    var webRoot = _env.ContentRootPath;

                    string DocumentURL = $"https://bluagent-files.s3-us-west-2.amazonaws.com/{IdCompany}/HazmatDriverList/CDLHM/{DriverId}/";

                    DriverTrainingCertificateDocs docs = new DriverTrainingCertificateDocs();
                    docs.DocumentURL = DocumentURL;
                    docs.IdCompany = IdCompany;
                    docs.DocumentType = DocumentType;
                    docs.DriverId = DriverId;
                    docs.DocumentNameGUID = obj.ToString() + ".pdf";
                    docs.DocumentNameOriginal = file.FileName;
                    docs.DocumentExpireDate = DocumentExpireDate;

                    using (var client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, RegionEndpoint.USWest2))
                    {
                        using (var newMemoryStream = new MemoryStream())
                        {
                            file.CopyTo(newMemoryStream);
                            var uploadRequest = new TransferUtilityUploadRequest { };
                            if (DriverId < 0)
                            {
                                uploadRequest = new TransferUtilityUploadRequest
                                {
                                    InputStream = newMemoryStream,
                                    Key = $"{IdCompany}/{DocumentType.Trim()}/{docs.DocumentNameGUID}",
                                    BucketName = BucketName,
                                    CannedACL = S3CannedACL.PublicRead,
                                };
                            }
                            else
                            {
                                uploadRequest = new TransferUtilityUploadRequest
                                {
                                    InputStream = newMemoryStream,
                                    Key = $"{IdCompany}/{DocumentType.Trim()}/{DriverId}/{docs.DocumentNameGUID}",
                                    BucketName = BucketName,
                                    CannedACL = S3CannedACL.PublicRead,
                                };
                            }
                            uploadRequest.Metadata.Add("x-amz-meta-filename", docs.DocumentNameGUID);

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                        }
                    }

                    r = db.saveTrainingCertificate(docs);

                }

                if (r == 0)
                {
                    var docs = db.getAllTrainingDocuments(IdCompany, DocumentType, DriverId, 1, 100);
                    return Json("{\"status\": 0, \"docs\": " + JsonConvert.SerializeObject(docs, Formatting.Indented) + "}");
                }
                else
                {
                    return BadRequest("{\"status\": 2,\"error\": \"Error In The Server\"}");
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"{{\"status\": 2,\"error: {ex}\": \"Error In The Server: {ex}\"}}");
            }
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> HazmatUploadDocs(long IdCompany, string DocumentType, long DriverId, string DocumentNameOriginal, DateTime DocumentExpireDate)
        {
            var r = 0;
            try
            {
                var files = Request.Form.Files;

                foreach (var file in files)
                {
                    Guid obj = Guid.NewGuid();
                    var webRoot = _env.ContentRootPath;
                    //string DocumentURL = Path.Combine(webRoot, $"ClientApp/{AssetsDirectory}/assets/docs/");

                    string DocumentURL = $"https://bluagent-files.s3-us-west-2.amazonaws.com/{IdCompany}/HazmatDriverList/TrainingCertificate/{DriverId}/";

                    Documents documents = new Documents();
                    documents.DocumentURL = DocumentURL;
                    documents.IdCompany = IdCompany;
                    documents.DocumentType = DocumentType;
                    documents.DriverId = DriverId;
                    documents.DocumentNameGUID = obj.ToString() + ".pdf";
                    documents.DocumentNameOriginal = file.FileName;
                    documents.DocumentExpireDate = DocumentExpireDate;

                    using (var client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, RegionEndpoint.USWest2))
                    {
                        using (var newMemoryStream = new MemoryStream())
                        {
                            file.CopyTo(newMemoryStream);
                            var uploadRequest = new TransferUtilityUploadRequest { };
                            if (DriverId < 0)
                            {
                                uploadRequest = new TransferUtilityUploadRequest
                                {
                                    InputStream = newMemoryStream,
                                    Key = $"{IdCompany}/{DocumentType.Trim()}/{documents.DocumentNameGUID}",
                                    BucketName = BucketName,
                                    CannedACL = S3CannedACL.PublicRead,
                                };
                            }
                            else
                            {
                                uploadRequest = new TransferUtilityUploadRequest
                                {
                                    InputStream = newMemoryStream,
                                    Key = $"{IdCompany}/{DocumentType.Trim()}/{DriverId}/{documents.DocumentNameGUID}",
                                    BucketName = BucketName,
                                    CannedACL = S3CannedACL.PublicRead,
                                };
                            }

                            uploadRequest.Metadata.Add("x-amz-meta-filename", documents.DocumentNameGUID);

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                        }
                    }

                    r = db.saveHazmatDoc(documents);

                }

                if (r == 0)
                {
                    var docs = db.getAllHazmatDocuments(IdCompany, DocumentType, DriverId, 1, 100);
                    return Json("{\"status\": 0, \"docs\": " + JsonConvert.SerializeObject(docs, Formatting.Indented) + "}");
                }
                else
                {
                    return BadRequest("{\"status\": 2,\"error\": \"Error In The Server\"}");
                }

            }
            catch (Exception ex)
            {
                return BadRequest($"{{\"status\": 2,\"error: {ex}\": \"Error In The Server: {ex}\"}}");
            }
        }

        [HttpGet("[action]")]
        public JsonResult getAllHDocs(long IdCompany)
        {
            using (BAV02Context db = new BAV02Context())
            {
                var list = db.Documents.ToList();
                return Json("{\"status\": 0, \"docs\": " + JsonConvert.SerializeObject(list, Formatting.Indented) + "}");
            }
        }

        [HttpGet("[action]")]
        public JsonResult getAllTDocs(long IdCompany)
        {
            using (BAV02Context db = new BAV02Context())
            {
                //var list = db.DriverTrainingCertificateDocs.ToList();
                var list = db.DriversTrainingCertificateDocs.ToList();
                return Json("{\"status\": 0, \"docs\": " + JsonConvert.SerializeObject(list, Formatting.Indented) + "}");
            }
        }

        [HttpGet("[action]")]
        public ActionResult downloadDocumen(long id)
        {
            var webRoot = _env.ContentRootPath;
            string remoteUri = Path.Combine(webRoot, $"ClientApp/{AssetsDirectory}/assets/docs/");
            var document = db.getDocument(id);
            try
            {
                string fileName = document.DocName, myStringWebResource = null;
                //Create a new WebClient instance.
                WebClient myWebClient = new WebClient();
                //Concatenate the domain with the Web resource filename.
                myStringWebResource = remoteUri + fileName;
                //Download the Web resource and save it into the current filesystem folder.
                //myWebClient.DownloadFileAsync(new Uri(myStringWebResource), @"c:\" + fileName);

                return downloadFile(remoteUri, fileName);


            }
            catch (Exception) { return NotFound(); }
        }

        public FileResult downloadFile(string filePath, string fileName)
        {
            IFileProvider provider = new PhysicalFileProvider(filePath);
            IFileInfo fileInfo = provider.GetFileInfo(fileName);
            var readStream = fileInfo.CreateReadStream();
            // var mimeType = "application/pdf";
            return File(readStream, "application/octet-stream", fileName);
        }

        //[Route("api/[controller]")]
        //public class DownloadController : Controller
        //{
        //    //GET api/download/12345abc
        //    [HttpGet("{id}"]
        //    public async Task<IActionResult> Download(string id)
        //    {
        //        Stream stream = await { { __get_stream_based_on_id_here__} }

        //        if (stream == null)
        //            return NotFound(); // returns a NotFoundResult with Status404NotFound response.

        //        return File(stream, "application/octet-stream"); // returns a FileStreamResult
        //    }
        //}

        /// <summary>
        /// Download a AWS S3 File inside the AMAZON.
        /// </summary>
        /// <param name="id">Id of document.</param>
        /// <param name="docType">DocType.</param>
        /// <param name="fileName">FileName.</param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public async Task<IActionResult> downloadDocument(long id, string docType, string fileName)
        {
            try
            {
                var companyId = db.getCompanyId(id);
                var fileNameKey = $"{companyId}/{docType.Trim()}/{fileName.Trim()}";

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
                            return File(stream, "application/pdf", fileName);

                        }
                    }
                }
            }
            catch (Exception)
            {

                { return BadRequest("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
            }

        }

        private string GetContentType(string path)
        {
            var types = GetMimeTypes();
            var ext = Path.GetExtension(path).ToLowerInvariant();
            return types[ext];
        }

        private Dictionary<string, string> GetMimeTypes()
        {
            return new Dictionary<string, string>
            {
                {".txt", "text/plain"},
                {".pdf", "application/pdf"},
                {".doc", "application/vnd.ms-word"},
                {".docx", "application/vnd.ms-word"},
                {".xls", "application/vnd.ms-excel"},
                {".xlsx", "application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet"},
                {".png", "image/png"},
                {".jpg", "image/jpeg"},
                {".jpeg", "image/jpeg"},
                {".gif", "image/gif"},
                {".csv", "text/csv"},
                {".zip","application/zip" }
            };
        }


        /// <summary>
        /// Add new accident register
        /// </summary>
        /// <param name="ar"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult AddAccident(AccidentRegister ar, long idU)
        {
            try
            {
                var r = db.AddAccident(ar, idU);
                var t = db.getAccidentRegistry(idU, 1, 10);
                if (r == 0)
                {
                    return Json("{\"status\": 0, \"accidentRegister\": " + JsonConvert.SerializeObject(t, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Accident already registered\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get the list of accident register
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getAccidentRegistry(Int64 idu, int page, int size)
        {
            try
            {

                var t = db.getAccidentRegistry(idu, page, size);
                if (t.Items.Count != 0)
                {
                    return Json("{\"status\": 0, \"accidentRegister\": " + JsonConvert.SerializeObject(t, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpGet("[action]")]
        public JsonResult getHazmatsDocuments(long idCompany, string documentType, int driverId, int page, int size)
        {
            try
            {
                var t = db.getAllHazmatDocuments(idCompany, documentType, driverId, 1, 100);
                if (t.Items.Count != 0)
                {
                    return Json("{\"status\": 0, \"docsHazmat\": " + JsonConvert.SerializeObject(t, Formatting.Indented) + " }");
                }
                else
                {
                    var message = "";
                    throw new Exception($"Error: {message}");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error: {ex}");
            }
        }


        public JsonResult TrainingCertificate(long idCompany, string documentType, int driverId, int page, int size)
        {
            try
            {
                var t = db.getAllTrainingDocuments(idCompany, documentType, driverId, 1, 100);
                if (t.Items.Count != 0)
                {
                    return Json("{\"status\": 0, \"DriverTrainingCertificate\": " + JsonConvert.SerializeObject(t, Formatting.Indented) + " }");
                }
                else
                {
                    var message = "";
                    throw new Exception($"Error: {message}");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error: {ex}");
            }
        }

        /// <summary>
        /// get accident data for id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getAccidentData(long id)
        {
            try
            {
                var r = db.getAccidentData(id);
                if (r != null)
                {
                    return Json("{\"status\": 0, \"accidentData\": " + JsonConvert.SerializeObject(r, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> accidentReportZip(long id, long idUser)
        {
            try
            {
                var listOfFilesNames = db.accidentReportZip(id);


                using (ZipFile zip = new ZipFile())
                {
                    if (listOfFilesNames.Count > 0)
                    {
                        foreach (var fileName in listOfFilesNames)
                        {
                            var file = await getFilesRequestAWS(idUser, "Accident Register", fileName);
                            zip.AddEntry(fileName, file);

                        }
                    }
                    zip.AddFile("AccidentDetails.txt", "");
                    zip.Save("ClientApp/" + AssetsDirectory + "/assets/AccidentDetails.zip");

                }

                var webRoot = _env.ContentRootPath;
                string remoteUri = Path.Combine(webRoot, $"ClientApp/{AssetsDirectory}/assets/");

                var path = Path.Combine(remoteUri, "AccidentDetails.zip");

                var memory = new MemoryStream();
                using (var stream = new FileStream(path, FileMode.Open))
                {
                    await stream.CopyToAsync(memory);
                }
                memory.Position = 0;
                var x = File(memory, GetContentType(path), Path.GetFileName(path));
                return x;
            }
            catch (Exception) { return null; }

        }

        /// <summary>
        /// Get the list of accident register  date range
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="from"></param>
        /// <param name="to"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult getAccidentsRegistryPDF(long id, DateTime from, DateTime to)
        {
            try
            {
                var t = db.getAccidentsRegistryPDF(id, from, to);
                if (t.Count > 0)
                {
                    return Json("{\"status\": 0, \"registryPDF\": " + JsonConvert.SerializeObject(t, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpPost("[action]")]
        public JsonResult AttachPayment(string customerId, string stripeToken)
        {
            var options = new PaymentMethodCreateOptions
            {
                Type = "card",
                Card = new PaymentMethodCardCreateOptions
                {
                    Token = stripeToken,
                },
            };

            var paymentMethodService = new PaymentMethodService();
            var paymentMethod = paymentMethodService.Create(options);

            var attachPaymentOptions = new PaymentMethodAttachOptions
            {

                Customer = customerId,
            };

            paymentMethodService.Attach(paymentMethod.Id, attachPaymentOptions);

            return Json(paymentMethod.ToJson());


        }

        public async Task<Stream> getFilesRequestAWS(long id, string docType, string fileName)
        {

            var companyId = db.getCompanyId(id);
            var fileNameKey = $"{companyId}/{docType.Trim()}/{fileName.Trim()}";

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
                        return stream;

                    }
                }
            }
        }

        [HttpGet("[action]")]
        public JsonResult GetCompanyInsuranceInformation(long IdCompany)
        {
            try
            {
                var insurance = db.GetCompanyInsuranceInformation(IdCompany);

                if (insurance != null)
                {
                    return Json("{\"status\": 0, \"insuranceInfo\": " + JsonConvert.SerializeObject(insurance, Formatting.Indented) + " }");
                }
                else
                {
                    return Json("{\"status\": 0, \"insuranceInfo\": null }");
                }
            }
            catch (Exception ex)
            {
                return Json("{\"status\": 1, \"error\": \"" + ex.Message + " \"}");
            }
        }

        [HttpPost("[action]")]
        public JsonResult SaveCompanyInsuranceInformation(CompanyInsurance insuranceInfo, Boolean checkDomesticEnterpriseA)
        {
            try
            {
                var result = db.SaveCompanyInsuranceInformation(insuranceInfo, checkDomesticEnterpriseA);

                if (result > 0)
                {
                    var insurance = db.GetCompanyInsuranceInformation(insuranceInfo.IdCompany);

                    if (insurance != null)
                    {
                        return Json("{\"status\": 0, \"insuranceInfo\": " + JsonConvert.SerializeObject(insurance, Formatting.Indented) + " }");
                    }
                    else
                    {
                        return Json("{\"status\": 0, \"insuranceInfo\": null }");
                    }
                }
                else
                {
                    return Json("{\"status\": 0, \"insuranceInfo\": \"An error ocurred when saving insurance information\" }");
                }
            }
            catch (Exception ex)
            {
                return Json("{\"status\": 1, \"error\": \"" + ex.Message + " \"}");
            }
        }

        [HttpGet("[action]")]
        public JsonResult getCompanyNotifications(long IdCompany)
        {
            try
            {

                var CompanyNotifications = db.getCompanyNotifications(IdCompany);
                if (CompanyNotifications != null)
                {
                    return Json("{\"status\": 0, \"CompanyNotifications\": " + JsonConvert.SerializeObject(CompanyNotifications, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception ex)
            {
                return Json("{\"status\": 2, \"error\": \"" + ex.Message + " \"}");
            }
        }

        [HttpPost("[action]")]
        public JsonResult updateCompanyNotifications(long IdCompany, string pestana, bool notification)
        {
            try
            {
                var newCompanyNotifications = db.updateCompanyNotifications(IdCompany, pestana, notification);
                if (newCompanyNotifications > 0)
                {
                    var CompanyNotifications = db.getCompanyNotifications(IdCompany);
                    //return Json("{\"status\": 0 }");
                    return Json("{\"status\": 0, \"CompanyNotifications\": " + JsonConvert.SerializeObject(CompanyNotifications, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error when saving\"}"); }
            }
            catch (Exception)
            {
                return Json("{\"status\": 2,\"error\": \"Error In The Server\"}");
            }

        }

        [HttpGet("[action]")]
        public JsonResult getAllGeneralAlerts(long IdCompany)
        {
            try
            {
                var driversAlerts = db.getGDriversAlerts(IdCompany);
                var companyAlerts = db.getGCompanyAlerts(IdCompany);
                var maintenanceAlerts = db.getGMaintenanceAlerts(IdCompany);
                var countGAlerts = db.countGAlerts(driversAlerts, companyAlerts, maintenanceAlerts);
                return Json("{\"status\": 0, \"countGAlerts\": " + JsonConvert.SerializeObject(countGAlerts, Formatting.Indented) + " }");
            }
            catch (Exception)
            {
                return Json("{\"status\": 2,\"error\": \"Error In The Server\"}");
            }
        }

        [HttpPost("[action]")]
        public JsonResult UpdateFMCSAuser(string passfmcsa, string userfmcsa, long id)
        {
            try
            {
                //var updateFMCSA = 
                    db.updateFMCSA(passfmcsa, userfmcsa, id);
                return Json("{\"status\": 0}");
            }
            catch (Exception ex)
            {
                return Json("{\"status\": 1, \"error\": \"" + ex.Message + " \"}");
            }
        }
        [HttpGet("[action]")]
        public JsonResult getFMCSA(long id)
        {
            try
            {
                var FMCSAinfo = db.getFMCSA(id);
               return Json("{\"status\": 0, \"fmcsaInfo\": " + JsonConvert.SerializeObject(FMCSAinfo, Formatting.Indented) + " }");
            }
            catch (Exception ex)
            {
                return Json("{\"status\": 1, \"error\": \"" + ex.Message + " \"}");
            }
        }
    }
}
