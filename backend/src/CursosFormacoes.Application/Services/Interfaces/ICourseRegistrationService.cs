using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CursosFormacoes.Application.Dtos.CourseRegistration;

namespace CursosFormacoes.Application.Services.Interfaces
{
    public interface ICourseRegistrationService
    {
        Task<CourseRegistrationDTO> AddCourseRegistration(CourseRegistrationAddDTO dto);
        Task<CourseRegistrationDTO[]> GetAllCourseRegistrations();
        Task<CourseRegistrationDTO> GetCourseRegistrationById(long id);
        Task<CourseRegistrationDTO> UpdateCourseRegistration(CourseRegistrationEditDTO dto);
        Task<CourseRegistrationDTO> VisibilityAtCourseRegistration(long id);
        Task<CourseRegistrationDTO> ProgressCourseRegistration(long id, CourseRegistrationProgressDTO dto);
        void DeleteCourseRegistration(long id);
    }
}
