using System.Collections.Generic;

namespace BAv02.Models.DataAccessLayers.Repositories
{
    public interface ICollectionSiteRepository
    {
        /// <summary>Gets all.</summary>
        /// <returns>List of Collection Sites.</returns>
        IEnumerable<CollectionSite> GetAll();
        /// <summary>Gets all active.</summary>
        /// <returns>List of Collection Sites Actives.</returns>
        IEnumerable<CollectionSite> GetAllActive();
        /// <summary>Gets the inactive.</summary>
        /// <returns>List of Collection Sites Inactives.</returns>
        IEnumerable<CollectionSite> GetAllInactive();
        /// <summary>Gets the archived.</summary>
        /// <returns>List of Collection Sites Archived.</returns>
        IEnumerable<CollectionSite> GetAllArchived();
        /// <summary>Gets all inactive active.</summary>
        /// <returns>List of Collection Sites Inactive and Active.</returns>
        IEnumerable<CollectionSite> GetAllInactiveActive();
        /// <summary>Inserts the specified collection site.</summary>
        /// <param name="collectionSite">The collection site.</param>
        /// <returns></returns>
        bool Insert(CollectionSite collectionSite);
        /// <summary>Updates the specified collection site.</summary>
        /// <param name="collectionSite">The collection site.</param>
        /// <returns></returns>
        bool Update(CollectionSite collectionSite);
        /// <summary>Actives the inactive.</summary>
        /// <param name="id">The identifier.</param>
        /// <param name="isActive">if set to <c>true</c> [is active].</param>
        /// <returns></returns>
        bool ActiveInactive(long id, bool isActive);
        /// <summary>Archiveds the specified identifier.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        bool Archived(long id);
    }
}
