using BAv02.Models;
using Microsoft.EntityFrameworkCore;

namespace BAv02.Persistence
{
    public class ComplianceContext :DbContext
    {
        public ComplianceContext(DbContextOptions<ComplianceContext> options) : base(options) { }     
        public DbSet<Documents> Documents { get; set; }
    }
}
