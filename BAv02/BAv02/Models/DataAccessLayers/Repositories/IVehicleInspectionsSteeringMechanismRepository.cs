using System.Collections.Generic;

namespace BAv02.Models.DataAccessLayers.Repositories
{
    public interface IVehicleInspectionsSteeringMechanismRepository
    {
        /// <summary>Gets all by company identifier.</summary>
        /// <param name="companyId">The company identifier.</param>
        /// <returns>All vehicle inspections Steering Mechanism.</returns>
        IEnumerable<VehicleInspectionSteeringMechanism> GetAllByCompanyId(long companyId);

        /// <summary>Gets all vehicle identifier.</summary>
        /// <param name="vehicleId">The vehicle identifier.</param>
        /// <returns>All vehicle inspections Steering Mechanism.</returns>
        IEnumerable<VehicleInspectionSteeringMechanism> GetAllVehicleId(long vehicleId);

        /// <summary>Gets all user identifier.</summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>All vehicle inspections Steering Mechanism.</returns>
        IEnumerable<VehicleInspectionSteeringMechanism> GetAllUserId(long userId);

        /// <summary>Gets the by identifier.</summary>
        /// <param name="idSteeringMechanism">The Steering Mechanism System identifier.</param>
        /// <returns>Vehicle inspection fuel system object.</returns>
        VehicleInspectionSteeringMechanism GetById(long idSteeringMechanism);

        /// <summary>Inserts the specified vehicle inspection.</summary>
        /// <param name="vehicleInspectionSteeringMechanism">The vehicle inspection steering mechanism.</param>
        /// <returns>True of false.</returns>
        bool Insert(VehicleInspectionSteeringMechanism vehicleInspectionSteeringMechanism);

        /// <summary>Updates the specified vehicle inspection.</summary>
        /// <param name="vehicleInspectionSteeringMechanism">The vehicle inspection steering mechanism.</param>
        /// <returns>True or false.</returns>
        bool Update(VehicleInspectionSteeringMechanism vehicleInspectionSteeringMechanism);

        /// <summary>Deletes the specified vehicle inspection.</summary>
        /// <param name="idSteeringMechanism">The Fuel System identifier.</param>
        /// <returns>True of false.</returns>
        bool Delete(long idSteeringMechanism);
    }
}
