using System;
using BAv02.Models.DOT;
using BAv02.Models.DataAccessLayers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace BAv02.Controllers
{
    [Route("api/[controller]")]
    public class DotReportController : Controller
    {
        DotReportDAL db = new DotReportDAL();

        /// <summary>
        /// Get inspections by dot
        /// </summary>
        /// <param dot="dot number"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getInspectionsByDot(string dot)
        {
            List<INSPECTIONS> inspections = new List<INSPECTIONS>();
            try
            {
                inspections = db.InspectionsByDot(dot);
                    return Json("{\"dotInspections\": " + JsonConvert.SerializeObject(inspections, Formatting.Indented) + " }");
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error in The Server\"}"); }
        }

        /// <summary>
        /// Get violations by dot
        /// </summary>
        /// <param dot="dot number"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getViolationsByDot(string dot)
        {
            List<VIOLATIONS> violations = new List<VIOLATIONS>();
            try
            {
                violations = db.ViolationsByDot(dot);
                    return Json("{\"dotInspections\": " + JsonConvert.SerializeObject(violations, Formatting.Indented) + " }");
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error in The Server\"}"); }
        }

        /// <summary>
        /// Get crashes by dot
        /// </summary>
        /// <param dot="dot number"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getCrashesByDot(string dot)
        {
            List<CRASHES> crashes = new List<CRASHES>();
            try
            {
                crashes = db.CrashesByDot(dot);
                    return Json("{\"dotInspections\": " + JsonConvert.SerializeObject(crashes, Formatting.Indented) + " }");
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error in The Server\"}"); }
        }

        /// <summary>
        /// Get usdot by dot
        /// </summary>
        /// <param dot="dot number"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getUsDotByDot(string dot)
        {
            List<USDOT> usDots = new List<USDOT>();
            try
            {
                usDots = db.UsDotByDot(dot);
                    return Json("{\"dotInspections\": " + JsonConvert.SerializeObject(usDots, Formatting.Indented) + " }");
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error in The Server\"}"); }
        }

    }

}
