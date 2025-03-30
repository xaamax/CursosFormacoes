using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CursosFormacoes.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class remove_course_registration_status_add_cols_progress_completed_at : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "registration_status",
                table: "courses_registrations");

            migrationBuilder.AddColumn<DateTime>(
                name: "completed_at",
                table: "courses_registrations",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "progress",
                table: "courses_registrations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "Não iniciado");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "completed_at",
                table: "courses_registrations");

            migrationBuilder.DropColumn(
                name: "progress",
                table: "courses_registrations");

            migrationBuilder.AddColumn<string>(
                name: "registration_status",
                table: "courses_registrations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
