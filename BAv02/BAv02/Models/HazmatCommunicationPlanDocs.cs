namespace BAv02.Models
{
    public class HazmatCommunicationPlanDocs
    {
        public long Id { get; set; }
        public string DocumentURL { get; set; }
        public long IdCompany { get; set; }
        public string DocumentType { get; set; }
        public long DriverId { get; set; }
        public string DocumentNameGUID { get; set; }
        public string DocumentNameOriginal { get; set; }
    }
}
