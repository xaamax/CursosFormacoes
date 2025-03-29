using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using CursosFormacoes.Domain.Entities;
using CursosFormacoes.Persistence.Context;
using CursosFormacoes.Persistence.Repository.Interfaces;

namespace CursosFormacoes.Persistence.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DatabaseContext _context;

        public UserRepository(DatabaseContext context)
        {
            _context = context;
        }

        public User? ValidateCredentials(string username, string password)
        {
            var hashPass = ComputeHash(password, SHA256.Create());
            return _context.Users.FirstOrDefault(u => (u.UserName == username) && (u.Password == hashPass));
        }

        public User? ValidateUsername(string userName)
        {
            return _context.Users.SingleOrDefault(u => (u.UserName == userName));
        }

        public bool RevokeToken(string username)
        {
            var user = _context.Users.SingleOrDefault(u => (u.UserName == username));
            if (user is null) return false;
            _context.SaveChanges();
            return true;
        }

        public User? RefreshUserInfo(User user)
        {
            if (!_context.Users.Any(u => u.Id.Equals(user.Id))) return null;

            var result = _context.Users.SingleOrDefault(p => p.Id.Equals(user.Id));
            if (result != null)
            {
                try
                {
                    _context.Entry(result).CurrentValues.SetValues(user);
                    _context.SaveChanges();
                    return result;
                }
                catch (Exception)
                {
                    throw;
                }
            }
            return result;
        }

        private string ComputeHash(string input, HashAlgorithm algorithm)
        {
            byte[] inputBytes = Encoding.UTF8.GetBytes(input);
            byte[] hashedBytes = algorithm.ComputeHash(inputBytes);

            var builder = new StringBuilder();

            foreach (var item in hashedBytes)
            {
                builder.Append(item.ToString("x2"));
            }
            return builder.ToString();
        }

    }
}
