using System;
using System.Collections.Generic;

namespace BAv02.Models
{
    public partial class AccidentRecord
    {
        public AccidentRecord()
        {
            Rearaccident = new HashSet<Rearaccident>();
        }

        public long Id { get; set; }
        public long IdDriver { get; set; }
        public DateTime DateAccident { get; set; }
        public string NatureAccident { get; set; }
        public string Fatalities { get; set; }
        public string Injuries { get; set; }

        public ICollection<Rearaccident> Rearaccident { get; set; }
    }
}
