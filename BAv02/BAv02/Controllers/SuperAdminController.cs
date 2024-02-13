using System;
using System.Collections.Generic;
using System.Linq;
using BAv02.Models;
using BAv02.Models.DataAccessLayers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BAv02.Controllers
{
    [Route("api/[controller]")]
    public class SuperAdminController : Controller
    {
        private SuperAdminDAL _superAdminRepository;

        /// <summary>Initializes a new instance of the <see cref="SuperAdminController" /> class.</summary>
        public SuperAdminController()
        {
            _superAdminRepository = new SuperAdminDAL(new BAV02Context());
        }

        /// <summary>Gets all super admins.</summary>
        /// <returns>List of Super Admins.</returns>
        [HttpGet("[action]")]
        public ActionResult<IEnumerable<SuperAdmin>> GetAllSuperAdmins()
        {
            try
            {
                return this.Ok(_superAdminRepository.GetAll());
            }
            catch (Exception)
            {

                return this.BadRequest("Invalid Data");
            }
        }

        /// <summary>Gets all inactive.</summary>
        /// <returns>List of Super Admins Inactive.</returns>
        [HttpGet("[action]")]
        public ActionResult<IEnumerable<SuperAdmin>> GetAllInactive()
        {
            try
            {
                return this.Ok(_superAdminRepository.GetAllInactive());
            }
            catch (Exception)
            {

                return this.BadRequest("Invalid Data");
            }
        }

        /// <summary>Gets all active.</summary>
        /// <returns>List of Super Admins active.</returns>
        public ActionResult<IEnumerable<SuperAdmin>> GetAllActive()
        {
            try
            {
                return this.Ok(_superAdminRepository.GetAllActive());
            }
            catch (Exception)
            {

                return this.BadRequest("Invalid Data");
            }
        }

        /// <summary>Gets the archived.</summary>
        /// <returns>List of Super Admin Archived.</returns>
        public ActionResult<IEnumerable<SuperAdmin>> GetArchived()
        {
            try
            {
                return this.Ok(_superAdminRepository.GetArchived());
            }
            catch (Exception)
            {

                return this.BadRequest("Invalid Data");
            }
        }

        /// <summary>Gets all active inactive.</summary>
        /// <returns>List of Super Admins Active and Inactive.</returns>
        public ActionResult<IEnumerable<SuperAdmin>> GetAllActiveInactive()
        {
            try
            {
                return this.Ok(_superAdminRepository.GetAllActiveInactive());
            }
            catch (Exception)
            {

                return this.BadRequest("Invalid Data");
            }
        }

        /// <summary>Inserts the super admin.</summary>
        /// <param name="superAdmin">The super admin.</param>
        /// <returns></returns>
        public ActionResult InsertSuperAdmin([FromBody]SuperAdmin superAdmin)
        {
            try
            {
                var isValid = _superAdminRepository.Insert(superAdmin);
                if (isValid) return Ok();
                else return BadRequest("Invalid Data");
            }
            catch (Exception)
            {
                return BadRequest("Invalid Data");
            }
        }

        /// <summary>Updates the super admin.</summary>
        /// <param name="superAdmin">The super admin.</param>
        /// <returns></returns>
        public ActionResult UpdateSuperAdmin(SuperAdmin superAdmin)
        {
            try
            {
                var isValid = _superAdminRepository.Update(superAdmin);
                if (isValid) return Ok();
                else return BadRequest("Invalid Data");
            }
            catch (Exception)
            {
                return BadRequest("Invalid Data");
            }
        }

        /// <summary>Actives the inactive super admin.</summary>
        /// <param name="id">The identifier.</param>
        /// <param name="isActive">if set to <c>true</c> [is active].</param>
        /// <returns></returns>
        public ActionResult ActiveInactiveSuperAdmin(long id, bool isActive)
        {
            try
            {
                var isValid = _superAdminRepository.ActiveInactive(id, isActive);
                if (isValid) return Ok();
                else return BadRequest("Invalid Data");
            }
            catch (Exception)
            {
                return BadRequest("Invalid Data");
            }
        }

        /// <summary>Archiveds the super admin.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public ActionResult ArchivedSuperAdmin(long id)
        {
            try
            {
                var isValid = _superAdminRepository.Archived(id);
                if (isValid) return Ok();
                else return BadRequest("Invalid Data");
            }
            catch (Exception)
            {
                return BadRequest("Invalid Data");
            }
        }
        //SUPERADMIN DASHBOARD COUNTS
        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Collector>> GetAllCompanies()
        {
            try
            {
                return this.Ok(_superAdminRepository.GetAllCompanies().Count());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return this.BadRequest("Invalid Data");
            }
        }

        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Collector>> GetAllCounts()
        {
            try
            {
                return this.Ok(_superAdminRepository.GetAllCounts());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return this.BadRequest("Invalid Data");
            }
        }

        [HttpGet("[action]")]
        public IActionResult GetCompanyById(long idCompany)
        {
            try
            {
                var company = _superAdminRepository.GetCompanyById(idCompany);
                return Json(new { status = 0, data = company });
            }
            catch (Exception)
            {
                return Json(new { status = 2, error = "Error In The Server" });
            }
        }
    }
}