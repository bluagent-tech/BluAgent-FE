using System;
using System.Collections.Generic;
using BAv02.Models;
using BAv02.Models.DataAccessLayers;
using Microsoft.AspNetCore.Mvc;

namespace BAv02.Controllers
{
    [Route("api/[controller]")]
    public class ChartReportController : Controller
    {
        private ChartReportDAL _chartReportRepository;

        public ChartReportController()
        {
            _chartReportRepository = new ChartReportDAL(new BAV02Context());
        }

        [HttpGet("[action]")]
        public ActionResult<IEnumerable<ChartReport>> GetAll()
        {
            try
            {
                return Ok( _chartReportRepository.GetAll());
            } catch (Exception ex)
            {
                return this.BadRequest(ex);
            }
        }

        [HttpPost("[action]")]
        public IActionResult GetDateBeetwen([FromBody] BetweenDate between)
        {
            try
            {
                return Ok(_chartReportRepository.GetBetweenDate(between.initDate, between.endDate));
            } catch (Exception ex)
            {
                return this.BadRequest(ex);
            }
        }

        [HttpGet("[action]")]
        public ActionResult<IEnumerable<ChartReport>> GetListOfMonth()
        {
            try
            {
                return Ok(_chartReportRepository.GetListOfMonth());
            }catch (Exception ex)
            {
                return this.BadRequest(ex);
            }
        }

        [HttpGet("[action]")]
        public ActionResult<IEnumerable<ChartReport>> GetListOfWeek()
        {
            try
            {
                return Ok(_chartReportRepository.GetListOfWeek());
            }
            catch (Exception ex)
            {
                return this.BadRequest(ex);
            }
        }
    }
}
