using System;
using BAv02.Models.DataAccessLayers.Repositories;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace BAv02.Models.DataAccessLayers
{
    public class ChartReportDAL : IChartReport
    {
        private readonly BAV02Context _context;

        public ChartReportDAL() {
            _context = new BAV02Context();
}

        public ChartReportDAL(BAV02Context context) {
            _context = context;
        }

        public List<ChartReport> GetAll()
        {
            return _context.ChartReport.FromSql("SELECT * FROM MT.ChartReport").ToList();
        }

        public List<ChartReport> GetBetweenDate(string initdate, string endDate)
        {
            return _context.ChartReport.FromSql($"SELECT * FROM MT.ChartReport WHERE create_date between {initdate} and {endDate}").ToList();
        }

        public List<ChartReport> GetListOfMonth()
        {
            DateTime today = DateTime.Today;

            //int month = System.DateTime.DaysInMonth(today.Year, today.Month);

            return _context.ChartReport.FromSql($"SELECT * FROM MT.ChartReport WHERE MONTH(create_date) = {today.Month} AND YEAR(create_date) = {today.Year}").ToList();
        }

        public List<ChartReport> GetListOfWeek()
        {
            return _context.ChartReport.FromSql("SELECT * FROM MT.ChartReport WHERE create_date BETWEEN (DATEADD(DAY, 2 - DATEPART(WEEKDAY, GETDATE()), CAST(GETDATE() AS DATE)) ) AND (DATEADD(DAY, 8 - DATEPART(WEEKDAY, GETDATE()), CAST(GETDATE() AS DATE)))").ToList();

        }
    }
}
