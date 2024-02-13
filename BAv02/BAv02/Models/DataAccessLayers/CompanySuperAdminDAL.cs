using BAv02.Models.DataAccessLayers.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BAv02.Models.DataAccessLayers
{
    public class CompanySuperAdminDAL : ICompanySuperAdmin
    {
        /// <summary>The context</summary>
        private readonly BAV02Context _context;

        /// <summary>The disposed</summary>
        private bool disposed = false;

        /// <summary>Initializes a new instance of the <see cref="CompanySuperAdminDAL" /> class.</summary>
        public CompanySuperAdminDAL()
        {
            _context = new BAV02Context();
        }

        /// <summary>Initializes a new instance of the <see cref="CompanySuperAdminDAL" /> class.</summary>
        /// <param name="context">The context.</param>
        public CompanySuperAdminDAL(BAV02Context context)
        {
            _context = context;
        }

        /// <summary>Actives the inactive.</summary>
        /// <param name="id">The identifier.</param>
        /// <param name="isActive">if set to <c>true</c> [is active].</param>
        /// <returns></returns>
        public bool ActiveInactive(long id, bool isActive)
        {
            bool isValid;
            try
            {
                var company = _context.Company.Where(x => x.Id == id).FirstOrDefault();
                company.IsActive = isActive;
                company.DateModified = DateTime.Now;
                _context.SaveChanges();
                isValid = false;
            }
            catch (Exception)
            {
                isValid = false;
            }
            return isValid;
        }

        /// <summary>Archiveds the specified identifier.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public bool Archived(long id)
        {
            bool isValid;
            try
            {
                var company = _context.Providers.Where(x => x.Id == id).FirstOrDefault();
                company.IsArchived = true;
                company.DateArchived = DateTime.Now;
                _context.SaveChanges();
                isValid = false;
            }
            catch (Exception)
            {
                isValid = false;
            }
            return isValid;
        }

        /// <summary>Gets all.</summary>
        /// <returns></returns>
        public IEnumerable<Company> GetAll()
        {
            return _context.Company.ToList();
        }

        public IEnumerable<Company> GetAllCInsurance(string provider)
        {
            return _context.Company.FromSql("SELECT * FROM AC.COMPANY AS C JOIN AC.COMPANYINSURANCE AS CI ON C.ID = CI.IDCOMPANY WHERE CI.PROVIDER = {0}", provider).ToList();
        }
        public int GetAllCompaniesCount()
        {
            return _context.Company.ToList().Count();
        }

        public CompanyDocs getDotDocumentName(long IdCompany)
        {
            Console.WriteLine(IdCompany);
            return _context.CompanyDocs.FromSql("SELECT * FROM AC.COMPANYDOCS WHERE DOCTYPE = 'DotReport' AND IDCOMPANY = {0}", IdCompany).LastOrDefault();
        }
        /// <summary>Gets all active.</summary>
        /// <returns></returns>
        public IEnumerable<Company> GetAllActive()
        {
            return _context.Company.Where(x => x.IsActive == true && x.IsArchived == false).ToList();
        }

        /// <summary>Gets all active inactive.</summary>
        /// <returns></returns>
        public IEnumerable<Company> GetAllActiveInactive()
        {
            return _context.Company.Where(x => x.IsArchived == false).ToList();
        }

        /// <summary>Gets all inactive.</summary>
        /// <returns></returns>
        public IEnumerable<Company> GetAllInactive()
        {
            return _context.Company.Where(x => x.IsActive == false && x.IsArchived == false).ToList();
        }

        /// <summary>Updates the specified company.</summary>
        /// <param name="company">The company.</param>
        /// <returns></returns>
        public bool Update(Company company)
        {
            bool isValid;
            try
            {
                _context.Entry(company).State = EntityState.Modified;
                _context.SaveChanges();
                isValid = true;
            }
            catch (Exception)
            {

                isValid = false;
            }
            return isValid;
        }

        /// <summary>Inserts the specified provider.</summary>
        /// <param name="provider">The provider.</param>
        /// <returns>Return boolean.</returns>
        public bool Insert(Provider provider)
        {
            bool isValid;
            try
            {
                provider.DateCreated = DateTime.Now;
                provider.DateModified = null;
                provider.DateArchived = null;
                _context.Providers.Add(provider);
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

        public bool ResetAllPassword(string password)
        {
            using ( var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    var adminUsers = _context.Users.Where(x => x.Role == "Admin").ToList();

                    var newPassword = (byte[])_context.Users.FromSql($"select PWDENCRYPT({password}) as Password").Select(x => x.Password).FirstOrDefault();

                    foreach (var user in adminUsers)
                    {
                        user.Password = newPassword; // Implement your password encryption logic here
                    }

                    _context.SaveChanges();
                    transaction.Commit();
                    return true;
                }
                catch (Exception err){
                    Console.WriteLine(err);
                    transaction.Rollback();
                    return false;
                }
            }
 
        }

        public List<Company> GetAllCompanies() 
        {
            
            List<Company> list = new List<Company>();
            try{
                return _context.Company.ToList();
                 
            }catch(Exception error){
                throw error;
            }

        }

        public List<Company> GetAllCounts()
        {

            List<Company> list = new List<Company>();
            try
            {
                return _context.Company.ToList();

            }
            catch (Exception error)
            {
                throw error;
            }

        }
    }
}
