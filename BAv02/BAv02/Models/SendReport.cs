namespace BAv02.Models
{
    public partial class SendReport
    {
        public string initDate { get; set; }
        public long trucks { get; set; }
        public long churned { get; set; }
        public string endDate { get; set; }
        public long newTrucks { get; set;}
        public long endingTrucks { get; set; }
    }
}

