using System.Security.Claims;

namespace CursosFormacoes.Application.Services.Interfaces
{
    public interface ITokenService
    {
        string GenerateAccessToken(IEnumerable<Claim> claims);

        string GenerateRefreshToken();

        bool ValidateToken(string token);

        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    }
}
