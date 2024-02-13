using BAv02.Models.DataAccessLayers.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BAv02.Models.DataAccessLayers
{
    public class VehicleInspectionsSuspensionDAL : IVehicleInspectionsSuspensionRepository
    {
        /// <summary>The context</summary>
        private readonly BAV02Context _context;

        /// <summary>The disposed</summary>
        private bool disposed = false;

        public VehicleInspectionsSuspensionDAL()
        {
            _context = new BAV02Context();
        }

        /// <summary>Initializes a new instance of the <see cref="VehicleInspectionsSuspensionDAL"/> class.</summary>
        /// <param name="context">The context.</param>
        public VehicleInspectionsSuspensionDAL(BAV02Context context)
        {
            _context = context;
        }

        /// <summary>Deletes the specified vehicle inspection.</summary>
        /// <param name="idSuspension">The Suspension identifier.</param>
        /// <returns>True of false.</returns>
        public bool Delete(long idSuspension)
        {
            bool isValid;
            try
            {
                VehicleInspectionSuspension vehicleInspectionSuspension = _context.VehicleInspectionSuspensions.Find(idSuspension);
                _context.VehicleInspectionSuspensions.Remove(vehicleInspectionSuspension);
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
        /// <returns>All vehicle inspections suspension.</returns>
        public IEnumerable<VehicleInspectionSuspension> GetAllByCompanyId(long companyId)
        {
            IEnumerable<VehicleInspectionSuspension> vehicleInspectionSuspensions = new List<VehicleInspectionSuspension>();
            vehicleInspectionSuspensions = _context.VehicleInspectionSuspensions.Where(x => x.IdCompany == companyId).ToList();
            return vehicleInspectionSuspensions;
        }

        /// <summary>Gets all user identifier.</summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>All vehicle inspections Fuel System.</returns>
        public IEnumerable<VehicleInspectionSuspension> GetAllUserId(long userId)
        {
            IEnumerable<VehicleInspectionSuspension> vehicleInspectionSuspensions = new List<VehicleInspectionSuspension>();
            vehicleInspectionSuspensions = _context.VehicleInspectionSuspensions.Where(x => x.IdUser == userId).ToList();
            return vehicleInspectionSuspensions;
        }

        /// <summary>Gets all vehicle identifier.</summary>
        /// <param name="vehicleId">The vehicle identifier.</param>
        /// <returns>All vehicle inspections suspension.</returns>
        public IEnumerable<VehicleInspectionSuspension> GetAllVehicleId(long vehicleId)
        {
            IEnumerable<VehicleInspectionSuspension> vehicleInspectionSuspensions = new List<VehicleInspectionSuspension>();
            vehicleInspectionSuspensions = _context.VehicleInspectionSuspensions.Where(x => x.IdVehicleInspection == vehicleId).ToList();
            return vehicleInspectionSuspensions;
        }

        /// <summary>Gets the by identifier.</summary>
        /// <param name="idSuspension">The Fuel System identifier.</param>
        /// <returns>Vehicle inspection suspension system object.</returns>
        public VehicleInspectionSuspension GetById(long idSuspension)
        {
            var vehicleInspectionSuspension = _context.VehicleInspectionSuspensions.Where(x => x.Id == idSuspension).FirstOrDefault();
            return vehicleInspectionSuspension;
        }

        /// <summary>Inserts the specified vehicle inspection.</summary>
        /// <param name="vehicleInspectionSuspension">The vehicle inspection suspension.</param>
        /// <returns>True of false.</returns>
        public bool Insert(VehicleInspectionSuspension vehicleInspectionSuspension)
        {
            bool isValid;
            try
            {
                _context.VehicleInspectionSuspensions.Add(vehicleInspectionSuspension);
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
        /// <param name="vehicleInspectionSuspension">The vehicle inspection suspension.</param>
        /// <returns>True or false.</returns>
        public bool Update(VehicleInspectionSuspension vehicleInspectionSuspension)
        {
            bool isValid;
            try
            {
                _context.Entry(vehicleInspectionSuspension).State = EntityState.Modified;
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
