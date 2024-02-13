using Newtonsoft.Json;

namespace BAv02.Models
{
    public partial class HazardMaterialOptions
    {
        public long Id { get; set; }
        public long? IdCompany { get; set; }
        public bool? Hrcq { get; set; }
        public bool? QuantityofDivision { get; set; }
        public bool? Tih { get; set; }
        public bool? Shipment { get; set; }
        public string Hmsafety { get; set; }
        public string Cfr { get; set; }
        public bool? Cfr485 { get; set; }
        public bool? Anystates { get; set; }
        [JsonIgnore]
        public Company IdCompanyNavigation { get; set; }
    }
}
