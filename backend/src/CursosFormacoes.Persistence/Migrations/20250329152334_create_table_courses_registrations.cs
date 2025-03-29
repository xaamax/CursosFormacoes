using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CursosFormacoes.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class create_table_courses_registrations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "courses_registrations",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    teacher_id = table.Column<long>(type: "bigint", nullable: false),
                    course_training_id = table.Column<long>(type: "bigint", nullable: false),
                    registration_status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    inative = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_courses_registrations", x => x.id);
                    table.ForeignKey(
                        name: "FK_courses_registrations_courses_trainings_course_training_id",
                        column: x => x.course_training_id,
                        principalTable: "courses_trainings",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_courses_registrations_teachers_teacher_id",
                        column: x => x.teacher_id,
                        principalTable: "teachers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_courses_registrations_course_training_id",
                table: "courses_registrations",
                column: "course_training_id");

            migrationBuilder.CreateIndex(
                name: "IX_courses_registrations_teacher_id",
                table: "courses_registrations",
                column: "teacher_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "courses_registrations");
        }
    }
}
