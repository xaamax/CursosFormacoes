using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using CursosFormacoes.Application.Helpers;

namespace CursosFormacoes.Application.Dtos.CourseTraining
{
    public class CourseTrainingAddOrEditDTO
    {
        [Display(Name = "Título")]
        [Required(ErrorMessage = "(*) {0} é obrigatório.")]
        [JsonPropertyName("title")]
        public string? Title { get; set; }

        [JsonPropertyName("description")]
        public string? Description { get; set; }

        [Display(Name = "Data Início")]
        [Required(ErrorMessage = "(*) {0} é obrigatória.")]
        [JsonPropertyName("start_date")]
        public DateTime? StartDate { get; set; }

        [Display(Name = "Data Término")]
        [Required(ErrorMessage = "(*) {0} é obrigatória.")]
        [JsonPropertyName("end_date")]
        public DateTime? EndDate { get; set; }

        [Display(Name = "Total Horas")]
        [Required(ErrorMessage = "(*) {0} é obrigatória.")]
        [Range(1, 8, ErrorMessage = "A {0} deve ser entre 1 e 8 horas.")]
        [JsonPropertyName("total_hours")]
        public int TotalHours { get; set; }
    }
}
