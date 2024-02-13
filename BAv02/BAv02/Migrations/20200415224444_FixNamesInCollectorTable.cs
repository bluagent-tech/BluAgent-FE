using Microsoft.EntityFrameworkCore.Migrations;

namespace BAv02.Migrations
{
    public partial class FixNamesInCollectorTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsAchived",
                schema: "DT",
                table: "Collector",
                newName: "IsArchived");

            migrationBuilder.RenameColumn(
                name: "DateModifed",
                schema: "DT",
                table: "Collector",
                newName: "DateModified");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsArchived",
                schema: "DT",
                table: "Collector",
                newName: "IsAchived");

            migrationBuilder.RenameColumn(
                name: "DateModified",
                schema: "DT",
                table: "Collector",
                newName: "DateModifed");
        }
    }
}
