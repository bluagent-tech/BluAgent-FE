using System;
using System.ComponentModel.DataAnnotations;

namespace BAv02.Models
{
    public class DriverComplianceData
    {
        [Key]
        public string Name { get; set; }
        public string lastName { get; set; }
        public DateTime? BirthDate { get; set; }
        public string License { get; set; }
        public long? IdCompany { get; set; }
        public long Id { get; set; }
    }
}
