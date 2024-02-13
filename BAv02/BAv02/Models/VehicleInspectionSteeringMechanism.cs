using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BAv02.Models
{
    [Table("MT.VehicleInspectionSteeringMechanism")]
    public partial class VehicleInspectionSteeringMechanism
    {
        public long? idUser { get; set; }

        public long? idCompany { get; set; }

        public long? idVehicleInspection { get; set; }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public long idSteeringMechanism { get; set; }

        [StringLength(50)]
        public string WheelFreePlay { get; set; }

        [StringLength(50)]
        public string SteeringColumn { get; set; }

        [StringLength(50)]
        public string PitmanSteering { get; set; }

        [StringLength(50)]
        public string Nuts { get; set; }

        [StringLength(50)]
        public string SteeringSystem { get; set; }

        [StringLength(50)]
        public string SteeringGearBox { get; set; }

        [StringLength(50)]
        public string BallDragLinks { get; set; }

        [StringLength(50)]
        public string TieRodsDragLinks { get; set; }

        [StringLength(50)]
        public string FrontAxleBean { get; set; }
    }
}
