using System.Collections.Generic;

namespace BAv02.Models.DataAccessLayers.Repositories
{
    public interface IVehicleInspectionsHeatingRepository
    {
        /// <summary>Gets all by company identifier.</summary>
        /// <param name="companyId">The company identifier.</param>
        /// <returns>All vehicle inspections Heating.</returns>
        IEnumerable<VehicleInspectionHeating> GetAllByCompanyId(long companyId);

        /// <summary>Gets all vehicle identifier.</summary>
        /// <param name="vehicleId">The vehicle identifier.</param>
        /// <returns>All vehicle inspections Heating.</returns>
        IEnumerable<VehicleInspectionHeating> GetAllVehicleId(long vehicleId);

        /// <summary>Gets all user identifier.</summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>All vehicle inspections Heating.</returns>
        IEnumerable<VehicleInspectionHeating> GetAllUserId(long userId);

        /// <summary>Gets the by identifier.</summary>
        /// <param name="idFuelSystem">The Fuel System identifier.</param>
        /// <returns>Vehicle inspection heating object.</returns>
        VehicleInspectionHeating GetById(long idFuelSystem);

        /// <summary>Inserts the specified vehicle inspection.</summary>
        /// <param name="vehicleInspectionHeating">The vehicle inspection heating.</param>
        /// <returns>True of false.</returns>
        bool Insert(VehicleInspectionHeating vehicleInspectionHeating);

        /// <summary>Updates the specified vehicle inspection.</summary>
        /// <param name="vehicleInspectionHeating">The vehicle inspection heating.</param>
        /// <returns>True or false.</returns>
        bool Update(VehicleInspectionHeating vehicleInspectionHeating);

        /// <summary>Deletes the specified vehicle inspection.</summary>
        /// <param name="idHeating">The Heating identifier.</param>
        /// <returns>True of false.</returns>
        bool Delete(long idHeating);
    }
}
