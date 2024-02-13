using System.Collections.Generic;

namespace BAv02.Models.ComplianceReport
{
    public partial class TruckReport
    {
        public string alertTag { get; set; }
        public int truckCount { get; set; }

        public int percentage { get; set; }

        public string severy { get; set; }
        public List<Vehicle> vehicles { get; set; }
    }

}
