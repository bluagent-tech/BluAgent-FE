using System;
using System.ComponentModel.DataAnnotations;

namespace BAv02.Models
{
    public partial class Tabla_Drivers
    {
        [Key]
        public int NO { get; set; }
        public int USDOT { get; set; }
        public long COMPANY_ID { get; set; }
        public string NOMBRE_DE_LA_COMPAÑIA { get; set; } 
        public string USUARIO_GENERAL { get; set; }
        public string FIRST_NAME { get; set; }
        public string LAST_NAME { get; set; }
        public string LICENCIA { get; set; }
        public string LICENSE_EXPIRATION_DATE { get; set; }
        public string COUNTRY { get; set; }
        public DateTime BIRTHDAY { get; set; }
        public string GENDER { get; set; }
        public string HIRING_DATE { get; set; }
        public string PHONE_NUMBER { get; set; }
        public string EMPLOYEE_ID { get; set; }
        public string EMAIL { get; set; }
        public string PASSWORD { get; set; }
    }
}
