namespace BAv02.Models.RandomStatus
{
    public partial class RandomDrugStatus
    {
        public long IdRandomList { get; set; }
        public long IdCompany { get; set; }
        public int Quarter { get; set; }
        public int DateYear { get; set; }
        public string Status { get; set; }
    }

}
