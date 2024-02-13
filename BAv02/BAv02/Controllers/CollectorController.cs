using System;
using System.Collections.Generic;
using BAv02.Models;
using BAv02.Models.DataAccessLayers;
using Microsoft.AspNetCore.Mvc;

namespace BAv02.Controllers
{
    [Route("api/[controller]")]
    public class CollectorController : Controller
    {
        /// <summary>The collector repository</summary>
        private CollectorDAL _collectorRepository;

        /// <summary>Initializes a new instance of the <see cref="CollectorController" /> class.</summary>
        public CollectorController()
        {
            _collectorRepository = new CollectorDAL(new BAV02Context());
        }

        /// <summary>Gets all collectors.</summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Collector>> GetAllCollectors()
        {
            try
            {
                return this.Ok(_collectorRepository.GetAll());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return this.BadRequest("Invalid Data");
            }
        }

        /// <summary>Gets all collectors count.</summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Collector>> GetAllCollectorsCount()
        {
            try
            {
                return this.Ok(_collectorRepository.GetAllCollectorsCount());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return this.BadRequest("Invalid Data");
            }
        }

        /// <summary>Gets all active collectors.</summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Collector>> GetAllActiveCollectors()
        {
            try
            {
                return this.Ok(_collectorRepository.GetAllActive());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return this.BadRequest("Invalid Data");
            }
        }

        /// <summary>Gets all active inactive collectors.</summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Collector>> GetAllActiveInactiveCollectors()
        {
            try
            {
                return this.Ok(_collectorRepository.GetAllInactiveActive());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return this.BadRequest("Invalid Data");
            }
        }

        /// <summary>Gets all archived collectors.</summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Collector>> GetAllArchivedCollectors()
        {
            try
            {
                return this.Ok(_collectorRepository.GetAllArchived());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return this.BadRequest("Invalid Data");
            }
        }

        /// <summary>Gets all inactive collectors.</summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Collector>> GetAllInactiveCollectors()
        {
            try
            {
                return this.Ok(_collectorRepository.GetAllInactive());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return this.BadRequest("Invalid Data");
            }
        }

        [HttpGet("[action]")]
        //public ActionResult GetSearchCollectors([FromBody]string search)
       public ActionResult<IEnumerable<Collector>> GetSearchCollectors(string search)
        {
            //var search = "";
           // HttpGetAttribute.
            try
            {
                return this.Ok(_collectorRepository.GetSearch(search));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest("Invalid Search Data");
            }

        }

        /// <summary>Inserts the collector.</summary>
        /// <param name="collector">The collector.</param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public ActionResult InsertCollector([FromBody]Collector collector)
        {
            try
            {
                var isValid = _collectorRepository.Insert(collector);
                if (isValid) return Ok();
                else return BadRequest("Invalid Data");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest("Invalid Data");
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
                var isValid = _collectorRepository.ActiveInactive(id, isActive);
                if (isValid) return Ok();
                else return BadRequest("Invalid Data");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
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
                var isValid = _collectorRepository.Archived(id);
                if (isValid) return Ok();
                else return BadRequest("Invalid Data");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest("Invalid Data");
            }
        }

        /// <summary>Updates the collector.</summary>
        /// <param name="collector">The collector.</param>
        /// <returns></returns>
        [HttpPut("[action]")]
        public ActionResult UpdateCollector(Collector collector)
        {
            try
            {
                var isValid = _collectorRepository.Update(collector);
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