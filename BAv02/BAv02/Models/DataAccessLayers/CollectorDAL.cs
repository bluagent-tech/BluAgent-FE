using BAv02.Models.DataAccessLayers.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BAv02.Models.DataAccessLayers
{
    public class CollectorDAL : ICollectorRepository
    {
        /// <summary>The context</summary>
        private readonly BAV02Context _context;

        /// <summary>The disposed</summary>
        private bool disposed = false;

        public CollectorDAL()
        {
            _context = new BAV02Context();
        }

        public CollectorDAL(BAV02Context context)
        {
            _context = context;
        }

        public bool ActiveInactive(long id, bool isActive)
        {
            bool isValid;
            try
            {
                var provider = _context.Providers.Where(x => x.Id == id).FirstOrDefault();
                provider.IsActive = isActive;
                provider.DateModified = DateTime.Now;
                _context.SaveChanges();
                isValid = false;
            }
            catch (Exception)
            {

                isValid = false;
            }
            return isValid;
        }

        public bool Archived(long id)
        {
            bool isValid;
            try
            {
                var collector = _context.Collectors.Where(x => x.Id == id).FirstOrDefault();
                collector.IsArchived = true;
                collector.DateArchived = DateTime.Now;
                _context.SaveChanges();
                isValid = false;

            }
            catch (Exception)
            {

                isValid = false;
            }
            return isValid;
        }

        public IEnumerable<Collector> GetAll()
        {
            //return _context.Collectors.ToList();
            return _context.Collectors.FromSql("SELECT Collector.Id,Collector.Name,Collector.LastName,Collector.MiddleName,Collector.Address,Collector.PhoneNumber,Collector.CollectionSiteId,CollectionSite.Name AS Discriminator,Collector.AlcoholTestingAllowed,Collector.DrugTestingAllow,Collector.IsActive,Collector.IsArchived,Collector.DateArchived,Collector.DateCreated,Collector.DateModified,Collector.ArchivedByUserId FROM DT.Collector INNER JOIN DT.CollectionSite ON DT.Collector.CollectionSiteId = DT.CollectionSite.Id").ToList();
            //return _context.Collectors.FromSql("SELECT [Collector].[Id],[Collector].[Name],[Collector].[LastName],[Collector].[MiddleName],[Collector].[Address],[Collector].[PhoneNumber],[Collector].[Discriminator],[Collector].[CollectionSiteId],[CollectionSite].[Name],[Collector].[AlcoholTestingAllowed],[Collector].[DrugTestingAllow],[Collector].[IsActive],[Collector].[IsArchived],[Collector].[DateArchived],[Collector].[DateCreated],[Collector].[DateModified],[Collector].[ArchivedByUserId] FROM [DT].[Collector] INNER JOIN [DT].[CollectionSite] ON [DT].[Collector].CollectionSiteId = [DT].[CollectionSite].[Id]").ToList();
            //return _context.Collectors.FromSql("SELECT Collector.Id,Collector.Name,Collector.LastName,Collector.MiddleName,Collector.Address,Collector.PhoneNumber,Collector.Discriminator,Collector.CollectionSiteId,CollectionSite.Name AS CollectionSiteName,Collector.AlcoholTestingAllowed,Collector.DrugTestingAllow,Collector.IsActive,Collector.IsArchived,Collector.DateArchived,Collector.DateCreated,Collector.DateModified,Collector.ArchivedByUserId FROM DT.Collector INNER JOIN DT.CollectionSite ON DT.Collector.CollectionSiteId = DT.CollectionSite.Id").ToList();
            //return _context.Collectors.FromSql("SELECT Collector.Id,Collector.Name,Collector.LastName,Collector.MiddleName,Collector.Address,Collector.PhoneNumber,Collector.Discriminator,CollectionSite.Name AS CollectionSiteId,Collector.AlcoholTestingAllowed,Collector.DrugTestingAllow,Collector.IsActive,Collector.IsArchived,Collector.DateArchived,Collector.DateCreated,Collector.DateModified,Collector.ArchivedByUserId FROM DT.Collector INNER JOIN DT.CollectionSite ON DT.Collector.CollectionSiteId = DT.CollectionSite.Id").ToList();
        }

        public int GetAllCollectorsCount()
        {
            //return _context.Collectors.ToList();
            return _context.Collectors.FromSql("SELECT Collector.Id,Collector.Name,Collector.LastName,Collector.MiddleName,Collector.Address,Collector.PhoneNumber,Collector.CollectionSiteId,CollectionSite.Name AS Discriminator,Collector.AlcoholTestingAllowed,Collector.DrugTestingAllow,Collector.IsActive,Collector.IsArchived,Collector.DateArchived,Collector.DateCreated,Collector.DateModified,Collector.ArchivedByUserId FROM DT.Collector INNER JOIN DT.CollectionSite ON DT.Collector.CollectionSiteId = DT.CollectionSite.Id").ToList().Count();
            //return _context.Collectors.FromSql("SELECT [Collector].[Id],[Collector].[Name],[Collector].[LastName],[Collector].[MiddleName],[Collector].[Address],[Collector].[PhoneNumber],[Collector].[Discriminator],[Collector].[CollectionSiteId],[CollectionSite].[Name],[Collector].[AlcoholTestingAllowed],[Collector].[DrugTestingAllow],[Collector].[IsActive],[Collector].[IsArchived],[Collector].[DateArchived],[Collector].[DateCreated],[Collector].[DateModified],[Collector].[ArchivedByUserId] FROM [DT].[Collector] INNER JOIN [DT].[CollectionSite] ON [DT].[Collector].CollectionSiteId = [DT].[CollectionSite].[Id]").ToList();
            //return _context.Collectors.FromSql("SELECT Collector.Id,Collector.Name,Collector.LastName,Collector.MiddleName,Collector.Address,Collector.PhoneNumber,Collector.Discriminator,Collector.CollectionSiteId,CollectionSite.Name AS CollectionSiteName,Collector.AlcoholTestingAllowed,Collector.DrugTestingAllow,Collector.IsActive,Collector.IsArchived,Collector.DateArchived,Collector.DateCreated,Collector.DateModified,Collector.ArchivedByUserId FROM DT.Collector INNER JOIN DT.CollectionSite ON DT.Collector.CollectionSiteId = DT.CollectionSite.Id").ToList();
            //return _context.Collectors.FromSql("SELECT Collector.Id,Collector.Name,Collector.LastName,Collector.MiddleName,Collector.Address,Collector.PhoneNumber,Collector.Discriminator,CollectionSite.Name AS CollectionSiteId,Collector.AlcoholTestingAllowed,Collector.DrugTestingAllow,Collector.IsActive,Collector.IsArchived,Collector.DateArchived,Collector.DateCreated,Collector.DateModified,Collector.ArchivedByUserId FROM DT.Collector INNER JOIN DT.CollectionSite ON DT.Collector.CollectionSiteId = DT.CollectionSite.Id").ToList();
        }

        public IEnumerable<Collector> GetAllActive()
        {
            return _context.Collectors.FromSql("SELECT Collector.Id,Collector.Name,Collector.LastName,Collector.MiddleName,Collector.Address,Collector.PhoneNumber,Collector.CollectionSiteId,CollectionSite.Name AS Discriminator,Collector.AlcoholTestingAllowed,Collector.DrugTestingAllow,Collector.IsActive,Collector.IsArchived,Collector.DateArchived,Collector.DateCreated,Collector.DateModified,Collector.ArchivedByUserId FROM DT.Collector INNER JOIN DT.CollectionSite ON DT.Collector.CollectionSiteId = DT.CollectionSite.Id WHERE DT.Collector.IsActive = 1 AND DT.Collector.IsArchived = 0").ToList();

            //return _context.Collectors.Where(x => x.IsActive == true && x.IsArchived == false).ToList();
        }

        public IEnumerable<Collector> GetAllArchived()
        {
            return _context.Collectors.FromSql("SELECT Collector.Id,Collector.Name,Collector.LastName,Collector.MiddleName,Collector.Address,Collector.PhoneNumber,Collector.CollectionSiteId,CollectionSite.Name AS Discriminator,Collector.AlcoholTestingAllowed,Collector.DrugTestingAllow,Collector.IsActive,Collector.IsArchived,Collector.DateArchived,Collector.DateCreated,Collector.DateModified,Collector.ArchivedByUserId FROM DT.Collector INNER JOIN DT.CollectionSite ON DT.Collector.CollectionSiteId = DT.CollectionSite.Id WHERE DT.Collector.IsArchived = 1").ToList();
            //return _context.Collectors.Where(x => x.IsArchived == true).ToList();
        }

        public IEnumerable<Collector> GetAllInactive()
        {
            return _context.Collectors.FromSql("SELECT Collector.Id,Collector.Name,Collector.LastName,Collector.MiddleName,Collector.Address,Collector.PhoneNumber,Collector.CollectionSiteId,CollectionSite.Name AS Discriminator,Collector.AlcoholTestingAllowed,Collector.DrugTestingAllow,Collector.IsActive,Collector.IsArchived,Collector.DateArchived,Collector.DateCreated,Collector.DateModified,Collector.ArchivedByUserId FROM DT.Collector INNER JOIN DT.CollectionSite ON DT.Collector.CollectionSiteId = DT.CollectionSite.Id WHERE DT.Collector.IsActive = 0 AND DT.Collector.IsArchived = 0").ToList();
            //return _context.Collectors.Where(x => x.IsActive == false && x.IsArchived == false).ToList();
        }

        public IEnumerable<Collector> GetAllInactiveActive()
        {
            return _context.Collectors.FromSql("SELECT Collector.Id,Collector.Name,Collector.LastName,Collector.MiddleName,Collector.Address,Collector.PhoneNumber,Collector.CollectionSiteId,CollectionSite.Name AS Discriminator,Collector.AlcoholTestingAllowed,Collector.DrugTestingAllow,Collector.IsActive,Collector.IsArchived,Collector.DateArchived,Collector.DateCreated,Collector.DateModified,Collector.ArchivedByUserId FROM DT.Collector INNER JOIN DT.CollectionSite ON DT.Collector.CollectionSiteId = DT.CollectionSite.Id WHERE DT.Collector.IsArchived = 0").ToList();
            //return _context.Collectors.Where(x => x.IsArchived == false).ToList();
        }

        public bool Insert(Collector collector)
        {
            
            bool isValid;
            try
            {
                collector.DateCreated = DateTime.Now;
                collector.DateModified = null;
                if(collector.IsArchived == true) { collector.DateArchived = DateTime.Now; }
                
                _context.Collectors.Add(collector);
                _context.SaveChanges();
                isValid = true;
            }
            catch (Exception)
            {

                isValid = false;
            }
            return isValid;
        }

        public bool Update(Collector collector)
        {
            bool isValid;
            try
            {
                _context.Entry(collector).State = EntityState.Modified;
                _context.SaveChanges();
                isValid = true;
            }
            catch (Exception)
            {

                isValid = false;
            }
            return isValid;
        }

        public IEnumerable<Collector> GetSearch(string search)
        {//INNER JOIN DT.CollectionSite ON DT.Collector.CollectionSiteId = DT.CollectionSite.Id
            
            string sql = "SELECT Collector.Id,Collector.Name,Collector.LastName,Collector.MiddleName,Collector.Address,Collector.PhoneNumber,Collector.CollectionSiteId,CollectionSite.Name AS Discriminator,Collector.AlcoholTestingAllowed,Collector.DrugTestingAllow,Collector.IsActive,Collector.IsArchived,Collector.DateArchived,Collector.DateCreated,Collector.DateModified,Collector.ArchivedByUserId FROM DT.Collector INNER JOIN DT.CollectionSite ON DT.Collector.CollectionSiteId = DT.CollectionSite.Id WHERE Collector.Name LIKE '%" + search + "%' OR Collector.LastName LIKE '%" + search + "%' OR Collector.MiddleName LIKE '%" + search + "%' OR Collector.Address LIKE '%" + search + "%' OR Collector.Phonenumber LIKE '%" + search + "%'";
            return _context.Collectors.FromSql(sql).ToList();
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
