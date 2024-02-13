using Microsoft.EntityFrameworkCore.Migrations;

namespace BAv02.Migrations
{
    public partial class AddIsActiveIsArchivedCompany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isAchived",
                schema: "DT",
                table: "Provider",
                newName: "isArchived");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isArchived",
                schema: "DT",
                table: "Provider",
                newName: "isAchived");
        }
    }
}
