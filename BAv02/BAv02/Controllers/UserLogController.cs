using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
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


namespace BAv02.Controllers
{
    [Route("api/[controller]")]
    public class UserLogController : Controller
    {
        UserDAL db = new UserDAL();

        private IHostingEnvironment _env;

        public string AssetsDirectory { get; set; }

        private IConfiguration Configuration { get; set; }

        public string AwsAccessKeyId { get; set; }
        public string AwsSecretAccessKey { get; set; }

        public string AwsServer { get; set; }

        public string BucketName { get; set; }



        public UserLogController(IHostingEnvironment env)
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
        /// verify the user's data and return your information
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult login(string email, string password, string tokenCode)
        {
            try
            {
                Users u = db.GetRoleLogin(email, password, tokenCode);
                if (u != null)
                {
                   
                    var p = db.geRolePermits(u.Id);
                    var idCompany = db.getCompanyId(u.Id);
                    var companyInfoCA = db.getCompanyInfo(idCompany);
                    var hasCameraService = db.getCompanyCameraService(idCompany);


                    /*var realIdUser = db.getRealUserId(u.Id);
                    var realIdCompany = db.getRealCompanyId(realIdUser);*/
                    //return Json("{\"status\": 0, \"user\": " + JsonConvert.SerializeObject(u, Formatting.Indented) + ", \"permits\": " + JsonConvert.SerializeObject(p, Formatting.Indented) + ", \"idCompany\": " + JsonConvert.SerializeObject(idCompany, Formatting.Indented) + ", \"realUserId\": " + JsonConvert.SerializeObject(realIdUser, Formatting.Indented) + ", \"realCompanyId\": " + JsonConvert.SerializeObject(realIdCompany, Formatting.Indented) + "  }");
                    return Json("{\"status\": 0, \"user\": " + JsonConvert.SerializeObject(u, Formatting.Indented) + ", \"permits\": " + JsonConvert.SerializeObject(p, Formatting.Indented) + ", \"stateNumber\": " + JsonConvert.SerializeObject(companyInfoCA, Formatting.Indented) + ", \"idCompany\": " + JsonConvert.SerializeObject(idCompany, Formatting.Indented) + ", \"cameraService\": " + JsonConvert.SerializeObject(hasCameraService, Formatting.Indented) + "  }");

                }
                else { return Json("{\"status\": 1,\"error\": \"Wrong Email or Password\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Save a new user
        /// </summary>
        /// <param name="user"></param>
        /// <param name="Dot"></param>
        /// <param name="Companyname"></param>
        /// <param name="Password"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult saveNewUser(Users user, string Password, Company c, string city, string state, string country, Boolean val, String stripeToken)
        {
            try
            {
                if (stripeToken == null || stripeToken == "undefined")
                {
                    Console.WriteLine(stripeToken);
                    return Json("{\"status\": 6,\"error\": \"Invalid Card Number\"}");

                }
                else
                {
                    if (val == true)
                    {
                        int r = db.SaveNewUser(user, Password, c, city, state, country, _env, HttpContext, stripeToken);
                        //string name = user.Name + " " + user.LastName;
                        //string addres = c.MailAddress
                        //db.EmailForLabcorp(c.Dot, "BA00001", c.LegalName, c.LegalName, name, c.PhysicalAddress, c.PhysicalCity, c.PhysicalState, c.PhysicalZip, c.PhoneNumber);
                        if (r == 0)
                        {
                            return Json("{\"status\": 0, \"user\": \"Saved\" }");
                        }
                        else if (r == 1)
                        {
                            return Json("{\"status\": 1,\"error\": \"Email duplicate\"}");
                        }
                        else if (r == 2)
                        {
                            return Json("{\"status\": 2,\"error\": \"Duplicate USDOT Account\"}");
                        }
                        else
                        {
                            return Json("{\"status\": 3,\"error\": \"Card Declined\"}");
                        }
                    }
                    else
                    {
                        return Json("{\"status\": 5,\"error\": \"Wrong password format\"}");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return Json("{\"status\": 4,\"error\": \"" + ex + "\"}");
            }
        }

        [HttpPost("[action]")]
        public IActionResult DeactivateCompany(long idCompany)
        {
            try
            {
               var response = db.DeactivateCompany(idCompany);
               return Ok(response);

            }catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("[action]")]
        public IActionResult ActivateCompany(long idCompany)
        {
            try
            {
                var response = db.ActivateCompany(idCompany);
                return Ok(response);

            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Update Company Passwords
        /// </summary>
        /// <param name="idCompany"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult updateCompanyPassword(int idCompany, string password) {

            var response = db.updateCompanyPassword(idCompany, password);

            if (response == 0)
            {
                return Json("{\"status\": 0, \"user\": \"Saved\" }");
            }
            else { return Json("{\"status\": 1, \"user\": \"Error\" }"); }

        }

        /// <summary>
        /// Update User Passwords
        /// </summary>
        /// <param name="idCompany"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult updateUserPassword(int idUser, string password)
        {

            var response = db.updateUserPassword(idUser, password);

            if (response == 0)
            {
                return Json("{\"status\": 0, \"user\": \"Saved\" }");
            }
            else { return Json("{\"status\": 1, \"user\": \"Error\" }"); }

        }
        /// <summary>
        /// Get Company Data by UsDot
        /// </summary>
        /// <param name="dot"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getDataCompanyByUsDot(string dot)
        {
            if (dot == null)
            {
                return Json("{\"status\": 1,\"error\": \"\"}");
            }
            else
            {
                try
                {
                    var duplicateDOT = db.getCheckDuplicateDOT(dot);

                    if (duplicateDOT == 0)
                    {
                        var dc = db.getDataCompanyByUsDot(dot);
                        if (dc != null && dc.DOT_NUMBER != "") { return Json("{\"status\": 0, \"company\": " + JsonConvert.SerializeObject(dc, Formatting.Indented) + " }"); }
                        else { return Json("{\"status\": 1,\"error\": \"USDOT NOT FOUND\"}"); }
                    }
                    else
                    {
                        return Json("{\"status\": 3,\"error\": \"Duplicate USDOT Account\"}");
                    }
                }
                catch (Exception ex) { return Json($"{{\"status\": 2,\"error\": \"USDOT ERROR {ex}\"}}"); }
            }
        }

        /// <summary>
        /// Get User data
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getRoleData(long id, long idu)
        {
            try
            {

                var u = db.getRoleData(id, idu);
                if (u != null)
                {
                    return Json("{\"status\": 0, \"user\": " + JsonConvert.SerializeObject(u, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"User not found\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
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
                                Key = $"{idCompany}/Users/{id}/signature.png",
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
                Users u = new Users { Id = id, FileSignature = nameF };
                var r = db.saveSignatureFile(u);
                if (r == 0) { return Json("{\"status\": 0,\"signature\": \"" + nameF + "\"}"); }
                else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }


        /// <summary>
        /// Save a new user
        /// </summary>
        /// <param name="user"></param>
        /// <param name="Dot"></param>
        /// <param name="Companyname"></param>
        /// <param name="Password"></param>
        /// <returns></returns>
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
                throw new Exception($"Error: {ex} {nameF}");
            }

            try
            {
                user.FileImage = nameF;
                int r = db.updateUser(user); var u = db.getRoleData(user.Id, 0);
                if (r == 0)
                {
                    return Json("{\"status\": 0, \"user\": " + JsonConvert.SerializeObject(u, Formatting.Indented) + " }");
                }
                else if (r == 1) { return Json("{\"status\": 1,\"error\": \"Email duplicate\"}"); }
                else { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 3,\"error\": \"Error In The Server\"}"); }
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
                        if (cp == 0) { returnString = "{\"status\": 0, \"password\": \"changed\" }"; }
                        else if (cp == 1) { returnString = "{\"status\": 1,\"error\": \"Current Password is incorrect\"}"; }
                        else { returnString = "{\"status\": 1,\"error\": \"Error In The Server\"}"; }
                        break;
                    case "new":
                        returnString = "{\"status\": 2,\"error\": \"New Password must match password format\"}";
                        break;
                    case "different":
                        returnString = "{\"status\": 4,\"error\": \"New password doesn't match\"}";
                        break;
                }
                return Json(returnString);
            }
            catch (Exception) { return Json("{\"status\": 4,\"error\": \"Error In The Server\"}"); }
        }


        [HttpGet("[action]")]
        public JsonResult sendConfirmationEmail(string userEmail, string userName)
        {
            try
            {
                var email = db.sendConfirmationEmail(_env, HttpContext, userEmail, userName, Guid.NewGuid());
                if (email == "Mail Sent") { return Json("{\"status\": 0 \" }"); }
                else { return Json("{\"status\": 1,\"error\": " + JsonConvert.SerializeObject(email, Formatting.Indented) + "}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error to send confirmation email\"}"); }
        }

        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Users>> GetAllSuperAdminUsersCount()
        {
            try
            {
                return this.Ok(db.GetAllSuperAdminUsersCount());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return this.BadRequest("Invalid Data");
            }

        }

        [HttpGet("[action]")]
        public JsonResult GetAllSuperAdminUsersCountz()
        {
            try
            {
                var u = db.GetAllSuperAdminUsersCount();
                return Json("{\"status\": 0, \"user\": " + JsonConvert.SerializeObject(u, Formatting.Indented) + " }");
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpGet("[action]")]
        public JsonResult GetCompanyKey(long IdCompany)
        {
            try
            {
                var company = db.getCompanyKey(IdCompany);
                return Json("{\"status\": 0, \"data\": " + JsonConvert.SerializeObject(company, Formatting.Indented) + " }");
            } catch (Exception)
            {
                return Json("{\"status\": 2,\"error\": \"Error In The Server\"}");
            }
        }

        [HttpGet("[action]")]
        public JsonResult GetOnBoard(long idCompany)
        {
            try
            {
                bool onBoard = db.GetOnBoard(idCompany);
                string onBoardResult = onBoard ? "true" : "false";
                return Json("{\"status\": 0, \"onBoard\": " + onBoardResult + " }");
            }
            catch (Exception ex)
            {
                return Json("{\"status\": 2, \"error\": \"" + ex.Message + "\"}");
            }
        }

        [HttpPost("[action]")]
        public JsonResult OnBoardCompleted(long idCompany)
        {
            try
            {
                bool onBoard = db.OnBoardCompleted(idCompany);
                string onBoardResult = onBoard ? "true" : "false";
                return Json("{\"status\": 0, \"onBoard\": " + onBoardResult + " }");
            }
            catch (Exception ex)
            {
                return Json("{\"status\": 2, \"error\": \"" + ex.Message + "\"}");
            }
        }
    }
}
