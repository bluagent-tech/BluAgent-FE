using System;

namespace BAv02.Models
{
    public partial class SuperAdmin
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
        public bool? IsActive { get; set; }
        public bool? IsAchived { get; set; }
        public DateTime? DateArchived { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateModifed { get; set; }
    }
}

