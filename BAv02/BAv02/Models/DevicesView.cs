using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace BAv02.Models
{
    public class DevicesView
    {
        [Key]
        public long IDCamera { get; set; }
        public string SerialNumber { get; set; }
        public string Model { get; set; }
        public long IdCompany { get; set; }
        public string Status { get; set; }
        public long? IDVehicle { get; set; }
        public string Type { get; set; }
        public string VehicleNumber { get; set; }
        public DateTime? StartDate { get; set; }
    }
}
