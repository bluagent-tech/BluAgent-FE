using System;
using BAv02.Models.ComplianceReport;
using BAv02.Models.DataAccessLayers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BAv02.Controllers
{
    [Route("api/[controller]")]
    public class ComplianceReportController : Controller
    {
        ComplianceReportSuperAdminDAL db = new ComplianceReportSuperAdminDAL();

        /// <summary>
        /// Get driver compliance report
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getDriverReport(long companyId)
        {
            DriverComplianceReport driverReports;
            try
            {
                driverReports = db.getDriverReport(companyId);
                    return Json("{\"driverCompliance\": " + JsonConvert.SerializeObject(driverReports, Formatting.Indented) + " }");
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error in The Server\"}"); }
        }

        /// <summary>
        /// Get company compliance report
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getCompanyReport(long companyId)
        {
            CompanyComplianceReport companyReports;
            try
            {
                companyReports = db.getCompanyReport(companyId);
                    return Json("{\"companyCompliance\": " + JsonConvert.SerializeObject(companyReports, Formatting.Indented) + " }");
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error in The Server\"}"); }
        }

        /// <summary>
        /// Get truck compliance report
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getTruckReport(long companyId)
        {
            TruckComplianceReport truckReports;
            try
            {
                truckReports = db.getTruckReport(companyId);
                    return Json("{\"status\": 1, \"truckCompliance\": " + JsonConvert.SerializeObject(truckReports, Formatting.Indented) + " }");
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error in The Server\"}"); }
        }

        /// <summary>
        /// Get truck compliance report
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getTrailerReport(long companyId)
        {
            TruckComplianceReport truckReports;
            try
            {
                truckReports = db.getTrailerReport(companyId);
                    return Json("{\"status\": 1 , \"trailerCompliance\": " + JsonConvert.SerializeObject(truckReports, Formatting.Indented) + " }");
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error in The Server\"}"); }
        }

        /// <summary>
        /// Get driver company report
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getDriverCount(long companyId)
        {
            try
            {
                var driverCount = db.getDriverCountByCompany(companyId);
                return Json("{\"driverCount\": " + JsonConvert.SerializeObject(driverCount, Formatting.Indented) + " }");
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error in The Server\"}"); }
        }

    }

}
