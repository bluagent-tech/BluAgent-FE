using Newtonsoft.Json;
using System;

namespace BAv02.Models
{
    public partial class CompanyUsersRoles
    {
        public long Id { get; set; }
        public long IdCompany { get; set; }
        public long IdUser { get; set; }
        public string Type { get; set; }
        public DateTime DateStarted { get; set; }
        public DateTime? DateEnd { get; set; }
        public string Status { get; set; }
        public string UserPermits { get; set; }
        [JsonIgnore]
        public Company IdCompanyNavigation { get; set; }
    }
}
