using System.Collections.Generic;

namespace BAv02.Models.DataAccessLayers.Repositories
{
    public interface ISuperAdminRepository
    {
        /// <summary>Gets all.</summary>
        /// <returns>List of Super Admins.</returns>
        IEnumerable<SuperAdmin> GetAll();
        /// <summary>Gets all inactive.</summary>
        /// <returns>List of Super Admins Actives.</returns>
        IEnumerable<SuperAdmin> GetAllInactive();
        /// <summary>Gets all active.</summary>
        /// <returns>List of Super admins Inactive.</returns>
        IEnumerable<SuperAdmin> GetAllActive();
        /// <summary>Gets the archived.</summary>
        /// <returns>List of Super Admins Archived.</returns>
        IEnumerable<SuperAdmin> GetArchived();
        /// <summary>Gets all active inactive.</summary>
        /// <returns>List of Super Admins Active and Inactive.</returns>
        IEnumerable<SuperAdmin> GetAllActiveInactive();

        /// <summary>Inserts this instance.</summary>
        /// <returns></returns>
        bool Insert(SuperAdmin superAdmin);
        /// <summary>Updates this instance.</summary>
        /// <returns></returns>
        bool Update(SuperAdmin superAdmin);
        /// <summary>Actives the inactive.</summary>
        /// <returns></returns>
        bool ActiveInactive(long id, bool isActive);
        /// <summary>Archiveds this instance.</summary>
        /// <returns></returns>
        bool Archived(long id);
    }
}
