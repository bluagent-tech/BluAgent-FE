using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BAv02.Models.DataAccessLayers;
using Newtonsoft.Json;
using BAv02.Models;
using System.IO;
using Amazon.S3;
using Amazon;
using Amazon.S3.Transfer;
using Microsoft.Extensions.Configuration;
using System.Text.RegularExpressions;

namespace BAv02.Controllers
{
    public class HazmatDocumentsController : Controller
    {
        TrailersDAL db = new TrailersDAL();

        private IConfiguration Configuration { get; set; }

        public string AwsAccessKeyId { get; set; }
        public string AwsSecretAccessKey { get; set; }

        public string AwsServer { get; set; }

        public string BucketName { get; set; }




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

        [HttpPost("[action]")]
        public JsonResult saveInsurance(Trailer t, long id, long iduser)
        {
            try
            {
                var r = db.saveInsurance(id, t);
                var alerts = db.getAllAlerts(db.getCompanyId(iduser), id, "TRAILER");
                var count = db.alertsCounter(db.getCompanyId(iduser), id, "TRAILER");
                if (r != null)
                {
                    return Json("{\"status\": 0, \"trailer\": " + JsonConvert.SerializeObject(r, Formatting.Indented) + ", \"alertsCount\": " + JsonConvert.SerializeObject(count, Formatting.Indented) + ", \"alerts\": " + JsonConvert.SerializeObject(alerts, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error when saving\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> UpdateUser(Users user, string file, bool isCollector)
        {
            var nameF = "";
            try
            {
                var idCompany = db.getCompanyId(user.Id);

                if (file != null)
                {
                    var key = "";
                    if (!isCollector)
                    {
                        key = idCompany + "/Users/" + user.Id + "/userAvatar.png";
                    }
                    else
                    {
                        key = "Collectors/Users/" + user.Id + "/userAvatar.png";
                    }

                    string[] base64Img = Regex.Split(file, @"data:[aA-zZ]*\/[aA-zZ]*;base64,");
                    byte[] image = Convert.FromBase64String(base64Img[1]);


                    using (var client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, RegionEndpoint.USWest2))
                    {
                        using (var newMemoryStream = new MemoryStream(image))
                        {
                            var uploadRequest = new TransferUtilityUploadRequest
                            {
                                InputStream = newMemoryStream,

                                Key = key,
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", "userAvatar.png");

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                            nameF = "userAvatar.png";
                        }
                    }
                }
                else
                {
                    nameF = "";
                }
            }
            catch (Exception ex)
            {
                
                nameF = "";  
                throw new Exception($"Error: {nameF} ", ex);
            }
            return null;
            /*try
            {
                user.FileImage = nameF;
                //int r = db.updateUser(user); var u = db.getRoleData(user.Id, 0);
                if (r == 0)
                {
                    return Json("{\"status\": 0, \"user\": " + JsonConvert.SerializeObject(u, Formatting.Indented) + " }");
                }
                else if (r == 1) { return Json("{\"status\": 1,\"error\": \"Email duplicate\"}"); }
                else { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 3,\"error\": \"Error In The Server\"}"); }*/
        }

    }
}
