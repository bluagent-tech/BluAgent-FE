using System.Collections.Generic;

namespace BAv02.Models.DataAccessLayers.Repositories
{
    interface  IChartReport
    {
        List<ChartReport> GetAll();

        List<ChartReport> GetBetweenDate(string initDate, string endDate);

        List<ChartReport> GetListOfMonth(); 

        List<ChartReport> GetListOfWeek();
    }
}
