using BAv02.Models.DataAccessLayers.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BAv02.Models.DataAccessLayers
{

    /// <summary>Repository for Vehicle Inspections Heating.</summary>
    /// <seealso cref="BAv02.Models.DataAccessLayers.Repositories.IVehicleInspectionsHeatingRepository" />
    public class VehicleInspectionsHeatingDAL : IVehicleInspectionsHeatingRepository
    {
        /// <summary>The context</summary>
        private readonly BAV02Context _context;

        /// <summary>The disposed</summary>
        private bool disposed = false;

        public VehicleInspectionsHeatingDAL()
        {
            _context = new BAV02Context();
        }

        /// <summary>Initializes a new instance of the <see cref="VehicleInspectionsHeatingDAL"/> class.</summary>
        /// <param name="context">The context.</param>
        public VehicleInspectionsHeatingDAL(BAV02Context context)
        {
            _context = context;
        }

        /// <summary>Deletes the specified vehicle inspection.</summary>
        /// <param name="idHeating">The Heating identifier.</param>
        /// <returns>True of false.</returns>
        public bool Delete(long idHeating)
        {
            bool isValid;
            try
            {
                VehicleInspectionHeating vehicleInspectionHeating = _context.VehicleInspectionHeatings.Find(idHeating);
                _context.VehicleInspectionHeatings.Remove(vehicleInspectionHeating);
                isValid = true;
            }
            catch (Exception)
            {

                isValid = false;
            }
            return isValid;
        }

        /// <summary>Gets all by company identifier.</summary>
        /// <param name="companyId">The company identifier.</param>
        /// <returns>All vehicle inspections Heating.</returns>
        public IEnumerable<VehicleInspectionHeating> GetAllByCompanyId(long companyId)
        {
            IEnumerable<VehicleInspectionHeating> vehicleInspectionHeatings = new List<VehicleInspectionHeating>();
            vehicleInspectionHeatings = _context.VehicleInspectionHeatings.Where(x => x.IdCompany == companyId).ToList();
            return vehicleInspectionHeatings;
        }

        /// <summary>Gets all user identifier.</summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>All vehicle inspections Heating.</returns>
        public IEnumerable<VehicleInspectionHeating> GetAllUserId(long userId)
        {
            IEnumerable<VehicleInspectionHeating> vehicleInspectionHeatings = new List<VehicleInspectionHeating>();
            vehicleInspectionHeatings = _context.VehicleInspectionHeatings.Where(x => x.IdUser == userId).ToList();
            return vehicleInspectionHeatings;
        }

        /// <summary>Gets all vehicle identifier.</summary>
        /// <param name="vehicleId">The vehicle identifier.</param>
        /// <returns>All vehicle inspections Heating.</returns>
        public IEnumerable<VehicleInspectionHeating> GetAllVehicleId(long vehicleId)
        {
            IEnumerable<VehicleInspectionHeating> vehicleInspectionHeatings = new List<VehicleInspectionHeating>();
            vehicleInspectionHeatings = _context.VehicleInspectionHeatings.Where(x => x.IdVehicleInspection == vehicleId).ToList();
            return vehicleInspectionHeatings;
        }

        /// <summary>Gets the by identifier.</summary>
        /// <param name="idHeating">The identifier heating.</param>
        /// <returns></returns>
        public VehicleInspectionHeating GetById(long idHeating)
        {
            var vehicleInspectionHeating = _context.VehicleInspectionHeatings.Where(x => x.Id == idHeating).FirstOrDefault();
            return vehicleInspectionHeating;
        }

        /// <summary>Inserts the specified vehicle inspection.</summary>
        /// <param name="vehicleInspectionHeating">The vehicle inspection heating.</param>
        /// <returns>True of false.</returns>
        public bool Insert(VehicleInspectionHeating vehicleInspectionHeating)
        {
            bool isValid;
            try
            {
                _context.VehicleInspectionHeatings.Add(vehicleInspectionHeating);
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
        /// <param name="vehicleInspectionHeating">The vehicle inspection heating.</param>
        /// <returns>True or false.</returns>
        public bool Update(VehicleInspectionHeating vehicleInspectionHeating)
        {
            bool isValid;
            try
            {
                _context.Entry(vehicleInspectionHeating).State = EntityState.Modified;
                _context.SaveChanges();
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
