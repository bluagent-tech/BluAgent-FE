using System.Collections.Generic;

namespace BAv02.Models.ComplianceReport
{
    public partial class DriverComplianceReport
    {
        public List<DriverReport> DriverReport { get; set; }
        public List<DriversByQuarters> DriversByQuarters { get; set; }
        public int ActiveDrivers { get; set; }
        public int DriversInFullCompliance { get; set; }
        public int CompliancePercentage { get; set; }
    
    }

}
