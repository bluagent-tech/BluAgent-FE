using System;
using System.Collections.Generic;

namespace BAv02.Models
{
    public partial class EmploymentRecords
    {
        public EmploymentRecords()
        {
            Reaerecords = new HashSet<Reaerecords>();
        }

        public long Id { get; set; }
        public long IdDriver { get; set; }
        public string EmployerName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Telephone { get; set; }
        public string PositionHeld { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public string Salary { get; set; }
        public string Leaving { get; set; }
        public bool SubjectToRegulation { get; set; }
        public bool SubjectToTesting { get; set; }
        public long? Country { get; set; }
        public long? State { get; set; }
        public long? City { get; set; }
        public string Zip { get; set; }

        public ICollection<Reaerecords> Reaerecords { get; set; }
    }
}
