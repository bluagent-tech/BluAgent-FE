using System;
using System.ComponentModel.DataAnnotations;

namespace BAv02.Models
{
    public partial class DriverConsent
    {
        [Key]
        public long idDC { get; set; }
        public long IdCompany { get; set; }
        public long IdDriver { get; set; }
        public string fileName { get; set; }
        public DateTime Date { get; set; }
    }
}
