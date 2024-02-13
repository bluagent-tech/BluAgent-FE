using System;
using System.Collections.Generic;

namespace BAv02.Models
{
    public partial class DriverAddress
    {
        public DriverAddress()
        {
            Reaaddress = new HashSet<Reaaddress>();
        }

        public long Id { get; set; }
        public long IdDriver { get; set; }
        public string Street { get; set; }
        public long? IdCity { get; set; }
        public string ZipCode { get; set; }
        public DateTime DateOf { get; set; }
        public DateTime DateTo { get; set; }
        public bool? CurrentAddress { get; set; }
        public string HowLong { get; set; }

        public ICollection<Reaaddress> Reaaddress { get; set; }
    }
}
