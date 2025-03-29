using CursosFormacoes.Domain.Entities;
using CursosFormacoes.Persistence.Context;
using CursosFormacoes.Persistence.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CursosFormacoes.Persistence.Repository
{
    public class TeacherRepository : ITeacherRepository
    {
        private readonly DatabaseContext _context;

        public TeacherRepository(DatabaseContext context)
        {
            _context = context;
        }

        public Task<Teacher?> GetTeacherById(int id)
        {
            throw new NotImplementedException();
        }
    }
}
