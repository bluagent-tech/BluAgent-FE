using System;

namespace BAv02.Models
{
    public partial class Vehicles
    {
        public string condition { get; set; }
        public string fuelType { get; set; }
        public long idCompany { get; set; }
        public string make { get; set; }
        public string model { get; set; }
        public string plate { get; set; }
        public long plateState { get; set; }
        public string vehicleType { get; set; }
        public string vehicleNumber { get; set; }
        public string vin { set; get; }
        public string status { get; set; }
        public DateTime PlateExpiration { get; set; }
    }
}
