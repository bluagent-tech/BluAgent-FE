using System;

namespace BAv02.Models
{
    public partial class MedicalCertificate
    {
        public long Id { get; set; }
        public string MedicalCertificateId { get; set; }
        public DateTime? IssueDate { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public string MedicalFile { get; set; }
        public long? IdDriver { get; set; }
    }
}
