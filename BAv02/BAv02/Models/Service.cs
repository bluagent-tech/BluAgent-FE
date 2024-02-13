using System;

namespace BAv02.Models
{
    public partial class Service
    {
        public long Id { get; set; }
        public string ServiceDue { get; set; }
        public string Description { get; set; }
        public DateTime? DateWorkOrderClosed { get; set; }
        public long IdWorkOrder { get; set; }
        public WorkOrder IdWorkOrderNavigation { get; set; }
    }
}
