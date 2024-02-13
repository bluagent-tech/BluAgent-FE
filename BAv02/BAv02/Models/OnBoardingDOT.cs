using System.Collections.Generic;

namespace BAv02.Models
{
    public partial class OnBoardginDOT
    {
        public List<Vehicles> Vehicles { get; set; }
        public List<Trailer> Trailers { get; set; }
        public List<Inspection> Inspections { get; set; }
        public List<Violations> Violations { get; set; }
    }
}

