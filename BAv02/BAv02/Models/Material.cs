namespace BAv02.Models
{
    public partial class Material
    {
        public long Id { get; set; }
        public string Quantity { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public string Cost { get; set; }
        public string InvoiceFile { get; set; }
        public long IdWorkOrder { get; set; }

        public WorkOrder IdWorkOrderNavigation { get; set; }
    }
}
