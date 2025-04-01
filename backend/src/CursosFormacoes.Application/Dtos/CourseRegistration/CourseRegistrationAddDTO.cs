using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CursosFormacoes.Application.Dtos.CourseRegistration
{
    public class CourseRegistrationAddDTO
    {
        [Display(Name = "ProfessorID")]
        [Required(ErrorMessage = "(*) {0} é obrigatório.")]
        [JsonPropertyName("teacher_id")]
        public long TeacherId{ get; set; }

        [Display(Name = "CursoFormacaoID")]
        [Required(ErrorMessage = "(*) {0} é obrigatório.")]
        [JsonPropertyName("course_training_id")]
        public long CourseTrainingId { get; set; }
    }
}
