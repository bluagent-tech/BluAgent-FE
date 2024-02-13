using BAv02.Models.DataAccessLayers.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BAv02.Models.DataAccessLayers
{
    /// <summary>Repository for Vehicle Inspections Mechanical.</summary>
    public class VehicleInspectionsMechanicalDAL: IVehicleInspectionsMechanicalReposository
    {
        /// <summary>The context</summary>
        private readonly BAV02Context _context;

        /// <summary>The disposed</summary>
        private bool disposed = false;

        public VehicleInspectionsMechanicalDAL()
        {
            _context = new BAV02Context();
        }

        public VehicleInspectionsMechanicalDAL(BAV02Context context)
        {
            _context = context;
        }

        public bool Delete(long idMechanical)
        {
            bool isValid;
            try
            {
                VehicleInspectionMechanical vehicleInspectionMechanical = _context.VehicleInspectionMechanicals.Find(idMechanical);
                _context.VehicleInspectionMechanicals.Remove(vehicleInspectionMechanical);
                isValid = true;
            }
            catch (Exception)
            {

                isValid = false;
            }
            return isValid;
        }

        public IEnumerable<VehicleInspectionMechanical> GetAllByCompanyId(long companyId)
        {
            IEnumerable<VehicleInspectionMechanical> vehicleInspectionMechanicals = new List<VehicleInspectionMechanical>();
            vehicleInspectionMechanicals = _context.VehicleInspectionMechanicals.Where(x => x.IdCompany == companyId).ToList();
            return vehicleInspectionMechanicals;
        }

        public IEnumerable<VehicleInspectionMechanical> GetAllUserId(long userId)
        {
            IEnumerable<VehicleInspectionMechanical> vehicleInspectionMechanicals = new List<VehicleInspectionMechanical>();
            vehicleInspectionMechanicals = _context.VehicleInspectionMechanicals.Where(x => x.IdUser == userId).ToList();
            return vehicleInspectionMechanicals;
        }

        public IEnumerable<VehicleInspectionMechanical> GetAllVehicleId(long vehicleId)
        {
            IEnumerable<VehicleInspectionMechanical> vehicleInspectionMechanicals = new List<VehicleInspectionMechanical>();
            vehicleInspectionMechanicals = _context.VehicleInspectionMechanicals.Where(x => x.IdVehicleInspection == vehicleId).ToList();
            return vehicleInspectionMechanicals;
        }

        public VehicleInspectionMechanical GetById(long idMechanical)
        {
            var vehicleMechanical = _context.VehicleInspectionMechanicals.Where(x => x.Id == idMechanical).FirstOrDefault();
            return vehicleMechanical;
        }

        public bool Insert(VehicleInspectionMechanical vehicleInspectionMechanical)
        {
            bool isValid;
            try
            {
                _context.VehicleInspectionMechanicals.Add(vehicleInspectionMechanical);
                _context.SaveChanges();
                isValid = true;
            }
            catch (Exception)
            {

                isValid = false;
            }
            return isValid;
        }

        public bool Update(VehicleInspectionMechanical vehicleInspectionMechanical)
        {
            bool isValid;
            try
            {
                _context.Entry(vehicleInspectionMechanical).State = EntityState.Modified;
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
