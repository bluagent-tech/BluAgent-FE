using System.Collections.Generic;

namespace BAv02.Models.DataAccessLayers.Repositories
{
    public interface ICollectorRepository
    {
        /// <summary>Gets all.</summary>
        /// <returns>List of Collectors.</returns>
        IEnumerable<Collector> GetAll();
        /// <summary>Gets all active.</summary>
        /// <returns>List of Collectors Active.</returns>
        IEnumerable<Collector> GetAllActive();
        /// <summary>Gets all inactive.</summary>
        /// <returns>List of Collectors Inactive.</returns>
        IEnumerable<Collector> GetAllInactive();
        /// <summary>Gets all archived.</summary>
        /// <returns>List of Collectors Archived.</returns>
        IEnumerable<Collector> GetAllArchived();
        /// <summary>Gets all inactive active.</summary>
        /// <returns>List of Collectors inactive and actived.</returns>
        IEnumerable<Collector> GetAllInactiveActive();
        /// <summary>Inserts the specified collector.</summary>
        /// <param name="collector">The collector.</param>
        /// <returns></returns>
        bool Insert(Collector collector);
        /// <summary>Updates the specified collector.</summary>
        /// <param name="collector">The collector.</param>
        /// <returns></returns>
        bool Update(Collector collector);
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
