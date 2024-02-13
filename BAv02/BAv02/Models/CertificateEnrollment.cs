using Newtonsoft.Json;
using System;

namespace BAv02.Models
{
    public partial class CertificateEnrollment
    {
        public long Id { get; set; }
        public string CertificateEnrollment1 { get; set; }
        public DateTime? EnrollmentDate { get; set; }
        public long? IdCompany { get; set; }
        [JsonIgnore]
        public Company IdCompanyNavigation { get; set; }
    }
}
