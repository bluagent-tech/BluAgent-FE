using Newtonsoft.Json;

namespace BAv02.Models
{
    public partial class HazardMaterialCompany
    {
        public long Id { get; set; }
        public int IdHazardMaterial { get; set; }
        public bool? Carrier { get; set; }
        public bool? Shipper { get; set; }
        public bool? BulkHm { get; set; }
        public bool? NonBulk { get; set; }
        public long? IdCompany { get; set; }
        [JsonIgnore]
        public Company IdCompanyNavigation { get; set; }
        [JsonIgnore]
        public HazardMaterial IdHazardMaterialNavigation { get; set; }
    }
}
