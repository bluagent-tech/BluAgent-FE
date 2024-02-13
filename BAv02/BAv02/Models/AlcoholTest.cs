using System;

namespace BAv02
{
    public class AlcoholTest
    {
        public long Id { get; set; }
        public long? IdScheduleTest { get; set; }
        public long? IdDrugAlcoholCompliance { get; set; }
        public string SerialNumber { get; set; }
        public string Device { get; set; }
        public string DeviceName { get; set; }
        public string DeviceSerialNumber { get; set; }
        public string Wait { get; set; }
        public string Status { get; set; }
        public string CollectorSignature { get; set; }
        public string DonorSignature { get; set; }
        public DateTime? DateTimeCollectionCollector { get; set; }
        public DateTime? DateTimeCollectionDriver { get; set; }
        public string Remarks { get; set; }
        //-------------PENDIENTE---------------//
        public string TestNumber { get; set; }
        public string ConfirmTest { get; set; }
        public bool? Identification{ get; set; }
        public string Technician { get; set; }
        public DateTime? ActivationTime { get; set; }
        public DateTime? ReadingTime { get; set; }
        public string IssuesCollection { get; set; }
        public decimal? AlcoholResult { get; set; }
        public string Result { get; set; }

    }
}
