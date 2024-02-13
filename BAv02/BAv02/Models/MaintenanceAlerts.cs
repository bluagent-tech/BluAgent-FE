using System;

namespace BAv02.Models
{
    public partial class MaintenanceAlerts
    {
        public long Id { get; set; }
        public long IdVehicle { get; set; }
        public string Message { get; set; }
        public string TypeId { get; set; }
        public int IdCompany { get; set; }
        public string Severy { get; set; }
        public string EconomicNumber { get; set; }
        
    }
}
