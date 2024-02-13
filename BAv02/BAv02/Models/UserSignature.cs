using System;
using System.ComponentModel.DataAnnotations;

namespace BAv02.Models
{
    public class UserSignature
    {
        [Key]
        public long IdCompany { get; set; }
        public string LegalName { get; set; }
        public string Email { get; set; }
        public long IdUser { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string FileSignature { get; set; }
    }
}
