using BAv02.Models.DataAccessLayers.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BAv02.Models.DataAccessLayers
{
    public class SuperAdminDAL : ISuperAdminRepository
    {
        /// <summary>The context</summary>
        private readonly BAV02Context _context;

        /// <summary>The disposed</summary>
        private bool disposed = false;

        public const string ROOT_USER = "ROOT";

        /// <summary>Initializes a new instance of the <see cref="SuperAdminDAL" /> class.</summary>
        public SuperAdminDAL()
        {
            _context = new BAV02Context();
        }

        public SuperAdminDAL(BAV02Context context)
        {
            _context = context;
        }

        /// <summary>Actives the inactive.</summary>
        /// <param name="id"></param>
        /// <param name="isActive"></param>
        /// <returns></returns>
        public bool ActiveInactive(long id, bool isActive)
        {
            bool isValid;
            try
            {
                var superAdmin = _context.SuperAdmin.Where(x => x.Id == id).FirstOrDefault();

                if(superAdmin.Role != ROOT_USER)
                {
                    superAdmin.IsActive = isActive;
                    superAdmin.DateModifed = DateTime.Now;
                    _context.SaveChanges();
                    isValid = true;
                }
                else
                {
                    isValid = false;
                }
            }
            catch (Exception)
            {

                isValid = false;
            }
            return isValid;
        }

        /// <summary>Archiveds this instance.</summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool Archived(long id)
        {
            bool isValid;
            try
            {
                var superAdmin = _context.SuperAdmin.Where(x => x.Id == id).FirstOrDefault();

                if (superAdmin.Role != ROOT_USER)
                {
                    superAdmin.IsAchived = true;
                    superAdmin.DateArchived = DateTime.Now;
                    _context.SaveChanges();
                    isValid = true;
                }
                else
                {
                    isValid = false;
                }

               
            }
            catch (Exception)
            {

                isValid = false;
            }
            return isValid;
        }

        /// <summary>Gets all.</summary>
        /// <returns>List of Super Admins.</returns>
        public IEnumerable<SuperAdmin> GetAll()
        {
            return _context.SuperAdmin.ToList();
        }

        /// <summary>Gets all active.</summary>
        /// <returns>List of Super admins Inactive.</returns>
        public IEnumerable<SuperAdmin> GetAllActive()
        {
            return _context.SuperAdmin.Where(x => x.IsActive == true && x.IsAchived == false).ToList();
        }

        /// <summary>Gets all active inactive.</summary>
        /// <returns>List of Super Admins Active and Inactive.</returns>
        public IEnumerable<SuperAdmin> GetAllActiveInactive()
        {
            return _context.SuperAdmin.Where(x => x.IsAchived == false).ToList();
        }

        /// <summary>Gets all inactive.</summary>
        /// <returns>List of Super Admins Actives.</returns>
        public IEnumerable<SuperAdmin> GetAllInactive()
        {
            return _context.SuperAdmin.Where(x => x.IsAchived == false && x.IsActive == false).ToList();
        }

        /// <summary>Gets the archived.</summary>
        /// <returns>List of Super Admins Archived.</returns>
        public IEnumerable<SuperAdmin> GetArchived()
        {
            return _context.SuperAdmin.Where(x => x.IsAchived == true).ToList();
        }

        /// <summary>Inserts this instance.</summary>
        /// <param name="superAdmin"></param>
        /// <returns></returns>
        public bool Insert(SuperAdmin superAdmin)
        {
            bool isValid;
            try
            {
                superAdmin.DateCreated = DateTime.Now;
                superAdmin.DateModifed = null;
                superAdmin.DateArchived = null;
                _context.SuperAdmin.Add(superAdmin);
                _context.SaveChanges();
                isValid = true;
            }
            catch (Exception)
            {

                isValid = false;
            }
            return isValid;
        }

        /// <summary>Updates this instance.</summary>
        /// <param name="superAdmin"></param>
        /// <returns></returns>
        public bool Update(SuperAdmin superAdmin)
        {
            bool isValid;
            try
            {
                superAdmin.DateModifed = DateTime.Now;
                _context.Entry(superAdmin).State = EntityState.Modified;
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

        //DASHBOARD COUNT
        public IEnumerable<SuperAdmin> GetAllCompanies()
        {
            return _context.SuperAdmin.FromSql("SELECT COUNT(ID) FROM AC.Company").ToList();
        }

        public IEnumerable<SuperAdmin> GetAllCounts()
        {
            return _context.SuperAdmin.FromSql("SELECT TOP 1 (SELECT COUNT(DISTINCT(ID)) FROM AC.Company) AS CompanyProfiles, (SELECT COUNT(ID) FROM DT.Provider) AS Providers, (SELECT COUNT(ID) FROM DT.CollectionSite) AS CollectionSites, (SELECT COUNT(ID) FROM DT.Collector) AS Collectors FROM DT.Collector").ToList();
        }

        public Company GetCompanyById(long idCompany)
        {
            return _context.Company.FirstOrDefault(x => x.Id == idCompany);
        }
    }
}
