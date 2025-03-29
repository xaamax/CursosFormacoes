using CursosFormacoes.Domain.Entities;

namespace CursosFormacoes.Persistence.Repository.Interfaces
{
    public interface ITeacherRepository
    {
        Task<Teacher?> GetTeacherById(int id);
    }
}
