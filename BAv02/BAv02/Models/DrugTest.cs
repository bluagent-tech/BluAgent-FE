using Newtonsoft.Json;
using System;

namespace BAv02.Models
{
    public partial class DrugTest
    {
        public long Id { get; set; }
        public string SpecimenNumber { get; set; }
        public bool? ValidIdentification { get; set; }
        public string RemarksIdentification { get; set; }
        public bool? ValidTemperature { get; set; }
        public string TemperatureRemarks { get; set; }
        public string TypeCollection { get; set; }
        public string CollectionRemarks { get; set; }
        public string IssuesCollection { get; set; }
        public string IssuesCollectionRemarks { get; set; }
        public string ReleasedTo { get; set; }
        public string CollectorSignature { get; set; }
        public string DonorSignature { get; set; }
        public DateTime? DateTimeCollectionCollector { get; set; }
        public DateTime? DateTimeCollectionDriver { get; set; }
        public bool? CollectorCertification { get; set; }
        public bool? DriverCertification { get; set; }
        public string Status { get; set; }
        public long? IdScheduleDrugTest { get; set; }
        public long? IdDrugAlcoholCompliance { get; set; }

        [JsonIgnore]
        public DrugAlcoholCompliance IdDrugAlcoholComplianceNavigation { get; set; }
        public ScheduleDrugTest IdScheduleDrugTestNavigation { get; set; }
    }
}
