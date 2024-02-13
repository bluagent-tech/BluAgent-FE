using System.Collections.Generic;

namespace BAv02.Models.DataAccessLayers.Repositories
{

    /// <summary>Interface Repository for Vehicle Inspections Electrical.</summary>
    public interface IVehicleInspectionsElectricalRepository
    {
        /// <summary>Gets all by company identifier.</summary>
        /// <param name="companyId">The company identifier.</param>
        /// <returns>All vehicle inspections Electrical.</returns>
        IEnumerable<VehicleInspectionElectrical> GetAllByCompanyId(long companyId);

        /// <summary>Gets all vehicle identifier.</summary>
        /// <param name="vehicleId">The vehicle identifier.</param>
        /// <returns>All vehicle inspections Electrical.</returns>
        IEnumerable<VehicleInspectionElectrical> GetAllVehicleId(long vehicleId);

        /// <summary>Gets all user identifier.</summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>All vehicle inspections electrical.</returns>
        IEnumerable<VehicleInspectionElectrical> GetAllUserId(long userId);

        /// <summary>Gets the by identifier.</summary>
        /// <param name="idElectrical">The Electrical identifier.</param>
        /// <returns>Vehicle inspection brake object.</returns>
        VehicleInspectionElectrical GetById(long idElectrical);

        /// <summary>Inserts the specified vehicle inspection.</summary>
        /// <param name="vehicleInspectionElectrical">The vehicle inspection electrical.</param>
        /// <returns>True of false.</returns>
        bool Insert(VehicleInspectionElectrical vehicleInspectionElectrical);

        /// <summary>Updates the specified vehicle inspection.</summary>
        /// <param name="vehicleInspectionElectrical">The vehicle inspection electrical.</param>
        /// <returns>True or false.</returns>
        bool Update(VehicleInspectionElectrical vehicleInspectionElectrical);

        /// <summary>Deletes the specified vehicle inspection.</summary>
        /// <param name="idElectrical">The Electrical identifier.</param>
        /// <returns>True of false.</returns>
        bool Delete(long idElectrical);
    }
}
