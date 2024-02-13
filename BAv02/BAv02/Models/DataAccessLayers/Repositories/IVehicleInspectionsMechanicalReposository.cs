using System.Collections.Generic;

namespace BAv02.Models.DataAccessLayers.Repositories
{

    /// <summary>Interface for VehicleInspectionMechanical repository.</summary>
    public interface IVehicleInspectionsMechanicalReposository
    {
        /// <summary>Gets all by company identifier.</summary>
        /// <param name="companyId">The company identifier.</param>
        /// <returns>All vehicle inspections mechanical.</returns>
        IEnumerable<VehicleInspectionMechanical> GetAllByCompanyId(long companyId);

        /// <summary>Gets all vehicle identifier.</summary>
        /// <param name="vehicleId">The vehicle identifier.</param>
        /// <returns>All vehicle inspections mechanical.</returns>
        IEnumerable<VehicleInspectionMechanical> GetAllVehicleId(long vehicleId);

        /// <summary>Gets all user identifier.</summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>All vehicle inspections mechanical.</returns>
        IEnumerable<VehicleInspectionMechanical> GetAllUserId(long userId);

        /// <summary>Gets the by identifier.</summary>
        /// <param name="idMechanical">The Mechanical identifier.</param>
        /// <returns>Vehicle inspection mechanical system object.</returns>
        VehicleInspectionMechanical GetById(long idMechanical);

        /// <summary>Inserts the specified vehicle inspection.</summary>
        /// <param name="vehicleInspectionMechanical">The vehicle inspection mechanical.</param>
        /// <returns>True of false.</returns>
        bool Insert(VehicleInspectionMechanical vehicleInspectionMechanical);

        /// <summary>Updates the specified vehicle inspection.</summary>
        /// <param name="vehicleInspectionFuel">The vehicle inspection mechanical.</param>
        /// <returns>True or false.</returns>
        bool Update(VehicleInspectionMechanical vehicleInspectionMechanical);

        /// <summary>Deletes the specified vehicle inspection.</summary>
        /// <param name="idMechanical">The Mechanical identifier.</param>
        /// <returns>True of false.</returns>
        bool Delete(long idMechanical);
    }
}
