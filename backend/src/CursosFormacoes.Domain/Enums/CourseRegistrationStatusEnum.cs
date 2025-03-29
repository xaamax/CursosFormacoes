using System.Text.Json.Serialization;

namespace CursosFormacoes.Domain.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum CourseRegistrationStatusEnum
    {
        ABERTAS,
        ENCERRADAS
    }
}
