using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BAv02.Models;
using BAv02.Models.DataAccessLayers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using System.Dynamic;

namespace BAv02.Controllers
{
    [Route("api/[controller]")]
    public class CameraController : Controller
    {
        CameraDAL db = new CameraDAL();

        private IHostingEnvironment _env;

        public CameraController(IHostingEnvironment env)
        {
            _env = env;
        }

        [HttpPost("[action]")]
        public ActionResult AddCamera(Camera camera)
        {
            try
            {

                var response = db.SaveCamera(camera);
                if (response != null)
                {
                    BadRequest(response);
                }

                var successDetails = new ActionDetails
                {
                    Message = "Camera added successfully.",
                    Code = 0 // Coloca el número de código válido que desees
                };

                return Ok(successDetails);
            }
            catch (Exception err)
            {
                var errorDetails = new ActionDetails
                {
                    Message = err.Message,
                    Code = 1 // Coloca el número de error válido que desees
                };

                return BadRequest(errorDetails);
            }
        }

        [HttpGet("[action]")]
        public ActionResult GetCameraByIdCompanyAndType(long IdCompany, string Type)
        {

            try
            {
                var response = db.GetCameraByIdCompanyAndType(IdCompany, Type);

                return Ok( new { 
                data = response,
                Code = 0
                });
            }
            catch (Exception err)
            {
                var errorDetails = new ActionDetails
                {
                    Message = err.Message,
                    Code = 1 // Coloca el número de error válido que desees
                };

                return BadRequest(errorDetails);
            }
        }

        [HttpPost("[action]")]
        public ActionResult UpdateCameraStatus(string serialNumber, string status, long idVehicle)
        {

            try
            {
                var response = db.UpdateCameraStatus(serialNumber, status, idVehicle, _env);

                var successDetails = new ActionDetails
                {
                    Message = status == "Ready to Assign" || status == "Assigned" ? "Request Send Successfully" : "Status Change Successfully",
                    Code = 0 // Coloca el número de código válido que desees
                };

                return Ok(successDetails);
            }
            catch (Exception err)
            {
                var errorDetails = new ActionDetails
                {
                    Message = err.Message,
                    Code = 1 // Coloca el número de error válido que desees
                };

                return BadRequest(errorDetails);
            }
        }

        [HttpPost("[action]")]
        public ActionResult UpdateCameraStatusSuperAdmin(string serialNumber, string status, long idVehicle)
        {

            try
            {
                var response = db.UpdateCameraStatusSuperAdmin(serialNumber, status, idVehicle);

                return Ok(new
                {
                    data = response,
                    Code = 0
                });
            }
            catch (Exception err)
            {
                var errorDetails = new ActionDetails
                {
                    Message = err.Message,
                    Code = 1 // Coloca el número de error válido que desees
                };

                return BadRequest(errorDetails);
            }
        }
    }
}
