using CursosFormacoes.Domain.Entities;

namespace CursosFormacoes.Persistence.Repository.Interfaces
{
    public interface ICourseRegistrationRepository
    {
        Task<CourseRegistration> GetCourseRegistrationById(long id);
    }
}
