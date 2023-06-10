using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MusicBands.Data.Migrations
{
    public partial class AddBandUrl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Bands",
                type: "nvarchar(100)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.Sql("UPDATE [Bands] SET [Url] = [Id]");

            migrationBuilder.CreateIndex(
                name: "IX_Bands_Url",
                table: "Bands",
                column: "Url",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Bands_Url",
                table: "Bands");

            migrationBuilder.DropColumn(
                name: "Url",
                table: "Bands");
        }
    }
}
