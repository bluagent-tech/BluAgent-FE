using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using BAv02.Models.DOT;

namespace BAv02.Models
{
    public class DotDBContext : DbContext
    {
        static IConfiguration Configuration { get; set; }


        private readonly IConfiguration _configuration;

        public string HostName { get; set; }
        public string Port { get; set; }
        public string DataBase { get; set; }
        public string User { get; set; }
        public string Password { get; set; }
        

        public DotDBContext(IConfiguration configuration)
        {
            var builder = new ConfigurationBuilder();
            _configuration = configuration;

            
        }

        public DbSet<USDOT> UsDot { get; set; }
        public DbSet<INSPECTIONS> Inspections { get; set; }
        public DbSet<VIOLATIONS> Violations { get; set; }
        public DbSet<CRASHES> Crashes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                HostName = _configuration.GetSection("AuroraAWS")["HostName"];
                Port = _configuration.GetSection("AuroraAWS")["Port"];
                DataBase = _configuration.GetSection("AuroraAWS")["Database"];
                User = _configuration.GetSection("AuroraAWS")["User"];
                Password = _configuration.GetSection("AuroraAWS")["Password"];

                string conn = string.Format("Data Source={0},{1};Initial Catalog={2};User ID={3};Password={4};", HostName, Port, DataBase, User, Password);
                optionsBuilder.UseMySQL(conn);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<VIOLATIONS>().HasKey(v => new { v.UNIQUE_ID, v.VIOL_CODE });
            base.OnModelCreating(modelBuilder);
        }
    }
}
