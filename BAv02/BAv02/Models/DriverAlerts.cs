namespace BAv02.Models
{
    public partial class DriverAlerts
    {
        public long Id { get; set; }
        public long IdDriver { get; set; }
        public string Message { get; set; }
        public int IdCompany { get; set; }
        public string DriverName { get; set; }
        public string Severy { get; set; }
    }
}
