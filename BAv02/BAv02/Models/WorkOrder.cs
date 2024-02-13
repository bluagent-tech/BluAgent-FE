using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace BAv02.Models
{
    public partial class WorkOrder
    {
        public WorkOrder()
        {
            Material = new HashSet<Material>();
            Service = new HashSet<Service>();
        }

        public long Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Type { get; set; }
        public string MileageTime { get; set; }
        public DateTime? DateNext { get; set; }
        public string MileageType { get; set; }
        public string InspectionDue { get; set; }
        public string AssignedTo { get; set; }
        public string Status { get; set; }
        public bool? ExternalServices { get; set; }
        public string WorkRequest { get; set; }
        public string Email { get; set; }
        public long IdVehicle { get; set; }
        public string VehicleType { get; set; }
        public long IdCompany { get; set; }
        public long IssuedBy { get; set; }
        public string ServiceType { get; set; }
        public DateTime? DateNextInspectionService { get; set; }
        public bool? checkNoNextInspectionService { get; set; }
        public string NextServiceType { get; set; }
        public string NextOdometerReminder { get; set; }

        [JsonIgnore]
        public Company IdCompanyNavigation { get; set; }
        public ICollection<Material> Material { get; set; }
        public ICollection<Service> Service { get; set; }
    }
}
