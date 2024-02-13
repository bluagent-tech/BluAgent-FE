using System;

namespace BAv02.Models
{
    public partial class Dmv
    {
        public long Id { get; set; }
        public string Dmv1 { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public string DmvFileName { get; set; }
        public long? IdDriver { get; set; }
        public DateTime? IssueDate { get; set; }
    }
}
