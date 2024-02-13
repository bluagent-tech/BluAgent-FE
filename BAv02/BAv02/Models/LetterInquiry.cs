using System;

namespace BAv02.Models
{
    public partial class LetterInquiry
  {
    public long Id { get; set; }
    public DateTime? DateMailed { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string Comment { get; set; }
    public long? IdEmployeeRecord { get; set; }
    public long? IdDriver { get; set; }
    public bool? Section382 { get; set; }
    public bool? Question1 { get; set; }
    public bool? Question2 { get; set; }
    public bool? Question3 { get; set; }
    public bool? Question4 { get; set; }
    public bool? Question5 { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public string CompletedByTitle { get; set; }
    public string Signature { get; set; }
    public string SapphoneNumber { get; set; }
    public string CompletedByName { get; set; }
    public string NewEmployerName { get; set; }
    public string NewEmployerAddress { get; set; }
    public string DriverName { get; set; }
    public DateTime? DateSent { get; set; }
    public string CompletedBySignature { get; set; }
    public long? IdCompany { get; set; }
  }
}
