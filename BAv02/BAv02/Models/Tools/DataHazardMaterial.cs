using System.Collections.Generic;

namespace BAv02.Models.Tools
{
    public class DataHazardMaterial
    {
        public List<HazardMaterial> HazardMaterials { get; set; }
        public HazardMaterialStates HazardMaterialStates { get; set; }
        public object HazardMaterialCompanies { get; set; }
        public HazardMaterialOptions HazardMaterialOptions { get; set; }

    }
}
