using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using CursosFormacoes.Domain.Enums;

namespace CursosFormacoes.Application.Dtos.CourseRegistration
{
    public class CourseRegistrationProgressDTO
    {
        [Display(Name = "Progresso")]
        [Required(ErrorMessage = "(*) {0} é obrigatório.")]
        [DefaultValue("Em andamento")]
        [JsonPropertyName("progress")]
        public string? Progress { get; set; }
    }
}
