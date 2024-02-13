using System;

namespace BAv02.Models.DOT
{
    public class VIOLATIONS
    {
        public string UNIQUE_ID { get; set; }
        public DateTime INSP_DATE { get; set; }
        public string DOT_NUMBER { get; set; }
        public string VIOL_CODE { get; set; }
        public string BASIC_DESC { get; set; }
        public string OOS_INDICATOR { get; set; }
        public int OOS_WEIGHT { get; set; }
        public int SEVERITY_WEIGHT { get; set; }
        public int TIME_WEIGHT { get; set; }
        public int TOT_SEVERITY_WGHT { get; set; }
        public string VIOL_VALUE { get; set; }
        public string SECTION_DESC { get; set; }
        public string GROUP_DESC { get; set; }
        public string VIOL_UNIT { get; set; }
    }
}
