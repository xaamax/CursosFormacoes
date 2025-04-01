using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CursosFormacoes.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class remove_col_inative_add_disabledAt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "inative",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "inative",
                table: "teachers");

            migrationBuilder.DropColumn(
                name: "inative",
                table: "courses_trainings");

            migrationBuilder.DropColumn(
                name: "inative",
                table: "courses_registrations");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "users");

            migrationBuilder.AddColumn<DateTime>(
                name: "disabled_at",
                table: "users",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "disabled_at",
                table: "teachers",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "disabled_at",
                table: "courses_trainings",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "disabled_at",
                table: "courses_registrations",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_users",
                table: "users",
                column: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_users",
                table: "users");

            migrationBuilder.DropColumn(
                name: "disabled_at",
                table: "users");

            migrationBuilder.DropColumn(
                name: "disabled_at",
                table: "teachers");

            migrationBuilder.DropColumn(
                name: "disabled_at",
                table: "courses_trainings");

            migrationBuilder.DropColumn(
                name: "disabled_at",
                table: "courses_registrations");

            migrationBuilder.RenameTable(
                name: "users",
                newName: "Users");

            migrationBuilder.AddColumn<bool>(
                name: "inative",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "inative",
                table: "teachers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "inative",
                table: "courses_trainings",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "inative",
                table: "courses_registrations",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "id");
        }
    }
}
