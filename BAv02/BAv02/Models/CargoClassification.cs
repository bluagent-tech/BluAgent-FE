using Newtonsoft.Json;

namespace BAv02.Models
{
    public partial class CargoClassification
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
        public bool? M { get; set; }
        public bool? N { get; set; }
        public bool? O { get; set; }
        public bool? P { get; set; }
        public bool? Q { get; set; }
        public bool? R { get; set; }
        public bool? S { get; set; }
        public bool? T { get; set; }
        public bool? U { get; set; }
        public bool? V { get; set; }
        public bool? W { get; set; }
        public bool? X { get; set; }
        public bool? Y { get; set; }
        public bool? Z { get; set; }
        public bool? Aa { get; set; }
        public bool? Bb { get; set; }
        public bool? Cc { get; set; }
        public bool? Dd { get; set; }
        public string Other { get; set; }
        public bool? PassengerCertificate { get; set; }
        public long? IdCompany { get; set; }
        [JsonIgnore]
        public Company IdCompanyNavigation { get; set; }
    }
}
