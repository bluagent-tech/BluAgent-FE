using System;
using System.ComponentModel.DataAnnotations;

namespace BAv02.Models
{
    public partial class PreEmploymentInquery
    {
        [Key]
        public long idCH {get; set;}
        public long IdCompany {get; set;}
        public long IdDriver {get; set;}
        public string fileName {get; set;}
        public string Status {get; set;}
        public DateTime Date {get; set;}
    }
}
