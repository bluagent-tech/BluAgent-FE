using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BAv02.Models
{
    public class RandomLogs
    {
        public long Id { get; set; }
        public long? IdDriver { get; set; }
        public long? IdRandomList { get; set; }
        public string Reason { get; set; }
        public DateTime Date { get; set; }
        public int Quarter { get; set; }
        public int Year { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public long? IdCompany { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
    }
}
