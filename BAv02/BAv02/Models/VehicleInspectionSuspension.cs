using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BAv02.Models
{
    [Table("MT.VehicleInspectionSuspension")]
    public partial class VehicleInspectionSuspension
    {
        public long? IdCompany { get; set; }
        public long? IdUser { get; set; }
        public long? IdVehicleInspection { get; set; }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public long Id { get; set; }
        [StringLength(50)]
        public string TurqueRadius { get; set; }
        [StringLength(50)]
        public string SpringAssembly { get; set; }
        [StringLength(50)]
        public string AxlePositioning { get; set; }
    }
}