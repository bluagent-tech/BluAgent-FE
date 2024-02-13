using System;

namespace BAv02.Models
{
    public partial class DriverDocs
    {
        public long Id { get; set; }
        public string DocName { get; set; }
        public long? IdDriver { get; set; }
        public string DescriptionDoc { get; set; }
        public DateTime? DateReceipt { get; set; }
    }
}
