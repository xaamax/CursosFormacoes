using System.Text.Json.Serialization;

namespace CursosFormacoes.Application.Dtos.Base
{   
    public class BaseDeleteDTO
    {
        [JsonPropertyName("inative")]
        public bool Inative { get; set; }
    }
}
