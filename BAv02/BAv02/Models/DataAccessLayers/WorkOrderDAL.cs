using BAv02.Models.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace BAv02.Models.DataAccessLayers
{
    public class WorkOrderDAL
    {
        static long idCompany = 0;
        private IConfiguration Configuration { get; set; }
        public string AssetsDirectory { get; set; }

        public WorkOrderDAL()
        {
            var builder = new ConfigurationBuilder()
           .SetBasePath(Directory.GetCurrentDirectory())
           .AddJsonFile("appsettings.json");
            Configuration = builder.Build();

            //Assets Directory
            AssetsDirectory = Configuration["AssetsDirectory"];
        }

        /// <summary>
        /// route validation for work order
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int routeValidation(long idWO)
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    long validationID = DbContext.WorkOrder.Where(x => x.Id == idWO).FirstOrDefault().IdCompany;
                    if (idCompany != validationID) { r = 1 ; }
                }
            }
            catch (Exception) { r = 1; }
            return r;
        }

        /// <summary>
        /// get trailer with id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public WorkOrder getWorkOrder(long id, long idu)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    if (idu > 0 && idCompany == 0) { idCompany = (long)DbContext.CompanyUsersRoles.Where(x => x.IdUser == idu).FirstOrDefault().IdCompany; }
                }
                using (var DbContext = new BAV02Context())
                {
                    var wo = DbContext.WorkOrder.Where(x => x.Id == id).FirstOrDefault();
                    if (idCompany == wo.IdCompany)
                    {
                        if (wo.Status == "New")
                        {
                            wo.Status = "Open";
                            var e = DbContext.Attach(wo);
                            e.Property(x => x.Status).IsModified = true;
                            DbContext.SaveChanges();
                        }
                        return DbContext.WorkOrder.Where(x => x.Id == id).FirstOrDefault();
                    }
                    else { return null; }
                }
            }
            catch (Exception)  {  return null; }
        }

        public String getReportedBy(long idU)
        {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    String fullName;
                    String name = DbContext.Users.Where(x => x.Id == idU).FirstOrDefault().Name;
                    String lastName = DbContext.Users.Where(x => x.Id == idU).FirstOrDefault().LastName;
                    if(name != null && lastName!= null)
                    {
                        return fullName = name + " " + lastName;
                    }
                    else
                    {
                        return fullName = name;
                    }
                }
            }
            catch (Exception) { return ""; }
        }

        public List<WorkOrderImages> getWorkOrderImages(long idWorkOrder)
        {
            List<WorkOrderImages> listWorkOrderImages = new List<WorkOrderImages>();
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    
                    return listWorkOrderImages = DbContext.WorkOrderImages.Where(x => x.IdWorkOrder == idWorkOrder).ToList();
                }
            }
            catch (Exception) 
            {
                return listWorkOrderImages;
            }
        }

        /// <summary>
        /// get trailer of work order with id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Trailer getWOTrailer(long id)
        {
            try
            {
                if (routeValidation(id) == 0)
                {
                    using (var DbContext = new BAV02Context())
                    {
                        var wo = DbContext.WorkOrder.Where(x => x.Id == id).FirstOrDefault();
                        return DbContext.Trailer.Where(x => x.IdTrailer == wo.IdVehicle).FirstOrDefault();
                    }
                }
                else { return null; }
            }
            catch (Exception)  { return null;  }
        }

        /// <summary>
        /// get truck of work order with id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Vehicle getWOTruck(long id)
        {
            try
            {
                if (routeValidation(id) == 0)
                {
                    using (var DbContext = new BAV02Context())
                    {
                        var wo = DbContext.WorkOrder.Where(x => x.Id == id).FirstOrDefault();
                        return DbContext.Vehicle.Where(x => x.Id == wo. IdVehicle).FirstOrDefault();
                    }
                }
                else { return null; }
            }
            catch (Exception) { return null; }
        }

        ///<summary>
        ///save/update data work order
        ///</summary>
        ///<param name="id"></param>
        ///<param name="wo"></param>
        public WorkOrder saveWorkOrder(WorkOrder wo, long id, Boolean external)
        {
            try
            {
                if (routeValidation(id) == 0)
                {
                    using (var DbContext = new BAV02Context())
                    {
                        wo.Id = id;
                        wo.ExternalServices = external;
                        if (wo.Status == null) { wo.Status = "External"; }
                        var e = DbContext.Attach(wo);
                        e.Property(x => x.MileageTime).IsModified = true;
                        //e.Property(x => x.DateNext).IsModified = true;
                        //e.Property(x => x.MileageType).IsModified = true;
                        //e.Property(x => x.InspectionDue).IsModified = true;
                        e.Property(x => x.AssignedTo).IsModified = true;
                        //e.Property(x => x.Status).IsModified = true;
                        e.Property(x => x.ExternalServices).IsModified = true;
                        e.Property(x => x.WorkRequest).IsModified = true;
                        e.Property(x => x.Type).IsModified = true;
                        e.Property(x => x.ServiceType).IsModified = true;
                        e.Property(x => x.Email).IsModified = true;
                        DbContext.SaveChanges();
                    }
                }
                return getWorkOrder(id,0);
            }
            catch (Exception) { return null; }
        }


        /// <summary>
        /// Add new service of workorder
        /// </summary>
        /// <param name="s"></param>
        /// <param name="idWO"></param>
        /// <returns></returns>
        public int addService(Service s, long idWO)
        {
            if(routeValidation(idWO) == 0)
            {
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    s.IdWorkOrder = idWO;
                    DbContext.Add(s);
                    DbContext.SaveChanges();
                }
                return 0;
            }
            catch (Exception) { return 1; }
            }
            else { return 1; }
        }
        
        /// <summary>
        /// Get services for work order
        /// </summary>
        /// <param name="idwo"></param>
        /// <returns></returns>
        public Table getServices(long idwo, int page, int size)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 0, NumberP = 0 };
            if (routeValidation(idwo) == 0)
            {
                try
                {
                    using (var DbContext = new BAV02Context())
                    {
                        var list = (from s in DbContext.Service
                                    where s.IdWorkOrder == idwo
                                    select new
                                    {
                                        s.Id,
                                        s.ServiceDue,
                                        s.Description,
                                        s.DateWorkOrderClosed,

                                    }).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList<Object>();

                        var count = Math.Ceiling((DbContext.Service.Where(x => x.IdWorkOrder == idwo).Select(x => new { x.Id }).Count() / (double)size));
                        t.Items = list;
                        t.CurrentPage = page;
                        t.NumberP = (int)count;
                    }

                }
                catch (Exception) { }
            }
            return t;
        }

        /// <summary>
        /// Delete service by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int deleteService(long id)
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var s = DbContext.Service.Where(x => x.Id == id).FirstOrDefault();
                    if (routeValidation(s.IdWorkOrder) == 0)
                    {
                        DbContext.Service.RemoveRange(s);
                        DbContext.SaveChanges();
                    }
                    else { r = 1; }
                }
            }
            catch (Exception) { r = 1; }
            return r;
        }

        /// <summary>
        /// Add new material of workorder
        /// </summary>
        /// <param name="s"></param>
        /// <param name="idWO"></param>
        /// <returns></returns>
        public int addMaterial(Material m)
        {
            int r = 0;
            if (routeValidation(m.IdWorkOrder) == 0)
            {
                try
                {
                    using (var DbContext = new BAV02Context())
                    {
                        var file = DbContext.Material.Where(x => x.InvoiceFile == m.InvoiceFile).FirstOrDefault();
                        if (file == null)
                        {
                            DbContext.Add(m);
                            DbContext.SaveChanges();
                        }
                        else { r = 1; }
                    }
                }
                catch (Exception) { r = 1; }
            }
            else { r = 1; }
            return r;
        }

        /// <summary>
        /// Get materiales for work order
        /// </summary>
        /// <param name="idwo"></param>
        /// <returns></returns>
        public Table getMateriales(long idwo, int page, int size)
        {
            Table t = new Table { Items = new List<object>(), CurrentPage = 0, NumberP = 0 };

            if (routeValidation(idwo) == 0)
            {
                try
                {
                    using (var DbContext = new BAV02Context())
                    {
                        var list = (from m in DbContext.Material
                                    where m.IdWorkOrder == idwo
                                    select new
                                    {
                                        m.Id,
                                        m.Quantity,
                                        m.Type,
                                        m.Description,
                                        m.Cost,
                                        m.InvoiceFile
                                    }).OrderByDescending(x => x.Id).Skip((page - 1) * size).Take(size).ToList<Object>();

                        var count = Math.Ceiling((DbContext.Material.Where(x => x.IdWorkOrder == idwo).Select(x => new { x.Id }).Count() / (double)size));
                        t.Items = list;
                        t.CurrentPage = page;
                        t.NumberP = (int)count;
                    }

                }
                catch (Exception) { }
            }
            return t;
        }

        /// <summary>
        /// Delete material by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int deleteMaterial(long id)
        {
            int r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var m = DbContext.Material.Where(x => x.Id == id).FirstOrDefault();
                    if (routeValidation(m.IdWorkOrder) == 0)
                    {
                        DbContext.Material.RemoveRange(m);
                        DbContext.SaveChanges();
                    }
                    else { r = 1; }
                    //System.IO.File.Delete($"ClientApp/{AssetsDirectory}/assets/maintenancePdf/Invoices/" + m.invoice);
                }
            }
            catch (Exception) { r = 1; }
            return r;
        }

        ///<summary>
        ///save/update data work order
        ///</summary>
        ///<param name="id"></param>
        ///<param name="wo"></param>
        public WorkOrder saveWorkOrderNextInspection(WorkOrder wo, long id, long idU, long idCompany, Boolean external, Boolean checkNoNextInspectionServiceA)
        {
            try
            {
                if (routeValidation(id) == 0)
                {
                    using (var DbContext = new BAV02Context())
                    {
                        wo.Id = id;
                        wo.ExternalServices = external;
                        wo.checkNoNextInspectionService = checkNoNextInspectionServiceA;
                        if (wo.Status == null) { wo.Status = "External"; }
                        var e = DbContext.Attach(wo);
                        e.Property(x => x.checkNoNextInspectionService).IsModified = true;
                        e.Property(x => x.DateNextInspectionService).IsModified = true;
                        e.Property(x => x.NextServiceType).IsModified = true;
                        e.Property(x => x.NextOdometerReminder).IsModified = true;
                        e.Property(x => x.Status).IsModified = true;
                        e.Property(x => x.ExternalServices).IsModified = true;
                        DbContext.SaveChanges();
                    }
                }
                return getWorkOrder(id, 0);
            }
            catch (Exception) { return null; }
        }
    }
}