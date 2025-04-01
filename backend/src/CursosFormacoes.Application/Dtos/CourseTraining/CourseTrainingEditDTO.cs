using System.Text.Json.Serialization;

namespace CursosFormacoes.Application.Dtos.CourseTraining
{
    public class CourseTrainingEditDTO : CourseTrainingAddDTO
    {
        [JsonPropertyOrder(1)]
        public long Id { get; set; }
    }
}
