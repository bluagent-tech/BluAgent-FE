using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;

namespace BAv02.Models
{
    public partial class VehicleInspectionBrakes
    {
        public Int64 IdVehicleInspection { get; set; }

        public string ParkingBrakeSystem { get; set; }

        
        public string BrakesRelease { get; set; }

        
        public string HydraulicBrakeSystem { get; set; }

        
        public string AirBrakeSystem { get; set; }

        
        public string AirCompressorSystem { get; set; }

        
        public string EmergencyStoppingSystem { get; set; }

        
        public string BrakeApplicationTest { get; set; }

        
        public string BrakeDrums { get; set; }

        
        public string VacuumSystem { get; set; }

        
        public string TractorProtectionValve { get; set; }

        
        public string HydraulicMasterCylinder { get; set; }

        
        public string HosesTubing { get; set; }

        
        public string PrimaryAirTank { get; set; }

        
        public string OtherAirTanks { get; set; }

        
        public string ElectricBrakes { get; set; }

        
        public string LowPressureDevice { get; set; }

        
        public string MechanicName { get; set; }

        
        public string Certificate { get; set; }

        public long? IdMaintenanceDocs { get; set; }

    }
}
