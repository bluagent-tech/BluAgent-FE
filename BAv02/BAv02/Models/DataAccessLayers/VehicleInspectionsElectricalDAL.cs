using BAv02.Models.DataAccessLayers.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BAv02.Models.DataAccessLayers
{

    /// <summary>Repository for Vehicle Inspections Electrical.</summary>
    /// <seealso cref="BAv02.Models.DataAccessLayers.Repositories.IVehicleInspectionsElectricalRepository" />
    public class VehicleInspectionsElectricalDAL:IVehicleInspectionsElectricalRepository
    {
        /// <summary>The context</summary>
        private readonly BAV02Context _context;

        /// <summary>The disposed</summary>
        private bool disposed = false;


        /// <summary>Initializes a new instance of the <see cref="VehicleInspectionsElectricalDAL"/> class.</summary>
        public VehicleInspectionsElectricalDAL()
        {
            _context = new BAV02Context();
        }

        /// <summary>Initializes a new instance of the <see cref="VehicleInspectionsElectricalDAL"/> class.</summary>
        /// <param name="context">The context.</param>
        public VehicleInspectionsElectricalDAL(BAV02Context context)
        {
            _context = context;
        }

        /// <summary>Deletes the specified vehicle inspection.</summary>
        /// <param name="idElectrical">The Electrical identifier.</param>
        /// <returns>True of false.</returns>
        public bool Delete(long idElectrical)
        {
            bool isValid;
            try
            {
                VehicleInspectionElectrical vehicleInspectionElectrical = _context.VehicleInspectionElectricals.Find(idElectrical);
                _context.VehicleInspectionElectricals.Remove(vehicleInspectionElectrical);
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
        /// <returns>All vehicle inspections Electrical.</returns>
        public IEnumerable<VehicleInspectionElectrical> GetAllByCompanyId(long companyId)
        {
            IEnumerable<VehicleInspectionElectrical> vehicleInspectionElectricals = new List<VehicleInspectionElectrical>();
            vehicleInspectionElectricals = _context.VehicleInspectionElectricals.Where(x => x.idCompany == companyId).ToList();
            return vehicleInspectionElectricals;
        }

        /// <summary>Gets all user identifier.</summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>All vehicle inspections electrical.</returns>
        public IEnumerable<VehicleInspectionElectrical> GetAllUserId(long userId)
        {
            IEnumerable<VehicleInspectionElectrical> vehicleInspectionElectricals = new List<VehicleInspectionElectrical>();
            vehicleInspectionElectricals = _context.VehicleInspectionElectricals.Where(x => x.idUser == userId).ToList();
            return vehicleInspectionElectricals;
        }

        /// <summary>Gets all vehicle identifier.</summary>
        /// <param name="vehicleId">The vehicle identifier.</param>
        /// <returns>All vehicle inspections Electrical.</returns>
        public IEnumerable<VehicleInspectionElectrical> GetAllVehicleId(long vehicleId)
        {
            IEnumerable<VehicleInspectionElectrical> vehicleInspectionElectricals = new List<VehicleInspectionElectrical>();
            vehicleInspectionElectricals = _context.VehicleInspectionElectricals.Where(x => x.idVehicleInspection == vehicleId).ToList();
            return vehicleInspectionElectricals;
        }

        /// <summary>Gets the by identifier.</summary>
        /// <param name="idElectrical">The Electrical identifier.</param>
        /// <returns>Vehicle inspection brake object.</returns>
        public VehicleInspectionElectrical GetById(long idElectrical)
        {
            var vehicleInspectionElectrical = _context.VehicleInspectionElectricals.Where(x => x.idElectrical == idElectrical).FirstOrDefault();
            return vehicleInspectionElectrical;
        }

        /// <summary>Inserts the specified vehicle inspection.</summary>
        /// <param name="vehicleInspectionElectrical">The vehicle inspection electrical.</param>
        /// <returns>True of false.</returns>
        public bool Insert(VehicleInspectionElectrical vehicleInspectionElectrical)
        {
            bool isValid;
            try
            {
                _context.VehicleInspectionElectricals.Add(vehicleInspectionElectrical);
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
        /// <param name="vehicleInspectionElectrical">The vehicle inspection electrical.</param>
        /// <returns>True or false.</returns>
        public bool Update(VehicleInspectionElectrical vehicleInspectionElectrical)
        {
            bool isValid;
            try
            {
                _context.Entry(vehicleInspectionElectrical).State = EntityState.Modified;
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
