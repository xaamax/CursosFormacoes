

using CursosFormacoes.Application.Dtos.Teacher;

namespace CursosFormacoes.Application.Interfaces
{
    public interface ITeacherService
    {
        Task<TeacherDTO> AddTeacher(TeacherAddOrEditDTO dto);
        Task<TeacherDTO[]> GetAllTeachers();
        Task<TeacherDTO> GetTeacherById(int id);
        Task<TeacherDTO> UpdateTeacher(int id, TeacherAddOrEditDTO dto);
        Task<TeacherDTO> InactiveTeacher(int id, TeacherDeleteDTO dto);
        void DeleteTeacher(long id);
    }
}
