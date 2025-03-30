using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using CursosFormacoes.Domain.Entities.Base;
using CursosFormacoes.Domain.Enums;

namespace CursosFormacoes.Domain.Entities
{
    [Table("courses_registrations")]
    public class CourseRegistration : BaseEntity
    {
        [Required]
        [ForeignKey("Teacher")]
        [Column("teacher_id")]
        public long TeacherId { get; set; }
        public Teacher? Teacher { get; set; }

        [Required]
        [ForeignKey("CourseTraining")]
        [Column("course_training_id")]
        public long CourseTrainingId { get; set; }
        public CourseTraining? CourseTraining { get; set; }

        [Required]
        [Column("progress")]
        public string? Progress { get; set; }

        [Column("completed_at")]
        public DateTime? CompletedAt { get; set; }
    }
}
