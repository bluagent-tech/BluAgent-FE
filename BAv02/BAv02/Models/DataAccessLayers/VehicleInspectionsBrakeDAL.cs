using System;
using System.Collections.Generic;
using System.Linq;
using BAv02.Models.DataAccessLayers.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BAv02.Models.DataAccessLayers
{
    public class VehicleInspectionsBrakeDAL : IVehicleInspectionsBrakeRepository
    {
        /// <summary>The context</summary>
        private readonly BAV02Context _context;

        /// <summary>The disposed</summary>
        private bool disposed = false;


        public VehicleInspectionsBrakeDAL()
        {
            _context = new BAV02Context();
        }

        public VehicleInspectionsBrakeDAL(BAV02Context context)
        {
            _context = context;
        }
        public bool Delete(long idBrake)
        {
            bool isValid;
            try
            {
                VehicleInspectionBrakes vehicleInspectionBrake = _context.VehicleInspectionBrakes.Find(idBrake);
                _context.VehicleInspectionBrakes.Remove(vehicleInspectionBrake);
                isValid = true;
            }
            catch (Exception)
            {

                isValid = false;
            }
            return isValid;
        }

        public IEnumerable<VehicleInspectionBrakes> GetAllByBrakeId(long brakeId)
        {
            IEnumerable<VehicleInspectionBrakes> vehicleInspectionBrakes = new List<VehicleInspectionBrakes>();
            // id cambiado por idvehicleinspection
            vehicleInspectionBrakes = _context.VehicleInspectionBrakes.Where(x => x.IdVehicleInspection==brakeId).ToList();
            return vehicleInspectionBrakes;
        }

        public IEnumerable<VehicleInspectionBrakes> GetAllByCompanyId(long companyId)
        {
            IEnumerable<VehicleInspectionBrakes> vehicleInspectionBrakes = new List<VehicleInspectionBrakes>();
            // idcompany cambiado por idvehicleinspection
            vehicleInspectionBrakes = _context.VehicleInspectionBrakes.Where(x => x.IdVehicleInspection == companyId).ToList();
            return vehicleInspectionBrakes;
        }

        public IEnumerable<VehicleInspectionBrakes> GetAllUserId(long userId)
        {
            IEnumerable<VehicleInspectionBrakes> vehicleInspectionBrakes = new List<VehicleInspectionBrakes>();
            // id cambiado por idvehicleinspection
            vehicleInspectionBrakes = _context.VehicleInspectionBrakes.Where(x => x.IdVehicleInspection == userId).ToList();
            return vehicleInspectionBrakes;
        }

        public IEnumerable<VehicleInspectionBrakes> GetAllVehicleId(long vehicleId)
        {
            IEnumerable<VehicleInspectionBrakes> vehicleInspectionBrakes = new List<VehicleInspectionBrakes>();
            // id cambiado por idvehicleinspection
            vehicleInspectionBrakes = _context.VehicleInspectionBrakes.Where(x => x.IdVehicleInspection == vehicleId).ToList();
            return vehicleInspectionBrakes;
        }

        public VehicleInspectionBrakes GetById(long idBrake)
        {
            // id cambiado por idvehicleinspection
            var vehicleInspectionBrake = _context.VehicleInspectionBrakes.Where(x => x.IdVehicleInspection == idBrake).FirstOrDefault();
            return vehicleInspectionBrake;
        }

        public bool Insert(VehicleInspectionBrakes vehicleInspectionBrake)
        {
            bool isValid;
            try
            {
                _context.VehicleInspectionBrakes.Add(vehicleInspectionBrake);
                _context.SaveChanges();
                isValid = true;
            }
            catch (Exception)
            {

                isValid = false;
            }
            return isValid;
        }

        public bool Update(VehicleInspectionBrakes vehicleInspectionBrake)
        {
            bool isValid;
            try
            {
                _context.Entry(vehicleInspectionBrake).State = EntityState.Modified;
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
