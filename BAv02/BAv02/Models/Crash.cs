using System;

namespace BAv02.Models
{
    public partial class Crash
    {
        public long IdCrash { get; set; }
        public string ReportNumber { get; set; }
        public byte ReportSeqNo { get; set; }
        public string DotNumber { get; set; }
        public DateTime ReportDate { get; set; }
        public string ReportState { get; set; }
        public byte Fatalities { get; set; }
        public byte Injuries { get; set; }
        public string TowAway { get; set; }
        public string HazmatReleased { get; set; }
        public string TrafficDesc { get; set; }
        public string AccessControlDesc { get; set; }
        public string RoadSurfaceConditionDesc { get; set; }
        public string WeatherConditionDesc { get; set; }
        public string LightConditionDesc { get; set; }
        public string Vin { get; set; }
        public string VehicleLinceseNumber { get; set; }
        public string VehicleLinceseState { get; set; }
        public byte? SeverityWeight { get; set; }
        public byte? TimeWeight { get; set; }
        public string CitationIssuedDesc { get; set; }
        public byte SeqNum { get; set; }
    }
}
