using CursosFormacoes.Application.Dtos.Base;
using CursosFormacoes.Application.Dtos.CourseRegistration;
using System.Text.Json.Serialization;

namespace CursosFormacoes.Application.Dtos.Teacher
{
    public class TeacherDTO : BaseDTO
    {
        [JsonPropertyName("name")]
        public string? Name { get; set; }
        [JsonPropertyName("email")]
        public string? Email { get; set; }
        [JsonPropertyName("school")]
        public string? School { get; set; }
        [JsonPropertyName("school_class")]
        public string? SchoolClass { get; set; }     
    }
}
