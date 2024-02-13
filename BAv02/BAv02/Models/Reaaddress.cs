namespace BAv02.Models
{
    public partial class Reaaddress
    {
        public long Id { get; set; }
        public long? IdEmploymentAplication { get; set; }
        public long? IdDaddress { get; set; }

        public DriverAddress IdDaddressNavigation { get; set; }
        public EmploymentApplication IdEmploymentAplicationNavigation { get; set; }
    }
}
