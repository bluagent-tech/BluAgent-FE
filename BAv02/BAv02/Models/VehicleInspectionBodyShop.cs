namespace BAv02.Models
{
    public partial class VehicleInspectionBodyShop
    {
        public long Id { get; set; }
        public long? IdVehicleInspection { get; set; }
        public long? IdUser { get; set; }
        public long? IdCompany { get; set; }
        public string WindShieldGlazing { get; set; }
        public string WindShieldWipersStatus { get; set; }
        public string WindShieldWipersOtherStatus { get; set; }
    }
}
