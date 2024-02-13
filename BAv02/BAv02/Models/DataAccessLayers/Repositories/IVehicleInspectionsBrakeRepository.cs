using System.Collections.Generic;

namespace BAv02.Models.DataAccessLayers.Repositories
{

    /// <summary>Repositorie Interface for VehicleInspectionsBrake</summary>
    public interface IVehicleInspectionsBrakeRepository
    {

        /// <summary>Gets all by company identifier.</summary>
        /// <param name="companyId">The company identifier.</param>
        /// <returns>All vehicle inspections Brake.</returns>
        IEnumerable<VehicleInspectionBrakes> GetAllByCompanyId(long companyId);

        /// <summary>Gets all vehicle identifier.</summary>
        /// <param name="vehicleId">The vehicle identifier.</param>
        /// <returns>All vehicle inspections brakes.</returns>
        IEnumerable<VehicleInspectionBrakes> GetAllVehicleId(long vehicleId);

        /// <summary>Gets all user identifier.</summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>All vehicle inspections brakes.</returns>
        IEnumerable<VehicleInspectionBrakes> GetAllUserId(long userId);

        /// <summary>Gets the by identifier.</summary>
        /// <param name="idBrake">The Brake identifier.</param>
        /// <returns>Vehicle inspection brake object.</returns>
        VehicleInspectionBrakes GetById(long idBrake);

        /// <summary>Inserts the specified vehicle inspection.</summary>
        /// <param name="vehicleInspectionBrake">The vehicle inspection.</param>
        /// <returns>True of false.</returns>
        bool Insert(VehicleInspectionBrakes vehicleInspectionBrake);

        /// <summary>Updates the specified vehicle inspection.</summary>
        /// <param name="vehicleInspectionBrake">The vehicle inspection.</param>
        /// <returns>True or false.</returns>
        bool Update(VehicleInspectionBrakes vehicleInspectionBrake);

        /// <summary>Deletes the specified vehicle inspection.</summary>
        /// <param name="idBrake">The Brake identifier.</param>
        /// <returns>True of false.</returns>
        bool Delete(long idBrake);
    }
}
