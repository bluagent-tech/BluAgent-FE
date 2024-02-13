using System;

namespace BAv02.Models
{
    public partial class DriversCompany
  {
    public long Id { get; set; }
    public long IdDriverUser { get; set; }
    public string License { get; set; }
    public long IdCompany { get; set; }
    public DateTime? LicenseExpiration { get; set; }
    public string Name { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string Gender { get; set; }
    public bool Status { get; set; }
    public DateTime HiringDate { get; set; }
    public bool? CDL { get; set; }
    public bool? CMV { get; set; }
  }
}
