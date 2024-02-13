using System;
using System.Collections.Generic;

namespace BAv02.Models
{
  public partial class Driver
  {
    public Driver()
    {
      AccidentRegister = new HashSet<AccidentRegister>();
      EmployerPullNotice = new HashSet<EmployerPullNotice>();
      RoadTest = new HashSet<RoadTest>();
      ScheduleDrugTest = new HashSet<ScheduleDrugTest>();
    }

    public long Id { get; set; }
    public long? IdUser { get; set; }
    public string License { get; set; }
    public DateTime? LicenseExpiration { get; set; }
    public long? StateLicense { get; set; }
    public string TypeLicense { get; set; }
    public string ContactNumber { get; set; }
    public string Status { get; set; }
    public bool? StatusWork { get; set; }
    public string EmployeeId { get; set; }
    public string Ssn { get; set; }
    public string Twic { get; set; }
    public DateTime? TwicExp { get; set; }
    public string Fast { get; set; }
    public DateTime? FastExp { get; set; }
    public string MxTag { get; set; }
    public DateTime? MxTagExp { get; set; }
    public string UsaTag { get; set; }
    public DateTime? UsaTagExp { get; set; }
    public string TypeTrailer { get; set; }
    public string BusCarrier { get; set; }
    public string DeniedLicense { get; set; }
    public string LicenseSuspended { get; set; }
    public string DeniedLicenseComments { get; set; }
    public string LicenseSuspendedComments { get; set; }
    public string Roadtest { get; set; }
    public string LicenseFile { get; set; }
    public DateTime? RoadtestDate { get; set; }
    public bool? QuestionDa { get; set; }
    public bool? QuestionInterstate { get; set; }
    public bool? QuestionDmv { get; set; }
    public bool? QuestionIntrastate { get; set; }
    public bool? QuestionDr { get; set; }
    public bool? QuestionHs { get; set; }
    public bool? QuestionHm { get; set; }
    public bool? QuestionWithin { get; set; }
    public bool? QuestionBeyond { get; set; }

    public long CountryLicense { get; set; }
    public DateTime HiringDate { get; set; }
    public string UserNameCH {get; set;}
    public string PasswordCH {get; set;}
    public string Phone {get; set;}
    public bool? HaveAccount {get; set;}
    public bool? DriverAgreement {get; set;}
    public string DeactivationReason {get; set;}

    public ICollection<AccidentRegister> AccidentRegister { get; set; }
    public ICollection<EmployerPullNotice> EmployerPullNotice { get; set; }
    public ICollection<RoadTest> RoadTest { get; set; }
    public ICollection<ScheduleDrugTest> ScheduleDrugTest { get; set; }
    public bool? CDL { get; set; }
    public bool? CMV { get; set; }
    public bool? Passenger { get; set; }
  }
}
