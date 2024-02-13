using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using BAv02.Models;
using BAv02.Models.DataAccessLayers;
using BAv02.Models.Tools;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace BAv02.Controllers
{
    [Route("api/[controller]")]
    public class MaintenanceController : Controller
    {
        MaintenanceDAL db = new MaintenanceDAL();
        VehicleInspectionsDAL vehicleInspection = new VehicleInspectionsDAL();
        VehicleInspectionsBodyShopDAL vehicleInspectionBodyShop = new VehicleInspectionsBodyShopDAL();
        VehicleInspectionsBrakeDAL vehicleInspectionBrakes = new VehicleInspectionsBrakeDAL();
        VehicleInspectionsElectricalDAL vehicleInspectionElectrical = new VehicleInspectionsElectricalDAL();
        VehicleInspectionFuelSystemDAL vehicleInspectionFuelSystem = new VehicleInspectionFuelSystemDAL();
        VehicleInspectionsHeatingDAL vehicleInspectionHeating = new VehicleInspectionsHeatingDAL();
        VehicleInspectionsMechanicalDAL vehicleInspectionMechanical = new VehicleInspectionsMechanicalDAL();
        VehicleInspectionsSafeDAL vehicleInspectionSafe = new VehicleInspectionsSafeDAL();
        VehicleInspectionsSteeringMechanismDAL vehicleInspectionSteeringMechanism = new VehicleInspectionsSteeringMechanismDAL();
        VehicleInspectionsSuspensionDAL vehicleInspectionSuspension = new VehicleInspectionsSuspensionDAL();
        VehicleInspectionsTiresDAL vehicleInspectionTire = new VehicleInspectionsTiresDAL();

        private IHostingEnvironment _env;

        private IConfiguration Configuration { get; set; }
        public string AssetsDirectory { get; set; }

        public string AwsAccessKeyId { get; set; }
        public string AwsSecretAccessKey { get; set; }

        public string AwsServer { get; set; }

        public string BucketName { get; set; }
        public MaintenanceController(IHostingEnvironment env)
        {
            _env = env;

            var builder = new ConfigurationBuilder()
       .SetBasePath(Directory.GetCurrentDirectory())
       .AddJsonFile("appsettings.json");
            Configuration = builder.Build();

            //Assets Directory
            AssetsDirectory = Configuration["AssetsDirectory"];

            //AWS Configurations
            AwsAccessKeyId = Configuration["AwsAccessKeyId"];
            AwsSecretAccessKey = Configuration["AwsSecretAccessKey"];
            BucketName = Configuration["BucketName"];
            AwsServer = Configuration["AWSServer"];
        }

        /// <summary>
        /// validate existence vin in data base of truck/trailer
        /// </summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult validationVin(string vin, string type, long id)
        {
            try
            {
                var exist = db.validationVin(vin, type, id);
                if (exist != "")
                {
                    return Json("{\"status\": 0, \"existVin\": " + JsonConvert.SerializeObject(exist, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"existVin\": \"''\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get Us States
        /// </summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getStates()
        {
            try
            {
                var states = db.getStates();
                if (states.Count > 0)
                {
                    return Json("{\"status\": 0, \"states\": " + JsonConvert.SerializeObject(states, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"states\": \"[]\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpGet("[action]")]
        public JsonResult getNotificationsMaintenance(int id)
        {
            try
            {
                var alertsVehicles = db.getAllNotificationsVehicle(id);
                var alertsTrailers = db.getAllNotificationsTrailer(id);
                var alertsMaintenance = db.getAllNotificationMaintenance(id);
                var count = db.NotificationsCounterMaintenance(id);
                if (count > 0)
                {
                    return Json("{\"status\": 0, \"maintenanceCount\": " + JsonConvert.SerializeObject(count, Formatting.Indented) + ", \"alertsVehicles\": " + JsonConvert.SerializeObject(alertsVehicles, Formatting.Indented) + ", \"alertsTrailers\": " + JsonConvert.SerializeObject(alertsTrailers, Formatting.Indented) + ", \"alertsMaintenance\": " + JsonConvert.SerializeObject(alertsMaintenance, Formatting.Indented) +" }");
                }
                else { return Json("{\"status\": 1,\"maintenance\": \"[]\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error in The Server\"}"); }
        }


        /// <summary>
        /// Add a new truck  
        /// </summary>
        /// <param name="v"></param>
        /// <param name="idu"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult addTruck(Vehicle v, long idUser)
        {
            try
            {
                StripeController stripe = new StripeController(_env);
                var r = db.addTruck(v, idUser);
                var trucks = db.getTrucks(idUser, 1, 100, false);
                var totalVehicles = trucks.Items.Count;

                if (r == 0)
                {
                    stripe.UpdateMaintenanceSubscription(idUser, totalVehicles);
                    return Json("{\"status\": 0, \"trucks\": " + JsonConvert.SerializeObject(trucks, Formatting.Indented) + " }");
                }
                else if (r == 1) { return Json("{\"status\": 1,\"error\": \"VIN number already exists\"}"); }
                else { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// get trucks per company  
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getTrucks(long id, int page, int size, bool inactiveMode)
        {
            try
            {
                Table trucks = new Table()
                {
                    Items = new List<Object>(),
                    CurrentPage = 0,
                    NumberP = 0
                };
                if (inactiveMode == false)
                {
                    trucks = db.getTrucks(id, page, size, inactiveMode);
                } else
                {
                    trucks = db.getTrucksInactiveOrArchived(id, page, size, inactiveMode);
                }
                
                if (trucks.Items.Count > 0)
                {
                    return Json("{\"status\": 0, \"trucks\": " + JsonConvert.SerializeObject(trucks, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1, \"trucks\": " + JsonConvert.SerializeObject(trucks, Formatting.Indented) + " }"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// get trucks per company by SA
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getTrucksCompanySA(long idCompany, int page, int size)
        {
            try
            {
                var trucks = db.getTrucksCompanySA(idCompany, page, size);
                if (trucks.Items.Count > 0)
                {
                    return Json("{\"status\": 0, \"trucks\": " + JsonConvert.SerializeObject(trucks, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1, \"trucks\": " + JsonConvert.SerializeObject(trucks, Formatting.Indented) + " }"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Delete vehicle inactive  
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("[action]")]
        public JsonResult inactivateTruck(long id, long idu, DateTime DeactivationDate, string DeactivationReason)
        {
            try
            {
                StripeController stripe = new StripeController(_env);
                var r = db.inactivateTruck(id, DeactivationDate, DeactivationReason);
                var trucks = db.getTrucks(idu, 1, 100, false);
                var inactiveTrucks = db.getTrucksInactiveOrArchived(idu, 1, 100, true);
                var totalVehicles = trucks.Items.Count;
                if (r == 0)
                {
                    stripe.UpdateMaintenanceSubscription(idu, totalVehicles);
                    return Json("{\"status\": 0, \"trucks\": " + JsonConvert.SerializeObject(trucks, Formatting.Indented) + ", \"inactiveTrucks\": " + JsonConvert.SerializeObject(inactiveTrucks, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Delete vehicle inactive  
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult activateTruck(long id, long idu)
        {
            try
            {
                StripeController stripe = new StripeController(_env);
                var r = db.activateTruck(id);
                var trucks = db.getTrucks(idu, 1, 100, false);
                var inactiveTrucks = db.getTrucksInactiveOrArchived(idu, 1, 100, true);
                var totalVehicles = trucks.Items.Count;
                if (r == 0)
                {

                    stripe.UpdateMaintenanceSubscription(idu, totalVehicles);
                    return Json("{\"status\": 0, \"trucks\": " + JsonConvert.SerializeObject(trucks, Formatting.Indented) + ", \"inactiveTrucks\": " + JsonConvert.SerializeObject(inactiveTrucks, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Delete vehicle archived  
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("[action]")]
        public JsonResult archivedTruck(long idVehicle, long idCompany)
        {
            try
            {
                StripeController stripe = new StripeController(_env);
                var idu = db.getIdUserCompany(idCompany);
                var r = db.archivedTruck(idVehicle);
                var trucks = db.getTrucks(idu, 1, 100, false);
                var totalVehicles = trucks.Items.Count;
                if (r == 0)
                {
                    stripe.UpdateMaintenanceSubscription(idu, totalVehicles);
                    return Json("{\"status\": 0}");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// get trailers per company
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getTrailers(long id, int page, int size, bool inactiveMode)
        {
            try
            {
                var trailers = db.getTrailers(id, page, size, inactiveMode);
                if (trailers.Items.Count > 0)
                {
                    return Json("{\"status\": 0, \"trailers\": " + JsonConvert.SerializeObject(trailers, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1, \"trailers\": " + JsonConvert.SerializeObject(trailers, Formatting.Indented) + " }"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpGet("[action]")]
        public JsonResult getHazmatTrailers(long id, int page, int size, bool inactiveMode)
        {
            try
            {
                var trailers = db.getHazmatTrailers(id, page, size, inactiveMode);
                if (trailers.Items.Count > 0)
                {
                    return Json("{\"status\": 0, \"trailers\": " + JsonConvert.SerializeObject(trailers, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"trailers\": \"[]\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Delete trailer inactive
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("[action]")]
        public JsonResult inactivateTrailer(long id, long idu)
        {
            try
            {
                StripeController stripe = new StripeController(_env);
                var r = db.inactivateTrailer(id);
                var inactiveTrailers = db.getTrailers(idu, 1, 100, true);
                var trailers = db.getTrailers(idu, 1, 100, false);
                if (r == 0)
                {
                    return Json("{\"status\": 0, \"trailers\": " + JsonConvert.SerializeObject(trailers, Formatting.Indented) + ", \"inactiveTrailers\": " + JsonConvert.SerializeObject(inactiveTrailers, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpPost("[action]")]
        public JsonResult activateTrailer(long id, long idu)
        {
            try
            {
                StripeController stripe = new StripeController(_env);
                var r = db.activateTrailer(id);
                var inactiveTrailers = db.getTrailers(idu, 1, 100, true);
                var trailers = db.getTrailers(idu, 1, 100, false);
                if (r == 0)
                {
                    return Json("{\"status\": 0, \"trailers\": " + JsonConvert.SerializeObject(trailers, Formatting.Indented) + ", \"inactiveTrailers\": " + JsonConvert.SerializeObject(inactiveTrailers, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Add a new truck
        /// </summary>
        /// <param name="v"></param>
        /// <param name="idu"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult addTrailer(Trailer t, long idu)
        {
            try
            {
                StripeController stripe = new StripeController(_env);
                var r = db.addTrailer(t, idu);
                var trailers = db.getTrailers(idu, 1, 100, false);
                if (r == 0)
                {
                    return Json("{\"status\": 0, \"trailers\": " + JsonConvert.SerializeObject(trailers, Formatting.Indented) + " }");
                }
                else if (r == 1) { return Json("{\"status\": 1,\"error\": \"VIN number already exists\"}"); }
                else { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Get Violations
        /// </summary>
        /// <param name="id"></param>
        /// <param name="page"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getViolations(string id, int page, int size)
        {
            try
            {
                var viol = db.getViolations(id, page, size);
                if (viol.Items.Count > 0)
                {
                    return Json("{\"status\": 0, \"violations\": " + JsonConvert.SerializeObject(viol, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1, \"error\": \"Empty List\" }"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Add a new work orden  
        /// </summary>
        /// <param name="wo"></param>
        /// <param name="id"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public async Task<JsonResult> addWorkOrderAsync(WorkOrder wo, long idVehicle, string typeT, long idu, long idCompany, string uniqueID = null)
        {
            long r;
            try
            {
                r = db.addWorkOrder(wo, idVehicle, typeT, idu);
                var wOrder = db.getWorkOrders(idu);
                if (r != 1)
                {
                    var z = 0;
                    var files = Request.Form.Files;
                    foreach (var file in files)
                    {
                        Guid obj = Guid.NewGuid();
                        string extension = Path.GetExtension(file.FileName).ToLowerInvariant();
                        WorkOrderImages maintenanceDoc = new WorkOrderImages();
                        maintenanceDoc.DocType = "WorkOrder";
                        maintenanceDoc.DocName = obj.ToString() + extension;
                        maintenanceDoc.TypeUnit = wo.VehicleType;
                        maintenanceDoc.IdUnit = wo.IdVehicle;
                        maintenanceDoc.IdWorkOrder = r;

                        using (var client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, RegionEndpoint.USWest2))
                        {
                            using (var newMemoryStream = new MemoryStream())
                            {
                                file.CopyTo(newMemoryStream);

                                var uploadRequest = new TransferUtilityUploadRequest
                                {
                                    InputStream = newMemoryStream,
                                    Key = $"{idCompany}/WorkOrders/WorkOrdersImages/{maintenanceDoc.IdUnit}/{maintenanceDoc.DocName}",
                                    BucketName = BucketName,
                                    CannedACL = S3CannedACL.PublicRead,
                                };

                                uploadRequest.Metadata.Add("x-amz-meta-filename", maintenanceDoc.DocName);

                                var fileTransferUtility = new TransferUtility(client);
                                await fileTransferUtility.UploadAsync(uploadRequest);
                            }
                        }

                        z = db.saveDocWorkOrder(maintenanceDoc, file.FileName, idCompany);
                    }
                    if (z == 0)
                    {
                        DQFDAL db = new DQFDAL();
                        db.sendEmailMan(wo.Email, idu, _env);
                    }
                    else
                    {
                        return Json("{\"status\": 2,\"error\": \"Error When Saving Documents\"}");
                    }

                    return Json("{\"status\": 0, \"workOrder\": " + JsonConvert.SerializeObject(wOrder, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 2,\"error\": \"Error Getting Work Orders\"}"); }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return Json("{\"status\": 2,\"error\": \"Error In The Server\"}");
            }
        }
        /// <summary>
        /// get work order per company
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public JsonResult ReSendEmailWorkOrder(string email, long idU)
        {
            try
            {
                DQFDAL db = new DQFDAL();
                db.sendEmailMan(email, idU, _env);
                return Json("{\"status\": 0,\"success\": \"Correo enviado\"}");
            }
            catch (Exception ex)
            {
                return Json("{\"status\": 2,\"error\": \"Error In The Server\"}");
            }

        }

        /// <summary>
        /// get work order per company
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getWorkOrders(long id)
        {
            try
            {
                var wOrder = db.getWorkOrders(id);
                if (wOrder != null)
                {
                    return Json("{\"status\": 0, \"workOrder\": " + JsonConvert.SerializeObject(wOrder, Formatting.Indented) + " }");
                }
                else
                {
                    return Json("{\"status\": 1,\"workOrder\": \"[]\"}");
                }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// eliminates the work order according to its id, also eliminates the services and materials that may have related to the work order. and updates the data in the table
        /// </summary>
        /// <param name="id"> work order id</param>
        /// <param name="iduser"> user id</param>
        /// <returns></returns>
        [HttpDelete("[action]")]
        public JsonResult deleteWorkOrder(long id, long iduser)
        {
            try
            {
                var servicesAndMaterial = db.deleteWorkOrderServicesAndMaterials(id);
                if (servicesAndMaterial == 0)
                {
                    db.deleteWorkOrder(id);
                    var wOrder = db.getWorkOrders(iduser);
                    return Json("{\"status\": 0, \"workOrder\": " + JsonConvert.SerializeObject(wOrder, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Error In The Server\",\"workOrder\": \"[]\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Export trucks active'/inactive to excel
        /// </summary>
        /// <param name="idu"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult ExportTrucks(long idu, string status)
        {
            try
            {
                if (status == "true") status = "ACTIVE";
                else status = "INACTIVE";

                var dataExport = db.ExportTrucks(idu, status);
                if (dataExport.Items.Count != 0)
                {
                    return Json("{\"status\": 0, \"dataExportTrucks\": " + JsonConvert.SerializeObject(dataExport, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Export trucks with inspections active'/inactive to excel
        /// </summary>
        /// <param name="idu"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult ExportTrucksWithInspections(long idu, string status)
        {
            try
            {
                if (status == "true") status = "ACTIVE";
                else status = "INACTIVE";

                var dataExport = db.ExportTrucksWithInspections(idu, status);
                if (dataExport.Items.Count != 0)
                {
                    return Json("{\"status\": 0, \"dataExportTrucksWithInspections\": " + JsonConvert.SerializeObject(dataExport, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Export trailers active'/inactive to excel
        /// </summary>
        /// <param name="idu"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult ExportTrailers(long idu, string status)
        {
            try
            {
                if (status == "true") status = "ACTIVE";
                else status = "INACTIVE";

                var dataExport = db.ExportTrailers(idu, status);
                if (dataExport.Items.Count != 0)
                {
                    return Json("{\"status\": 0, \"dataExportTrailers\": " + JsonConvert.SerializeObject(dataExport, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Export trailers with inspections active'/inactive to excel
        /// </summary>
        /// <param name="idu"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult ExportTrailersWithInspections(long idu, string status)
        {
            try
            {
                if (status == "true") status = "ACTIVE";
                else status = "INACTIVE";

                var dataExport = db.ExportTrailersWithInspections(idu, status);
                if (dataExport.Items.Count != 0)
                {
                    return Json("{\"status\": 0, \"dataExportTrailersWithInspections\": " + JsonConvert.SerializeObject(dataExport, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// get company inspections
        /// </summary>
        /// <param name="idCompany">company id</param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getInspections(long idCompany)
        {
            try
            {
                var inspections = db.getInspections(idCompany);
                if (inspections != null)
                {
                    return Json("{\"status\": 0, \"inspections\": " + JsonConvert.SerializeObject(inspections, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"inspections\": \"[]\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }


        /// <summary>
        /// get truck/trailer inspections by vehicle type and id
        /// </summary>
        /// <param name="idVehicle">id of the vehicle with which the inspections will be brought</param>
        /// <param name="vehicleType">vehicle type -> truck or trailer</param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public JsonResult getInspectionsByVehicle(long idvehicle, string vehicleType)
        {
            try
            {
                var inspections = db.getInspectionsByVehicle(idvehicle, vehicleType);
                if (inspections != null)
                {
                    return Json("{\"status\": 0, \"maintenanceInspections\": " + JsonConvert.SerializeObject(inspections, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"maintenanceInspections\": \"[]\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpPost("[action]")]
        public JsonResult CreateVehicleInspection(VehicleInspection form)
        {
            JsonResult result = new JsonResult("");

            try
            {
                MaintenanceDocs maintenanceDoc = new MaintenanceDocs();
                //Guid obj = Guid.NewGuid();
                //maintenanceDoc.DocName = obj.ToString() + ".pdf";
                form.FileName = Request.Form.Files[0].FileName;

                var files = Request.Form.Files;

                foreach (var file in files)
                {
                    using (var client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, RegionEndpoint.USWest2))
                    {
                        using (var newMemoryStream = new MemoryStream())
                        {
                            file.CopyTo(newMemoryStream);

                            var uploadRequest = new TransferUtilityUploadRequest
                            {
                                InputStream = newMemoryStream,
                                Key = $"{form.IdCompany}/MaintenanceFile/{form.IdVehicle}/{form.InspectionType}/{Request.Form.Files[0].FileName}",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", Request.Form.Files[0].FileName);

                            var fileTransferUtility = new TransferUtility(client);
                            fileTransferUtility.Upload(uploadRequest);
                        }
                    }
                }

                var r = db.AddNewVehicleInspection(form);
                var inspections = db.getInspections(form.IdCompany.Value);
                switch (r)
                {
                    case 0:
                        result = Json("{\"status\": 0, \"inspections\": " + JsonConvert.SerializeObject(inspections, Formatting.Indented) + " }");
                        break;
                    case 1:
                        result = Json("{\"status\": 2,\"error\": \"Error In The Server\"}");
                        break;
                    case 2:
                        result = Json("{\"status\": 2,\"error\": \"Vehicle Not Found\"}");
                        break;
                }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); };


            return result;
        }
        /// <summary>
        /// Delete inspection
        /// </summary>
        /// <param name="idCompanny"></param>
        /// <param name="idInspection"></param>
        /// <returns></returns>
        [HttpDelete("[action]")]
        public JsonResult deleteInspection(long id, long idcompany)
        {
            try
            {
                var r = db.deleteInspection(id);
                var inspection = db.getInspections(idcompany);
                if (r == 0)
                {
                    return Json("{\"status\": 0, \"inspections\": " + JsonConvert.SerializeObject(inspection, Formatting.Indented) + " }");
  
                }
                else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        /// <summary>
        /// Delete inspection by truck
        /// </summary>
        /// <param name="idCompanny"></param>
        /// <param name="idInspection"></param>
        /// <returns></returns>
        [HttpDelete("[action]")]
        public JsonResult deleteInspectionByTruck(long id, long idVehicle, string typeVehicle)
        {
            try
            {
                var r = db.deleteInspection(id);
                var maintenanceInspections = db.getInspectionsByVehicle(idVehicle, typeVehicle);
                if (r == 0)
                {
                    return Json("{\"status\": 0, \"inspections\": " + JsonConvert.SerializeObject(maintenanceInspections, Formatting.Indented) + " }");

                }
                else { return Json("{\"status\": 1,\"error\": \"Error In The Server\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }
        
        [HttpGet("[action]")]
        public async Task<IActionResult> DownloadVehicleInspectionFile(long idVehicleInspection, string docType)
        {
            try
            {
                var vh = db.GetVehicleInspection(idVehicleInspection);

                var fileNameKey = $"{vh.IdCompany}/MaintenanceFile/{vh.IdVehicle}/{vh.InspectionType}/{vh.FileName}";
                using (var client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, RegionEndpoint.USWest2))
                {
                    GetObjectRequest request = new GetObjectRequest()
                    {
                        Key = fileNameKey,
                        BucketName = BucketName,

                    };

                    using (GetObjectResponse response = await client.GetObjectAsync(request))
                    {
                        var stream = new MemoryStream();
                        using (Stream responseStream = response.ResponseStream)
                        {

                            responseStream.CopyTo(stream);
                            stream.Position = 0;

                            return File(stream, "application/pdf", vh.FileName);
                        }
                    }
                }
            }
            catch (Exception)
            {
                { return BadRequest("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
            }
        }

        [HttpGet("[action]")]
        public JsonResult ExportVehicleInspection(long idCompany)
        {
            try
            {
                var dataExport = db.ExportVehicleInspection(idCompany);

                if (dataExport.Items.Count != 0)
                {
                    return Json("{\"status\": 0, \"dataExportVehicleInspections\": " + JsonConvert.SerializeObject(dataExport, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }

        }

        [HttpGet("[action]")]
        public JsonResult ExportWorkOrder(long idCompany)
        {
            try
            {
                var dataExport = db.ExportWorkOrder(idCompany);

                if (dataExport.Items.Count != 0)
                {
                    return Json("{\"status\": 0, \"dataExportWorkOrders\": " + JsonConvert.SerializeObject(dataExport, Formatting.Indented) + " }");
                }
                else { return Json("{\"status\": 1,\"error\": \"Empty List\"}"); }
            }
            catch (Exception ex)
            {
                return Json($"{{\"status\": 2,\"error\": \"Error In The Server: {ex}\"}}");
            }
        }


        [HttpPost("[action]")]
        public IActionResult OnboardingDOT([FromBody] OnBoardginDOT onBoardgins)
        {

               try
            {
                var response =  db.OnBoardingDOT(onBoardgins.Vehicles, onBoardgins.Trailers, onBoardgins.Inspections, onBoardgins.Violations);

                return Ok("Succesfull");

            } catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("[action]")]
        public IActionResult OnboardingPIN([FromBody] OnBoardingPIN onBoarding)
        {

            try
            {
                var response = db.OnBoardingPIN(onBoarding.Vehicles, onBoarding.Trailers, onBoarding.Users, onBoarding.Drivers, onBoarding.IdCompany, onBoarding.Inspections, onBoarding.Violations);

                return Ok("Succesfull");

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest(ex);
            }
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> UploadBrakeInspectorCertificate(string Certificate, string MechanicName, long idCompany, string docType, string uniqueID = null)
        {
            int r = 0;
            try
            {
                var files = Request.Form.Files;
                foreach (var file in files)
                {
                    Guid obj = Guid.NewGuid();

                    string extension = Path.GetExtension(file.FileName).ToLowerInvariant();

                    MaintenanceDocs maintenanceDoc = new MaintenanceDocs();
                    maintenanceDoc.DocType = docType.Trim();
                    maintenanceDoc.DocName = obj.ToString() + extension;
                    maintenanceDoc.TypeId = "VEHICLE";
                    if (uniqueID != null)
                    {
                        maintenanceDoc.RoadsideInspectionID = uniqueID;
                    }

                    using (var client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, RegionEndpoint.USWest2))
                    {
                        using (var newMemoryStream = new MemoryStream())
                        {
                            file.CopyTo(newMemoryStream);

                            var uploadRequest = new TransferUtilityUploadRequest
                            {
                                InputStream = newMemoryStream,
                                Key = $"{idCompany}/{docType.Trim()}/{maintenanceDoc.DocName}",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", maintenanceDoc.DocName);

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                        }
                    }

                    r = db.saveDoc(maintenanceDoc, file.FileName, idCompany);
                }
                if (r == 0)
                {
                    db.saveinfoBIC(Certificate, MechanicName);
                    var docsBIC = db.getDocsBic(idCompany);
                    return Json("{\"status\": 0, \"docsBIC\": " + JsonConvert.SerializeObject(docsBIC, Formatting.Indented) + " }");
                }
                else
                {
                    return BadRequest("{\"status\": 2,\"error\": \"Error In The Server\"}");
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest("{\"status\": 2,\"error\": \"Error In The Server\"}");
            }
        }

        [HttpGet("[action]")]
        public JsonResult getDocsBic(long idCompany)
        {
            try
            {
                var docsBic = db.getDocsBic(idCompany);
                return Json("{\"status\": 0, \"docsBIC\": " + JsonConvert.SerializeObject(docsBic, Formatting.Indented) + " }");
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpDelete("[action]")]
        public JsonResult deleteBIC(long id, long idCompany)
        {
            try
            {
                var r = db.deleteBIC(id);
                var docsBic = db.getDocsBic(idCompany);
                return Json("{\"status\": 0, \"docsBIC\": " + JsonConvert.SerializeObject(docsBic, Formatting.Indented) + " }");
            }
            catch (Exception) { return Json("{\"status\": 2,\"error\": \"Error In The Server\"}"); }
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> postFiles(long id, long idCompany)
        {
            try
            {
                var z = 0;
                var files = Request.Form.Files;
                foreach (var file in files)
                {
                    Guid obj = Guid.NewGuid();
                    string extension = Path.GetExtension(file.FileName).ToLowerInvariant();
                    MaintenanceDocs maintenanceDoc = new MaintenanceDocs();
                    maintenanceDoc.DocType = "BillOfSale";
                    //maintenanceDoc.DocName = "BillOfSale";
                    maintenanceDoc.DocName = obj.ToString() + extension;
                    maintenanceDoc.IdVehicle = id;
                    maintenanceDoc.IdCompany = idCompany;
                    maintenanceDoc.TypeId = "VEHICLE";

                    using (var client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, RegionEndpoint.USWest2))
                    {
                        using (var newMemoryStream = new MemoryStream())
                        {
                            file.CopyTo(newMemoryStream);

                            var uploadRequest = new TransferUtilityUploadRequest
                            {
                                InputStream = newMemoryStream,
                                Key = $"{idCompany}/TrucksFile/{id}/BillOfSale/{maintenanceDoc.DocName}",
                                BucketName = BucketName,
                                CannedACL = S3CannedACL.PublicRead,
                            };

                            uploadRequest.Metadata.Add("x-amz-meta-filename", maintenanceDoc.DocName);

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);
                        }
                    }

                    z = db.saveDoc(maintenanceDoc, file.FileName, idCompany);
                }
                //if (z == 0)
                //{
                //    DQFDAL db = new DQFDAL();
                //    db.sendEmailMan(wo.Email, idu, _env);
                //}
                //else
                //{
                //    return Json("{\"status\": 2,\"error\": \"Error When Saving Documents\"}");
                //}

                return Json("{\"status\": 0 }");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return Json("{\"status\": 2,\"error\": \"Error In The Server\"}");
            }
        }

        [HttpPost("[action]")]
        public JsonResult emailArchivedTruck(long idCompany, long idUser, long idTruck, string DeactivationReason, DateTime DeactivationDate)
        {
            try
            {
                var email = db.emailUser(idUser);
                var updateVehicle = db.updateDReasonAndDDate(idTruck, DeactivationReason, DeactivationDate);
                var r = db.EmailSend(idCompany, idTruck, email, _env);
                if(r == 0)
                {
                    return Json("{\"status\": 0,\"success\": \"Email Sent\"}");
                } else
                {
                    return Json("{\"status\": 1,\"error\": \"Error sending email\"}");
                }
                
            }
            catch (Exception) { return Json("{\"status\": 1,\"error\": \"Error sending email\"}"); }
        }
    }
}