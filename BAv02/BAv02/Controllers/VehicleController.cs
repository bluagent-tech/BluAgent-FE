using System;
using System.Collections.Generic;
using System.Linq;
using BAv02.Models;
using BAv02.Models.DataAccessLayers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;

namespace BAv02.Controllers
{
    [Route("api/[controller]")]
  public class VehicleController : Controller
  {
        private VehicleDAL _vehicleRepository;

        VehicleDAL db = new VehicleDAL();

        private IHostingEnvironment _env;

        /// <summary>Initializes a new instance of the <see cref="VehicleController" /> class.</summary>

        public VehicleController(IHostingEnvironment env)
        {
            _env = env;
            _vehicleRepository = new VehicleDAL(new BAV02Context());
        }

        /// <summary>Gets all Active Vehicle.</summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Vehicle>> GetAllActiveVehicle()
        {
            try
            {
                return Ok(_vehicleRepository.GetAllActiveVehicle().Count());
            }
            catch (Exception ex)
            {
            Console.WriteLine(ex);
            return this.BadRequest(ex);
            }
        }

        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Vehicle>> GetAllInactiveVehicle() {

            try
            {
                return Ok(_vehicleRepository.GetAllInactiveVehicle().Count());
            }
            catch (Exception ex) {
                return this.BadRequest(ex);
            }
        }

        [HttpPost("[action]")]
        public IActionResult SendEmailReport([FromBody] SendReport report)
        {

            try
            {
               var response = db.SendEmailReport(_env, report.churned, report.trucks, report.newTrucks, report.endingTrucks, report.initDate, report.endDate);
                return Json(response);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return Json("Error to send report email");
            } 
        }
    }
}