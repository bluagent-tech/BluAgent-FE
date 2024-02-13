using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BAv02.Models.DOT
{
    public class INSPECTIONS
    {
        [Key]
        public string UNIQUE_ID { get; set; }
        public string REPORT_NUMBER { get; set; }
        public string REPORT_STATE { get; set; }
        public string DOT_NUMBER { get; set; }
        public DateTime INSP_DATE { get; set; }
        public string INSP_LEVEL_ID { get; set; }
        public string COUNTY_CODE_STATE { get; set; }
        public int TIME_WEIGHT { get; set; }
        public int DRIVER_OOS_TOTAL { get; set; }
        public int VEHICLE_OOS_TOTAL { get; set; }
        public int TOTAL_HAZMAT_SENT { get; set; }
        public int OOS_TOTAL { get; set; }
        public int HAZMAT_OOS_TOTAL { get; set; }
        public string HAZMAT_PLACARD_REQ { get; set; }
        public string UNIT_TYPE_DESC { get; set; }
        public string UNIT_MAKE { get; set; }
        public string UNIT_LICENSE { get; set; }
        public string UNIT_LICENSE_STATE { get; set; }
        public string VIN { get; set; }
        public string UNIT_DECAL_NUMBER { get; set; }
        public string UNIT_TYPE_DESC2 { get; set; }
        public string UNIT_MAKE2 { get; set; }
        public string UNIT_LICENSE2 { get; set; }
        public string UNIT_LICENSE_STATE2 { get; set; }
        public string VIN2 { get; set; }
        public string UNIT_DECAL_NUMBER2 { get; set; }
        public string UNSAFE_INSP { get; set; }
        public string FATIGUED_INSP { get; set; }
        public string DR_FITNESS_INSP { get; set; }
        public string SUBT_ALCOHOL_INSP { get; set; }
        public string VH_MAINT_INSP { get; set; }
        public string HM_INSP { get; set; }
        public int BASIC_VIOL { get; set; }
        public int UNSAFE_VIOL { get; set; }
        public int FATIGUED_VIOL { get; set; }
        public int DR_FITNESS_VIOL { get; set; }
        public int SUBT_ALCOHOL_VIOL { get; set; }
        public int VH_MAINT_VIOL { get; set; }
        public int HM_VIOL { get; set; }
        [NotMapped]
        public List<object> VIOLATIONS { set; get; }
    }
}
