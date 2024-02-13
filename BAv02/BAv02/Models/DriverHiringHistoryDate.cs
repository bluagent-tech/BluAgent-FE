using System;

namespace BAv02.Models
{
    public class DriverHiringHistoryDate
	{
		public long Id { get; set; }
		public long IdDriver { get; set; }
		public DateTime EventDate { get; set; }
		public string Status { get; set; }
	}
}
