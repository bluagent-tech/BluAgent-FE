using BAv02.Models.DataAccessLayers.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BAv02.Models.DataAccessLayers
{
    public class VehicleInspectionsTiresDAL : IVehicleInspectionTiresRepository
    {
        /// <summary>The context</summary>
        private readonly BAV02Context _context;

        /// <summary>The disposed</summary>
        private bool disposed = false;

        public VehicleInspectionsTiresDAL()
        {
            _context = new BAV02Context();
        }

        /// <summary>Initializes a new instance of the <see cref="VehicleInspectionsTiresDAL"/> class.</summary>
        /// <param name="context">The context.</param>
        public VehicleInspectionsTiresDAL(BAV02Context context)
        {
            _context = context;
        }

        /// <summary>Gets all by company identifier.</summary>
        /// <param name="companyId">The company identifier.</param>
        /// <returns>All vehicle inspections Fuel System.</returns>
        public IEnumerable<VehicleInspectionTire> GetAllByCompanyId(long companyId)
        {
            IEnumerable<VehicleInspectionTire> VehicleInspectionTires = new List<VehicleInspectionTire>();
            VehicleInspectionTires = _context.VehicleInspectionTires.Where(x => x.idCompany == companyId).ToList();
            return VehicleInspectionTires;
        }

        /// <summary>Gets all vehicle identifier.</summary>
        /// <param name="vehicleId">The vehicle identifier.</param>
        /// <returns>All vehicle inspections Fuel System.</returns>
        public IEnumerable<VehicleInspectionTire> GetAllVehicleId(long vehicleId)
        {
            IEnumerable<VehicleInspectionTire> VehicleInspectionTires = new List<VehicleInspectionTire>();
            VehicleInspectionTires = _context.VehicleInspectionTires.Where(x => x.idVehicleInspection == vehicleId).ToList();
            return VehicleInspectionTires;
        }

        /// <summary>Gets all user identifier.</summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>All vehicle inspections Fuel System.</returns>
        public IEnumerable<VehicleInspectionTire> GetAllUserId(long userId)
        {
            IEnumerable<VehicleInspectionTire> VehicleInspectionTires = new List<VehicleInspectionTire>();
            VehicleInspectionTires = _context.VehicleInspectionTires.Where(x => x.Id == userId).ToList();
            return VehicleInspectionTires;
        }


        /// <summary>Gets the by identifier.</summary>
        /// <param name="idTire">The Tire identifier.</param>
        /// <returns>Vehicle inspection brake object.</returns>
        public VehicleInspectionTire GetById(long idTire)
        {
            var vehicleInspection = _context.VehicleInspectionTires.Where(x => x.Id == idTire).FirstOrDefault();
            return vehicleInspection;
        }


        /// <summary>Inserts the specified vehicle inspection.</summary>
        /// <param name="vehicleInspectionFuel">The vehicle inspection fuel system.</param>
        /// <returns>True of false.</returns>
        public bool Insert(VehicleInspectionTire vehicleInspectionFuel)
        {
            bool isValid;
            try
            {
                _context.VehicleInspectionTires.Add(vehicleInspectionFuel);
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
        /// <param name="vehicleInspectionTire">The vehicle inspection tires.</param>
        /// <returns>True or false.</returns>
        public bool Update(VehicleInspectionTire vehicleInspectionTire)
        {
            bool isValid;
            try
            {
                _context.Entry(vehicleInspectionTire).State = EntityState.Modified;
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
        /// <param name="idTire">The Tire identifier.</param>
        /// <returns>True of false.</returns>
        public bool Delete(long idTire)
        {
            bool isValid;
            try
            {
                VehicleInspectionTire vehicleInspectionTire = _context.VehicleInspectionTires.Find(idTire);
                _context.VehicleInspectionTires.Remove(vehicleInspectionTire);
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
