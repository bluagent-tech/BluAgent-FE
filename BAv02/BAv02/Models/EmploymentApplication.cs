using System;
using System.Collections.Generic;

namespace BAv02.Models
{
    public partial class EmploymentApplication
    {
        public EmploymentApplication()
        {
            Reaaddress = new HashSet<Reaaddress>();
            Readexperience = new HashSet<Readexperience>();
            Reaerecords = new HashSet<Reaerecords>();
            Rearaccident = new HashSet<Rearaccident>();
            Reatconvictions = new HashSet<Reatconvictions>();
        }

        public long Id { get; set; }
        public long? IdDriver { get; set; }
        public long? IdCompany { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string DriverName { get; set; }
        public string Ssn { get; set; }
        public DateTime? DriverDob { get; set; }
        public string DriverLastName { get; set; }
        public string StateLicense { get; set; }
        public string License { get; set; }
        public string TypeLicense { get; set; }
        public DateTime? DateExpiration { get; set; }
        public string QuestionA { get; set; }
        public string QuestionB { get; set; }
        public string FileSignatureD { get; set; }

        public ICollection<Reaaddress> Reaaddress { get; set; }
        public ICollection<Readexperience> Readexperience { get; set; }
        public ICollection<Reaerecords> Reaerecords { get; set; }
        public ICollection<Rearaccident> Rearaccident { get; set; }
        public ICollection<Reatconvictions> Reatconvictions { get; set; }
    }
}
