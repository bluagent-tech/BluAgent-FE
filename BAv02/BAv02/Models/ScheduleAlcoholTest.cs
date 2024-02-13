using System;

namespace BAv02.Models
{
    public class ScheduleAlcoholTest
    {
        public long Id { get; set; }
        public bool? FederalTest { get; set; }
        public string TestingAuthority { get; set; }
        public long? IdDriver { get; set; }
        public string Performed { get; set; }
        public string Reason { get; set; }
        public DateTime? DateTimeTest { get; set; }
        public DateTime? DateTimeExpiration { get; set; }
        public string Lab { get; set; }
        public string Provider { get; set; }
        public string Status { get; set; }
        public string StepProcessCode { get; set; }
        public long? IdCompany { get; set; }
        public string CancelDetails { get; set; }
        public long? idRandomList { get; set; }
        public string TypeTest { get; set; }

        public ScheduleAlcoholTest (ScheduleDrugTest drug) {
            FederalTest = drug.FederalTest;
            TestingAuthority = drug.TestingAuthority;
            IdDriver = drug.IdDriver;
            Performed = drug.Performed;
            Reason = drug.Reason;
            DateTimeTest = drug.DateTimeTest;
            DateTimeExpiration = drug.DateTimeExpiration;
            Lab = drug.Lab;
            Status = drug.Status;
            StepProcessCode = drug.StepProcessCode;
            IdCompany = drug.IdCompany;
            CancelDetails = drug.CancelDetails;
            idRandomList = drug.idRandomList;
            TypeTest = drug.TypeTest;
            Provider = drug.Provider;
        } 

        public ScheduleAlcoholTest () {}
    }
}
