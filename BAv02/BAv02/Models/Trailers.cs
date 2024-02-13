using System;

namespace BAv02.Models
{
    public partial class Trailers
    {
        public long IdCompany { get; set; }
        public string Make { get; set; }
        public string Plate { get; set; }
        public long PlateState { get; set; }
        public string TrailerType { get; set; }
        public string TrailerNumber { get; set; }
        public string Vin { set; get; }
        public string Status { get; set; }
        public DateTime PlateExpiration { get; set; }
    }
}
