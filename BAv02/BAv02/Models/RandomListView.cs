using System;

namespace BAv02.Models
{
    public partial class RandomListView
    {
        public long Id { get; set; }
        public long IdDriver { get; set; }
        public long IdCompany { get; set; }
        public string CompanyName { get; set; }
        public string Type { get; set; }
        public int Quarter { get; set; }
        public int DateYear { get; set; }
        public DateTime DateNotified { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Reason { get; set; }
        public string Status { get; set; }
        public string StepProcessCode { get; set; }
        public string Result { get; set; }
        public string ResultFile { get; set; }
        public string Email { get; set; }
    }
}