using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BAv02.Migrations
{
    public partial class SuperAdminTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SuperAdmin",
                schema: "DT",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    MiddleName = table.Column<string>(maxLength: 50, nullable: true),
                    LastName = table.Column<string>(maxLength: 50, nullable: false),
                    Birthdate = table.Column<DateTime>(type: "date", nullable: true),
                    Email = table.Column<string>(maxLength: 100, nullable: false),
                    PhoneNumber = table.Column<string>(maxLength: 25, nullable: true),
                    Role = table.Column<string>(maxLength: 10, nullable: false),
                    Password = table.Column<byte[]>(nullable: false),
                    Status = table.Column<string>(maxLength: 10, nullable: false),
                    Gender = table.Column<string>(maxLength: 10, nullable: true),
                    IsActive = table.Column<bool>(nullable: true),
                    isAchived = table.Column<bool>(nullable: true),
                    DateArchived = table.Column<DateTime>(type: "datetime", nullable: true),
                    DateCreated = table.Column<DateTime>(type: "datetime", nullable: true),
                    DateModifed = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SuperAdmin", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SuperAdmin",
                schema: "DT");
        }
    }
}
