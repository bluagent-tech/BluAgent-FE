using System;

namespace BAv02.Models
{
    public class MAlertsTrailers
    {
        public long Id { get; set; }
        public long IdTrailer { get; set; }
        public string Message { get; set; }
        public string TypeId { get; set; }
        public int IdCompany { get; set; }
        public string Severy { get; set; }
        public string EconomicNumber { get; set; }
        public string TrailerNumber { get; set; }
        public string Year { get; set; }
        public string Make { get; set; }
        public string Status { get; set; }
        public DateTime? InServiceDate { get; set; }
        public string FileImage { get; set; }
        public string TrailerType { get; set; }
        public string Vin { get; set; }
    }
}