using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BAv02.Migrations
{
    public partial class AddFieldsInCollectorTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "ArchivedByUserId",
                schema: "DT",
                table: "Collector",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateArchived",
                schema: "DT",
                table: "Collector",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateCreated",
                schema: "DT",
                table: "Collector",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateModifed",
                schema: "DT",
                table: "Collector",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsAchived",
                schema: "DT",
                table: "Collector",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                schema: "DT",
                table: "Collector",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ArchivedByUserId",
                schema: "DT",
                table: "Collector");

            migrationBuilder.DropColumn(
                name: "DateArchived",
                schema: "DT",
                table: "Collector");

            migrationBuilder.DropColumn(
                name: "DateCreated",
                schema: "DT",
                table: "Collector");

            migrationBuilder.DropColumn(
                name: "DateModifed",
                schema: "DT",
                table: "Collector");

            migrationBuilder.DropColumn(
                name: "IsAchived",
                schema: "DT",
                table: "Collector");

            migrationBuilder.DropColumn(
                name: "IsActive",
                schema: "DT",
                table: "Collector");
        }
    }
}
