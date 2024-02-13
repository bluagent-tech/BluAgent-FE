using System.Collections.Generic;

namespace BAv02.Models.DataAccessLayers.Repositories
{

    /// <summary>Repositorie Interface for VehicleInspections</summary>
    public interface IVehicleInspectionsRepository
    {

        /// <summary>Gets all by company identifier.</summary>
        /// <param name="companyId">The company identifier.</param>
        /// <returns>All vehicle inspections.</returns>
        IEnumerable<VehicleInspection> GetAllByCompanyId(long companyId);

        /// <summary>Gets all vehicle identifier.</summary>
        /// <param name="vehicleId">The vehicle identifier.</param>
        /// <returns>All vehicle inspections.</returns>
        IEnumerable<VehicleInspection> GetAllVehicleId(long vehicleId);

        /// <summary>Gets all user identifier.</summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>All vehicle inspections.</returns>
        IEnumerable<VehicleInspection> GetAllUserId(long userId);

        /// <summary>Gets the by identifier.</summary>
        /// <param name="idVehicleInspection">The vehicle inspection identifier.</param>
        /// <returns>Vehicle inspection object.</returns>
        VehicleInspection GetById(long idVehicleInspection);

        /// <summary>Inserts the specified vehicle inspection.</summary>
        /// <param name="vehicleInspection">The vehicle inspection.</param>
        /// <returns>True of false.</returns>
        bool Insert(VehicleInspection vehicleInspection);

        /// <summary>Updates the specified vehicle inspection.</summary>
        /// <param name="vehicleInspection">The vehicle inspection.</param>
        /// <returns>True or false.</returns>
        bool Update(VehicleInspection vehicleInspection);

        /// <summary>Deletes the specified vehicle inspection.</summary>
        /// <param name="IdVehicleInspection">The vehicle inspection.</param>
        /// <returns>True of false.</returns>
        bool Delete(long idVehicleInspection);
      
    }
}
