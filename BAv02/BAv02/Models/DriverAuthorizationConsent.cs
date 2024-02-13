using System;
namespace BAv02.Models
{
    public partial class DriverAuthorizationConsent
    {
        public long UserId { get; set; }
        public string CompanyName { get; set; }
        public string DriverFirstName { get; set; }
        public string DriverLastName { get; set; }
        public string DriverLicense { get; set; }
        public string DriverSignature { get; set; }
        public DateTime? SignatureDate { get; set; }
        public DateTime? DriverHiringDate { get; set; }
    
    }

}
