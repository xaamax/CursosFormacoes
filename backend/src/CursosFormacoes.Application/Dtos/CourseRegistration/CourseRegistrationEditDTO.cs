using System.Text.Json.Serialization;

namespace CursosFormacoes.Application.Dtos.CourseRegistration
{
    public class CourseRegistrationEditDTO : CourseRegistrationAddDTO
    {
        [JsonPropertyOrder(1)]
        public long Id { get; set; }
    }
}
