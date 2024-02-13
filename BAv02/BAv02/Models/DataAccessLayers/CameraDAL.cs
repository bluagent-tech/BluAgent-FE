using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;

namespace BAv02.Models.DataAccessLayers
{
    public class CameraDAL
    {

        public ActionDetails SaveCamera(Camera camera)
        {

            try
            {
                using (var Dbcontext = new BAV02Context())
                {
                    var validation = Dbcontext.Camera.Any(x => x.SerialNumber == camera.SerialNumber);
                    if (validation == false)
                    {
                        Dbcontext.Add(camera);
                        var saveSucess = Dbcontext.SaveChanges();
                    }
                    else
                    {
                        return new ActionDetails
                        {
                            Message = "The serial number already exists.",
                            Code = 1 // Coloca el número de error válido que desees
                        };
                    }
                    return null;
                }

            }
            catch (Exception err)
            {
                Console.WriteLine(err);
                throw new Exception("Error in Server.");
            }
        }

        public Object GetCameraByIdCompanyAndType(long IdCompany, string Type)
        {
            try
            {
                using (var Dbcontext = new BAV02Context())
                {
                    var response = Dbcontext.DevicesView.Where(x => x.IdCompany == IdCompany && x.Type == Type).ToList();
                    return response;
                }
            }
            catch (Exception err)
            {
                Console.WriteLine(err);
                return err;
            }
        }


        public Object UpdateCameraStatus(string serialNumber, string status, long idVehicle, IHostingEnvironment _env)
        {
      
                using (var Dbcontext = new BAV02Context())
                {
                    using ( var transaction = Dbcontext.Database.BeginTransaction())
                    {
                        EmailService emailService = new EmailService(_env);

                        try
                        {
                        var camera = Dbcontext.Camera.Where(x => x.SerialNumber == serialNumber).FirstOrDefault();
                        var company = Dbcontext.Company.Where(x => x.Id == camera.IdCompany).FirstOrDefault();
                        if (status == "Ready to Assign")
                        {
                            camera.Status = "Pending to assign";
                            camera.IDVehicle = idVehicle;
                            emailService.EmailNotificationCamera();
                            emailService.emailBody = emailService.emailBody.Replace("[idCompany]", company.LegalName.ToString()).Replace("[serialCamera]", serialNumber).Replace("[title]", "Request to Assign Camera");
                            emailService.sendMail("support@bluagent.com", "Request to Assign Camera");
                        }
                        if (status == "Assigned")
                        {
                            camera.Status = "Pending to unassign";
                            emailService.EmailNotificationCamera();
                            emailService.emailBody = emailService.emailBody.Replace("[idCompany]", company.LegalName.ToString()).Replace("[serialCamera]", serialNumber).Replace("[title]", "Request to Unassign Camera");
                            emailService.sendMail("support@bluagent.com", "Request to Unassign Camera");
                        }
                        if (status == "Pending to unassign")
                        {
                            camera.Status = "Ready to Assign";
                            camera.IDVehicle = null;
                            camera.StartDate = null;
                            emailService.EmailNotificationCamera();
                            emailService.emailBody = emailService.emailBody.Replace("[idCompany]", company.LegalName.ToString()).Replace("[serialCamera]", serialNumber).Replace("[title]", "Camera was unassigned");
                            emailService.sendMail(company.Email, "Camera was unassigned");
                        }
                        if (status == "Pending to assign")
                        {
                            camera.Status = "Assigned";
                            camera.StartDate = DateTime.Now;
                            emailService.EmailNotificationCamera();
                            emailService.emailBody = emailService.emailBody.Replace("[idCompany]", company.LegalName.ToString()).Replace("[serialCamera]", serialNumber).Replace("[title]", "Camera was assigned");
                            emailService.sendMail(company.Email, "Camera was assigned");
                        }
                        var update = Dbcontext.Attach(camera);
                        update.Property(x => x.Status).IsModified = true;
                        update.Property(x => x.IDVehicle).IsModified = true;

                        Dbcontext.SaveChanges();
                        transaction.Commit();
                        return null;
                    }
                    catch (Exception err)
                    {
                        Console.WriteLine(err);
                        transaction.Rollback();
                        return err;
                    }
                }
                        
                }

        }

        public Object UpdateCameraStatusSuperAdmin(string serialNumber, string status, long idVehicle)
        {
            using (var Dbcontext = new BAV02Context())
            {
                using (var transaction = Dbcontext.Database.BeginTransaction())
                {
                    try
                    {
                        var camera = Dbcontext.Camera.Where(x => x.SerialNumber == serialNumber).FirstOrDefault();

                        if (status == "Pending to unassign")
                        {
                            camera.Status = "Ready to Assign";
                            camera.IDVehicle = null;
                        }
                        if (status == "Pending to assign")
                        {
                            camera.Status = "Assigned";
                            camera.IDVehicle = idVehicle;
                        }

                        var update = Dbcontext.Attach(camera);
                        update.Property(x => x.Status).IsModified = true;
                        update.Property(x => x.IDVehicle).IsModified = true;

                        Dbcontext.SaveChanges();
                        transaction.Commit();
                        return null;
                    }
                    catch (Exception err)
                    {
                        Console.WriteLine(err);
                        transaction.Rollback();
                        return err;
                    }

                }
            }
        }
    }
}
