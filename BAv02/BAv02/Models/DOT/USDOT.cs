using System;
using System.ComponentModel.DataAnnotations;

namespace BAv02.Models.DOT
{
    public class USDOT
    {
        [Key]
        public string DOT_NUMBER { get; set; }
        public string LEGAL_NAME { get; set; }
        public string DBA_NAME { get; set; }
        public string CARRIER_OPERATION { get; set; }
        public string HM_FLAG { get; set; }
        public string PC_FLAG { get; set; }
        public string PHY_STREET { get; set; }
        public string PHY_CITY { get; set; }
        public string PHY_STATE { get; set; }
        public string PHY_ZIP { get; set; }
        public string PHY_COUNTRY { get; set; }
        public string MAILING_STREET { get; set; }
        public string MAILING_STATE { get; set; }
        public string MAILING_CITY { get; set; }
        public string MAILING_ZIP { get; set; }
        public string MAILING_COUNTRY { get; set; }
        public string TELEPHONE { get; set; }
        public string FAX { get; set; }
        public string EMAIL_ADDRESS { get; set; }
        public DateTime MCS150_DATE { get; set; }
        public string MCS150_MILEAGE { get; set; }
        public string MCS150_MILEAGE_YEAR { get; set; }
        public DateTime ADD_DATE { get; set; }
        public string OIC_STATE { get; set; }
        public string NBR_POWER_UNIT { get; set; }
        public string DRIVER_TOTAL { get; set; }
    }
}
