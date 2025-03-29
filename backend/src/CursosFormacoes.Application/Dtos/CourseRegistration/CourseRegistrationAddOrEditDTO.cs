using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using CursosFormacoes.Domain.Enums;

namespace CursosFormacoes.Application.Dtos.CourseRegistration
{
    public class CourseRegistrationAddOrEditDTO
    {
        [Display(Name = "ProfessorID")]
        [Required(ErrorMessage = "(*) {0} é obrigatório.")]
        [JsonPropertyName("teacher_id")]
        public long TeacherId{ get; set; }

        [Display(Name = "CursoFormacaoID")]
        [Required(ErrorMessage = "(*) {0} é obrigatório.")]
        [JsonPropertyName("course_training_id")]
        public long CourseTrainingId { get; set; }

        [Display(Name = "Status Inscrição")]
        [Required(ErrorMessage = "(*) {0} é obrigatório.")]
        [JsonPropertyName("registration_status")]
        [DefaultValue(CourseRegistrationStatusEnum.ABERTAS)]
        public CourseRegistrationStatusEnum RegistrationStatus { get; set; } = CourseRegistrationStatusEnum.ABERTAS;
    }
}
