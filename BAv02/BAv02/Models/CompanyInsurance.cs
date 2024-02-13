using System;
using System.ComponentModel.DataAnnotations;

namespace BAv02.Models
{
    public class CompanyInsurance
    {
        [Key]
        public long CompanyInsuranceID { get; set; }
        public long IdCompany { get; set; }
        public string Provider { get; set; }
        public string OtherProvider { get; set; }
        public DateTime? PolicyDate { get; set; }
        public int OperationRadius { get; set; }
        public string PortEntry { get; set; }
        public int PolicyTerm { get; set; }
        public bool? checkDomesticEnterprise { get; set; }
    }
}