using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RideBooking.API.Migrations
{
    /// <inheritdoc />
    public partial class AddRideRatings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "DriverRating",
                table: "Rides",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RideFeedBack",
                table: "Rides",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "RiderRating",
                table: "Rides",
                type: "double precision",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DriverRating",
                table: "Rides");

            migrationBuilder.DropColumn(
                name: "RideFeedBack",
                table: "Rides");

            migrationBuilder.DropColumn(
                name: "RiderRating",
                table: "Rides");
        }
    }
}
