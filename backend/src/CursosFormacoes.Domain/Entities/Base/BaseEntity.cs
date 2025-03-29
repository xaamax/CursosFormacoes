using System.ComponentModel.DataAnnotations.Schema;

namespace CursosFormacoes.Domain.Entities.Base
{
    public class BaseEntity
    {
        [Column("id")]
        public long Id { get; set; }
        [Column("inative")]
        public bool Inative { get; set; }
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }
        [Column("updated_at")]
        public DateTime? UpdatedAt { get; set; }
    }
}
