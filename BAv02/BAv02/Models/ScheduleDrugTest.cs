using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace BAv02.Models
{
    public partial class ScheduleDrugTest
    {
        public ScheduleDrugTest()
        {
            DrugTest = new HashSet<DrugTest>();
        }

        public long Id { get; set; }
        public long? idRandomList { get; set;}
        public bool? FederalTest { get; set; }
        public string TestingAuthority { get; set; }
        public long? IdDriver { get; set; }
        public string Performed { get; set; }
        public string Reason { get; set; }
        public DateTime? DateTimeTest { get; set; }
        public DateTime? DateTimeExpiration { get; set; }
        public string Lab { get; set; }
        public string Provider { get; set; }
        public string Status { get; set; }
        public string StepProcessCode { get; set; }
        public string CancelDetails { get; set; }
        public long? IdCompany { get; set; }
        [JsonIgnore]
        public Company IdCompanyNavigation { get; set; }
        [JsonIgnore]
        public Driver IdNavigation { get; set; }
        public ICollection<DrugTest> DrugTest { get; set; }
        public string TypeTest { get; set; }

    }
}
