using System;
using System.Linq;

namespace BAv02.Models.Tools
{
    public class Alerts
    {
        string color = "";
        string message = "";
        static DateTime currentDate = DateTime.Today;
        double days;

        #region  MaintenanceAlerts
        /// <summary>
        /// validation alerts of Maintenance 
        /// </summary>
        /// <param name="idt"></param>
        /// <returns></returns>
        public int validationMAlerts(long idt, string type)
        {
            var r = 0;
            try
            {
                if (type == "TRAILER")
                {
                    using (var DbContext = new BAV02Context())
                    {
                        var t = DbContext.Trailer.Where(x => x.IdTrailer == idt && x.Status == "ACTIVE").FirstOrDefault();
                        var annualInspection = DbContext.VehicleInspections.Where(x => x.IdVehicle == idt && x.VehicleType == type && x.InspectionType == "90-day Inspection").OrderByDescending(x => x.InspectionDate).FirstOrDefault();
                        var inspection90 = DbContext.VehicleInspections.Where(x => x.IdVehicle == idt && x.VehicleType == type && x.InspectionType == "Annual Inspection").OrderByDescending(x => x.InspectionDate).FirstOrDefault();
                        //if (t.Status != "INACTIVE")
                        //{
                            if (inspection90 != null)
                            {
                                if (inspection90.InspectionDate != null)
                                {
                                    var nextInspection = inspection90.InspectionDate.AddDays(70);
                                    days = (nextInspection - currentDate).TotalDays;
                                    message = "90-Day Inspection is due on " + inspection90.InspectionDate.ToString("MM/dd/yyyy");
                                    if (days <= 0) { color = "danger"; r = createMAlerts(idt, type); }
                                }
                            }

                            if (annualInspection != null)
                            {
                                if (annualInspection.InspectionDate != null)
                                {
                                    var nextInspection = annualInspection.InspectionDate.AddDays(330);
                                    days = (nextInspection - currentDate).TotalDays;
                                    message = "Annual Inspection is due on " + annualInspection.InspectionDate.ToString("MM/dd/yyyy");
                                    if (days <= 0) { color = "danger"; r = createMAlerts(idt, type); }
                                }
                            }

                            if (t != null)
                            {
                                if (t.PlateExpiration != null)
                                {
                                    days = (t.PlateExpiration - currentDate).TotalDays;
                                    message = "Registration expires on " + t.PlateExpiration.ToString("MM/dd/yyyy");
                                    if (days == 15) { color = "info"; r = createMAlerts(idt, type); }
                                    else if (days == 10) { color = "warning"; r = createMAlerts(idt, type); }
                                    else if (days < 3) { color = "danger"; r = createMAlerts(idt, type); }
                                }

                                if (t.InsuranceExpiration != null)
                                {
                                    string n = t.InsuranceExpiration.ToString();
                                    int x = Convert.ToInt16(t.PolicyTerm.Substring(0, 2));
                                    days = (Convert.ToDateTime(n).AddMonths(x) - currentDate).TotalDays;
                                    message = "Insurance Policy expires on " + Convert.ToDateTime(n).AddMonths(x).ToString("MM/dd/yyyy");
                                    if (days == -15) { color = "info"; r = createMAlerts(idt, type); }
                                    else if (days == -10) { color = "warning"; r = createMAlerts(idt, type); }
                                    else if (days < -3) { color = "danger"; r = createMAlerts(idt, type); }
                                }
                            }
                        //}



                        //if (t.PlateExp != null)
                        //{
                        //    days = (currentDate.AddYears(1) - t.PlateExp).TotalDays;
                        //    message = "Remember to do your annual inspection " + t.PlateExp.ToString("MM/dd/yyyy");
                        //    if (days == 15) { color = "info"; r = createMAlerts(idt, type); }
                        //    else if (days == 10) { color = "warning"; r = createMAlerts(idt, type); }
                        //    else if (days < 3) { color = "danger"; r = createMAlerts(idt, type); }
                        //}

                        //if (t.PlateExp != null)
                        //{
                        //    days = (currentDate.AddMonths(3) - t.PlateExp).TotalDays;
                        //    message = "Remember to do your state inspection " + t.PlateExp.ToString("MM/dd/yyyy");
                        //    if (days == 15) { color = "info"; r = createMAlerts(idt, type); }
                        //    else if (days == 10) { color = "warning"; r = createMAlerts(idt, type); }
                        //    else if (days < 3) { color = "danger"; r = createMAlerts(idt, type); }
                        //}
                    }
                }
                else if (type == "VEHICLE")
                {
                    using (var DbContext = new BAV02Context())
                    {
                        var v = DbContext.Vehicle.Where(x => x.Id == idt && x.Status == "ACTIVE").FirstOrDefault();
                        var annualInspection = DbContext.VehicleInspections.Where(x => x.IdVehicle == idt && x.VehicleType == type && x.InspectionType == "90-day Inspection").OrderByDescending(x => x.InspectionDate).FirstOrDefault();
                        var inspection90 = DbContext.VehicleInspections.Where(x => x.IdVehicle == idt && x.VehicleType == type && x.InspectionType == "Annual Inspection").OrderByDescending(x => x.InspectionDate).FirstOrDefault();
                        //if (v.Status != "INACTIVE")
                        //{
                            if (inspection90 != null)
                            {
                                if (inspection90.InspectionDate != null)
                                {
                                    var nextInspection = inspection90.InspectionDate.AddDays(70);
                                    days = (nextInspection - currentDate).TotalDays;
                                    message = "90-Day Inspection is due on " + inspection90.InspectionDate.ToString("MM/dd/yyyy");
                                    if (days <= 0) { 
                                        color = "danger"; r = createMAlerts(idt, type); 
                                    }
                                }
                            }

                            if (annualInspection != null)
                            {
                                if (annualInspection.InspectionDate != null)
                                {
                                    var nextInspection = annualInspection.InspectionDate.AddDays(330);
                                    days = (nextInspection - currentDate).TotalDays;
                                    message = "Annual Inspection is due on " + annualInspection.InspectionDate.ToString("MM/dd/yyyy");
                                    if (days <= 0) { color = "danger"; r = createMAlerts(idt, type); }
                                }
                            }

                            if (v != null)
                            {
                                if (v.PlateExpiration != null)
                                {
                                    days = (v.PlateExpiration - currentDate).TotalDays;
                                    message = "Registration expires on " + v.PlateExpiration.ToString("MM/dd/yyyy");
                                    if (days == 15) { color = "info"; r = createMAlerts(idt, type); }
                                    else if (days == 10) { color = "warning"; r = createMAlerts(idt, type); }
                                    else if (days < 3) { color = "danger"; r = createMAlerts(idt, type); }
                                }
                               if (v.InsuranceExpiration != null)
                               {
                                    string n = v.InsuranceExpiration.ToString();
                                    int x = Convert.ToInt16(v.PolicyTerm.Substring(0, 2));
                                    days = (Convert.ToDateTime(n).AddMonths(x) - currentDate).TotalDays;
                                    message = "Insurance Policy expires on " + Convert.ToDateTime(n).AddMonths(x).ToString("MM/dd/yyyy");
                                    if (days == -15) { color = "info"; r = createMAlerts(idt, type); }
                                    else if (days == -10) { color = "warning"; r = createMAlerts(idt, type); }
                                    else if (days < -3) { color = "danger"; r = createMAlerts(idt, type); }
                               }
                            }
                        //}
                    }
                }
            }
            catch (Exception) { r = 1; }
            return r;
        }

