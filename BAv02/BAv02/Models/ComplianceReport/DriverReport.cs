using System.Collections.Generic;

namespace BAv02.Models.ComplianceReport
{
    public partial class DriverReport
    {
        public string alertTag { get; set; }
        public int driverCount { get; set; }

        public int percentage { get; set; }

        public string severy { get; set; }

        public List<DriverComplianceData> alldrivers { get; set; }
    }

}