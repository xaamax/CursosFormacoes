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
        Task<CourseRegistrationDTO> GetCourseRegistrationById(int id);
        Task<CourseRegistrationDTO> UpdateCourseRegistration(int id, CourseRegistrationAddOrEditDTO dto);
        Task<CourseRegistrationDTO> InactiveCourseRegistration(int id, CourseRegistrationInativeDTO dto);
        void DeleteCourseRegistration(long id);
    }
}
