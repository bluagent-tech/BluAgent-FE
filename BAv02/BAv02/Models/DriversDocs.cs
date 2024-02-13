using Newtonsoft.Json;

namespace BAv02.Models
{
    public class DriversDocs
    {
        public long Id { get; set; }
        public string DocName { get; set; }
        public long? IdCompany { get; set; }
        public string DescriptionDoc { get; set; }
        public string DocType { get; set; }
        public long? IdDriver { get; set; }

        [JsonIgnore]
        public Users IdDriverDocs { get; set; }

    }
}
