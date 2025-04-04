using CursosFormacoes.Domain.Entities;

namespace CursosFormacoes.Persistence.Repository.Interfaces
{
    public interface ICourseRegistrationRepository
    {
        Task<CourseRegistration[]> GetAllCourseRegistrations();
        Task<CourseRegistration> GetCourseRegistrationById(long id);
        Task<object> GetAllTeachersCoursesTrainings();
        Task<bool> GetByTeacherAndCourse(long teacherId, long courseTrainingId);

    }
}
