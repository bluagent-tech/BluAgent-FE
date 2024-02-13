using Newtonsoft.Json;
using System;

namespace BAv02.Models
{
    public partial class RoadTest
    {
        public long Id { get; set; }
        public long? IdDriver { get; set; }
        public long? IdCompany { get; set; }
        public string DriverName { get; set; }
        public string Ssn { get; set; }
        public string License { get; set; }
        public string StateLicense { get; set; }
        public string TypeEquipment { get; set; }
        public string ClassEquipment { get; set; }
        public string TypeBus { get; set; }
        public DateTime? DateC { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }
        public string Title { get; set; }
        public string FileSignatureDer { get; set; }
        public bool PretripInspection { get; set; }
        public bool CouplinAndUncoupling { get; set; }
        public bool PlacingComercial { get; set; }
        public bool CommercialMotorVehicle { get; set; }
        public bool OperatingCommercialMotor {get; set;}
        public bool TourungCommercialMotor { get; set; }
        public bool BreakingAndSlowCommercial { get; set; }
        public bool BackingAndParkingCommercial { get; set; }
        public string RoadTestPerformedBy { get; set; }


        [JsonIgnore]
        public Driver IdNavigation { get; set; }
    }
}
