using System;

namespace BAv02.Models
{
    public partial class Violations
    {
        public long IdViolation { get; set; }
        public string UniqueId { get; set; }
        public DateTime InspDate { get; set; }
        public string ViolCode { get; set; }
        public string BasicDesc { get; set; }
        public string OosIndicator { get; set; }
        public byte OosWeight { get; set; }
        public byte SeverityWeight { get; set; }
        public byte TotalserverityWght { get; set; }
        public string SectionDesc { get; set; }
        public string GroupDesc { get; set; }
        public string ViolUnit { get; set; }
        public string Status { get; set; }
    }
}
