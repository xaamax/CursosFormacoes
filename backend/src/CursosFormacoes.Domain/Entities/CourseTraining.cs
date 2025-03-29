using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using CursosFormacoes.Domain.Entities.Base;

namespace CursosFormacoes.Domain.Entities
{
    [Table("courses_trainings")]
    public class CourseTraining : BaseEntity
    {
        [Required]
        [Column("title")]
        public string? title { get; set; }
        [Column("description")]
        public string? Description { get; set; }
        [Required]
        [Column("start_date")]
        public DateTime StartDate{ get; set; }
        [Required]
        [Column("end_date")]
        public DateTime EndDate { get; set; }
        [Required]
        [Column("total_hours")]
        public int TotalHours { get; set; }
    }
}
