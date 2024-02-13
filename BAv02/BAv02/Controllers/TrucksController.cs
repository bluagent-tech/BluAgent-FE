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
    public class TrucksController : Controller
    {

        TrucksDAL db = new TrucksDAL();
        TrailersDAL dbT = new TrailersDAL();

        private IHostingEnvironment _env;
        private IConfiguration Configuration { get; set; }

        public string AwsAccessKeyId { get; set; }
        public string AwsSecretAccessKey { get; set; }

        public string AwsServer { get; set; }

        public string BucketName { get; set; }

        public string AssetsDirectory { get; set; }

        private const int Page = 1;
        private const int Size = 7;
        public TrucksController(IHostingEnvironment env)
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
        /// Get truck by id
        /// </summary>
        /// <param name="id">Id truck.</param>
        /// <param name="idu">Id user.</param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getTruck(long id, long idu)
        {
            try
            {
                var t = db.getTruck(id, idu);
                if (t != null) { return Json("{\"status\": 0, \"truck\": " + JsonConvert.SerializeObject(t, Formatting.Indented) + " }"); }
                else { return Json("{\"status\": 1,\"error\": \"Truck not found\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpGet("[action]")]
        public JsonResult getVehiclePhotos(long id, string docType)
        {
            try
            {
                var vehiclePhotos = db.getDocuments(id, docType);
                return Json("{\"status\": 0, \"vehiclePhotos\": " + JsonConvert.SerializeObject(vehiclePhotos, Formatting.Indented) + " }"); 
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Save the change in the Truck data 
        /// </summary>
        /// <param name="file"></param>
        /// <param name="id"></param>
        /// <param name="v"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public async Task<JsonResult> saveDataTruck(Vehicle v, string fileProfile, Int64 id)
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
                    maintenanceDoc.DocType = "VehiclePhotos";
                    maintenanceDoc.DocName = obj.ToString();

                    using (var client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, RegionEndpoint.USWest2))
                    {
                        using (var newMemoryStream = new MemoryStream())
                        {
                            file.CopyTo(newMemoryStream);

                            var uploadRequest = new TransferUtilityUploadRequest
                            {
                                InputStream = newMemoryStream,
                                Key = $"{v.IdCompany}/TrucksFile/{id}/{maintenanceDoc.DocType}/{maintenanceDoc.DocName}",
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
                                Key = $"{v.IdCompany}/TrucksFile/{id}/truckAvatar.png",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", "truckAvatar.png");

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                            nameImg = "truckAvatar.png";
                        }
                    }
                }
                else { nameImg = ""; }
            }
            catch (Exception) { nameImg = ""; }
            try
            {
                var r = db.saveDataTruck(id, v, nameImg); //TODO: Rename variable
                var vehiclePhotos = db.getDocuments(id, "VehiclePhotos");
                var alerts = dbT.getAllAlerts((long)v.IdCompany, v.Id, "VEHICLE");
                var count = dbT.alertsCounter((long)v.IdCompany, v.Id, "VEHICLE");
                if (r != null)
                {
                    return Json("{\"status\": 0, \"truck\": " + JsonConvert.SerializeObject(r, Formatting.Indented) + ", \"alertsCount\": " + JsonConvert.SerializeObject(count, Formatting.Indented) + ", \"alerts\": " + JsonConvert.SerializeObject(alerts, Formatting.Indented) + ", \"vehiclePhotos\": " + JsonConvert.SerializeObject(vehiclePhotos, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error when saving\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Save Insurance data
        /// </summary>
        /// <param name="v"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult saveDataInsurance(Vehicle v, long id, long iduser)
        {
            try
            {
                var r = db.saveDataInsurance(id, v); //TODO: Rename name of variable.
                var alerts = dbT.getAllAlerts(db.getCompanyId(iduser), v.Id, "VEHICLE");
                var count = dbT.alertsCounter(db.getCompanyId(iduser), v.Id, "VEHICLE");
                if (r != null)
                {
                    return Json("{\"status\": 0, \"truck\": " + JsonConvert.SerializeObject(r, Formatting.Indented) + ", \"alertsCount\": " + JsonConvert.SerializeObject(count, Formatting.Indented) + ", \"alerts\": " + JsonConvert.SerializeObject(alerts, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error when saving\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Save notifications data
        /// </summary>
        /// <param name="v"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult saveDataNotifications(Vehicle v)
        {
            try
            {
                var r = db.saveDataNotifications(v); //TODO: Rename variable.
                if (r != null)
                {
                    return Json("{\"status\": 0, \"truck\": " + JsonConvert.SerializeObject(r, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error when saving\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        ///  Get Truck Inspections
        /// </summary>
        /// <param name="id"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getTruckInspection(long id, int page, int size, DateTime F, DateTime T)
        {
            try
            {
                var insp = db.getTruckInspections(id, page, size, F, T);
                if (insp.Items.Count > 0)
                {
                    return Json("{\"status\": 0, \"inspections\": " + JsonConvert.SerializeObject(insp, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1, \"error\": \"Empty List\" }"); }
            }
            catch (Exception EX) { return Json("{\"status\": 2,\"error\": \"Error In The Server\": " + JsonConvert.SerializeObject(EX, Formatting.Indented) + "}"); }
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> downloadDocument(long idTruck, long id, string docType, string fileName)
        {

            try
            {
                string extension = Path.GetExtension(fileName).ToLowerInvariant();

                var companyId = db.getCompanyId(id);
                var fileNameKey = $"{companyId}/TrucksFile/{idTruck}/{docType.Trim()}/{fileName}";

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
        /// Upload documents in AWS S3 buckets
        /// </summary>
        /// <param name="id">Id.</param>
        /// <param name="docType">Doctype.</param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public async Task<ActionResult> UploadDocs(long idUser, long id, string docType, string uniqueID = null)
        {
            int r = 0;

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
                    maintenanceDoc.TypeId = "VEHICLE";
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
                                Key = $"{idCompany}/TrucksFile/{id}/{docType.Trim()}/{maintenanceDoc.DocName}",
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
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest("{\"status\": 2,\"error\": \"Error In The Server\"}");
            }
        }

        /// <summary>
        /// Method to validate if exists documents to delete in AWS S3 Bucket
        /// </summary>
        /// <param name="id">Id of document.</param>
        /// <param name="docType">DocType.</param>
        /// <param name="fileName">FileName.</param>
        /// <returns></returns>
        public bool DeleteS3Document(long idUser, long idTruck, string docType, string fileName)
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
                        Key = $"{idCompany}/TrucksFile/{idTruck}/{docType.Trim()}/{fileName}",
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
        /// Delete documents inside the AWS S3 Buckets
        /// </summary>
        /// <param name="id"></param>
        /// <param name="userId"></param>
        /// <param name="docType"></param>
        /// <param name="fileName"></param>
        /// <returns></returns>
        [HttpDelete("[action]")]
        public JsonResult deleteDoc(long id, long userId, string docType, string fileName, long idTruck)
        {
            try
            {
                var isValid = this.DeleteS3Document(userId, idTruck, docType, fileName);

                if (isValid)
                {
                    var r = db.deleteDoc(id);
                    if (r == 0)
                    {
                        var docs = db.getAllDocuments(idTruck, 1, 100);
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
        /// Get Documents AWS S3 buckets
        /// </summary>
        /// <param name="id">Id.</param>
        /// <param name="docType">DocType for document.</param>
        /// <param name="fileName">Filename for document.</param>
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

        /// <summary>
        /// Retrieve all documents.
        /// </summary>
        /// <param name="id">Id.</param>
        /// <param name="page"><Page./param>
        /// <param name="size">Size.</param>
        /// <returns></returns>
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
        public ActionResult<IEnumerable<Vehicle>> getSearchVIN(string vin, long idCompany)
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
        public async Task<JsonResult> saveTruckLogo(long idCompany, string file, Int64 idTruck)
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
                                Key = $"{idCompany}/TrucksFile/{idTruck}/truckAvatar.png",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", "companyLogo.png");

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                            nameImg = "truckAvatar.png";
                        }
                    }
                }
                else { nameImg = ""; }
            }
            catch (Exception) { nameImg = ""; }
            try
            {
                Vehicle truck = new Vehicle
                {
                    FileImage = nameImg,
                    Id = idTruck
                };

                var r = db.saveTruckLogo(truck);
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