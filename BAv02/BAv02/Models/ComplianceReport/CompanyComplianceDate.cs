using System;

namespace BAv02.Models.ComplianceReport
{
    public partial class CompanyComplianceDate
    {
        public long Id { get; set; }
        public long CompanyId { get; set; }
        public int ComplianceValue { get; set; }
        public DateTime ComplianceValueDate  { get; set; }
    
    }

}
