using System;
using System.ComponentModel.DataAnnotations;

namespace BAv02.Models.DOT
{
    public class CRASHES
    {
        [Key]
        public string REPORT_NUMBER { get; set; }
        public int REPORT_SEQ_NO { get; set; }
        public string DOT_NUMBER { get; set; }
        public DateTime REPORT_DATE { get; set; }
        public string REPORT_STATE { get; set; }
        public int FATALITIES { get; set; }
        public int INJURIES { get; set; }
        public string TOW_AWAY { get; set; }
        public string HAZMAT_RELEASED { get; set; }
        public string TRAFFICWAY_DESC { get; set; }
        public string ACCESS_CONTROL_DESC { get; set; }
        public string ROAD_SURFACE_CONDITION_DESC { get; set; }
        public string WEATHER_CONDITION_DESC { get; set; }
        public string LIGHT_CONDITION_DESC { get; set; }
        public string VEHICLE_ID_NUMBER { get; set; }
        public string VEHICLE_LICENSE_NUMBER { get; set; }
        public string VEHICLE_LICENSE_STATE { get; set; }
        public int SEVERITY_WEIGHT { get; set; }
        public int TIME_WEIGHT { get; set; }
        public string CITATION_ISSUED_DESC { get; set; }
        public int SEQ_NUM { get; set; }
        public string NOT_PREVENTABLE { get; set; }
    }
}