        /// <summary>
        /// crreate alerts of Maintenance 
        /// </summary>
        /// <param name="idt"></param>
        /// <returns></returns>
        public int createMAlerts(long idt, string type)
        {
            var r = 0;
            try
            {
                MaintenanceAlerts m = new MaintenanceAlerts();
                using (var DbContext = new BAV02Context())
                {
                    var n = DbContext.MaintenanceAlerts.Where(x => x.Message == message && x.TypeId == type && x.IdVehicle == idt).FirstOrDefault();
                    if (n == null)
                    {
                        m.Message = message;
                        m.Severy = color;
                        m.TypeId = type;
                        m.IdVehicle = idt;
                        DbContext.Add(m);
                    }
                    else
                    {
                        n.Severy = color;
                        var update = DbContext.Attach(n);
                        update.Property(x => x.Severy).IsModified = true;
                    }
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { r = 1; }


            return r;
        }

        /// <summary>
        /// crreate alerts of Maintenance 
        /// </summary>
        /// <param name="idt"></param>
        /// <returns></returns>
        public int deleteMAlerts(long id, string type, string date)
        {
            var r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var da = DbContext.MaintenanceAlerts.Where(x => x.Message.Contains(date) & x.TypeId == type & x.IdVehicle == id).FirstOrDefault();
                    DbContext.MaintenanceAlerts.RemoveRange(da);
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { r = 1; }
            return r;
        }
        #endregion

        #region  DriverAlerts
        /// <summary>
        /// validation alerts of driver 
        /// </summary>
        /// <param name="idt"></param>
        /// <returns></returns>
        public int validationDAlerts(long idd)
        {
            var r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var d = DbContext.Driver.Where(x => x.IdUser == idd).FirstOrDefault();
                    if (d == null) { return r; }
                    var dmv = DbContext.Dmv.Where(x => x.IdDriver == idd).OrderByDescending(x => x.Id).Take(1).FirstOrDefault();
                    var m = DbContext.MedicalCertificate.Where(x => x.IdDriver == idd).OrderByDescending(x => x.Id).Take(1).FirstOrDefault();

                    if (d.LicenseExpiration != null)
                    {
                        string n = d.LicenseExpiration.ToString();
                        days = (Convert.ToDateTime(n) - currentDate).TotalDays;
                        message = "Driver License is expiring on " + Convert.ToDateTime(n).ToString("MM/dd/yyyy");
                        if (days == 15) { color = "info"; r = createDAlerts(idd); }
                        else if (days == 10) { color = "warning"; r = createDAlerts(idd); }
                        else if (days < 3) { color = "danger"; r = createDAlerts(idd); }
                    }

                    //if (d.TwicExp != null)
                    //{
                    //    string n = d.TwicExp.ToString();
                    //    days = (Convert.ToDateTime(n) - currentDate).TotalDays;
                    //    message = "The TWIC expires " + Convert.ToDateTime(n).ToString("MM/dd/yyyy");
                    //    if (days == 15) { color = "info"; r = createDAlerts(idd); }
                    //    else if (days == 10) { color = "warning"; r = createDAlerts(idd); }
                    //    else if (days < 3) { color = "danger"; r = createDAlerts(idd); }
                    //}

                    //if (d.FastExp != null)
                    //{
                    //    string n = d.FastExp.ToString();
                    //    days = (Convert.ToDateTime(n) - currentDate).TotalDays;
                    //    message = "The Fast Number expires " + Convert.ToDateTime(n).ToString("MM/dd/yyyy");
                    //    if (days == 15) { color = "info"; r = createDAlerts(idd); }
                    //    else if (days == 10) { color = "warning"; r = createDAlerts(idd); }
                    //    else if (days < 3) { color = "danger"; r = createDAlerts(idd); }
                    //}

                    //if (d.UsaTagExp != null)
                    //{
                    //    string n = d.UsaTagExp.ToString();
                    //    days = (Convert.ToDateTime(n) - currentDate).TotalDays;
                    //    message = "The Tag expires " + Convert.ToDateTime(n).ToString("MM/dd/yyyy");
                    //    if (days == 15) { color = "info"; r = createDAlerts(idd); }
                    //    else if (days == 10) { color = "warning"; r = createDAlerts(idd); }
                    //    else if (days < 3) { color = "danger"; r = createDAlerts(idd); }
                    //}

                    try
                    {
                        if(dmv != null)
                        {
                            if (dmv.ExpirationDate != null)
                            {
                                string n = dmv.ExpirationDate.ToString();
                                days = (Convert.ToDateTime(n) - currentDate).TotalDays;
                                message = "DMV Driving Record renewal is coming up on " + Convert.ToDateTime(n).ToString("MM/dd/yyyy");
                                if (days == 15) { color = "info"; r = createDAlerts(idd); }
                                else if (days == 10) { color = "warning"; r = createDAlerts(idd); }
                                else if (days < 3) { color = "danger"; r = createDAlerts(idd); }
                            }
                        }
                    }
                    catch (Exception)
                    {
                    }

                    try
                    {
                        if(m != null)
                        {
                            if (m.ExpirationDate != null)
                            {
                                string n = m.ExpirationDate.ToString();
                                days = (Convert.ToDateTime(n) - currentDate).TotalDays;
                                message = "Medical Certificate expires on " + Convert.ToDateTime(n).ToString("MM/dd/yyyy");
                                if (days == 15) { color = "info"; r = createDAlerts(idd); }
                                else if (days == 10) { color = "warning"; r = createDAlerts(idd); }
                                else if (days < 3) { color = "danger"; r = createDAlerts(idd); }
                            }
                        }
                    }
                    catch (Exception)
                    {
                    }

                    
                }
            }
            catch (Exception) { r = 1; }
            return r;
        }

