using System;
using BAv02.Models.DataAccessLayers.Repositories;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;
using System.Linq;
using Microsoft.AspNetCore.Hosting;

namespace BAv02.Models.DataAccessLayers
{
    /// <summary>Repository for Vehicle.</summary>
    /// <seealso cref="BAv02.Models.DataAccessLayers.Repositories.IVehicleRepository" />
    public class VehicleDAL : IVehicleRepository
    {
        /// <summary>The context</summary>
        private readonly BAV02Context _context;

        /// <summary>Initializes a new instance of the <see cref="VehicleDAL" /> class.</summary>
        public VehicleDAL()
        {
            _context = new BAV02Context();
        }

        public VehicleDAL(BAV02Context context)
        {
            _context = context;
        }

        public IEnumerable<Vehicle> GetAll()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Vehicle> GetAllActive()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Vehicle> GetAllActiveVehicle()
        {
            var active = "ACTIVE";

            return _context.Vehicle.FromSql("SELECT * FROM MT.Vehicle").Where(table => table.Status == active).ToList();


        }

        public IEnumerable<Vehicle> GetAllInactiveVehicle()
        {
            var inactive = "INACTIVE";

            return _context.Vehicle.FromSql("SELECT * FROM MT.Vehicle").Where(table => table.Status == inactive).ToList();


        }
        public IEnumerable<Vehicle> GetAllInactive()
        {
            throw new NotImplementedException();
        }

        public string SendEmailReport(IHostingEnvironment _env, long churned, long trucks, long newTrucks, long endingTrucks, string initDate, string endDate)
        {
            try
            {
                EmailService sendReport = new EmailService(_env);
                sendReport.setEmailReports();
                sendReport.emailBody = sendReport.emailBody
                    .Replace("[Beginning Trucks]", trucks.ToString())
                    .Replace("[New Trucks]", newTrucks.ToString())
                    .Replace("[Churned Trucks]", churned.ToString())
                    .Replace("[Ending Trucks]", endingTrucks.ToString())
                    .Replace("[Date]", initDate.ToString() + endDate.ToString());

                sendReport.sendMail("jesus.bedoy92@gmail.com,jose@bluagent.com", "Report Requested");
                return "send message";
            }
            catch (Exception ex)
            {
                return Convert.ToString(ex);
            }

        }
    }
}
