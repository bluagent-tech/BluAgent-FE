using Newtonsoft.Json;
using System;

namespace BAv02.Models
{
    public class DriversTrainingCertificateDocs
    {
        public DriversTrainingCertificateDocs() 
        {
            ExpirationDate = DateTime.Now;
        }
        public long Id { get; set; }
        public string DocName { get; set; }
        public long IdCompany { get; set; }
        public string DescriptionDoc { get; set; }
        public string DocType { get; set; }
        public long IdDriver { get; set; }
        public Nullable<DateTime> ExpirationDate { get; set; }

        [JsonIgnore]
        public Users IdDriverDocs {get;set;}
    }
}
