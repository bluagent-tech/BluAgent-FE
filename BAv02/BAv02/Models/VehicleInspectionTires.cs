using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BAv02.Models
{
    [Table("MT.VehicleInspectionTires")]
    public partial class VehicleInspectionTire
    {
        public long? idVehicleInspection { get; set; }
        public long? idCompany { get; set; }
        public long? IdUser { get; set; }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public long Id { get; set; }
        public long? TiresPowerUnit { get; set; }
        [StringLength(50)]
        public string AllOtherTires { get; set; }
        [StringLength(50)]
        public string Sidering { get; set; }
        [StringLength(50)]
        public string WheelsAndRims { get; set; }
        [StringLength(50)]
        public string Fasteners { get; set; }
        [StringLength(50)]
        public string Welds { get; set; }
        [StringLength(50)]
        public string FrameMembers { get; set; }
        [StringLength(50)]
        public string TireWheelsClearance { get; set; }
        [StringLength(50)]
        public string AdjustableAxle { get; set; }
    }
}
