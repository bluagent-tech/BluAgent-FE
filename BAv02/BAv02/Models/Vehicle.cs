using System;

namespace BAv02.Models
{
    public partial class Vehicle
    {
        public long Id { get; set; }
        public string VehicleNumber { get; set; }
        public string Vin { get; set; }
        public string VehicleType { get; set; }
        public string Plate { get; set; }
        public long? PlateState { get; set; }
        public DateTime PlateExpiration { get; set; }
        public bool? Hazmat { get; set; }
        public string FuelType { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public string Year { get; set; }
        public DateTime? InServiceDate { get; set; }
        public decimal? Cost { get; set; }
        public string InsuranceName { get; set; }
        public DateTime? InsuranceExpiration { get; set; }
        public string PolicyTerm { get; set; }
        public string PortEntry { get; set; }
        public int? Weight { get; set; }
        public string OperationRadius { get; set; }
        public string Twic { get; set; }
        public DateTime? ExpTwic { get; set; }
        public string Sct { get; set; }
        public DateTime? Sctexpiration { get; set; }
        public string VerificationNumber { get; set; }
        public DateTime? ExpNumber { get; set; }
        public string FileImage { get; set; }
        public string Condition { get; set; }
        public int? Odometer { get; set; }
        public string Engine { get; set; }
        public string Status { get; set; }
        public long IdCompany { get; set; }
        public string TireSize { get; set; }
        public string OtherInsurance { get; set; }
        public bool? CargoTank { get; set; }
        public string Passengers { get; set; }
        public string DeactivationReason { get; set; }
        public DateTime? DeactivationDate { get;set; }
    }

}
