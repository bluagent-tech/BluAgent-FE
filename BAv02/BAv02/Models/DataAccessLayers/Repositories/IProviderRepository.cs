using System.Collections.Generic;

namespace BAv02.Models.DataAccessLayers.Repositories
{
    /// <summary>Interface for Providers.</summary>
    public interface IProviderRepository
    {
        /// <summary>Gets all providers.</summary>
        /// <returns>List of Providers.</returns>
        IEnumerable<Provider> GetAll();
        /// <summary>Gets the inactives providers.</summary>
        /// <returns>List of Inactive providers.</returns>
        IEnumerable<Provider> GetInactive();
        /// <summary>Gets the actives providers.</summary>
        /// <returns>List of Active providers.</returns>
        IEnumerable<Provider> GetActive();
        /// <summary>Gets the archived providers.</summary>
        /// <returns>List of Archived providers.</returns>
        IEnumerable<Provider> GetArchived();
        /// <summary>Gets all inactive and active providers.</summary>
        /// <returns>List of inactive and actives providers.</returns>
        IEnumerable<Provider> GetAllInactiveActive();

        /// <summary>Inserts the specified provider.</summary>
        /// <param name="provider">The provider.</param>
        /// <returns>Return boolean.</returns>
        bool Insert(Provider provider);

        /// <summary>Updates the specified provider.</summary>
        /// <param name="provider">The provider.</param>
        /// <returns>Return boolean.</returns>
        bool Update(Provider provider);

        /// <summary>Actives the inactive.</summary>
        /// <param name="id">The identifier.</param>
        /// <param name="isActive">if set to <c>true</c> [is active].</param>
        /// <returns>Return boolean.</returns>
        bool ActiveInactive(long id, bool isActive);

        /// <summary>Archiveds the specified identifier.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns>Return boolean.</returns>
        bool Archived(long id);

    }
}
