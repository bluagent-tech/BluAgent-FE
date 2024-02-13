namespace BAv02.Models
{
    public partial class VehicleInspectionMechanical
    {
        public long Id { get; set; }
        public long? IdVehicleInspection { get; set; }
        public long? IdUser { get; set; }
        public long? IdCompany { get; set; }
        public string FifthWheels { get; set; }
        public string PrintieHooks { get; set; }
        public string SafetyDevices { get; set; }
        public string SaddleMounts { get; set; }
        public string ExhaustedSystem { get; set; }
    }
}
