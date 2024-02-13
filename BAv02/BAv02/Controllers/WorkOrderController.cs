using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BAv02.Models.DataAccessLayers;
using Newtonsoft.Json;
using BAv02.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Amazon.S3;
using Amazon.S3.Transfer;
using Microsoft.Extensions.Configuration;
using Amazon;
using Amazon.S3.Model;

namespace BAv02.Controllers
{
    [Route("api/[controller]")]
    public class WorkOrderController : Controller
    {
        WorkOrderDAL db = new WorkOrderDAL();

        private IHostingEnvironment _env;

        private IConfiguration Configuration { get; set; }

        public string AssetsDirectory { get; set; }

        public string AwsAccessKeyId { get; set; }
        public string AwsSecretAccessKey { get; set; }

        public string AwsServer { get; set; }

        public string BucketName { get; set; }

        public WorkOrderController(IHostingEnvironment env)
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
        public JsonResult getWorkOrder(long id, long idu)
        {
            try
            {
                var wo = db.getWorkOrder(id,idu);
                if (wo != null)
                {
                    var woI = db.getWorkOrderImages(wo.Id);
                    var rb = db.getReportedBy(wo.IssuedBy);
                    if (wo.VehicleType == "TRAILER")
                    {
                        var t = db.getWOTrailer(id);
                        return Json("{\"status\": 0, \"workOrder\": " + JsonConvert.SerializeObject(wo, Formatting.Indented) + ", \"unity\": " + JsonConvert.SerializeObject(t, Formatting.Indented) + ", \"ReportedBy\": " + JsonConvert.SerializeObject(rb, Formatting.Indented) + ", \"workOrderImages\": " + JsonConvert.SerializeObject(woI, Formatting.Indented) + " }");
                    }
                    else
                    {
                        var t = db.getWOTruck(id);
                        return Json("{\"status\": 0, \"workOrder\": " + JsonConvert.SerializeObject(wo, Formatting.Indented) + ", \"unity\": " + JsonConvert.SerializeObject(t, Formatting.Indented) + ", \"ReportedBy\": " + JsonConvert.SerializeObject(rb, Formatting.Indented) + ", \"workOrderImages\": " + JsonConvert.SerializeObject(woI, Formatting.Indented) + " }");
                    }
                }
                else { return Json("{\"status\": 1,\"error\": \"Null Search Result\"}"); }

            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get workOrderImages data 
        /// </summary>
        /// <param name="id">trailer id</param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getWorkOrderImages(long idWorkOrder)
        {
            try
            {
                var woI = db.getWorkOrderImages(idWorkOrder);
                if (woI != null)
                {
                    return Json("{\"status\": 0, \"workOrderImages\": " + JsonConvert.SerializeObject(woI, Formatting.Indented) + "}");
                }
                else
                {
                    return Json("{\"status\": 0,\"workOrderImages\": \"{}\"}");
                }

            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Save work order data
        /// </summary>
        /// <param name="wo"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult saveWorkOrder(WorkOrder wo, long id, Boolean external)
        {
            try
            {
                var r = db.saveWorkOrder(wo, id, external);
                if (r != null)
                {
                    return Json("{\"status\": 0, \"workOrder\": " + JsonConvert.SerializeObject(r, Formatting.Indented) + "}");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error when saving\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Add new service
        /// </summary>
        /// <param name="s"></param>
        /// <param name="idWO"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult addService(Service s, long idWO)
        {
            try
            {
                var r = db.addService(s, idWO);
                var service = db.getServices(idWO, 1, 10);
                if (r == 0)
                {
                    return Json("{\"status\": 0, \"service\": " + JsonConvert.SerializeObject(service, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error when saving\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// get services for work order
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getServices(long id, int page, int size)
        {
            try
            {
                var service = db.getServices(id, page, size);
                if (service.Items.Count > 0)
                {
                    return Json("{\"status\": 0, \"service\": " + JsonConvert.SerializeObject(service, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"service\": \"[]\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Delete service
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("[action]")]
        public JsonResult deleteService(long id, long idwo)
        {
            try
            {
                var r = db.deleteService(id);
                var service = db.getServices(idwo, 1, 10);
                if (r == 0) { return Json("{\"status\": 0, \"service\": " + JsonConvert.SerializeObject(service, Formatting.Indented) + " }"); }
                else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// add new material used in work order
        /// </summary>
        /// <param name="m"></param>
        /// <param name="idwo"></param>
        /// <param name="Image"></param>
        /// <param name="file"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public async Task<JsonResult> addMaterial(Material m, long idwo, string file,long idCompany)
        {

            string nameF = "";
            try
            {
                #region PDF and File
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
                                using (var DbContext = new BAV02Context())
                                {
                                    var wo = DbContext.WorkOrder.Where(x => x.Id == idwo).FirstOrDefault();
                                    var c = (long)DbContext.Material.Where(x => x.IdWorkOrder == idwo).Select(x => new { x.IdWorkOrder }).Count();
                                    nameF = "Invoice" + wo.VehicleType + wo.IdVehicle + idwo + c + ".pdf";
                                }

                                var uploadRequest = new TransferUtilityUploadRequest
                                {
                                    InputStream = newMemoryStream,
                                    Key = $"{idCompany}/WorkOrders/{idwo}/{nameF}",
                                    BucketName = BucketName,
                                    CannedACL = S3CannedACL.PublicRead,
                                };

                                uploadRequest.Metadata.Add("x-amz-meta-filename", "trailerAvatar.png");

                                var fileTransferUtility = new TransferUtility(client);
                                await fileTransferUtility.UploadAsync(uploadRequest);
                            }
                        }

                    }
                    else { nameF = ""; }
                }
                catch (Exception) { nameF = ""; }
                #endregion

                m.InvoiceFile = nameF;
                m.IdWorkOrder = idwo;
                var r = db.addMaterial(m);
                var materiales = db.getMateriales(idwo, 1, 10);
                if (r == 0)
                {
                    return Json("{\"status\": 0, \"material\": " + JsonConvert.SerializeObject(materiales, Formatting.Indented) + "}");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// get material for work order
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getMateriales(long id, int page, int size)
        {
            try
            {
                var materiales = db.getMateriales(id, page, size);
                if (materiales.Items.Count > 0)
                {
                    return Json("{\"status\": 0, \"material\": " + JsonConvert.SerializeObject(materiales, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"material\": \"[]\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Delete material
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("[action]")]
        public JsonResult deleteMaterial(long id, long idWorkOrder,long idCompany,string fileName)
        {
            try
            {
                var isValid = this.DeleteS3Document(idCompany, idWorkOrder, fileName);

                if (isValid)
                {
                    var r = db.deleteMaterial(id);
                    var materiales = db.getMateriales(idWorkOrder, 1, 10);
                    if (r == 0)
                    {
                        return Json("{\"status\": 0, \"material\": " + JsonConvert.SerializeObject(materiales, Formatting.Indented) + " }");
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
        public bool DeleteS3Document(long idCompany,long idWorkOrder,string fileName)
        {
            bool isValid = true;

            try
            {
                using (var client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, RegionEndpoint.USWest2))
                {
                    var deleteObjectRequest = new DeleteObjectRequest
                    {
                        BucketName = BucketName,
                        Key = $"{idCompany}/WorkOrders/{idWorkOrder}/{fileName}"
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
        /// Download a AWS S3 File inside the AMAZON.
        /// </summary>
        /// <param name="id">Id of document.</param>
        /// <param name="docType">DocType.</param>
        /// <param name="fileName">FileName.</param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public async Task<IActionResult> downloadDocument(long idCompany, long idWorkOrder, string fileName)
        {
            try
            {
                var fileNameKey = $"{idCompany}/WorkOrders/{idWorkOrder}/{fileName}";

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

        /// <summary>
        /// Save work order data
        /// </summary>
        /// <param name="wo"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult saveWorkOrderNextInspection(WorkOrder wo, long id, long idU, long idCompany, Boolean external, bool checkNoNextInspectionServiceA)
        {
            try
            {
                var r = db.saveWorkOrderNextInspection(wo, id, idU, idCompany, external, checkNoNextInspectionServiceA);
                if (r != null)
                {
                    return Json("{\"status\": 0, \"workOrder\": " + JsonConvert.SerializeObject(r, Formatting.Indented) + "}");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error when saving\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }
    }
}
