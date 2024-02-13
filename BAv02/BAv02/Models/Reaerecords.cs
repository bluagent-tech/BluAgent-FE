using Newtonsoft.Json;

namespace BAv02.Models
{
    public partial class Reaerecords
    {
        public long Id { get; set; }
        public long? IdEmploymentAplication { get; set; }
        public long? IdEmploymentRecords { get; set; }

        [JsonIgnore]
        public EmploymentApplication IdEmploymentAplicationNavigation { get; set; }
        [JsonIgnore]
        public EmploymentRecords IdEmploymentRecordsNavigation { get; set; }
    }
}
