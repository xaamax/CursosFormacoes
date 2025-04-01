

using CursosFormacoes.Application.Dtos.Teacher;

namespace CursosFormacoes.Application.Interfaces
{
    public interface ITeacherService
    {
        Task<TeacherDTO> AddTeacher(TeacherAddDTO dto);
        Task<TeacherDTO[]> GetAllTeachers();
        Task<TeacherDTO> GetTeacherById(int id);
        Task<TeacherDTO> UpdateTeacher(TeacherEditDTO dto);
        Task<TeacherDTO> VisibilityTeacher(int id);
        void DeleteTeacher(long id);
    }
}
