using System.ComponentModel.DataAnnotations;

namespace BAv02.Models
{
    public class WorkOrderImages
    {
        [Key]
        public long Id { get; set; }
        public string DocName { get; set; }
        public long? IdUnit { get; set; }
        public string TypeUnit { get; set; }
        public string DescriptionDoc { get; set; }
        public string DocType { get; set; }
        public long IdCompany { get; set; }
        public long IdWorkOrder { get; set; }
    }
}
