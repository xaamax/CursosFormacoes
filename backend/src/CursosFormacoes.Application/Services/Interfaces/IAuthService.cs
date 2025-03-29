using CursosFormacoes.Application.Dtos.User;

namespace CursosFormacoes.Application.Services.Interfaces
{
    public interface IAuthService
    {
        TokenDTO ValidateCredentials(UserAuthDTO dto);

        TokenDTO ValidateToken(TokenDTO dto);
    }
}
