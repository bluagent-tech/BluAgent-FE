using System;

namespace BAv02.Models
{
    public partial class UsDot
    {
        public string DotNumber { get; set; }
        public string LegalName { get; set; }
        public string DbaName { get; set; }
        public string CarrierOperation { get; set; }
        public string HmFlag { get; set; }
        public string PcFlag { get; set; }
        public string PhyStreet { get; set; }
        public string PhyCity { get; set; }
        public string PhyState { get; set; }
        public string PhyZip { get; set; }
        public string PhyContry { get; set; }
        public string Telephone { get; set; }
        public string EmailAddress { get; set; }
        public DateTime? Mcs150Date { get; set; }
        public string Mcs150Mileage { get; set; }
        public string Mcs150MileageYear { get; set; }
        public DateTime? AddDate { get; set; }
        public string NbrPowerUnit { get; set; }
        public string DriverTotal { get; set; }
    }
}
