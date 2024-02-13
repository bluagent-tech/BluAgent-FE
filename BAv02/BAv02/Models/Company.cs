using System;
using System.Collections.Generic;

namespace BAv02.Models
{
    public partial class Company
    {
        public Company()
        {
            AccidentRegister = new HashSet<AccidentRegister>();
            CargoClassification = new HashSet<CargoClassification>();
            CertificateEnrollment = new HashSet<CertificateEnrollment>();
            CompanyAlerts = new HashSet<CompanyAlerts>();
            CompanyUsersRoles = new HashSet<CompanyUsersRoles>();
            HazardMaterialCompany = new HashSet<HazardMaterialCompany>();
            HazardMaterialOptions = new HashSet<HazardMaterialOptions>();
            HazardMaterialStates = new HashSet<HazardMaterialStates>();
            OperationClassification = new HashSet<OperationClassification>();
            ScheduleDrugTest = new HashSet<ScheduleDrugTest>();
            SupervisorTraining = new HashSet<SupervisorTraining>();
            WorkOrder = new HashSet<WorkOrder>();
        }

        public long Id { get; set; }
        public string LegalName { get; set; }
        public string DbaName { get; set; }
        public string PhysicalAddress { get; set; }
        public string PhoneNumber { get; set; }
        public string PhysicalZip { get; set; }
        public long? PhysicalCity { get; set; }
        public string Dot { get; set; }
        public string StateNumber { get; set; }
        public string Tax { get; set; }
        public string Region { get; set; }
        public string ScacCode { get; set; }
        public string Saat { get; set; }
        public string Rfc { get; set; }
        public string SelloCfdi { get; set; }
        public string LlaveCfdi { get; set; }
        public string Regimen { get; set; }
        public string UserSat { get; set; }
        public string PasswordSat { get; set; }
        public string Pinnumber { get; set; }
        public string Tcompany { get; set; }
        public bool? Hazmat { get; set; }
        public string PhysicalStatus { get; set; }
        public string Image { get; set; }
        public string MailAddress { get; set; }
        public string Der { get; set; }
        public string Rsocial { get; set; }
        public long? PhysicalState { get; set; }
        public long? PhysicalCountry { get; set; }
        public string Email { get; set; }
        public DateTime? Mcs150Date { get; set; }
        public string Mcs150Mileage { get; set; }
        public string Mcs150Myear { get; set; }
        public DateTime? AddDate { get; set; }
        public int? Powerunit { get; set; }
        public int? DriverTotal { get; set; }
        public string PcFlag { get; set; }
        public string CarrierOperation { get; set; }
        public string DrugsPolicy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string McMx { get; set; }
        public string Title { get; set; }
        public string MailZip { get; set; }
        public long? MailCity { get; set; }
        public long? MailState { get; set; }
        public long? MailCountry { get; set; }
        public string MovilPhone { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string CustomerId { get; set; }
        public bool IsActive { get; set; }
        public bool IsArchived { get; set; }
        public DateTime? DateArchived { get; set; }
        public DateTime? DateModified { get; set; }
        public long? ArchivedByUserId { get; set; }
        public bool? OnBoard { get; set; }
        public string UserNameCH {get; set;}
        public string PasswordCH {get; set;}
        public string Phone {get; set;}
        public bool? HaveAccount {get; set;}
        public bool? NewCompany {get; set;}
        public string FMCSAuser { get; set;}
        public string FMCSApssw { get; set;} 
        public bool? IsDeactivated { get; set; }
        public string BACode { get; set; }
        public bool? hasCamera { get; set; }
        public string ApiKey { get; set; }
        public ICollection<AccidentRegister> AccidentRegister { get; set; }
        public ICollection<CargoClassification> CargoClassification { get; set; }
        public ICollection<CertificateEnrollment> CertificateEnrollment { get; set; }
        public ICollection<CompanyAlerts> CompanyAlerts { get; set; }
        public ICollection<CompanyUsersRoles> CompanyUsersRoles { get; set; }
        public ICollection<HazardMaterialCompany> HazardMaterialCompany { get; set; }
        public ICollection<HazardMaterialOptions> HazardMaterialOptions { get; set; }
        public ICollection<HazardMaterialStates> HazardMaterialStates { get; set; }
        public ICollection<OperationClassification> OperationClassification { get; set; }
        public ICollection<ScheduleDrugTest> ScheduleDrugTest { get; set; }
        public ICollection<SupervisorTraining> SupervisorTraining { get; set; }
        public ICollection<WorkOrder> WorkOrder { get; set; }

    }
}
