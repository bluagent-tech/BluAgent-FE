using System.Collections.Generic;

namespace BAv02.Models
{
    public partial class OnBoardingPIN
    {
        public List<Vehicles> Vehicles { get; set; }
        public List<Trailer> Trailers { get; set; }
        public List<Driver> Drivers { get; set; }
        public List<Users> Users { get; set; }
        public long IdCompany { get; set; }
        public List<Inspection> Inspections { get; set; }
        public List<Violations> Violations { get; set; }
    }
}
