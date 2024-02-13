namespace BAv02.Models
{
    public partial class Readexperience
    {
        public long Id { get; set; }
        public long? IdEmploymentAplication { get; set; }
        public long? IdDrivingExperience { get; set; }

        public DrivingExperience IdDrivingExperienceNavigation { get; set; }
        public EmploymentApplication IdEmploymentAplicationNavigation { get; set; }
    }
}
