using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace BAv02.Models
{
    public partial class CompanyNotifications
    {
        public int IdNotification { get; set; }
        //[JsonIgnore]

        public bool? PinNumber { get; set; }
        public bool? CSA { get; set; }
        public bool? MCS { get; set; }
        public bool? PSP { get; set; }
        public bool? Certificate { get; set; }
        public bool? Letters { get; set; }
        public bool? SafetyReviews { get; set; }
        public bool? StatePermits { get; set; }
        public bool? CertificateEnrollment { get; set; }
        public bool? CompanyPolicy { get; set; }
        public bool? SupervisorTraining { get; set; }
        public bool? ClearingHouse { get; set; }
        public bool? AccidentRegistrer { get; set; }
        public bool? Insurance { get; set; }
        public bool? FleetSafety { get; set; }
        public bool? DriverSafety { get; set; }
        public bool? SafetyCompliance { get; set; }
        public bool? MIS { get; set; }
        public bool? LaboratorySummary { get; set; }
        public bool? DrugTestingPolicy { get; set; }
        public long IdCompany { get; set; }
    }
}