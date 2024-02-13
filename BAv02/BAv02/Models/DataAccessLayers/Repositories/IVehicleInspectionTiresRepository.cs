using System.Collections.Generic;

namespace BAv02.Models.DataAccessLayers.Repositories
{
    public interface IVehicleInspectionTiresRepository
    {
        /// <summary>Gets all by company identifier.</summary>
        /// <param name="companyId">The company identifier.</param>
        /// <returns>All vehicle inspections tire..</returns>
        IEnumerable<VehicleInspectionTire> GetAllByCompanyId(long companyId);

        /// <summary>Gets all vehicle identifier.</summary>
        /// <param name="vehicleId">The vehicle identifier.</param>
        /// <returns>All vehicle inspections tire</returns>
        IEnumerable<VehicleInspectionTire> GetAllVehicleId(long vehicleId);

        /// <summary>Gets all user identifier.</summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>All vehicle inspections Fuel System.</returns>
        IEnumerable<VehicleInspectionTire> GetAllUserId(long userId);

        /// <summary>Gets the by identifier.</summary>
        /// <param name="idTire">The Tire identifier.</param>
        /// <returns>Vehicle inspection fuel system object.</returns>
        VehicleInspectionTire GetById(long idTire);

        /// <summary>Inserts the specified vehicle inspection.</summary>
        /// <param name="vehicleInspectionTire">The vehicle inspection fuel system.</param>
        /// <returns>True of false.</returns>
        bool Insert(VehicleInspectionTire vehicleInspectionTire);

        /// <summary>Updates the specified vehicle inspection.</summary>
        /// <param name="vehicleInspectionFuel">The vehicle inspection fuel system.</param>
        /// <returns>True or false.</returns>
        bool Update(VehicleInspectionTire vehicleInspectionTire);

        /// <summary>Deletes the specified vehicle inspection.</summary>
        /// <param name="idTire">The Tire identifier.</param>
        /// <returns>True of false.</returns>
        bool Delete(long idTire);
    }
}
