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
        Task<CourseRegistrationDTO> AddCourseRegistration(CourseRegistrationAddOrEditDTO dto);
        Task<CourseRegistrationDTO[]> GetAllCourseRegistrations();
        Task<CourseRegistrationDTO> GetCourseRegistrationById(long id);
        Task<CourseRegistrationDTO> UpdateCourseRegistration(long id, CourseRegistrationAddOrEditDTO dto);
        Task<CourseRegistrationDTO> InactiveCourseRegistration(long id, CourseRegistrationInativeDTO dto);
        void DeleteCourseRegistration(long id);
    }
}
