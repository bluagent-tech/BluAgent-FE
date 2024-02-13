using System.Collections.Generic;

namespace BAv02.Models.DataAccessLayers.Repositories
{
    /// <summary>Interface Vehicle Inspections Suspension repository.</summary>
    public interface IVehicleInspectionsSuspensionRepository
    {
        /// <summary>Gets all by company identifier.</summary>
        /// <param name="companyId">The company identifier.</param>
        /// <returns>All vehicle inspections suspension.</returns>
        IEnumerable<VehicleInspectionSuspension> GetAllByCompanyId(long companyId);

        /// <summary>Gets all vehicle identifier.</summary>
        /// <param name="vehicleId">The vehicle identifier.</param>
        /// <returns>All vehicle inspections suspension.</returns>
        IEnumerable<VehicleInspectionSuspension> GetAllVehicleId(long vehicleId);

        /// <summary>Gets all user identifier.</summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>All vehicle inspections Fuel System.</returns>
        IEnumerable<VehicleInspectionSuspension> GetAllUserId(long userId);

        /// <summary>Gets the by identifier.</summary>
        /// <param name="idSuspension">The Fuel System identifier.</param>
        /// <returns>Vehicle inspection suspension system object.</returns>
        VehicleInspectionSuspension GetById(long idSuspension);

        /// <summary>Inserts the specified vehicle inspection.</summary>
        /// <param name="vehicleInspectionSuspension">The vehicle inspection suspension.</param>
        /// <returns>True of false.</returns>
        bool Insert(VehicleInspectionSuspension vehicleInspectionSuspension);

        /// <summary>Updates the specified vehicle inspection.</summary>
        /// <param name="vehicleInspectionSuspension">The vehicle inspection suspension.</param>
        /// <returns>True or false.</returns>
        bool Update(VehicleInspectionSuspension vehicleInspectionSuspension);

        /// <summary>Deletes the specified vehicle inspection.</summary>
        /// <param name="idSuspension">The Suspension identifier.</param>
        /// <returns>True of false.</returns>
        bool Delete(long idSuspension);
    }
}
