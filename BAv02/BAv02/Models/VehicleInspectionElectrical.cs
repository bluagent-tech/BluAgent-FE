using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BAv02.Models
{
    [Table("MT.VehicleInspectionElectrical")]
    public partial class VehicleInspectionElectrical
    {
        public long? idVehicleInspection { get; set; }

        public long? idUser { get; set; }

        public long? idCompany { get; set; }

        [Key]
        public long idElectrical { get; set; }

        [StringLength(50)]
        public string HeadStop { get; set; }

        [StringLength(50)]
        public string TailDash { get; set; }

        [StringLength(50)]
        public string TurnIndications { get; set; }

        [StringLength(50)]
        public string AllLightDevices { get; set; }

        [StringLength(50)]
        public string Tacnograph { get; set; }

        [StringLength(50)]
        public string Starter { get; set; }
    }
}
