using System;
using System.Collections.Generic;
using BAv02.Models;
using BAv02.Models.DataAccessLayers;
using Microsoft.AspNetCore.Mvc;

namespace BAv02.Controllers
{
    [Route("api/[controller]")]
    public class CollectionSiteController : Controller
    {
        /// <summary>The collectionSite repository</summary>
        private CollectionSiteDAL _collectionSiteRepository;

        /// <summary>Initializes a new instance of the <see cref="CollectionSiteController" /> class.</summary>
        public CollectionSiteController()
        {
            _collectionSiteRepository = new CollectionSiteDAL(new BAV02Context());
        }

        /// <summary>Gets all collectionSites.</summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public ActionResult<IEnumerable<CollectionSite>> GetAllCollectionSites()
        {
            try
            {
                return this.Ok(_collectionSiteRepository.GetAll());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return this.BadRequest(ex);
            }
        }
        [HttpGet("[action]")]
        public ActionResult<IEnumerable<CollectionSite>> GetAllCollectionSitesCount()
        {
            try
            {
                return this.Ok(_collectionSiteRepository.GetAllCollectionSitesCount());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return this.BadRequest("Invalid Data");
            }
        }
        /// <summary>Gets all active collectionSites.</summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public ActionResult<IEnumerable<CollectionSite>> GetAllActiveCollectionSites()
        {
            try
            {
                return this.Ok(_collectionSiteRepository.GetAllActive());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return this.BadRequest("Invalid Data");
            }
        }

        /// <summary>Gets all active inactive collectionSites.</summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public ActionResult<IEnumerable<CollectionSite>> GetAllActiveInactiveCollectionSites()
        {
            try
            {
                return this.Ok(_collectionSiteRepository.GetAllInactiveActive());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return this.BadRequest("Invalid Data");
            }
        }

        /// <summary>Gets all archived collectionSites.</summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public ActionResult<IEnumerable<CollectionSite>> GetAllArchivedCollectionSites()
        {
            try
            {
                return this.Ok(_collectionSiteRepository.GetAllArchived());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return this.BadRequest("Invalid Data");
            }
        }

        /// <summary>Gets all inactive collectionSites.</summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public ActionResult<IEnumerable<CollectionSite>> GetAllInactiveCollectionSites()
        {
            try
            {
                return this.Ok(_collectionSiteRepository.GetAllInactive());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return this.BadRequest("Invalid Data");
            }
        }

        /// <summary>Inserts the collectionSite.</summary>
        /// <param name="collectionSite">The collectionSite.</param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public ActionResult InsertCollectionSite([FromBody]CollectionSite collectionSite)
        {
            try
            {
                var isValid = _collectionSiteRepository.Insert(collectionSite);
                if (isValid) return Ok();
                else return BadRequest("Invalid Data");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest("Invalid Data");
            }
        }

        /// <summary>Actives the inactive collectionSite.</summary>
        /// <param name="id">The identifier.</param>
        /// <param name="isActive">if set to <c>true</c> [is active].</param>
        /// <returns></returns>
        [HttpPut("[action]")] 
        public ActionResult ActiveInactiveCollector(long id, bool isActive)
        {
            try
            {
                var isValid = _collectionSiteRepository.ActiveInactive(id, isActive);
                if (isValid) return Ok();
                else return BadRequest("Invalid Data");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest("Invalid Data");
            }
        }

        /// <summary>Archiveds the collectionSite.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        [HttpPut("[action]")]
        public ActionResult ArchivedCollectionSite(long id)
        {
            try
            {
                var isValid = _collectionSiteRepository.Archived(id);
                if (isValid) return Ok();
                else return BadRequest("Invalid Data");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest("Invalid Data");
            }
        }

        /// <summary>Updates the collectionSite.</summary>
        /// <param name="collectionSite">The collectionSite.</param>
        /// <returns></returns>
        [HttpPut("[action]")]
        public ActionResult UpdateCollectionSite(CollectionSite collectionSite)
        {
            try
            {
                var isValid = _collectionSiteRepository.Update(collectionSite);
                if (isValid) return Ok();
                else return BadRequest("Invalid Data");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest("Invalid Data");
            }
        }
    }
}