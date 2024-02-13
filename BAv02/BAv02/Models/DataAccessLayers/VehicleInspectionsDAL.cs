using BAv02.Models.DataAccessLayers.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BAv02.Models.DataAccessLayers
{

    /// <summary>Repository for Vehicle Inspections.</summary>
    /// <seealso cref="BAv02.Models.DataAccessLayers.Repositories.IVehicleInspectionsRepository" />
    public class VehicleInspectionsDAL : IVehicleInspectionsRepository
    {

        /// <summary>The context</summary>
        private readonly BAV02Context _context;

        /// <summary>The disposed</summary>
        private bool disposed = false;


        /// <summary>Initializes a new instance of the <see cref="VehicleInspectionsDAL"/> class.</summary>
        public VehicleInspectionsDAL()
        {
            _context = new BAV02Context();
        }


        /// <summary>Initializes a new instance of the <see cref="VehicleInspectionsDAL"/> class.</summary>
        /// <param name="context">The context.</param>
        public VehicleInspectionsDAL(BAV02Context context)
        {
            _context = context;
        }

        /// <summary>Deletes the specified vehicle inspection.</summary>
        /// <param name="idVehicleInspection">Vehicle inspection identifier.</param>
        /// <returns>True of false.</returns>
        public bool Delete(long idVehicleInspection)
        {
            bool isValid;
            try
            {
                VehicleInspection vehicleInspection = _context.VehicleInspections.Find(idVehicleInspection);
                _context.VehicleInspections.Remove(vehicleInspection);
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
        /// <returns>All vehicle inspections.</returns>
        public IEnumerable<VehicleInspection> GetAllByCompanyId(long companyId)
        {
            IEnumerable<VehicleInspection> vehicleInspections = new List<VehicleInspection>();
            vehicleInspections = _context.VehicleInspections.Where(x => x.IdCompany == companyId).ToList();
            return vehicleInspections;
        }

        /// <summary>Gets all user identifier.</summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>Vehicle Inspection object.</returns>
        public IEnumerable<VehicleInspection> GetAllUserId(long userId)
        {
            IEnumerable<VehicleInspection> vehicleInspections = new List<VehicleInspection>();
            vehicleInspections = _context.VehicleInspections.Where(x => x.IdUser == userId).ToList();
            return vehicleInspections;
        }

        /// <summary>Gets all vehicle identifier.</summary>
        /// <param name="vehicleId">The vehicle identifier.</param>
        /// <returns>All vehicle inspections.</returns>
        public IEnumerable<VehicleInspection> GetAllVehicleId(long vehicleId)
        {
            IEnumerable<VehicleInspection> vehicleInspections = new List<VehicleInspection>();
            vehicleInspections = _context.VehicleInspections.Where(x => x.IdVehicle == vehicleId).ToList();
            return vehicleInspections;
        }

        /// <summary>Gets the by identifier.</summary>
        /// <param name="idVehicleInspection"></param>
        /// <returns>Vehicle inspection object.</returns>
        public VehicleInspection GetById(long idVehicleInspection)
        {
            var vehicleInspection = _context.VehicleInspections.Where(x => x.Id == idVehicleInspection).FirstOrDefault();
            return vehicleInspection;
        }

        /// <summary>Inserts the specified vehicle inspection.</summary>
        /// <param name="vehicleInspection">The vehicle inspection.</param>
        /// <returns>True of false.</returns>
        public bool Insert(VehicleInspection vehicleInspection)
        {
            bool isValid;
            try
            {
                 _context.VehicleInspections.AddAsync(vehicleInspection);
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
        /// <param name="vehicleInspection">The vehicle inspection.</param>
        /// <returns>True or false.</returns>
        public bool Update(VehicleInspection vehicleInspection)
        {
            bool isValid;
            try
            {
                _context.Entry(vehicleInspection).State = EntityState.Modified;
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

        bool IVehicleInspectionsRepository.Insert(VehicleInspection vehicleInspection)
        {
            throw new NotImplementedException();
        }
    }
}
