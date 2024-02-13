using System;
using System.Collections.Generic;

namespace BAv02.Models
{
    public partial class DrivingExperience
    {
        public DrivingExperience()
        {
            Readexperience = new HashSet<Readexperience>();
        }

        public long IdDexperience { get; set; }
        public long IdDriver { get; set; }
        public string ClassEquipment { get; set; }
        public string TypeEquipment { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public string TotalMilesDriven { get; set; }

        public ICollection<Readexperience> Readexperience { get; set; }
    }
}
