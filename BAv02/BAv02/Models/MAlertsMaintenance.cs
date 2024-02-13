using System;
namespace BAv02.Models
{
    public class MAlertsMaintenance
    {
        public long Id { get; set; }
        public long IdUnit { get; set; }
        public string Message { get; set; }
        public string TypeId { get; set; }
        public int IdCompany { get; set; }
        public string Severy { get; set; }
        public string EconomicNumber { get; set; }
        public string TrailerNumber { get; set; }
        public string TYear { get; set; }
        public string TMake { get; set; }
        public string TStatus { get; set; }
        public DateTime? TInServiceDate { get; set; }
        public string TFileImage { get; set; }
        public string TUnitType { get; set; }
        public string TVin { get; set; }
        public string VehicleNumber { get; set; }
        public string VYear { get; set; }
        public string VMake { get; set; }
        public string VStatus { get; set; }
        public DateTime? VInServiceDate { get; set; }
        public string VFileImage { get; set; }
        public string VUnitType { get; set; }
        public string VVin { get; set; }
    }
}
