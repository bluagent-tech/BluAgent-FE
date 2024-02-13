using BAv02.Models.DataAccessLayers.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BAv02.Models.DataAccessLayers
{
    public class CollectionSiteDAL : ICollectionSiteRepository
    {
        /// <summary>The context</summary>
        private readonly BAV02Context _context;

        /// <summary>The disposed</summary>
        private bool disposed = false;

        /// <summary>Initializes a new instance of the <see cref="CollectionSiteDAL" /> class.</summary>
        public CollectionSiteDAL()
        {
            _context = new BAV02Context();
        }

        /// <summary>Initializes a new instance of the <see cref="CollectionSiteDAL" /> class.</summary>
        /// <param name="context">The context.</param>
        public CollectionSiteDAL(BAV02Context context)
        {
            _context = context;
        }

        /// <summary>Actives the inactive.</summary>
        /// <param name="id">The identifier.</param>
        /// <param name="isActive">if set to <c>true</c> [is active].</param>
        /// <returns></returns>
        public bool ActiveInactive(long id, bool isActive)
        {
            bool isValid;
            try
            {
                var collectionSite = _context.CollectionSite.Where(x => x.Id == id).FirstOrDefault();
                collectionSite.IsActive = isActive;
                collectionSite.DateModified = DateTime.Now;
                _context.SaveChanges();

                var collectors = ActiveInactiveCollectors(collectionSite.Id, isActive);

                bool isUpdateCollectors = UpdateActiveInactiveCollector(collectors);

                if (isUpdateCollectors) isValid = true;
                else
                    isValid = false;
            }
            catch (Exception)
            {

                isValid = false;
            }
            return isValid;
        }

        /// <summary>Updates the active inactive collector.</summary>
        /// <param name="collectors">The collectors.</param>
        /// <returns></returns>
        private bool UpdateActiveInactiveCollector(IEnumerable<Collector> collectors)
        {
            bool isValid;
            try
            {
                _context.UpdateRange(collectors);
                _context.SaveChanges();
                isValid = true;
            }
            catch (Exception)
            {

                isValid = false;
            }
            return isValid;
        }

        /// <summary>Actives the inactive collectors.</summary>
        /// <param name="collectionSiteId">The collection site identifier.</param>
        /// <param name="isActive">if set to <c>true</c> [is active].</param>
        /// <returns></returns>
        private IEnumerable<Collector> ActiveInactiveCollectors(long collectionSiteId, bool isActive)
        {
            var collectors = _context.Collectors.Where(x => x.CollectionSiteId == collectionSiteId).ToList();
            collectors.ForEach(collector => { collector.IsActive = isActive; collector.DateModified = DateTime.Now; });
            return collectors;
        }

        /// <summary>Archiveds the collectors.</summary>
        /// <param name="collectionSite">The collection sites.</param>
        /// <param name="isActive">if set to <c>true</c> [is active].</param>
        /// <returns></returns>
        private IEnumerable<Collector> ArchivedCollectors(long collectionSiteId, bool? isActive)
        {
            var collectors = _context.Collectors.Where(x => x.CollectionSiteId == collectionSiteId).ToList();
            collectors.ForEach(collector => { collector.IsActive = isActive; collector.DateModified = DateTime.Now; });
            return collectors;
        }

        /// <summary>Archiveds the specified identifier.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public bool Archived(long id)
        {
            bool isValid;
            try
            {
                var collectionSite = _context.CollectionSite.Where(x => x.Id == id).FirstOrDefault();
                collectionSite.IsArchived = true;
                collectionSite.DateArchived = DateTime.Now;
                _context.SaveChanges();

                var collectors = ArchivedCollectors(collectionSite.Id, collectionSite.IsArchived);

                bool isUpdateCollectors = UpdateArchivedCollector(collectors);

                if (isUpdateCollectors) isValid = true;
                else
                    isValid = false;

            }
            catch (Exception)
            {

                isValid = false;
            }
            return isValid;
        }

        /// <summary>Updates the archived collector.</summary>
        /// <param name="collectors">The collectors.</param>
        /// <returns></returns>
        private bool UpdateArchivedCollector(IEnumerable<Collector> collectors)
        {
            bool isValid;
            try
            {
                _context.UpdateRange(collectors);
                _context.SaveChanges();
                isValid = true;
            }
            catch (Exception)
            {

                isValid = false;
            }
            return isValid;
        }

        /// <summary>Gets all.</summary>
        /// <returns>List of Collection Sites.</returns>
        public IEnumerable<CollectionSite> GetAll()
        {
            return _context.CollectionSite.OrderByDescending(num => num).ToList();
        }
        public int GetAllCollectionSitesCount()
        {
            return _context.CollectionSite.ToList().Count();
        }
        /// <summary>Gets all active.</summary>
        /// <returns>List of Collection Sites Actives.</returns>
        public IEnumerable<CollectionSite> GetAllActive()
        {
            return _context.CollectionSite.Where(x => x.IsActive == true && x.IsArchived == false).ToList();
        }

        /// <summary>Gets all inactive active.</summary>
        /// <returns>List of Collection Sites Inactive and Active.</returns>
        public IEnumerable<CollectionSite> GetAllInactiveActive()
        {
            return _context.CollectionSite.Where(x => x.IsArchived == false).ToList();
        }

        /// <summary>Gets the archived.</summary>
        /// <returns>List of Collection Sites Archived.</returns>
        public IEnumerable<CollectionSite> GetAllArchived()
        {
            return _context.CollectionSite.Where(x => x.IsArchived == true).ToList();
        }

        /// <summary>Gets the inactive.</summary>
        /// <returns>List of Collection Sites Inactives.</returns>
        public IEnumerable<CollectionSite> GetAllInactive()
        {
            return _context.CollectionSite.Where(x => x.IsActive == false && x.IsArchived == false).ToList();
        }

        /// <summary>Inserts the specified collection site.</summary>
        /// <param name="collectionSite">The collection site.</param>
        /// <returns></returns>
        public bool Insert(CollectionSite collectionSite)
        {
            bool isValid;

            if (collectionSite.ProviderId == 0)
            {
                return isValid = false;
            }
            
            try
            {
                var date = DateTime.Now;

                collectionSite.DateCreated = date;
                collectionSite.DateArchived = date;
                collectionSite.DateModified = null;

                if (collectionSite.IsArchived == false)
                {
                    collectionSite.ArchivedByUserId = null;
                    collectionSite.DateArchived = null;
                }

                _context.CollectionSite.Add(collectionSite);
                _context.SaveChanges();
                isValid = true;
            }
            catch (Exception)
            {
                isValid = false;
            }
            return isValid;
        }

        /// <summary>Updates the specified collection site.</summary>
        /// <param name="collectionSite">The collection site.</param>
        /// <returns></returns>
        public bool Update(CollectionSite collectionSite)
        {
            bool isValid;
            try
            {
                collectionSite.DateModified = DateTime.Now;
                _context.Entry(collectionSite).State = EntityState.Modified;
                _context.SaveChanges();
                isValid = true;
            }
            catch (Exception)
            {

                isValid = false;
            }
            return isValid;
        }

        /// <summary>Releases unmanaged and - optionally - managed resources.</summary>
        /// <param name="disposing">
        ///   <c>true</c> to release both managed and unmanaged resources; <c>false</c> to release only unmanaged resources.</param>
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        /// <summary>Releases unmanaged and - optionally - managed resources.</summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
