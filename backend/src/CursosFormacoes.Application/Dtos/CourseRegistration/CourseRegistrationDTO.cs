using System.Text.Json.Serialization;
using CursosFormacoes.Application.Dtos.Base;

namespace CursosFormacoes.Application.Dtos.CourseRegistration
{
    public class CourseRegistrationDTO : BaseDTO
    {
        [JsonPropertyName("teacher_id")]
        public long TeacherId { get; set; }
        [JsonPropertyName("course_training_id")]
        public long CourseTrainingId { get; set; }
        [JsonPropertyName("progress")]
        public string? Progress { get; set; }
        [JsonPropertyName("completed_at")]
        public DateTime? CompletedAt { get; set; }
    }
}
