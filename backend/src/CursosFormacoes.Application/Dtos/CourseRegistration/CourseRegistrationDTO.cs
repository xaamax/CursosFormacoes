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

        [JsonPropertyName("progress")]
        public string? Progress { get; set; }

        [JsonPropertyName("completed_at")]
        public DateTime? CompletedAt { get; set; }
    }
}
