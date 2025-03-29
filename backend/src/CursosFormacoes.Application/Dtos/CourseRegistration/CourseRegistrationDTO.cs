using System.Text.Json.Serialization;
using CursosFormacoes.Application.Dtos.Base;
using CursosFormacoes.Application.Dtos.CourseTraining;
using CursosFormacoes.Application.Dtos.Teacher;

namespace CursosFormacoes.Application.Dtos.CourseRegistration
{
    public class CourseRegistrationDTO : BaseDTO
    {
        [JsonPropertyName("teacher")]
        public TeacherDTO Teacher { get; set; }

        [JsonPropertyName("course_training")]
        public CourseTrainingDTO CourseTraining { get; set; }

        [JsonPropertyName("registration_status")]
        public string? RegistrationStatus { get; set; }
    }
}
