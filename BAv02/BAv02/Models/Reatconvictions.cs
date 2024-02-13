namespace BAv02.Models
{
    public partial class Reatconvictions
    {
        public long Id { get; set; }
        public long? IdEaplication { get; set; }
        public long? IdTrafficConvictions { get; set; }

        public EmploymentApplication IdEaplicationNavigation { get; set; }
        public TrafficConvictions IdTrafficConvictionsNavigation { get; set; }
    }
}
