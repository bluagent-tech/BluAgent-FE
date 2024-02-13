using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace BAv02.Models
{
    public partial class Inspection
    {
        public string UniqueId { get; set; }
        public string ReportNumber { get; set; }
        public string ReportState { get; set; }
        public string DotNumber { get; set; }
        public DateTime InspDate { get; set; }
        public string InspLevelId { get; set; }
        public string CountryCodeState { get; set; }
        public string TimeWeight { get; set; }
        public byte DriverOosTotal { get; set; }
        public byte VehicleOosTotal { get; set; }
        public byte TotalHazmatSent { get; set; }
        public byte OosTotal { get; set; }
        public byte HazmatOosTotal { get; set; }
        public string HazmatPlacardReq { get; set; }
        public string UnitTypeDesc { get; set; }
        public string UnitMake { get; set; }
        public string UnitLicense { get; set; }
        public string UnitLicenseStae { get; set; }
        public string Vin { get; set; }
        public string UnitDecalNumber { get; set; }
        public string UnitTypeDesc2 { get; set; }
        public string UnitMake2 { get; set; }
        public string UnitLicense2 { get; set; }
        public string UnitLicenseState2 { get; set; }
        public string Vin2 { get; set; }
        public string UnitDecalNumber2 { get; set; }
        public string UnsafeInsp { get; set; }
        public string FatiguedInsp { get; set; }
        public string DrFitnessInsp { get; set; }
        public string SubtAlcoholInsp { get; set; }
        public string VHmaintInsp { get; set; }
        public string HmInsp { get; set; }
        public byte? BasicViol { get; set; }
        public byte? UnsafeViol { get; set; }
        public byte? FatiguedViol { get; set; }
        public byte? DrFitnessViol { get; set; }
        public byte? SubtAlcoholViol { get; set; }
        public byte? VHmaintViol { get; set; }
        public byte? HmViol { get; set; }
        [NotMapped]
        public List<object> VIOLATIONS { set; get; }
    }
}
