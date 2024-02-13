using System;
using System.Collections.Generic;

namespace BAv02.Models
{
    public partial class DrugAlcoholCompliance
    {
        public DrugAlcoholCompliance()
        {
            DrugTest = new HashSet<DrugTest>();
        }

        public long Id { get; set; }
        public long? IdDriver { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? DateApplication { get; set; }
        public string Specimen { get; set; }
        public string ResultFile { get; set; }
        public string Result { get; set; }
        public string Reason { get; set; }
        public string TypeTest { get; set; }
        public string Form { get; set; }
//-----------------------------------------------------------------------------//
        public string PositiveFor { get; set; }

        public ICollection<DrugTest> DrugTest { get; set; }

    }
}
