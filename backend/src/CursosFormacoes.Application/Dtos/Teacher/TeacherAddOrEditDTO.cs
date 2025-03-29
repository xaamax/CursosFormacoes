using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CursosFormacoes.Application.Dtos.Teacher
{
    public class TeacherAddOrEditDTO
    {
        [Display(Name = "Nome")]
        [Required(ErrorMessage = "(*) {0} é obrigatório.")]
        [JsonPropertyName("name")]
        public required string Name { get; set; }

        [Display(Name = "E-mail")]
        [Required(ErrorMessage = "(*) {0} é obrigatório.")]
        [EmailAddress(ErrorMessage = "E-mail inválido.")]
        [JsonPropertyName("email")]
        public required string Email{ get; set; }

        [Display(Name = "Escola")]
        [Required(ErrorMessage = "(*) {0} é obrigatória.")]
        [JsonPropertyName("school")]
        public required string School { get; set; }

        [Display(Name = "Turma Escolar")]
        [Required(ErrorMessage = "(*) {0} é obrigatória.")]
        [JsonPropertyName("school_class")]
        public required string SchoolClass { get; set; }
    }
}
