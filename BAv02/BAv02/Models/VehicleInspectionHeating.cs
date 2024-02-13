namespace BAv02.Models
{
    public partial class VehicleInspectionHeating
    {
        public long Id { get; set; }
        public long? IdVehicleInspection { get; set; }
        public long? IdUser { get; set; }
        public long? IdCompany { get; set; }
        public string Leaks { get; set; }
        public string WornHose { get; set; }
        public string FaultyGasket { get; set; }
        public string MagneticClutch { get; set; }
        public string Refrigerant { get; set; }
        public string Compressor { get; set; }
        public string FlushingContaminated { get; set; }
        public string SystemRecharging { get; set; }
    }
}