        /// <summary>
        /// crreate alerts of driver 
        /// </summary>
        /// <param name="idt"></param>
        /// <returns></returns>
        public int createDAlerts(long idd)
        {
            var r = 0;
            try
            {
                DriverAlerts d = new DriverAlerts();
                using (var DbContext = new BAV02Context())
                {
                    var n = DbContext.DriverAlerts.Where(x => x.Message == message && x.IdDriver == idd).FirstOrDefault();
                    if (n == null)
                    {
                        d.IdDriver = idd;
                        d.Message = message;
                        d.Severy = color;
                        DbContext.Add(d);
                    }
                    else
                    {
                        n.Severy = color;
                        var update = DbContext.Attach(n);
                        update.Property(x => x.Severy).IsModified = true;
                    }
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { r = 1; }


            return r;
        }

        /// <summary>
        /// crreate alerts of driver 
        /// </summary>
        /// <param name="idt"></param>
        /// <returns></returns>
        public int deleteDAlerts(long? id, string date)
        {
            var r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var da = DbContext.DriverAlerts.Where(x => x.Message.Contains(date) & x.IdDriver == id).FirstOrDefault();
                    DbContext.DriverAlerts.RemoveRange(da);
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { r = 1; }
            return r;
        }
        #endregion

        #region  CompanyAlerts
        /// <summary>
        /// validation alerts of company to save 
        /// </summary>
        /// <param name="idt"></param>
        /// <returns></returns>
        public int validationCAlerts(Company c)
        {
            var r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var operationClass = DbContext.OperationClassification.Where(x => x.IdCompany == c.Id).FirstOrDefault();
                    var classifications = DbContext.OperationClassification.Where(x => x.IdCompany == c.Id).FirstOrDefault();
                    var hazardMaterial = DbContext.HazardMaterialOptions.Where(x => x.IdCompany == c.Id).FirstOrDefault();


                    if (c.UpdateDate != null)
                    {
                        string n = c.UpdateDate.ToString();
                        days = (currentDate - Convert.ToDateTime(n)).TotalDays;
                        message = "Remember to File the MCS-150 Biennial Update";
                        if (days == 760) { createCAlerts(c.Id, message, "info"); }
                        else if (days == 744) { createCAlerts(c.Id, message, "warning"); }
                        else if (days > 731) { createCAlerts(c.Id, message, "danger"); }
                        else if (days == 0) { deleteCAlerts(c.Id, message); }
                    }
                    if(c.Mcs150Date != null || c.UpdateDate != null)
                    {
                        var totaldaysMCS = currentDate - Convert.ToDateTime(c.Mcs150Date);
                        int yearofMcs150Date = (int)(totaldaysMCS.TotalDays / 365.255);
                        var totaldaysUPDATE = currentDate - Convert.ToDateTime(c.UpdateDate);
                        int yearOfUpdateDate = (int)(totaldaysUPDATE.TotalDays / 365.255);
                        if (yearofMcs150Date != 0 || yearOfUpdateDate != 0) { createCAlerts(c.Id, "You need to Print and Update MCS-150 Form", "danger"); }
                        else { deleteCAlerts(c.Id, "You need to Print and Update MCS-150 Form"); }
                    }
                    if (c.LegalName == null) { createCAlerts(c.Id, "Legal Company Name is missing, please add it on Company Information", "danger"); }
                    else { deleteCAlerts(c.Id, "Legal Company Name is missing, please add it on Company Information"); }
                    if (c.Dot == null) { createCAlerts(c.Id, "US DOT # is missing, please add it on Company Information", "danger"); }
                    else { deleteCAlerts(c.Id, "US DOT # is missing, please add it on Company Information"); }
                    if (c.McMx == null) { createCAlerts(c.Id, "MC/MX # is missing, please add it on Company Information", "danger"); }
                    else { deleteCAlerts(c.Id, "MC/MX # is missing, please add it on Company Information"); }
                    if (c.Tax == null) { createCAlerts(c.Id, "Tax ID # is missing, please add it on Company Information", "danger"); }
                    else { deleteCAlerts(c.Id, "Tax ID # is missing, please add it on Company Information"); }
                    if (c.CarrierOperation == null) { createCAlerts(c.Id, "Company operations needs to be completed", "danger"); }
                    else { deleteCAlerts(c.Id, "Company operations needs to be completed"); }
                    if (operationClass == null) { createCAlerts(c.Id, "Operation Classifications needs to be completed", "danger"); }
                    else { deleteCAlerts(c.Id, "Operation Classifications needs to be completed"); }
                    if (c.PhysicalAddress == null) { createCAlerts(c.Id, "Address is missing,  please add it on Company Information", "danger"); }
                    else { deleteCAlerts(c.Id, "Address is missing,  please add it on Company Information"); }
                    if (c.Der == null) { createCAlerts(c.Id, "DER Name is missing, please add it on Company Information", "danger"); }
                    else { deleteCAlerts(c.Id, "DER Name is missing, please add it on Company Information"); }
                    if (c.PhoneNumber == null) { createCAlerts(c.Id, "Business Phone is missing, please add it on Company Information", "danger"); }
                    else { deleteCAlerts(c.Id, "Business Phone is missing, please add it on Company Information"); }
                    if (c.Email == null) { createCAlerts(c.Id, "Email is missing, please add it on Company Information", "danger"); }
                    else { deleteCAlerts(c.Id, "Email is missing, please add it on Company Information"); }
                    if (classifications == null) { createCAlerts(c.Id, "Classification needs to be completed", "danger"); }
                    else { deleteCAlerts(c.Id, "Classification needs to be completed"); }
                    if (c.Hazmat == true && hazardMaterial == null) { createCAlerts(c.Id, "Hazardous Material cargo needs to be completed", "danger"); }
                    else { deleteCAlerts(c.Id, "Hazardous Material cargo needs to be completed"); }
                    if (c.Powerunit == null) { createCAlerts(c.Id, "Please add the Total of Power Units", "danger"); }
                    else { deleteCAlerts(c.Id, "Please add the Total of Power Units"); }
                    if (c.DriverTotal == null) { createCAlerts(c.Id, "Please add the Total of Drivers", "danger"); }
                    else { deleteCAlerts(c.Id, "Please add the Total of Drivers"); }
                    if (c.Title == null) { createCAlerts(c.Id, "Please Add your title in the company", "danger"); }
                    else { deleteCAlerts(c.Id, "Please Add your title in the company"); }
                    if (c.Mcs150Mileage == null) { createCAlerts(c.Id, "Please add you Annual Vehicle mileage", "danger"); }
                    else { deleteCAlerts(c.Id, "Please add you Annual Vehicle mileage"); }
                    if (c.Pinnumber == null) { createCAlerts(c.Id, "Please Add you PIN #", "danger"); }
                    else { deleteCAlerts(c.Id, "Please Add you PIN #"); }
                }
            }
            catch (Exception) { r = 1; }
            return r;
        }



