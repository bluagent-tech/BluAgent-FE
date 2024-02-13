using BAv02.Models.DataAccessLayers.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BAv02.Models.DataAccessLayers
{

    /// <summary>Repository for Vehicle Inspections Safe.</summary>
    /// <seealso cref="BAv02.Models.DataAccessLayers.Repositories.IVehicleInspectionsSafeRepository" />
    public class VehicleInspectionsSafeDAL : IVehicleInspectionsSafeRepository
    {
        /// <summary>The context</summary>
        private readonly BAV02Context _context;

        /// <summary>The disposed</summary>
        private bool disposed = false;

        public VehicleInspectionsSafeDAL()
        {
            _context = new BAV02Context();
        }

        public VehicleInspectionsSafeDAL(BAV02Context context)
        {
            _context = context;
        }

        /// <summary>
        /// Deletes the specified vehicle inspection.
        /// </summary>
        /// <param name="idSafe">The Safe identifier.</param>
        /// <returns>
        /// True of false.
        /// </returns>
        public bool Delete(long idSafe)
        {
            bool isValid;
            try
            {
                VehicleInspectionSafe vehicleInspectionSafe = _context.VehicleInspectionSafes.Find(idSafe);
                _context.VehicleInspectionSafes.Remove(vehicleInspectionSafe);
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
        /// <returns>All vehicle inspections Safe.</returns>
        public IEnumerable<VehicleInspectionSafe> GetAllByCompanyId(long companyId)
        {
            IEnumerable<VehicleInspectionSafe> vehicleInspectionSaves = new List<VehicleInspectionSafe>();
            vehicleInspectionSaves = _context.VehicleInspectionSafes.Where(x => x.idCompany == companyId).ToList();
            return vehicleInspectionSaves;
        }

        /// <summary>Gets all user identifier.</summary>
        /// <param name="userId">The Safe identifier.</param>
        /// <returns>All vehicle inspections safe.</returns>
        public IEnumerable<VehicleInspectionSafe> GetAllUserId(long userId)
        {
            IEnumerable<VehicleInspectionSafe> vehicleInspectionSaves = new List<VehicleInspectionSafe>();
            vehicleInspectionSaves = _context.VehicleInspectionSafes.Where(x => x.idUser == userId).ToList();
            return vehicleInspectionSaves;
        }

        /// <summary>Gets all vehicle identifier.</summary>
        /// <param name="vehicleId">The vehicle identifier.</param>
        /// <returns>All vehicle inspections Safe.</returns>
        public IEnumerable<VehicleInspectionSafe> GetAllVehicleId(long vehicleId)
        {
            IEnumerable<VehicleInspectionSafe> vehicleInspectionSaves = new List<VehicleInspectionSafe>();
            vehicleInspectionSaves = _context.VehicleInspectionSafes.Where(x => x.idVehicleInspection == vehicleId).ToList();
            return vehicleInspectionSaves;
        }

        /// <summary>Gets the by identifier.</summary>
        /// <param name="idSafe">The Safe identifier.</param>
        /// <returns>Vehicle inspection safe object.</returns>
        public VehicleInspectionSafe GetById(long idSafe)
        {
            var vehicleInspectionSafe = _context.VehicleInspectionSafes.Where(x => x.idSafe == idSafe).FirstOrDefault();
            return vehicleInspectionSafe;
        }

        /// <summary>Inserts the specified vehicle inspection.</summary>
        /// <param name="vehicleInspectionSafe">The vehicle inspection safe.</param>
        /// <returns>True of false.</returns>
        public bool Insert(VehicleInspectionSafe vehicleInspectionSafe)
        {
            bool isValid;
            try
            {
                _context.VehicleInspectionSafes.Add(vehicleInspectionSafe);
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
        /// <param name="vehicleInspectionSafe">The vehicle inspection safe.</param>
        /// <returns>True or false.</returns>
        public bool Update(VehicleInspectionSafe vehicleInspectionSafe)
        {
            bool isValid;
            try
            {
                _context.Entry(vehicleInspectionSafe).State = EntityState.Modified;
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
