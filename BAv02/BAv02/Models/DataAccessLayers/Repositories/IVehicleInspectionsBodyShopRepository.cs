﻿using System.Collections.Generic;

namespace BAv02.Models.DataAccessLayers.Repositories
{
    public interface IVehicleInspectionsBodyShopRepository
    {
        /// <summary>Gets all by company identifier.</summary>
        /// <param name="companyId">The company identifier.</param>
        /// <returns>All vehicle inspections bodyshop.</returns>
        IEnumerable<VehicleInspectionBodyShop> GetAllByCompanyId(long companyId);

        /// <summary>Gets all vehicle identifier.</summary>
        /// <param name="vehicleId">The vehicle identifier.</param>
        /// <returns>All vehicle inspections bodyshop.</returns>
        IEnumerable<VehicleInspectionBodyShop> GetAllVehicleId(long vehicleId);

        /// <summary>Gets all user identifier.</summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>All vehicle inspections bodyshop.</returns>
        IEnumerable<VehicleInspectionBodyShop> GetAllUserId(long userId);

        /// <summary>Gets the by identifier.</summary>
        /// <param name="idFuelSystem">The Fuel System identifier.</param>
        /// <returns>Vehicle inspection bodyshop object.</returns>
        VehicleInspectionBodyShop GetById(long idFuelSystem);

        /// <summary>Inserts the specified vehicle inspection.</summary>
        /// <param name="vehiculeInspectionBodyShop">The vehicle inspection bodyshop.</param>
        /// <returns>True of false.</returns>
        bool Insert(VehicleInspectionBodyShop vehiculeInspectionBodyShop);

        /// <summary>Updates the specified vehicle inspection.</summary>
        /// <param name="vehiculeInspectionBodyShop">The vehicle inspection fuel system.</param>
        /// <returns>True or false.</returns>
        bool Update(VehicleInspectionBodyShop vehiculeInspectionBodyShop);

        /// <summary>Deletes the specified vehicle inspection.</summary>
        /// <param name="idBodyShop">The BodyShop identifier.</param>
        /// <returns>True of false.</returns>
        bool Delete(long idBodyShop);
    }
}
