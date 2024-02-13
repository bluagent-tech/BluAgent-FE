using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BAv02.Models
{
    [Table("MT.VehicleInspectionFuelSystem")]
    public partial class VehicleInspectionFuelSystem
    {
        public long? idVehicleInspection { get; set; }

        public long? idUser { get; set; }

        public long? idCompany { get; set; }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public long idFuelSystem { get; set; }

        [StringLength(50)]
        public string VisibleLeak { get; set; }

        [StringLength(50)]
        public string FuelTankFilter { get; set; }

        [StringLength(50)]
        public string FuelTankSecurely { get; set; }
    }
}
