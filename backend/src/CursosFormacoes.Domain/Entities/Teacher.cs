using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CursosFormacoes.Domain.Entities.Base;

namespace CursosFormacoes.Domain.Entities
{
    [Table("teachers")]
    public class Teacher : BaseEntity
    {
        [Required]
        [Column("name")]
        public string? Name{ get; set; }
        [Required]
        [Column("email")]
        public string? Email { get; set; }
        [Required]
        [Column("school")]
        public string? School { get; set; }
        [Required]
        [Column("school_class")]
        public string? SchoolClass { get; set; }
    }
}
