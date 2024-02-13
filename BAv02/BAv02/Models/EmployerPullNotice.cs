using Newtonsoft.Json;
using System;

namespace BAv02.Models
{
    public partial class EmployerPullNotice
    {
        public long Id { get; set; }
        public long IdDriver { get; set; }
        public string DriverLicense { get; set; }
        public DateTime RecordDate { get; set; }
        public string RequesterCode { get; set; }
        public string Violations { get; set; }
        public string ReviewedBy { get; set; }
        public DateTime DateReview { get; set; }
        public string FileName { get; set; }

        [JsonIgnore]
        public Driver IdNavigation { get; set; }
    }
}
