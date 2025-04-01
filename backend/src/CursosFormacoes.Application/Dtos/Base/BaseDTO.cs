using System.Text.Json.Serialization;

namespace CursosFormacoes.Application.Dtos.Base
{
    public class BaseDTO
    {
        [JsonPropertyName("id")]
        [JsonPropertyOrder(1)]
        public long Id { get; set; }
        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; }
        [JsonPropertyName("updated_at")]
        public DateTime? UpdatedAt { get; set; }
        [JsonPropertyName("disabled_at")]
        public DateTime? DisabledAt { get; set; }
    }
}
