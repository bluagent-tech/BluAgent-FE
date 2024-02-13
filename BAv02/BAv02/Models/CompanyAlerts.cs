using Newtonsoft.Json;

namespace BAv02.Models
{
    public partial class CompanyAlerts
    {
        public long Id { get; set; }
        public long? IdCompany { get; set; }
        public string Message { get; set; }
        public string Severy { get; set; }
        [JsonIgnore]
        public Company IdCompanyNavigation { get; set; }
    }
}
