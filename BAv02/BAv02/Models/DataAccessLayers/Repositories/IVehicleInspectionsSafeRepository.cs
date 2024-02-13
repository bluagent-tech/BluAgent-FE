using System.Collections.Generic;

namespace BAv02.Models.DataAccessLayers.Repositories
{
    /// <summary>Interface for VehicleInspectionSafe repository.</summary>
    public interface IVehicleInspectionsSafeRepository
    {
        /// <summary>Gets all by company identifier.</summary>
        /// <param name="companyId">The company identifier.</param>
        /// <returns>All vehicle inspections Safe.</returns>
        IEnumerable<VehicleInspectionSafe> GetAllByCompanyId(long companyId);

        /// <summary>Gets all vehicle identifier.</summary>
        /// <param name="vehicleId">The vehicle identifier.</param>
        /// <returns>All vehicle inspections Safe.</returns>
        IEnumerable<VehicleInspectionSafe> GetAllVehicleId(long vehicleId);

        /// <summary>Gets all user identifier.</summary>
        /// <param name="userId">The Safe identifier.</param>
        /// <returns>All vehicle inspections safe.</returns>
        IEnumerable<VehicleInspectionSafe> GetAllUserId(long userId);

        /// <summary>Gets the by identifier.</summary>
        /// <param name="idSafe">The Safe identifier.</param>
        /// <returns>Vehicle inspection safe object.</returns>
        VehicleInspectionSafe GetById(long idSafe);

        /// <summary>Inserts the specified vehicle inspection.</summary>
        /// <param name="vehicleInspectionSafe">The vehicle inspection safe.</param>
        /// <returns>True of false.</returns>
        bool Insert(VehicleInspectionSafe vehicleInspectionSafe);

        /// <summary>Updates the specified vehicle inspection.</summary>
        /// <param name="vehicleInspectionSafe">The vehicle inspection safe.</param>
        /// <returns>True or false.</returns>
        bool Update(VehicleInspectionSafe vehicleInspectionSafe);

        /// <summary>Deletes the specified vehicle inspection.</summary>
        /// <param name="idSafe">The Safe identifier.</param>
        /// <returns>True of false.</returns>
        bool Delete(long idSafe);
    }
}
