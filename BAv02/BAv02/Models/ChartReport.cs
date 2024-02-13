using System;

namespace BAv02.Models
{
    public partial class ChartReport
    {
        public long id { get; set; }
        public long trucks { get; set; }
        public long churned { get; set; }
        public DateTime create_date { get; set; }

    }
}

