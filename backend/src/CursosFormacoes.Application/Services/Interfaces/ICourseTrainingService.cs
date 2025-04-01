using CursosFormacoes.Application.Dtos.CourseTraining;

namespace CursosFormacoes.Application.Services.Interfaces
{
    public interface ICourseTrainingService
    {
        Task<CourseTrainingDTO> AddCourseTraining(CourseTrainingAddDTO dto);
        Task<CourseTrainingDTO[]> GetAllCourseTrainings();
        Task<CourseTrainingDTO> GetCourseTrainingById(int id);
        Task<CourseTrainingDTO> UpdateCourseTraining(CourseTrainingEditDTO dto);
        Task<CourseTrainingDTO> VisibilityCourseTraining(int id);
        void DeleteCourseTraining(long id);
    }
}
