using System.Collections.Generic;

namespace BAv02.Models.ComplianceReport
{
    public partial class TruckComplianceReport
    {
        public List<TruckReport> TruckReport { get; set; }
        public List<TrucksByQuarters> TrucksByQuarters { get; set; }
        public List<TrucksByQuarters> TrucksByAnnual { get; set; }
        public int ActiveTrucks { get; set; }
        public int TrucksInFullCompliance { get; set; }
        public int CompliancePercentage { get; set; }
        public bool HasStateNumberOrCA { get; set; }
    }

}
