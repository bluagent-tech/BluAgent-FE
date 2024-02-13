using System;
using System.Collections.Generic;

namespace BAv02.Models
{
    public partial class Users
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime? Birthdate { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Role { get; set; }
        public byte[] Password { get; set; }
        public string Status { get; set; }
        public string Gender { get; set; }
        public bool? Ia { get; set; }
        public string MobilePhone { get; set; }
        public string FileImage { get; set; }
        public string FileSignature { get; set; }
        public string Position { get; set; }
        public long? IdInquiry { get; set; }
        public Guid? TokenCode { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public bool? Hazmat { get; set; }
        public DateTime? SignatureDate { get; set; }
        public bool? Deactivated { get; set; }
        public ICollection<DriversDocs> DriversDocs { get; set; }
        public ICollection<DriversTrainingCertificateDocs> DriversTrainingCertificateDocs { get; set; }
        public string InsuranceProvider { get; set; }
    }
}
