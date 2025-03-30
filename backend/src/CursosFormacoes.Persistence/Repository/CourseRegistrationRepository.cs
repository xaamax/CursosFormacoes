using CursosFormacoes.Domain.Entities;
using CursosFormacoes.Persistence.Context;
using CursosFormacoes.Persistence.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CursosFormacoes.Persistence.Repository
{
    public class CourseRegistrationRepository : ICourseRegistrationRepository
    {
        private readonly DatabaseContext _context;

        public CourseRegistrationRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<CourseRegistration[]> GetAllCourseRegistrations()
        {
            IQueryable<CourseRegistration> query = _context.CoursesRegistrations
                .Include(c => c.Teacher)
                .Include(c => c.CourseTraining)
                .AsNoTracking();

            return await query.ToArrayAsync();
        }

        public async Task<CourseRegistration> GetCourseRegistrationById(long id)
        {
            IQueryable<CourseRegistration> query = _context.CoursesRegistrations
                .Include(c => c.Teacher)
                .Include(c => c.CourseTraining)
                .Where(e => e.Id == id);

            return await query.FirstOrDefaultAsync();
        }
    }
}
