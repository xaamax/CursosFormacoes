using System.Text.Json.Serialization;

namespace CursosFormacoes.Application.Dtos.Base
{   
    public class BaseInativeDTO
    {
        [JsonPropertyName("inative")]
        public bool Inative { get; set; }
    }
}
