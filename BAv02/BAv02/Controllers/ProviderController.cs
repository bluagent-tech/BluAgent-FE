using System;
using System.Collections.Generic;
using BAv02.Models;
using Microsoft.AspNetCore.Mvc;
using BAv02.Models.DataAccessLayers;

namespace BAv02.Controllers
{
    /// <summary>Providers controller.</summary>
    [Route("api/[controller]")]
    public class ProviderController : Controller
    {
        private ProviderDAL _providerRepository;

        /// <summary>Initializes a new instance of the <see cref="ProviderController" /> class.</summary>
        public ProviderController()
        {
            _providerRepository = new ProviderDAL(new BAV02Context());
        }

        /// <summary>Gets all providers.</summary>
        /// <returns>List of Providers.</returns>
        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Provider>> GetAllProviders()
        {
            try
            {
                return this.Ok(_providerRepository.GetAll());
            }
            catch (Exception)
            {

                return this.BadRequest("Invalid Data");
            }
        }

        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Provider>> GetAllProvidersCount()
        {
            try
            {
                return this.Ok(_providerRepository.GetAllProvidersCount());
            }
            catch (Exception)
            {
                return this.BadRequest("Invalid Data");
            }
        }

        /// <summary>Gets all active providers.</summary>
        /// <returns>List of Active Providers.</returns>
        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Provider>> GetAllActiveProviders()
        {
            try
            {
                return this.Ok(_providerRepository.GetActive());
            }
            catch (Exception)
            {

                return this.BadRequest("Invalid Data");
            }
        }

        /// <summary>Gets all active inactive providers.</summary>
        /// <returns>List of Active and Inactive Providers.</returns>
        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Provider>> GetAllActiveInactiveProviders()
        {
            try
            {
                return this.Ok(_providerRepository.GetAllInactiveActive());
            }
            catch (Exception)
            {

                return this.BadRequest("Invalid Data");
            }
        }

        /// <summary>Gets all archived providers.</summary>
        /// <returns>List of Archived Providers.</returns>
        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Provider>> GetAllArchivedProviders()
        {
            try
            {
                return this.Ok(_providerRepository.GetArchived());
            }
            catch (Exception)
            {

                return this.BadRequest("Invalid Data");
            }
        }

        /// <summary>Gets all inactive providers.</summary>
        /// <returns>List of Inactive Providers.</returns>
        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Provider>> GetAllInactiveProviders()
        {
            try
            {
                return this.Ok(_providerRepository.GetInactive());
            }
            catch (Exception)
            {

                return this.BadRequest("Invalid Data");
            }
        }

        /// <summary>Inserts the provider.</summary>
        /// <param name="provider">The provider.</param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public ActionResult InsertProvider([FromBody] Provider provider)
        {

            try
            {
                var isValid = _providerRepository.Insert(provider);
                if (isValid) return Ok();
                else return BadRequest("Invalid Data");
            }
            catch (Exception)
            {
                return BadRequest("Invalid Data");
            }
        }

        /// <summary>Actives the inactive provider.</summary>
        /// <param name="id">The identifier.</param>
        /// <param name="isActive">if set to <c>true</c> [is active].</param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public ActionResult ActiveInactiveProvider(long id, bool isActive)
        {
            try
            {
                var isValid = _providerRepository.ActiveInactive(id,isActive);
                if (isValid) return Ok();
                else return BadRequest("Invalid Data");
            }
            catch (Exception)
            {
                return BadRequest("Invalid Data");
            }
        }

        /// <summary>Archiveds the provider.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        [HttpPut("[action]")]
        public ActionResult ArchivedProvider(long id)
        {
            try
            {
                var isValid = _providerRepository.Archived(id);
                if (isValid) return Ok();
                else return BadRequest("Invalid Data");
            }
            catch (Exception)
            {
                return BadRequest("Invalid Data");
            }
        }

        /// <summary>Archiveds the provider.</summary>
        /// <param name="provider">The provider.</param>
        /// <returns></returns>
        [HttpPut("[action]")]
        public ActionResult UpdateProvider(Provider provider)
        {
            try
            {
                var isValid = _providerRepository.Update(provider);
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