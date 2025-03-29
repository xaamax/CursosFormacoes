using System.ComponentModel.DataAnnotations.Schema;
using CursosFormacoes.Domain.Entities.Base;

namespace CursosFormacoes.Domain.Entities
{
    public class User : BaseEntity
    {
        [Column("username")]
        public string UserName { get; set; }

        [Column("fullname")]
        public string FullName { get; set; }

        [Column("password")]
        public string Password { get; set; }
    }
}
