using System;

namespace BAv02.Models
{
    public partial class UpdateDonnorInfo
	{
        public long Id { get; set; }
        public DateTime? Birthdate { get; set; }
        public string PhoneNumber { get; set; }
        public string License { get; set; }
        public string EmployeeId { get; set; }
    }
}
