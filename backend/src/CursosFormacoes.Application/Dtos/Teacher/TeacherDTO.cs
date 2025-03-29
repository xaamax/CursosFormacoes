using CursosFormacoes.Application.Dtos.Base;
using System.Text.Json.Serialization;

namespace CursosFormacoes.Application.Dtos.Teacher
{
    public class TeacherDTO : BaseDTO
    {
        [JsonPropertyName("name")]
        public required string Name { get; set; }
        [JsonPropertyName("email")]
        public required string Email { get; set; }
        [JsonPropertyName("school")]
        public required string School { get; set; }
        [JsonPropertyName("school_class")]
        public required string SchoolClass { get; set; }
    }
}
