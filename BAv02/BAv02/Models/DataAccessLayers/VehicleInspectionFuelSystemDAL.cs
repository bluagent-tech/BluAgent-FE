using BAv02.Models.DataAccessLayers.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BAv02.Models.DataAccessLayers
{
    public class VehicleInspectionFuelSystemDAL: IVehicleInspectionsFuelSystemRepository
    {
        /// <summary>The context</summary>
        private readonly BAV02Context _context;

        /// <summary>The disposed</summary>
        private bool disposed = false;

        public VehicleInspectionFuelSystemDAL()
        {
            _context = new BAV02Context();
        }

        /// <summary>Initializes a new instance of the <see cref="VehicleInspectionFuelSystemDAL"/> class.</summary>
        /// <param name="context">The context.</param>
        public VehicleInspectionFuelSystemDAL(BAV02Context context)
        {
            _context = context;
        }

        /// <summary>Gets all by company identifier.</summary>
        /// <param name="companyId">The company identifier.</param>
        /// <returns>All vehicle inspections Fuel System.</returns>
        public IEnumerable<VehicleInspectionFuelSystem> GetAllByCompanyId(long companyId)
        {
            IEnumerable<VehicleInspectionFuelSystem> vehicleInspectionFuelSystems = new List<VehicleInspectionFuelSystem>();
            vehicleInspectionFuelSystems = _context.VehicleInspectionFuelSystems.Where(x => x.idCompany == companyId).ToList();
            return vehicleInspectionFuelSystems;
        }

        /// <summary>Gets all vehicle identifier.</summary>
        /// <param name="vehicleId">The vehicle identifier.</param>
        /// <returns>All vehicle inspections Fuel System.</returns>
        public IEnumerable<VehicleInspectionFuelSystem> GetAllVehicleId(long vehicleId)
        {
            IEnumerable<VehicleInspectionFuelSystem> vehicleInspectionFuelSystems = new List<VehicleInspectionFuelSystem>();
            vehicleInspectionFuelSystems = _context.VehicleInspectionFuelSystems.Where(x => x.idVehicleInspection == vehicleId).ToList();
            return vehicleInspectionFuelSystems;
        }

        /// <summary>Gets all user identifier.</summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>All vehicle inspections Fuel System.</returns>
        public IEnumerable<VehicleInspectionFuelSystem> GetAllUserId(long userId)
        {
            IEnumerable<VehicleInspectionFuelSystem> vehicleInspectionFuelSystems = new List<VehicleInspectionFuelSystem>();
            vehicleInspectionFuelSystems = _context.VehicleInspectionFuelSystems.Where(x => x.idUser == userId).ToList();
            return vehicleInspectionFuelSystems;
        }


        /// <summary>Gets the by identifier.</summary>
        /// <param name="idFuelSystem">The Fuel System identifier.</param>
        /// <returns>Vehicle inspection brake object.</returns>
        public VehicleInspectionFuelSystem GetById(long idFuelSystem)
        {
            var vehicleInspection = _context.VehicleInspectionFuelSystems.Where(x => x.idFuelSystem == idFuelSystem).FirstOrDefault();
            return vehicleInspection;
        }


        /// <summary>Inserts the specified vehicle inspection.</summary>
        /// <param name="vehicleInspectionFuel">The vehicle inspection fuel system.</param>
        /// <returns>True of false.</returns>
        public bool Insert(VehicleInspectionFuelSystem vehicleInspectionFuel)
        {
            bool isValid;
            try
            {
                _context.VehicleInspectionFuelSystems.Add(vehicleInspectionFuel);
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
        /// <param name="vehicleInspectionFuel">The vehicle inspection fuel system.</param>
        /// <returns>True or false.</returns>
        public bool Update(VehicleInspectionFuelSystem vehicleInspectionFuel)
        {
            bool isValid;
            try
            {
                _context.Entry(vehicleInspectionFuel).State = EntityState.Modified;
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
