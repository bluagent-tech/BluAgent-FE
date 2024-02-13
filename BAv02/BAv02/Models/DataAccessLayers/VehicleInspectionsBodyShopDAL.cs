using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BAv02.Models.DataAccessLayers
{
    public class VehicleInspectionsBodyShopDAL
    {
        /// <summary>The context</summary>
        private readonly BAV02Context _context;

        /// <summary>The disposed</summary>
        private bool disposed = false;

        public VehicleInspectionsBodyShopDAL()
        {
            _context = new BAV02Context();
        }

        /// <summary>Initializes a new instance of the <see cref="VehicleInspectionsBodyShopDAL"/> class.</summary>
        /// <param name="context">The context.</param>
        public VehicleInspectionsBodyShopDAL(BAV02Context context)
        {
            _context = context;
        }

        /// <summary>Gets all by company identifier.</summary>
        /// <param name="companyId">The company identifier.</param>
        /// <returns>All vehicle inspections bodyshop.</returns>
        public IEnumerable<VehicleInspectionBodyShop> GetAllByCompanyId(long companyId)
        {
            IEnumerable<VehicleInspectionBodyShop> VehicleInspectionBodyShops = new List<VehicleInspectionBodyShop>();
            VehicleInspectionBodyShops = _context.VehicleInspectionBodyShops.Where(x => x.IdCompany == companyId).ToList();
            return VehicleInspectionBodyShops;
        }

        /// <summary>Gets all vehicle identifier.</summary>
        /// <param name="vehicleId">The vehicle identifier.</param>
        /// <returns>All vehicle inspections bodyshop.</returns>
        public IEnumerable<VehicleInspectionBodyShop> GetAllVehicleId(long vehicleId)
        {
            IEnumerable<VehicleInspectionBodyShop> VehicleInspectionBodyShops = new List<VehicleInspectionBodyShop>();
            VehicleInspectionBodyShops = _context.VehicleInspectionBodyShops.Where(x => x.IdVehicleInspection == vehicleId).ToList();
            return VehicleInspectionBodyShops;
        }

        /// <summary>Gets all user identifier.</summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>All vehicle inspections Fuel System.</returns>
        public IEnumerable<VehicleInspectionBodyShop> GetAllUserId(long userId)
        {
            IEnumerable<VehicleInspectionBodyShop> VehicleInspectionBodyShops = new List<VehicleInspectionBodyShop>();
            VehicleInspectionBodyShops = _context.VehicleInspectionBodyShops.Where(x => x.IdUser == userId).ToList();
            return VehicleInspectionBodyShops;
        }


        /// <summary>Gets the by identifier.</summary>
        /// <param name="idBodyShop">The BodyShop identifier.</param>
        /// <returns>Vehicle inspection bodyshop object.</returns>
        public VehicleInspectionBodyShop GetById(long idBodyShop)
        {
            var vehicleInspectionBodyShop = _context.VehicleInspectionBodyShops.Where(x => x.Id == idBodyShop).FirstOrDefault();
            return vehicleInspectionBodyShop;
        }


        /// <summary>Inserts the specified vehicle inspection.</summary>
        /// <param name="vehicleInspectionBodyShop">The vehicle inspection bodyshop.</param>
        /// <returns>True of false.</returns>
        public bool Insert(VehicleInspectionBodyShop vehicleInspectionBodyShop)
        {
            bool isValid;
            try
            {
                _context.VehicleInspectionBodyShops.Add(vehicleInspectionBodyShop);
                _context.SaveChanges();
                isValid = true;
            }
            catch (Exception)
            {

                isValid = false;
            }
            return isValid;
        }


        /// <summary>Updates the specified vehicle inspection.</summary>
        /// <param name="vehicleInspectionBodyShop">The vehicle inspection bodyshop.</param>
        /// <returns>True or false.</returns>
        public bool Update(VehicleInspectionBodyShop vehicleInspectionBodyShop)
        {
            bool isValid;
            try
            {
                _context.Entry(vehicleInspectionBodyShop).State = EntityState.Modified;
                _context.SaveChanges();
                isValid = true;
            }
            catch (Exception)
            {

                isValid = false;
            }
            return isValid;
        }


        /// <summary>Deletes the specified vehicle inspection.</summary>
        /// <param name="idFuelSystem">The Fuel System identifier.</param>
        /// <returns>True of false.</returns>
        public bool Delete(long idFuelSystem)
        {
            bool isValid;
            try
            {
                VehicleInspection vehicleInspection = _context.VehicleInspections.Find(idFuelSystem);
                _context.VehicleInspections.Remove(vehicleInspection);
                isValid = true;
            }
            catch (Exception)
            {

                isValid = false;
            }
            return isValid;
        }

        /// <summary>Releases unmanaged and - optionally - managed resources.</summary>
        /// <param name="disposing">
        ///   <c>true</c> to release both managed and unmanaged resources; <c>false</c> to release only unmanaged resources.</param>
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        /// <summary>Releases unmanaged and - optionally - managed resources.</summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
