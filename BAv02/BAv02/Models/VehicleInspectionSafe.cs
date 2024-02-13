using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BAv02.Models
{
    [Table("MT.VehicleInspectionSafe")]
    public partial class VehicleInspectionSafe
    {
        public long? idVehicleInspection { get; set; }

        public long? idCompany { get; set; }

        public long? idUser { get; set; }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public long idSafe { get; set; }

        [StringLength(50)]
        public string FireExtingrisher { get; set; }

        [StringLength(50)]
        public string FlagsFlares { get; set; }

        [StringLength(50)]
        public string SpareBulbs { get; set; }

        [StringLength(50)]
        public string SpareSealBeam { get; set; }

        [StringLength(50)]
        public string Protection { get; set; }

        [StringLength(50)]
        public string PatsVehicleConditions { get; set; }
    }
}
