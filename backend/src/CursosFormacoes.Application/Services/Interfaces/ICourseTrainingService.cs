using CursosFormacoes.Application.Dtos.CourseTraining;

namespace CursosFormacoes.Application.Services.Interfaces
{
    public interface ICourseTrainingService
    {
        Task<CourseTrainingDTO> AddCourseTraining(CourseTrainingAddOrEditDTO dto);
        Task<CourseTrainingDTO[]> GetAllCourseTrainings();
        Task<CourseTrainingDTO> GetCourseTrainingById(int id);
        Task<CourseTrainingDTO> UpdateCourseTraining(int id, CourseTrainingAddOrEditDTO dto);
        Task<CourseTrainingDTO> InactiveCourseTraining(int id, CourseTrainingDeleteDTO dto);
        void DeleteCourseTraining(long id);
    }
}
