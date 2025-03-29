using CursosFormacoes.Domain.Entities.Base;
using CursosFormacoes.Persistence.Context;
using CursosFormacoes.Persistence.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CursosFormacoes.Persistence.Repository.Base
{
    public class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
    {
        protected DatabaseContext _context;

        private DbSet<T> dataset;

        public BaseRepository(DatabaseContext context)
        {
            _context = context;
            dataset = _context.Set<T>();
        }

        public T Create(T item)
        {
            try
            {
                dataset.Add(item);
                _context.SaveChanges();
                return item;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Delete(long id)
        {
            var result = dataset.SingleOrDefault(p => p.Id.Equals(id));
            if (result != null)
            {
                try
                {
                    dataset.Remove(result);
                    _context.SaveChanges();
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }

        public List<T> FindAll()
        {
            return dataset.ToList();
        }

        public T FindByID(long id)
        {
            return dataset.SingleOrDefault(p => p.Id.Equals(id));
        }

        public T Update(T item)
        {
            var result = dataset.SingleOrDefault(p => p.Id.Equals(item.Id));
            if (result != null)
            {
                try
                {
                    _context.Entry(result).CurrentValues.SetValues(item);
                    _context.SaveChanges();
                    return result;
                }
                catch (Exception)
                {
                    throw;
                }
            }
            else
            {
                return null;
            }
        }
    }
}
