namespace BAv02.Models.ComplianceReport
{
    public partial class DriverCompliance
    {
        public long IdUser { get; set; }
        public long IdCompany { get; set; }
        public string Preemployment { get; set; }
        public string EmpApplications { get; set; }
        public string LetterInquiry { get; set; }
        public string EmpHistory { get; set; }
        public string Dmv { get; set; }
        public string RoadTest { get; set; }
        public string MedicalCertificate { get; set; }
        public string AnnualDMV { get; set; }
        public string AnnualDc { get; set; }
        public string FileSignature { get; set; }
        public string UsernameCH { get; set; }
        public string License { get; set; }
        public string PullNotice { get; set; }
    
    }

}
