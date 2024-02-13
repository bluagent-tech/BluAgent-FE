using System;
using System.ComponentModel.DataAnnotations;

namespace BAv02.Models
{
    public partial class AnnualInquiry
    {
        [Key]
        public long IdAnnualInquiry { get; set; }
        public long IdCompany { get; set; }
        public long IdDriver { get; set; }
        public string DocName { get; set; }
        public string StatusCH { get; set; }
        public DateTime DateOfReview { get; set; }
    }
}
