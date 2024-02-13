namespace BAv02.Models
{
    public partial class DriverAlertsDto
    {
        public long Id { get; set; }
        public long IdDriver { get; set; }
        public string Message { get; set; }
        public int IdCompany { get; set; }
        public string DriverName { get; set; }
        public string Severy { get; set; }
        public string License { get; set; }
        public string Phone { get; set; }
        public string Image { get; set; }
        public string Status { get; set; }
    }
}
