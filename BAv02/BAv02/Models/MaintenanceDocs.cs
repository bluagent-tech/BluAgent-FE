using System.ComponentModel.DataAnnotations;

namespace BAv02.Models
{
    public partial class MaintenanceDocs
    {
        [Key]
        public long Id { get; set; }
        public string DocName { get; set; }
        public long? IdVehicle { get; set; }
        public string TypeId { get; set; }
        public string DescriptionDoc { get; set; }
        public string DocType { get; set; }
        public string Url { get; set; }
        public string RoadsideInspectionID { get; set; }
        public long IdCompany { get; set; }
    }
}
