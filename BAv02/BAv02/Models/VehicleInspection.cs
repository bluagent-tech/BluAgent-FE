using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BAv02.Models
{
    [Table("MT.VehicleInspection")]
    public partial class VehicleInspection
    {
        public long? IdVehicle { get; set; }

        public long? IdCompany { get; set; }

        public long? IdUser { get; set; }

        public long Id { get; set; }

        [StringLength(50)]
        public string InspectionType { get; set; }

        [StringLength(50)]
        public string TireSize { get; set; }

        [StringLength(50)]
        public string InspectionName { get; set; }

        [StringLength(50)]
        public string InspectionMeets { get; set; }

        [StringLength(50)]
        public string VehicleType { get; set; }

        [StringLength(50)]
        public string InspectorSignature { get; set; }

        public DateTime InspectionDate { get; set; }
        public DateTime DateDue { get; set; }

        public string VehicleNumber { get; set; }

        public int Odometer { get; set; }

        public string FileName { get; set; }
    }
}