using System;
using System.Collections.Generic;

namespace BAv02.Models
{
    public partial class TrafficConvictions
    {
        public TrafficConvictions()
        {
            Reatconvictions = new HashSet<Reatconvictions>();
        }

        public long Id { get; set; }
        public long IdDriver { get; set; }
        public string Locations { get; set; }
        public DateTime ConvictionDate { get; set; }
        public string Change { get; set; }
        public string Penalty { get; set; }

        public ICollection<Reatconvictions> Reatconvictions { get; set; }
    }
}
