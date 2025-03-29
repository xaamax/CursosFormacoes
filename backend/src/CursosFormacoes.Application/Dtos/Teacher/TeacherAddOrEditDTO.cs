using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CursosFormacoes.Application.Dtos.Teacher
{
    public class TeacherAddOrEditDTO
    {
        [Display(Name = "Descrição")]
        [Required(ErrorMessage = "(*) {0} é obrigatória.")]
        [JsonPropertyName("description")]
        public required string Description { get; set; }
    }
}
