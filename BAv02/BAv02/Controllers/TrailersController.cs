using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BAv02.Models.DataAccessLayers;
using Newtonsoft.Json;
using BAv02.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Amazon.S3;
using Amazon;
using Amazon.S3.Transfer;
using Microsoft.Extensions.Configuration;
using Amazon.S3.Model;

namespace BAv02.Controllers
{
    [Route("api/[controller]")]
    public class TrailersController : Controller
    {
        TrailersDAL db = new TrailersDAL();

        private IHostingEnvironment _env;
        private IConfiguration Configuration { get; set; }

        public string AwsAccessKeyId { get; set; }
        public string AwsSecretAccessKey { get; set; }

        public string AwsServer { get; set; }

        public string BucketName { get; set; }

        private const int Page = 1;
        private const int Size = 7;
        public TrailersController(IHostingEnvironment env)
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
        }

        /// <summary>
        /// Get trailer data 
        /// </summary>
        /// <param name="id">trailer id</param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getTrailer(long id, long idu)
        {
            try
            {
                var trailer = db.getTrailer(id, idu);
                if (trailer != null) { return Json("{\"status\": 0, \"trailer\": " + JsonConvert.SerializeObject(trailer, Formatting.Indented) + " }"); }
                else { return Json("{\"status\": 1,\"error\": \"Null Search Result\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Save the change in the trailer data 
        /// </summary>
        /// <param name="t"></param>
        /// <param name="file"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public async Task<JsonResult> saveTrailer(Trailer t, string fileProfile, Int64 id)
        {
            string nameImg = "";
            var z = 0;
            try
            {
                var files = Request.Form.Files;
                foreach (var file in files)
                {
                    Guid obj = Guid.NewGuid();

                    MaintenanceDocs maintenanceDoc = new MaintenanceDocs();
                    maintenanceDoc.DocType = "TrailerPhotos";
                    maintenanceDoc.DocName = obj.ToString();

                    using (var client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, RegionEndpoint.USWest2))
                    {
                        using (var newMemoryStream = new MemoryStream())
                        {
                            file.CopyTo(newMemoryStream);

                            var uploadRequest = new TransferUtilityUploadRequest
                            {
                                InputStream = newMemoryStream,
                                Key = $"{t.IdCompany}/TrailersFile/{id}/{maintenanceDoc.DocType}/{maintenanceDoc.DocName}",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", maintenanceDoc.DocName);

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                        }
                    }

                    z = db.saveDoc(maintenanceDoc, id, file.FileName);
                }
                if (fileProfile != null)
                {
                    string[] imag = fileProfile.Split(',');
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
                                Key = $"{t.IdCompany}/TrailersFile/{id}/trailerAvatar.png",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", "trailerAvatar.png");

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                            nameImg = "trailerAvatar.png";
                        }
                    }
                }
                else { nameImg = ""; }
            }
            catch (Exception) { nameImg = ""; }
            try
            {
                var r = db.saveTrailer(t, id, nameImg);
                var trailerPhotos = db.getDocuments(id, "TrailerPhotos");
                var alerts = db.getAllAlerts((long)t.IdCompany, id, "TRAILER");
                var count = db.alertsCounter((long)t.IdCompany, id, "TRAILER");
                if (r != null)
                {
                    return Json("{\"status\": 0, \"trailer\": " + JsonConvert.SerializeObject(r, Formatting.Indented) + ", \"alertsCount\": " + JsonConvert.SerializeObject(count, Formatting.Indented) + ", \"alerts\": " + JsonConvert.SerializeObject(alerts, Formatting.Indented) + ", \"trailerPhotos\": " + JsonConvert.SerializeObject(trailerPhotos, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error when saving\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }



        /// <summary>
        /// Save Insurance data
        /// </summary>
        /// <param name="t"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult saveInsurance(Trailer t, long id, long iduser)
        {
            try
            {
                var r = db.saveInsurance(id, t);
                var alerts = db.getAllAlerts(db.getCompanyId(iduser),id, "TRAILER");
                var count = db.alertsCounter(db.getCompanyId(iduser),id, "TRAILER");
                if (r != null)
                {
                    return Json("{\"status\": 0, \"trailer\": " + JsonConvert.SerializeObject(r, Formatting.Indented) + ", \"alertsCount\": " + JsonConvert.SerializeObject(count, Formatting.Indented) + ", \"alerts\": " + JsonConvert.SerializeObject(alerts, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error when saving\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }


        /// <summary>
        /// Get 4 alerts  of trailer
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getAlerts(long id, long idUser, string type)
        {
            try
            {
                var alerts = db.getAllAlerts(db.getCompanyId(idUser), id, type);
                var count = db.alertsCounter(db.getCompanyId(idUser), id, type);
                if (alerts.Count > 0)
                {
                    return Json("{\"status\": 0, \"alertsCount\": " + JsonConvert.SerializeObject(count, Formatting.Indented) + ", \"alerts\": " + JsonConvert.SerializeObject(alerts, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"alert\": \"[]\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        ///  Get Trailer Inspections
        /// </summary>
        /// <param name="id"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getTrailerInspection(long id, int page, int size, DateTime F, DateTime T)
        {
            try
            {
                var insp = db.getTrailerInspections(id, page, size, F, T);
                if (insp.Items.Count > 0)
                {
                    return Json("{\"status\": 0, \"inspections\": " + JsonConvert.SerializeObject(insp, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1, \"error\": \"Empty List\" }"); }
            }
            catch (Exception EX) { return Json("{\"status\": 2,\"error\": \"Error In The Server\": " + JsonConvert.SerializeObject(EX, Formatting.Indented) + "}"); }
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> downloadDocument(long idTrailer, long id, string docType, string fileName)
        {

            try
            {
                string extension = Path.GetExtension(fileName).ToLowerInvariant();

                var companyId = db.getCompanyId(id);
                var fileNameKey = $"{companyId}/TrailersFile/{idTrailer}/{docType.Trim()}/{fileName}";

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
                            if (docType != null)
                            {
                                switch (extension)
                                {
                                    case ".jpg":
                                        return File(stream, "image/jpg", fileName);
                                    case ".jpeg":
                                        return File(stream, "image/jpeg", fileName);
                                    case ".png":
                                        return File(stream, "image/png", fileName);
                                    case ".pdf":
                                        return File(stream, "application/pdf", fileName);
                                    default:
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
        /// Upload Documents in AWS S3 bucket
        /// </summary>
        /// <param name="id">Id.</param>
        /// <param name="docType">Doctype.</param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public async Task<ActionResult> UploadDocs(long idUser, long id, string docType, string uniqueID)
        {
            var r = 0;
            try
            {
                var idCompany = db.getCompanyId(idUser);


                var files = Request.Form.Files;

                foreach (var file in files)
                {
                    Guid obj = Guid.NewGuid();

                    string extension = Path.GetExtension(file.FileName).ToLowerInvariant();

                    MaintenanceDocs maintenanceDoc = new MaintenanceDocs();
                    maintenanceDoc.DocType = docType.Trim();
                    maintenanceDoc.DocName = obj.ToString() + extension;
                    maintenanceDoc.TypeId = "TRAILER";
                    if (uniqueID != null)
                    {
                        maintenanceDoc.RoadsideInspectionID = uniqueID;
                    }

                    using (var client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, RegionEndpoint.USWest2))
                    {
                        using (var newMemoryStream = new MemoryStream())
                        {
                            file.CopyTo(newMemoryStream);

                            var uploadRequest = new TransferUtilityUploadRequest
                            {
                                InputStream = newMemoryStream,
                                Key = $"{idCompany}/TrailersFile/{id}/{docType.Trim()}/{maintenanceDoc.DocName}",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", maintenanceDoc.DocName);

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                        }
                    }

                    r = db.saveDoc(maintenanceDoc, id, file.FileName);
                }

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

        [HttpGet("[action]")]
        public JsonResult getTrailerPhotos(long id, string docType)
        {
            try
            {
                var trailerPhotos = db.getDocuments(id, docType);
                return Json("{\"status\": 0, \"trailerPhotos\": " + JsonConvert.SerializeObject(trailerPhotos, Formatting.Indented) + " }");
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
        public bool DeleteS3Document(long idUser, long idTrailer, string docType, string fileName)
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
                        Key = $"{idCompany}/TrailersFile/{idTrailer}/{docType.Trim()}/{fileName}",
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

        [HttpDelete("[action]")]
        public JsonResult deleteDoc(long id, long userId, string docType, string fileName, long idTrailer)
        {
            try
            {
                var isValid = this.DeleteS3Document(userId, idTrailer, docType, fileName);

                if (isValid)
                {
                    var r = db.deleteDoc(id);
                    if (r == 0)
                    {
                        var docs = db.getAllDocuments(idTrailer, 1, 100);
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
        /// Get Documents in AWS S3 bucket
        /// </summary>
        /// <param name="id">Id of document</param>
        /// <param name="docType">Doctype of document.</param>
        /// <param name="fileName">FileName.</param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public async Task<ActionResult> getDocuments(long id, string docType, string fileName) //FixMe: this method is unecessary
        {
            try
            {

                var keyName = AwsSecretAccessKey;

                // Build the request with the bucket name and the keyName (name of the file)
                var request = new GetObjectRequest
                {
                    BucketName = "bluagent-files",
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
                if (docs.Items.Count > 0)
                {
                    return Json("{\"status\": 0, \"docs\": " + JsonConvert.SerializeObject(docs, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"docs\": \"[]\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Trailer>> getSearchVIN(string vin, long idCompany)
        {
            try
            {
                return this.Ok(db.getSearchVIN(vin, idCompany));
            }
            catch (Exception)
            {

                return this.BadRequest("Invalid Data");
            }
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> saveTrailerLogo(long idCompany, string file, Int64 idTrailer)
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
                                Key = $"{idCompany}/TrailersFile/{idTrailer}/trailerAvatar.png",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", "companyLogo.png");

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                            nameImg = "trailerAvatar.png";
                        }
                    }
                }
                else { nameImg = ""; }
            }
            catch (Exception) { nameImg = ""; }
            try
            {
                Trailer truck = new Trailer
                {
                    FileImage = nameImg,
                    IdTrailer = idTrailer
                };

                var r = db.saveTrailerLogo(truck);
                if (r == 0)
                {
                    return Json("{\"status\": 0 }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error when saving\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }

        }

    }
}
