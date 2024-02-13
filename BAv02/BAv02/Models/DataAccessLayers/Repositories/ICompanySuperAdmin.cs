using System.Collections.Generic;

namespace BAv02.Models.DataAccessLayers.Repositories
{
    public interface ICompanySuperAdmin
    {
        /// <summary>Gets all.</summary>
        /// <returns>List of companies.</returns>
        IEnumerable<Company> GetAll();
        /// <summary>Gets all inactive.</summary>
        /// <returns>List of Companies Inactive.</returns>
        IEnumerable<Company> GetAllInactive();
        /// <summary>Gets all active.</summary>
        /// <returns>List of Companies Active. </returns>
        IEnumerable<Company> GetAllActive();
        /// <summary>Gets all active inactive.</summary>
        /// <returns>List of All companies active and inactive.</returns>
        IEnumerable<Company> GetAllActiveInactive();
        /// <summary>Updates the specified company.</summary>
        /// <param name="company">The company.</param>
        /// <returns></returns>
        bool Update(Company company);
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
