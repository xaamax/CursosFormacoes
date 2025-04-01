using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using CursosFormacoes.Application.Dtos.Base;
using CursosFormacoes.Application.Dtos.CourseTraining;
using CursosFormacoes.Application.Dtos.Teacher;

namespace CursosFormacoes.Application.Dtos.CourseRegistration
{
    public class CourseRegistrationWithDTO : CourseRegistrationDTO
    {
        [JsonIgnore]
        public long TeacherId { get; }
        [JsonIgnore]
        public long CourseTrainingId { get; }
        [JsonPropertyName("teacher")]
        public TeacherDTO Teacher { get; set; }

        [JsonPropertyName("course_training")]
        public CourseTrainingDTO CourseTraining { get; set; }
    }
}
