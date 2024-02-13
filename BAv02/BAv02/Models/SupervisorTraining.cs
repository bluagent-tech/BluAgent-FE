using Newtonsoft.Json;
using System;

namespace BAv02.Models
{
    public partial class SupervisorTraining
    {
        public long Id { get; set; }
        public string FileName { get; set; }
        public DateTime? TrainingDate { get; set; }
        public long? IdCompany { get; set; }
        public string SupervisorsName { get; set; }
        [JsonIgnore]
        public Company IdCompanyNavigation { get; set; }
    }
}
