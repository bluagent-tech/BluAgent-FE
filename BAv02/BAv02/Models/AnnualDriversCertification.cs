using System;

namespace BAv02.Models
{
    public partial class AnnualDriversCertification
    {
        public long Id { get; set; }
        public long? IdDriver { get; set; }
        public long? IdCompany { get; set; }
        public DateTime? ViolationDate { get; set; }
        public string Offense { get; set; }
        public string Location { get; set; }
        public string TypeVehicleOperated { get; set; }
        public string Status { get; set; }
        public DateTime? CertificationDate { get; set; }
    }
}
