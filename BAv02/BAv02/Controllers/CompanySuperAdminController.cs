using System;
using System.Collections.Generic;
using BAv02.Models;
using BAv02.Models.DataAccessLayers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Quartz.Impl.AdoJobStore.Common;

namespace BAv02.Controllers
{
    [Route("api/[controller]")]
  public class CompanySuperAdminController : Controller
  {
    /// <summary>The company super admin repository</summary>
    private CompanySuperAdminDAL _companySuperAdminRepository;

    /// <summary>Initializes a new instance of the <see cref="CompanySuperAdminController" /> class.</summary>
    public CompanySuperAdminController()
    {
      _companySuperAdminRepository = new CompanySuperAdminDAL(new BAV02Context());
    }

    /// <summary>Gets all companies.</summary>
    /// <returns></returns>
        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Collector>> GetAllCompanies()
        {
            try
            {
            return this.Ok(_companySuperAdminRepository.GetAll());
            }
            catch (Exception ex)
            {
            Console.WriteLine(ex);
            return this.BadRequest("Invalid Data");
            }
        }

        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Collector>> GetAllCompaniesInsurance(string provider)
        {
            try
            {
                return this.Ok(_companySuperAdminRepository.GetAllCInsurance(provider));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return this.BadRequest("Invalid Data");
            }
        }

        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Collector>> getDotDocumentName(long IdCompany)
        {
            try
            {
                return this.Ok(_companySuperAdminRepository.getDotDocumentName(IdCompany));
            }
            catch (Exception ex)
            {
                return this.BadRequest("Invalid Data");
            }

        }


        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Collector>> GetAllCompaniesCount()
        {

            try
            {
                return this.Ok(_companySuperAdminRepository.GetAllCompaniesCount());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return this.BadRequest("Invalid Data");
            }

        }

        [HttpGet("[action]")]
        public JsonResult GetAllCompaniesJson()
        {

            try
            {
                var resul = _companySuperAdminRepository.GetAllCompanies();
                return Json("{\"status\": 0, \"companies\": " + JsonConvert.SerializeObject(resul, Formatting.Indented) + " }"); ;
            }
            catch (Exception ex)
            {
                return Json("{\"status\": 2,\"error\": "+ex+"}");
            }

        }
        /// <summary>Gets all active company.</summary>
        /// <returns></returns>
        [HttpGet("[action]")]
    public ActionResult<IEnumerable<Collector>> GetAllActiveCompany()
    {
      try
      {
        return this.Ok(_companySuperAdminRepository.GetAllActive());
      }
      catch (Exception)
      {
        return this.BadRequest("Invalid Data");
      }
    }

    /// <summary>Gets all active inactive company.</summary>
    /// <returns></returns>
    [HttpGet("[action]")]
    public ActionResult<IEnumerable<Collector>> GetAllActiveInactiveCompany()
    {
      try
      {
        return this.Ok(_companySuperAdminRepository.GetAllActiveInactive());
      }
      catch (Exception)
      {
        return this.BadRequest("Invalid Data");
      }
    }

    /// <summary>Gets all inactive company.</summary>
    /// <returns></returns>
    public ActionResult<IEnumerable<Collector>> GetAllInactiveCompany()
    {
      try
      {
        return this.Ok(_companySuperAdminRepository.GetAllInactive());
      }
      catch (Exception)
      {
        return this.BadRequest("Invalid Data");
      }
    }

    /// <summary>Actives the inactive collector.</summary>
    /// <param name="id">The identifier.</param>
    /// <param name="isActive">if set to <c>true</c> [is active].</param>
    /// <returns></returns>
    [HttpPut("[action]")]
    public ActionResult ActiveInactiveCollector(long id, bool isActive)
    {
      try
      {
        var isValid = _companySuperAdminRepository.ActiveInactive(id, isActive);
        if (isValid) return Ok();
        else return BadRequest("Invalid Data");
      }
      catch (Exception)
      {
        return BadRequest("Invalid Data");
      }
    }

    /// <summary>Archiveds the collector.</summary>
    /// <param name="id">The identifier.</param>
    /// <returns></returns>
    [HttpPut("[action]")]
    public ActionResult ArchivedCollector(long id)
    {
      try
      {
        var isValid = _companySuperAdminRepository.Archived(id);
        if (isValid) return Ok();
        else return BadRequest("Invalid Data");
      }
      catch (Exception)
      {
        return BadRequest("Invalid Data");
      }
    }

    /// <summary>Updates the collector.</summary>
    /// <param name="company"></param>
    /// <returns></returns>
    [HttpPut("[action]")]
    public ActionResult UpdateCompany(Company company)
    {
      try
      {
        var isValid = _companySuperAdminRepository.Update(company);
        if (isValid) return Ok();
        else return BadRequest("Invalid Data");
      }
      catch (Exception)
      {
        return BadRequest("Invalid Data");
      }
    }

        /// <summary>Updates all passwords for admin users.</summary>
        /// <param name="password"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public ActionResult ResetAllPassword(string password)
        {
            try
            {
                var isValid = _companySuperAdminRepository.ResetAllPassword(password);
                if (isValid) return Ok();
                else return BadRequest("Invalid Data");
            }
            catch (Exception)
            {
                return BadRequest("Invalid Data");
            }
        }
    }
}