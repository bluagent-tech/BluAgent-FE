using BAv02.Models.DataAccessLayers.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BAv02.Models.DataAccessLayers
{
    /// <summary>Repository for Vehicle Inspections Steering Mechanism</summary>
    /// <seealso cref="BAv02.Models.DataAccessLayers.Repositories.IVehicleInspectionsSteeringMechanismRepository" />
    public class VehicleInspectionsSteeringMechanismDAL : IVehicleInspectionsSteeringMechanismRepository
    {
        /// <summary>The context</summary>
        private readonly BAV02Context _context;

        /// <summary>The disposed</summary>
        private bool disposed = false;

        /// <summary>Initializes a new instance of the <see cref="VehicleInspectionsSteeringMechanismDAL"/> class.</summary>
        public VehicleInspectionsSteeringMechanismDAL()
        {
            _context = new BAV02Context();
        }

        /// <summary>Initializes a new instance of the <see cref="VehicleInspectionsSteeringMechanismDAL"/> class.</summary>
        /// <param name="context">The context.</param>
        public VehicleInspectionsSteeringMechanismDAL(BAV02Context context)
        {
            _context = context;
        }

        /// <summary>Deletes the specified vehicle inspection.</summary>
        /// <param name="idSteeringMechanism">The Fuel System identifier.</param>
        /// <returns>True of false.</returns>
        public bool Delete(long idSteeringMechanism)
        {
            bool isValid;
            try
            {
                VehicleInspectionSteeringMechanism vehicleInspectionSteeringMechanism = _context.VehicleInspectionSteeringMechanism.Find(idSteeringMechanism);
                _context.VehicleInspectionSteeringMechanism.Remove(vehicleInspectionSteeringMechanism);
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
        /// <returns>All vehicle inspections Steering Mechanism.</returns>
        public IEnumerable<VehicleInspectionSteeringMechanism> GetAllByCompanyId(long companyId)
        {
            IEnumerable<VehicleInspectionSteeringMechanism> vehicleInspectionSteeringMechanisms = new List<VehicleInspectionSteeringMechanism>();
            vehicleInspectionSteeringMechanisms = _context.VehicleInspectionSteeringMechanism.Where(x => x.idCompany == companyId).ToList();
            return vehicleInspectionSteeringMechanisms;
        }

        /// <summary>Gets all user identifier.</summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>All vehicle inspections Steering Mechanism.</returns>
        public IEnumerable<VehicleInspectionSteeringMechanism> GetAllUserId(long userId)
        {
            IEnumerable<VehicleInspectionSteeringMechanism> vehicleInspectionSteeringMechanisms = new List<VehicleInspectionSteeringMechanism>();
            vehicleInspectionSteeringMechanisms = _context.VehicleInspectionSteeringMechanism.Where(x => x.idUser == userId).ToList();
            return vehicleInspectionSteeringMechanisms;
        }

        /// <summary>Gets all vehicle identifier.</summary>
        /// <param name="vehicleId">The vehicle identifier.</param>
        /// <returns>All vehicle inspections Steering Mechanism.</returns>
        public IEnumerable<VehicleInspectionSteeringMechanism> GetAllVehicleId(long vehicleId)
        {
            IEnumerable<VehicleInspectionSteeringMechanism> vehicleInspectionSteeringMechanisms = new List<VehicleInspectionSteeringMechanism>();
            vehicleInspectionSteeringMechanisms = _context.VehicleInspectionSteeringMechanism.Where(x => x.idVehicleInspection == vehicleId).ToList();
            return vehicleInspectionSteeringMechanisms;
        }

        /// <summary>Gets the by identifier.</summary>
        /// <param name="idSteeringMechanism">The Steering Mechanism System identifier.</param>
        /// <returns>Vehicle inspection fuel system object.</returns>
        public VehicleInspectionSteeringMechanism GetById(long idSteeringMechanism)
        {
            var vehicleInspectionSteeringMechanisms = _context.VehicleInspectionSteeringMechanism.Where(x => x.idSteeringMechanism == idSteeringMechanism).FirstOrDefault();
            return vehicleInspectionSteeringMechanisms;
        }

        /// <summary>Inserts the specified vehicle inspection.</summary>
        /// <param name="vehicleInspectionSteeringMechanism">The vehicle inspection steering mechanism.</param>
        /// <returns>True of false.</returns>
        public bool Insert(VehicleInspectionSteeringMechanism vehicleInspectionSteeringMechanism)
        {
            bool isValid;
            try
            {
                _context.VehicleInspectionSteeringMechanism.Add(vehicleInspectionSteeringMechanism);
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
        /// <param name="vehicleInspectionSteeringMechanism">The vehicle inspection steering mechanism.</param>
        /// <returns>True or false.</returns>
        public bool Update(VehicleInspectionSteeringMechanism vehicleInspectionSteeringMechanism)
        {
            bool isValid;
            try
            {
                _context.Entry(vehicleInspectionSteeringMechanism).State = EntityState.Modified;
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
