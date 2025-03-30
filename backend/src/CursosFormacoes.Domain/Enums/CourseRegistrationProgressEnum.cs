using System.ComponentModel;
using System.Text.Json.Serialization;

namespace CursosFormacoes.Domain.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum CourseRegistrationProgressEnum
    {
        [Description("Não iniciado")]
        NaoIniciado = 0,

        [Description("Em andamento")]
        EmAndamento = 1,

        [Description("Concluído")]
        Concluido = 2
    }
}
