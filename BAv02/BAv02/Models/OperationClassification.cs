using Newtonsoft.Json;

namespace BAv02.Models
{
    public partial class OperationClassification
    {
        public long Id { get; set; }
        public bool? A { get; set; }
        public bool? B { get; set; }
        public bool? C { get; set; }
        public bool? D { get; set; }
        public bool? E { get; set; }
        public bool? F { get; set; }
        public bool? G { get; set; }
        public bool? H { get; set; }
        public bool? I { get; set; }
        public bool? J { get; set; }
        public bool? K { get; set; }
        public bool? L { get; set; }
        public string Other { get; set; }
        public long? IdCompany { get; set; }
        [JsonIgnore]
        public Company IdCompanyNavigation { get; set; }
    }
}
