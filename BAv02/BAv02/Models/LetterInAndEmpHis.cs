using System;

namespace BAv02.Models
{
    public class LetterInAndEmpHis
    {
        public long Id { get; set; }
        //public DateTime? DateMailed { get; set; }
        //public string Email { get; set; }
        //public string PhoneNumber { get; set; }
        //public string Comment { get; set; }
        public long? IdEmployeeRecord { get; set; }
        public long? IdDriver { get; set; }
        public bool? Section382 { get; set; }
        public bool? Question1 { get; set; }
        public bool? Question2 { get; set; }
        public bool? Question3 { get; set; }
        public bool? Question4 { get; set; }
        public bool? Question5 { get; set; }
        public byte? Question6 { get; set; }
        public byte? Question7 { get; set; }
        public byte? Question8 { get; set; }
        public byte? Question9 { get; set; }
        public byte? Question10 { get; set; }
        public byte? Question11 { get; set; }
        public byte? Question12 { get; set; }
        public byte? Question13 { get; set; }
        public byte? Question14 { get; set; }
        public byte? Quality { get; set; }
        public byte? Cooperation { get; set; }
        public byte? Safety { get; set; }
        public byte? Personal { get; set; }
        public byte? Driving { get; set; }
        public byte? Attitude { get; set; }
        public string Remarks { get; set; }
        public string RemarkQuestion11 { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string CompletedByTitle { get; set; }
        public string Signature { get; set; }
        public string SAPPhoneNumber { get; set; }
        public string CompletedByName { get; set; }
        //public string NewEmployerName { get; set; }
        //public string NewEmployerAddress { get; set; }
        public string DriverName { get; set; }
        //public string ProspectiveSignature { get; set; }
        public DateTime? DateSent { get; set; }
        //public string CompletedBySignature { get; set; }
        //public DateTime? Application { get; set; }
        //public string Title { get; set; }
        public long? IdCompany { get; set; }
    }
}
