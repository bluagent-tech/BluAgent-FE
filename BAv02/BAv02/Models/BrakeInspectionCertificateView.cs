using System;

namespace BAv02.Models
{
    public class BrakeInspectionCertificateView
    {

        public long Id { get; set; }
        public string DocName { get; set; }
        public string DescriptionDoc { get; set; }
        public string DocType { get; set; }
        public long? IdCompany { get; set; }
        public long IdVehicleInspection { get; set; }
        public string MechanicName { get; set; }
        public string Certificate { get; set; }
        public long? vibIdMaintenanceDocs { get; set; }
    }
}