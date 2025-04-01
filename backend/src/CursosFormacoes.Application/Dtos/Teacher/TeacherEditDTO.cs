using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CursosFormacoes.Application.Dtos.Teacher
{
    public class TeacherEditDTO : TeacherAddDTO
    {
        [JsonPropertyOrder(1)]
        public long Id { get ; set; }
    }
}
