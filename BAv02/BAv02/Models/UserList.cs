using System;

namespace BAv02.Models
{
    public partial class UserList
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public DateTime? Birthdate { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string Status { get; set; }
    }
}
