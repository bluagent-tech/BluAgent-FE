using Newtonsoft.Json;
using System;

namespace BAv02.Models
{
    public partial class CompanyDocs
    {
        public long Id { get; set; }
        public string DocName { get; set; }
        public long? IdCompany { get; set; }
        public string DescriptionDoc { get; set; }
        public string DocType { get; set; }
        public long? IdAccidentRegister { get; set; }

        public int? Date { get; set; }

        [JsonIgnore]
        public AccidentRegister IdAccidentRegisterNavigation { get; set; }
    }
}
