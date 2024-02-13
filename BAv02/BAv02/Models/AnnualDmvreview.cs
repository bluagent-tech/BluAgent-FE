using System;

namespace BAv02.Models
{
    public partial class AnnualDmvreview
    {
        public long Id { get; set; }
        public long? IdDriver { get; set; }
        public long? IdCompany { get; set; }
        public string MotorCarrier { get; set; }
        public DateTime? DateReview { get; set; }
        public bool? QuestionA { get; set; }
        public bool? QuestionB { get; set; }
    }
}
