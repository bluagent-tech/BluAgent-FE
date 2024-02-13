using System.Collections.Generic;

namespace BAv02.Models
{
    public partial class HazardMaterial
    {
        public HazardMaterial()
        {
            HazardMaterialCompany = new HashSet<HazardMaterialCompany>();
        }

        public int Id { get; set; }
        public string HazardMaterialClasification { get; set; }

        public ICollection<HazardMaterialCompany> HazardMaterialCompany { get; set; }
    }
}
