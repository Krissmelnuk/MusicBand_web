using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MusicBands.Identity.Data.Migrations
{
    public partial class AddLocale : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Locale",
                table: "AspNetUsers",
                type: "nvarchar(50)",
                nullable: false,
                defaultValue: "");
            
            migrationBuilder.Sql("UPDATE [AspNetUsers] SET [Locale] = 'en'");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Locale",
                table: "AspNetUsers");
        }
    }
}
