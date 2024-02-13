using System;
using System.ComponentModel.DataAnnotations;

namespace BAv02.Models
{
    public partial class RandomListAlcohol
    {
        [Key]
        public long IdRandomList { get; set; }
        public long? IdCompany { get; set; }
        public long? IdDriver { get; set; }
        public string CancelDetails { get; set; }
        public string CancelComment { get; set; }
        public string Type { get; set; }
        public int Quarter { get; set; }
        public int DateYear { get; set; }
        public DateTime DateNotified { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
    }
}