        /// <summary>Creates the company alerts.</summary>
        /// <param name="idc">The idc.</param>
        /// <param name="message">The message.</param>
        /// <param name="color">The color.</param>
        /// <returns></returns>
        public int createCAlerts(long idc, string message, string color)
        {
            var r = 0;
            try
            {
                CompanyAlerts c = new CompanyAlerts();
                using (var DbContext = new BAV02Context())
                {
                    var n = DbContext.CompanyAlerts.Where(x => x.Message == message && x.IdCompany == idc).FirstOrDefault();
                    if (n == null)
                    {
                        c.IdCompany = idc;
                        c.Severy = color;
                        c.Message = message;
                        DbContext.Add(c);
                    }
                    else
                    {
                        n.Severy = color;
                        var update = DbContext.Attach(n);
                        update.Property(x => x.Severy).IsModified = true;
                    }
                    DbContext.SaveChanges();
                }
            }
            catch (Exception) { r = 1; }


            return r;
        }

        /// <summary>
        /// crreate alerts of company 
        /// </summary>
        /// <param name="idt"></param>
        /// <returns></returns>
        public int deleteCAlerts(long id, string messange)
        {
            var r = 0;
            try
            {
                using (var DbContext = new BAV02Context())
                
                {
                    var ca = DbContext.CompanyAlerts.Where(x => x.Message == messange & x.IdCompany == id).FirstOrDefault();
                    if (ca != null)
                    {
                        DbContext.CompanyAlerts.RemoveRange(ca);
                        DbContext.SaveChanges();
                    }
                }
            }
            catch (Exception) { r = 1; }
            return r;
        }

        #endregion
    }
}
