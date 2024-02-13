using System;
using System.Collections.Generic;
using System.Linq;
using BAv02.Models.DOT;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace BAv02.Models.DataAccessLayers
{
    public class DotReportDAL
    {
        private IConfiguration Configuration { get; set; }
        public DotReportDAL()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");
            Configuration = builder.Build();
        }
        public List<INSPECTIONS> InspectionsByDot(string dot)
        {
            List<INSPECTIONS> inspections = new List<INSPECTIONS>();
            try
            {
                using (var dotContext = new DotDBContext(Configuration))
                {
                    MySql.Data.MySqlClient.MySqlParameter param =
                      new MySql.Data.MySqlClient.MySqlParameter("@DOT_NUMBER", dot);
                    inspections = dotContext.Inspections
                        .FromSql(
                            $"SELECT * FROM " + Configuration.GetSection("AuroraAWS")["TableInspection"] +
                            " WHERE DOT_NUMBER = @DOT_NUMBER", param)
                        .ToList();                
                }
            }
            catch (Exception e) { Console.WriteLine(e); }

            return inspections;
        }

        public List<VIOLATIONS> ViolationsByDot(string dot)
        {
            List<VIOLATIONS> violations = new List<VIOLATIONS>();
            try
            {
                using (var dotContext = new DotDBContext(Configuration))
                {
                    MySql.Data.MySqlClient.MySqlParameter param =
                      new MySql.Data.MySqlClient.MySqlParameter("@DOT_NUMBER", dot);
                    violations = dotContext.Violations
                        .FromSql(
                            $"SELECT * FROM " + Configuration.GetSection("AuroraAWS")["TableViolation"] +
                            " WHERE DOT_NUMBER = @DOT_NUMBER", param)
                        .ToList();                
                }

            }
            catch (Exception e) { Console.WriteLine(e); }

            return violations;
        }

        public List<CRASHES> CrashesByDot(string dot)
        {
            List<CRASHES> crashes = new List<CRASHES>();
            try
            {
                using (var dotContext = new DotDBContext(Configuration))
                {
                    MySql.Data.MySqlClient.MySqlParameter param =
                      new MySql.Data.MySqlClient.MySqlParameter("@DOT_NUMBER", dot);
                    crashes = dotContext.Crashes
                        .FromSql(
                            $"SELECT * FROM " + Configuration.GetSection("AuroraAWS")["TableCrash"] +
                            " WHERE DOT_NUMBER = @DOT_NUMBER", param)
                        .ToList();                
                }

            }
            catch (Exception e) { Console.WriteLine(e); }

            return crashes;
        }

        public List<USDOT> UsDotByDot(string dot)
        {
            List<USDOT> usDots = new List<USDOT>();
            try
            {
                using (var dotContext = new DotDBContext(Configuration))
                {
                    MySql.Data.MySqlClient.MySqlParameter param =
                      new MySql.Data.MySqlClient.MySqlParameter("@DOT_NUMBER", dot);
                    usDots = dotContext.UsDot
                        .FromSql(
                            $"SELECT * FROM " + Configuration.GetSection("AuroraAWS")["TableDot"] +
                            " WHERE DOT_NUMBER = @DOT_NUMBER", param)
                        .ToList();                
                }

            }
            catch (Exception e) { Console.WriteLine(e); }

            return usDots;
        }

    }

}
