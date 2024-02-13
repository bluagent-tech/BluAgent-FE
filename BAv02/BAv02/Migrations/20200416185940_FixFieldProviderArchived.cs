using Microsoft.EntityFrameworkCore.Migrations;

namespace BAv02.Migrations
{
    public partial class FixFieldProviderArchived : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DateModifed",
                schema: "DT",
                table: "Provider",
                newName: "DateModified");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DateModified",
                schema: "DT",
                table: "Provider",
                newName: "DateModifed");
        }
    }
}
