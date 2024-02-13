using System;
using System.IO;
using BAv02.Models;
using BAv02.Models.DataAccessLayers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace BAv02.Controllers
{
    [Route("api/[controller]")]
    public class DQFController : Controller
    {

        DQFDAL db = new DQFDAL();
        DriversDAL dbDriver = new DriversDAL();

        private IHostingEnvironment _env;
        private IConfiguration Configuration { get; set; }
        public string AssetsDirectory { get; set; }

        public DQFController(IHostingEnvironment env)
        {
            _env = env;

            var builder = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json");
            Configuration = builder.Build();

           

            //Assets Directory
            AssetsDirectory = Configuration["AssetsDirectory"];
        }

        /// <summary>
        /// Add new driver and display list for Hazman
        /// </summary>
        /// <param name="driver"></param>
        /// <param name="idu"></param>
        /// <param name="Password"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult addNewDriver(Users driver, long idu, string Password, Driver data, Boolean val)
        {
            try
            {
                if(val == true)
                {
                    int r = db.AddNewDriver(driver, idu, Password, data, null, null, _env);
                    var t = db.getHazmatDrivers(idu, 1, 1000);
                    var i = db.getDriversInactive(idu, 1, 1000);
                    if (r == 0)
                    {
                        return Json("{\"status\": 0, \"drivers\": " + JsonConvert.SerializeObject(t, Formatting.Indented) + ", \"driversInactive\": " + JsonConvert.SerializeObject(i, Formatting.Indented) + " }");
                    }
                    else { return Json("{\"status\": 1,\"error\": \"Email Duplicate\"}"); }
                }
                else { return Json("{\"status\": 1,\"error\": \"wrong password format\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Add new driver and display list for QualificationFile
        /// </summary>
        /// <param name="driver"></param>
        /// <param name="idu"></param>
        /// <param name="Password"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult addNewDriverFile(Users driver, long idu, string Password, Driver data, Boolean val, string xNumber, string requesterCode)
        {
            try
            {
                if (val == true)
                {
                    int r = db.AddNewDriver(driver, idu, Password, data, xNumber, requesterCode, _env);
                    var t = db.getDrivers(idu, 1, 1000);
                    var i = db.getDriversInactive(idu, 1, 1000);
                    if (r == 0)
                    {
                        return Json("{\"status\": 0, \"drivers\": " + JsonConvert.SerializeObject(t, Formatting.Indented) + ", \"driversInactive\": " + JsonConvert.SerializeObject(i, Formatting.Indented) + " }");
                    }
                    else { return Json("{\"status\": 1,\"error\": \"Email Duplicate\"}"); }
                }
                else { return Json("{\"status\": 1,\"error\": \"wrong password format\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get list of active and active drivers per company
        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getDrivers(Int64 idu, int page, int page2, int size)
        {
            try
            {

                var t = db.getDrivers(idu, page, size);
                var companyDocsDQF = db.getCompanyDocsDQF(idu);
                var ti = db.getDriversInactive(idu, page2, size);
                if (t.Items.Count != 0 || ti.Items.Count != 0)
                {
                    return Json("{\"status\": 0, \"drivers\": " + JsonConvert.SerializeObject(t, Formatting.Indented) + ", \"DSM\": " + JsonConvert.SerializeObject(companyDocsDQF, Formatting.Indented) + ", \"driversInactive\": " + JsonConvert.SerializeObject(ti, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// </summary>
        /// <param name="idu"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getDriversByIdCompany(Int64 idC, int page, int page2, int size)
        {
            try
            {

                var t = db.getDriversByIdCompany(idC, page, size);

                if (t.Items.Count != 0)
                {
                    return Json("{\"status\": 0, \"drivers\": " + JsonConvert.SerializeObject(t, Formatting.Indented) + "}");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }
        /// <summary>
        /// Get list of drivers per company
        /// </summary>
        /// <param name="companyId"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getActivesDrivers(Int64 companyId)
        {
            try
            {

                var t = db.getDrivers(companyId, 1, 1000);
                if (t.Items.Count != 0)
                {
                    return Json("{\"status\": 0, \"drivers\": " + JsonConvert.SerializeObject(t, Formatting.Indented) +" }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpGet("[action]")]
        public JsonResult getHazmatDrivers(Int64 idu, int page, int page2, int size)
        {
            try
            {

                var t = db.getHazmatDrivers(idu, page, size);
                var ti = db.getDriversInactive(idu, page2, size);
                if (t.Items.Count != 0 || ti.Items.Count != 0)
                {
                    return Json("{\"status\": 0, \"drivers\": " + JsonConvert.SerializeObject(t, Formatting.Indented) + ", \"driversInactive\": " + JsonConvert.SerializeObject(ti, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }


        [HttpGet("[action]")]
        public JsonResult getCountries()
        {
            try
            {

                var countries = db.GetCountries();
                if (countries.Count != 0)
                {
                    return Json("{\"status\": 0, \"countries\": " + JsonConvert.SerializeObject(countries, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }
        /// <summary>
        /// Delete driver inactive
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("[action]")]
        public JsonResult updateDriverStatus(long id, string status)
        {
            try
            {
                var r = db.updateDriverStatus(id, status);
                var t = db.getDrivers(id, 1, 1000);
                var ti = db.getDriversInactive(id, 1, 1000);

                if (r == 0) 
                { 
                    return Json("{\"status\": 0, \"drivers\": " + JsonConvert.SerializeObject(t, Formatting.Indented) 
                    + ", \"driversInactive\": " + JsonConvert.SerializeObject(ti, Formatting.Indented) 
                    + " }"); 
                }
                else 
                {
                    return Json("{\"status\": 1,\"error\": \"Error In The Server\"}");
                }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Delete driver inactive
        /// </summary>
        /// <param name="id"></param>
        /// <param name="status"></param>
        /// <param name="deactivationReason"></param>
        /// <param name="date"></param>
        /// <returns></returns>
        [HttpDelete("[action]")]
        public JsonResult deactivateDriver(long id, string status, string deactivationReason, DateTime date)
        {
            try
            {
                var r = db.deactivateDriver(id, status, deactivationReason, date);
                var t = db.getDrivers(id, 1, 1000);
                var ti = db.getDriversInactive(id, 1, 1000);

                if (r == 0) 
                { 
                    return Json("{\"status\": 0, \"drivers\": " + JsonConvert.SerializeObject(t, Formatting.Indented) 
                    + ", \"driversInactive\": " + JsonConvert.SerializeObject(ti, Formatting.Indented) 
                    + " }"); 
                }
                else 
                {
                    return Json("{\"status\": 1,\"error\": \"Error In The Server\"}");
                }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Export drivers active/inactive to excel
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult ExportDrivers(long idu)
        {
            try
            {

                var dataExportI = db.ExportDrivers(idu, "INACTIVE");
                var dataExportA = db.ExportDrivers(idu, "ACTIVE");
                if (dataExportA.Items.Count != 0 || dataExportI.Items.Count != 0)
                {
                    return Json("{\"status\": 0, \"dataExportActive\": " + JsonConvert.SerializeObject(dataExportA, Formatting.Indented) + ", \"dataExportInactive\": " + JsonConvert.SerializeObject(dataExportI, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }
        [HttpPost("[action]")]
        public JsonResult sendSMS(string phoneNumber)
        {
            try
            {
                var r = db.sendSMS(phoneNumber);
                return Json("{\"status\": 0,\"success\": \"SMS Sent\"}");
            }
            catch (Exception) { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
        }
        [HttpPost("[action]")]
        public JsonResult sendEmail(string email, long idu)
        {
            try
            {
                var r = db.sendEmail(email,idu, _env);
                return Json("{\"status\": 0,\"success\": \"Email Sent\"}");
            }
            catch (Exception) { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
        }
        [HttpGet("[action]")]
        public JsonResult getEPNList(long id)
        {
            try
            {

                var EPN = db.GetEmployerPN(id);
                var ca = db.CompanyCA(id);
                var DR = db.DR(id);
                if (EPN.Count != 0)
                {
                    return Json("{\"status\": 0, \"EmployerPullNoticed\": " + JsonConvert.SerializeObject(EPN, Formatting.Indented) + ", \"ca\": " + JsonConvert.SerializeObject(ca, Formatting.Indented) + ", \"DR\": " + JsonConvert.SerializeObject(DR, Formatting.Indented) +  "}");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error geting Pull noticed\"}"); }
        }

        /// <summary>
        /// Get MultiEmployment Data  Falta de Subir
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult EmailSendInstruction(long idCompany, long idDriver, string email, string pdf, string name, string year)
        {
            {
                try
                {
                    var r = db.EmailSend(idCompany, idDriver, email, pdf, name, year, _env);
                    return Json("{\"status\": 0,\"success\": \"Email Sent\"}");
                }
                catch (Exception) { return Json("{\"status\": 1,\"error\": \"Error sending email\"}"); }
            }
        }
        [HttpPost("[action]")]
        public JsonResult EmailResquestDriverRecord(long idCompany, long idDriver, string name, string license, string xNumber)
        {
            {
                try
                {
                    var r = db.EmailSendRDR(idCompany, idDriver, name, license, xNumber, _env);
                    return Json("{\"status\": 0,\"success\": \"Email Sent\"}");
                }
                catch (Exception) { return Json("{\"status\": 1,\"error\": \"Error sending email\"}"); }
            }
        }
        [HttpPost("[action]")]
        public JsonResult EmailEnrollToDMV(long idCompany, long idDriver, string name, string license, string xNumber, string requesterCode)
        {
            {
                try
                {
                    var r = db.EmailEnrollToDMV(idCompany, idDriver, name, license, xNumber, requesterCode, _env);
                    return Json("{\"status\": 0,\"success\": \"Email Sent\"}");
                }
                catch (Exception) { return Json("{\"status\": 1,\"error\": \"Error sending email\"}"); }
            }
        }

        /// <summary>
        /// Funcion para llamar al Email de Need to sign
        /// Se ocupa el DER Name [DERName], Nombre de compania [CompanyName]
        /// </summary>
        /// <param Id de la compania="idCompany"></param>
        /// <param Id del driver="idDriver"></param>
        /// <param Nombre del usuario="name"></param>
        /// <param Licencia="license"></param>
        /// <param Numero x="xNumber"></param>
        /// <param Requester code="requesterCode"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult EmailNeedToSign()
        {
            {
                try
                {
                    var r = db.EmailNeedToSign(_env);
                    return Json("{\"status\": 0,\"success\": \"Email Sent\"}");
                }
                catch (Exception) { return Json("{\"status\": 1,\"error\": \"Error sending email\"}"); }
            }
        }

        /// <summary>
        /// Funcion para llamar al Email de Random Selected
        /// Se ocupa [DERName], [DateRandomSelection], [CompanyName]
        /// </summary>
        /// <param Id de la compania="idCompany"></param>
        /// <param Id del driver="idDriver"></param>
        /// <param Nombre del usuario="name"></param>
        /// <param Licencia="license"></param>
        /// <param Numero x="xNumber"></param>
        /// <param Requester code="requesterCode"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult EmailRandomSelected(long idCompany, string date)
        {
            {
                try
                {
                    var r = db.EmailRandomSelector(idCompany, date, _env);
                    return Json("{\"status\": 0,\"success\": \"Email Sent\"}");
                }
                catch (Exception) { return Json("{\"status\": 1,\"error\": \"Error sending email\"}"); }
            }
        }

        /// <summary>
        /// Funcion para llamar al Email de No Random Selected
        /// Se ocupa [DERName], [DateRandomSelection], [CompanyName]
        /// </summary>
        /// <param Id de la compania="idCompany"></param>
        /// <param Id del driver="idDriver"></param>
        /// <param Nombre del usuario="name"></param>
        /// <param Licencia="license"></param>
        /// <param Numero x="xNumber"></param>
        /// <param Requester code="requesterCode"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult EmailNoRandomSelected(long idCompany, string date)
        {
            {
                try
                {
                    var r = db.EmailNoRandomSelector(idCompany, date, _env);
                    return Json("{\"status\": 0,\"success\": \"Email Sent\"}");
                }
                catch (Exception) { return Json("{\"status\": 1,\"error\": \"Error sending email\"}"); }
            }
        }

        [HttpPost("[action]")]
        public JsonResult EmailComplianceReportNot()
        {
            {
                try
                {
                    var r = db.EmailComplianceReportNot(_env);
                    return Json("{\"status\": 0,\"success\": \"Email Sent\"}");
                }
                catch (Exception) { return Json("{\"status\": 1,\"error\": \"Error sending email\"}"); }
            }
        }

        //   [HttpPost("[action]")]
        //   public JsonResult EmailNoSignatureCompany()
        //{
        //       try
        //       {
        //           var x = db.EmailNoSignatureCompany(_env);
        //           return Json(x);
        //       }
        //       catch (Exception a)
        //       {
        //           return (Json(a));
        //       }
        //   }

    }
}