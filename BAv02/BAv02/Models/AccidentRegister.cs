using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace BAv02.Models
{
    public partial class AccidentRegister
    {
        public AccidentRegister()
        {
            CompanyDocs = new HashSet<CompanyDocs>();
        }

        public long Id { get; set; }
        public long? IdCompany { get; set; }
        
        public DateTime AccidentDate { get; set; }
        public TimeSpan? AccidentHour { get; set; }
        public string Address { get; set; }
        public long? IdState { get; set; }
        public long? IdCity { get; set; }
        public int? Fatalities { get; set; }
        public int? Injuries { get; set; }
        public bool? Hm { get; set; }
        public long? IdDriver { get; set; }
        public string ReportNumber { get; set; }
        [JsonIgnore]
        public Company IdCompanyNavigation { get; set; }
        [JsonIgnore]
        public Driver IdNavigation { get; set; }
        public ICollection<CompanyDocs> CompanyDocs { get; set; }
    }
}
