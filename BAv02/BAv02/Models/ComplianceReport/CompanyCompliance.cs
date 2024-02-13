namespace BAv02.Models.ComplianceReport
{
    public partial class CompanyCompliance
    {
        public long CompanyId { get; set; }
        public bool FMCSA { get; set; }
        public string CA {get; set; }
        public string Enrollment { get; set; }
        public long? InsuranceInfo { get; set; }
        public string InsurancePolicy { get; set; }
        public string SupervisorTraining { get; set; }
        public string FleetSafety { get; set; }
        public string DriverSafety { get; set; }
    
    }

}
