using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BAv02.Migrations
{
    public partial class RemoveCollectionObservation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CollectorObservation",
                schema: "DT");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CollectorObservation",
                schema: "DT",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CollectorId = table.Column<long>(nullable: true),
                    DerVerifiedDonorIdentity = table.Column<bool>(nullable: true),
                    DonorIdRemarks = table.Column<string>(maxLength: 250, nullable: true),
                    DonorIdVerified = table.Column<bool>(nullable: true),
                    Observed = table.Column<bool>(nullable: true),
                    RefusalStatusTypeId = table.Column<long>(nullable: true),
                    Remarks = table.Column<string>(maxLength: 250, nullable: true),
                    SplitCollection = table.Column<bool>(nullable: true),
                    SplitCollectionRemarks = table.Column<string>(maxLength: 250, nullable: true),
                    TempInRange = table.Column<bool>(nullable: true),
                    TempRangeRemarks = table.Column<string>(maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CollectorObservation", x => x.Id);
                });
        }
    }
}
