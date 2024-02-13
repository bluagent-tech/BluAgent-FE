namespace BAv02.Models
{
    public partial class Rearaccident
    {
        public long Id { get; set; }
        public long? IdEmploymentAplication { get; set; }
        public long? IdDraccident { get; set; }

        public AccidentRecord IdDraccidentNavigation { get; set; }
        public EmploymentApplication IdEmploymentAplicationNavigation { get; set; }
    }
}
