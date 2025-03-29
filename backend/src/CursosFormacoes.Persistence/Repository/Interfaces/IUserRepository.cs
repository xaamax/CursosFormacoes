using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CursosFormacoes.Domain.Entities;

namespace CursosFormacoes.Persistence.Repository.Interfaces
{
    public interface IUserRepository
    {
        User? ValidateCredentials(string username, string password);

        User? ValidateUsername(string username);

        bool RevokeToken(string username);

        User? RefreshUserInfo(User user);
    }
}
