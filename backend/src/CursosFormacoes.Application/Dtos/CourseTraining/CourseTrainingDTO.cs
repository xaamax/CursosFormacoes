using CursosFormacoes.Application.Dtos.Base;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CursosFormacoes.Application.Dtos.CourseTraining
{
    public class CourseTrainingDTO : BaseDTO
    {
        [JsonPropertyName("title")]
        public required string title { get; set; }
        [JsonPropertyName("description")]
        public string? Description { get; set; }
        [JsonPropertyName("start_date")]
        public DateTime StartDate { get; set; }
        [JsonPropertyName("end_date")]
        public DateTime EndDate { get; set; }
        [JsonPropertyName("total_hours")]
        public int TotalHours { get; set; }
    }
}
