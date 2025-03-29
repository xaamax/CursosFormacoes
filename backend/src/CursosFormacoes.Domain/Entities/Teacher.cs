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
        public required string Name{ get; set; }
        [Required]
        [Column("email")]
        public required string Email { get; set; }
        [Required]
        [Column("school")]
        public required string School { get; set; }
        [Required]
        [Column("school_class")]
        public required string SchoolClass { get; set; }
    }
}
