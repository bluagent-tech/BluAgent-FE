using BAv02.Models.DataAccessLayers.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BAv02.Models.DataAccessLayers
{
    public class ProviderDAL : IProviderRepository
    {
        /// <summary>The context</summary>
        private readonly BAV02Context _context;

        /// <summary>The disposed</summary>
        private bool disposed = false;

        /// <summary>Initializes a new instance of the <see cref="ProviderDAL" /> class.</summary>
        public ProviderDAL()
        {
            _context = new BAV02Context();
        }

        /// <summary>Initializes a new instance of the <see cref="ProviderDAL" /> class.</summary>
        /// <param name="context">The context.</param>
        public ProviderDAL(BAV02Context context)
        {
            _context = context;
        }

        /// <summary>Gets the actives providers.</summary>
        /// <returns>List of Active providers.</returns>
        public IEnumerable<Provider> GetActive()
        {
            return _context.Providers.Where(x => x.IsActive == true && x.IsArchived==false).ToList();
        }

        /// <summary>Gets all providers.</summary>
        /// <returns>List of Providers.</returns>
        public IEnumerable<Provider> GetAll()
        {
            return _context.Providers.ToList();
        }

        public int GetAllProvidersCount()
        {
            return _context.Providers.ToList().Count();
        }

        /// <summary>Gets all inactive and active providers.</summary>
        /// <returns>List of inactive and actives providers.</returns>
        public IEnumerable<Provider> GetAllInactiveActive()
        {
            return _context.Providers.Where(x => x.IsArchived == false).ToList();
        }

        /// <summary>Gets the archived providers.</summary>
        /// <returns>List of Archived providers.</returns>
        public IEnumerable<Provider> GetArchived()
        {
            return _context.Providers.Where(x => x.IsArchived == true).ToList();
        }

        /// <summary>Gets the inactives providers.</summary>
        /// <returns>List of Inactive providers.</returns>
        public IEnumerable<Provider> GetInactive()
        {
            return _context.Providers.Where(x => x.IsActive == false).ToList();
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

        /// <summary>Inserts the specified provider.</summary>
        /// <param name="provider">The provider.</param>
        /// <returns>Return boolean.</returns>
        public bool Insert(Provider provider)
        {
            bool isValid;
            try
            {
                provider.DateCreated = DateTime.Now;
                provider.DateModified = null;
                provider.DateArchived = null;
                _context.Providers.Add(provider);
                _context.SaveChanges();
                isValid = true;
            }
            catch (Exception)
            {

                isValid = false;
            }
            return isValid;
        }

        /// <summary>Updates the specified provider.</summary>
        /// <param name="provider">The provider.</param>
        /// <returns>Return boolean.</returns>
        public bool Update(Provider provider)
        {
            bool isValid;
            try
            {
                provider.DateModified = DateTime.Now;
                _context.Entry(provider).State = EntityState.Modified;
                _context.SaveChanges();
                isValid = true;
            }
            catch (Exception)
            {

                isValid = false;
            }
            return isValid;
        }

        #region ActiveInactiveProviders

        /// <summary>Actives the inactive.</summary>
        /// <param name="id">The identifier.</param>
        /// <param name="isActive">if set to <c>true</c> [is active].</param>
        /// <returns>Return boolean.</returns>
        public bool ActiveInactive(long id, bool isActive)
        {
            bool isValid;
            try
            {
                var provider = _context.Providers.Where(x => x.Id == id).FirstOrDefault();
                provider.IsActive = isActive;
                provider.DateModified = DateTime.Now;
                _context.SaveChanges();

                var collectionSite = ActiveInactiveCollectionSite(provider.Id, isActive);
                var collectors = ActiveInactiveCollectors(collectionSite,isActive);

                bool isUpdateCollectionSite = UpdateActiveInactiveCollectionSite(collectionSite);
                bool isUpdateCollectors = UpdateActiveInactiveCollector(collectors);
                
                if(isUpdateCollectionSite == true && isUpdateCollectors==true) isValid = true;
                else
                    isValid = false;
            }
            catch (Exception)
            {

                isValid = false;
            }
            return isValid;
        }

        /// <summary>Actives the inactive collection sites.</summary>
        /// <param name="providerId">The provider identifier.</param>
        /// <param name="isActive">if set to <c>true</c> [is active].</param>
        /// <returns></returns>
        private IEnumerable<CollectionSite> ActiveInactiveCollectionSite(long providerId, bool isActive)
        {
            var collectionSite = _context.CollectionSite.Where(x => x.ProviderId == providerId).ToList();
            collectionSite.ForEach(collection => { collection.IsActive = isActive; collection.DateModified = DateTime.Now;});
            return collectionSite;
        }

        /// <summary>Actives the inactive collectors.</summary>
        /// <param name="collectionSite">The collection sites.</param>
        /// <param name="isActive">if set to <c>true</c> [is active].</param>
        /// <returns></returns>
        private IEnumerable<Collector> ActiveInactiveCollectors(IEnumerable<CollectionSite> collectionSite, bool isActive)
        {
            List<Collector> lstCollectors = new List<Collector>();
            foreach (var item in collectionSite)
            {
                var collectors = _context.Collectors.Where(x => x.CollectionSiteId == item.Id).ToList();
                collectors.ForEach(collector => { collector.IsActive = isActive; collector.DateModified = DateTime.Now; });
                lstCollectors.AddRange(collectors);
            }
            return lstCollectors;
        }

        /// <summary>Updates the active inactive collection sites.</summary>
        /// <param name="collectionSite">The collection sites.</param>
        /// <returns></returns>
        private bool UpdateActiveInactiveCollectionSite(IEnumerable<CollectionSite> collectionSite)
        {
            bool isValid;
            try
            {
                _context.UpdateRange(collectionSite);
                _context.SaveChanges();
                isValid = true;
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

        #endregion

        #region ArchivedProviders
        /// <summary>Archiveds the specified identifier.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns>Return boolean.</returns>
        public bool Archived(long id)
        {
            bool isValid;
            try
            {
                var provider = _context.Providers.Where(x => x.Id == id).FirstOrDefault();
                provider.IsArchived = true;
                provider.DateArchived = DateTime.Now;
                _context.SaveChanges();

                var collectionSite = ArchivedCollectionSite(provider.Id, provider.IsArchived, provider.ArchivedByUserId);
                var collectors = ArchivedCollectors(collectionSite, provider.IsArchived);

                bool isUpdateCollectionSite = UpdateArchivedCollectionSite(collectionSite);
                bool isUpdateCollectors = UpdateArchivedCollector(collectors);

                if (isUpdateCollectionSite == true && isUpdateCollectors == true) isValid = true;
                else
                    isValid = false;

            }
            catch (Exception)
            {

                isValid = false;
            }
            return isValid;
        }


        /// <summary>Archiveds the collection sites.</summary>
        /// <param name="providerId">The provider identifier.</param>
        /// <param name="isArchived">if set to <c>true</c> [is archived].</param>
        /// <param name="archivedUserId">The archived user identifier.</param>
        /// <returns></returns>
        private IEnumerable<CollectionSite> ArchivedCollectionSite(long providerId, bool? isArchived, long? archivedUserId)
        {
            var collectionSite = _context.CollectionSite.Where(x => x.ProviderId == providerId).ToList();
            collectionSite.ForEach(collection => { collection.IsArchived = isArchived; collection.DateArchived = DateTime.Now; });
            return collectionSite;
        }


        /// <summary>Archiveds the collectors.</summary>
        /// <param name="collectionSite">The collection sites.</param>
        /// <param name="isActive">if set to <c>true</c> [is active].</param>
        /// <returns></returns>
        private IEnumerable<Collector> ArchivedCollectors(IEnumerable<CollectionSite> collectionSite, bool? isActive)
        {
            List<Collector> lstCollectors = new List<Collector>();
            foreach (var item in collectionSite)
            {
                var collectors = _context.Collectors.Where(x => x.CollectionSiteId == item.Id).ToList();
                collectors.ForEach(collector => { collector.IsActive = isActive; collector.DateModified = DateTime.Now; });
                lstCollectors.AddRange(collectors);
            }
            return lstCollectors;
        }

        /// <summary>Updates the archived collection sites.</summary>
        /// <param name="collectionSite">The collection sites.</param>
        /// <returns></returns>
        private bool UpdateArchivedCollectionSite(IEnumerable<CollectionSite> collectionSite)
        {
            bool isValid;
            try
            {
                _context.UpdateRange(collectionSite);
                _context.SaveChanges();
                isValid = true;
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

        #endregion
    }
}
