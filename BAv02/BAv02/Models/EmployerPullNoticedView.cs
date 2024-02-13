using System;

namespace BAv02.Models
{
    public class EMPView
    {
        public long Id { get; set; }  // must be public!
        public long? IdDriver { get; set; }
        public long IdUser { get; set; }
        public long IdCompany { get; set; }
        public string DriverLicense { get; set; }
        public DateTime? RecordDate { get; set; }
        public string RequesterCode { get; set; }
        public string Violations { get; set; }
        public string ReviewedBy { get; set; }
        public DateTime? DateReview { get; set; }
        public string FileName { get; set; }
    }
}