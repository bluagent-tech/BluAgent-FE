using System.Collections.Generic;

namespace BAv02.Models.ComplianceReport
{
    public partial class CompanyComplianceReport
    {
        public List<CompanyReport> CompanyReport { get; set; }
        public int CompliancePercentage { get; set; }
        public List<CompanyComplianceDate> ComplianceDate { get; set; }
    
    }

}
