using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CursosFormacoes.Application.Dtos.CourseTraining
{
    public class CourseTrainingAddOrEditDTO
    {
        [Display(Name = "Título")]
        [Required(ErrorMessage = "(*) {0} é obrigatório.")]
        [JsonPropertyName("title")]
        public required string title { get; set; }

        [JsonPropertyName("description")]
        public string? Description { get; set; }

        [Display(Name = "Data Inicio")]
        [Required(ErrorMessage = "(*) {0} é obrigatória.")]
        [JsonPropertyName("start_date")]
        public DateTime StartDate { get; set; }

        [Display(Name = "Data Final")]
        [Required(ErrorMessage = "(*) {0} é obrigatória.")]
        [JsonPropertyName("end_date")]
        public DateTime EndDate { get; set; }
        
        [Display(Name = "Total de Horas")]
        [Required(ErrorMessage = "(*) {0} é obrigatória.")]
        [RegularExpression("([0-9]+)", ErrorMessage = "(*) {0} deve ser um número.")]
        [JsonPropertyName("total_hours")]
        public int TotalHours { get; set; }
    }
}
