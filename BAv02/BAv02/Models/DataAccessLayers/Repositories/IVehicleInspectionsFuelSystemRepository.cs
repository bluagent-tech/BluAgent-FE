using System.Collections.Generic;

namespace BAv02.Models.DataAccessLayers.Repositories
{

    /// <summary>Interface for vehicle inspections fuel system.</summary>
    public interface IVehicleInspectionsFuelSystemRepository
    {
        /// <summary>Gets all by company identifier.</summary>
        /// <param name="companyId">The company identifier.</param>
        /// <returns>All vehicle inspections Fuel System.</returns>
        IEnumerable<VehicleInspectionFuelSystem> GetAllByCompanyId(long companyId);

        /// <summary>Gets all vehicle identifier.</summary>
        /// <param name="vehicleId">The vehicle identifier.</param>
        /// <returns>All vehicle inspections Fuel System.</returns>
        IEnumerable<VehicleInspectionFuelSystem> GetAllVehicleId(long vehicleId);

        /// <summary>Gets all user identifier.</summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>All vehicle inspections Fuel System.</returns>
        IEnumerable<VehicleInspectionFuelSystem> GetAllUserId(long userId);

        /// <summary>Gets the by identifier.</summary>
        /// <param name="idFuelSystem">The Fuel System identifier.</param>
        /// <returns>Vehicle inspection fuel system object.</returns>
        VehicleInspectionFuelSystem GetById(long idFuelSystem);

        /// <summary>Inserts the specified vehicle inspection.</summary>
        /// <param name="vehicleInspectionFuel">The vehicle inspection fuel system.</param>
        /// <returns>True of false.</returns>
        bool Insert(VehicleInspectionFuelSystem vehicleInspectionFuel);

        /// <summary>Updates the specified vehicle inspection.</summary>
        /// <param name="vehicleInspectionFuel">The vehicle inspection fuel system.</param>
        /// <returns>True or false.</returns>
        bool Update(VehicleInspectionFuelSystem vehicleInspectionFuel);

        /// <summary>Deletes the specified vehicle inspection.</summary>
        /// <param name="idFuelSystem">The Fuel System identifier.</param>
        /// <returns>True of false.</returns>
        bool Delete(long idFuelSystem);
    }
}
