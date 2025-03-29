using System.Security.Claims;
using CursosFormacoes.Application.Configurations;
using CursosFormacoes.Application.Dtos.User;
using CursosFormacoes.Application.Services.Interfaces;
using CursosFormacoes.Persistence.Repository.Interfaces;
using Microsoft.IdentityModel.JsonWebTokens;

namespace CursosFormacoes.Application.Services
{
    public class AuthService : IAuthService
    {
        private const string DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
        private TokenConfiguration _configuration;

        private IUserRepository _userRepository;
        private readonly ITokenService _tokenService;

        public AuthService(TokenConfiguration configuration, IUserRepository userRepository, ITokenService tokenService)
        {
            _configuration = configuration;
            _userRepository = userRepository;
            _tokenService = tokenService;
        }

        public TokenDTO ValidateCredentials(UserAuthDTO dto)
        {
            var user = _userRepository.ValidateCredentials(dto.UserName, dto.Password);
            if (user == null) return null;
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)
            };

            var accessToken = _tokenService.GenerateAccessToken(claims);
            var refreshToken = _tokenService.GenerateRefreshToken();

            _userRepository.RefreshUserInfo(user);

            DateTime createDate = DateTime.Now;
            DateTime expirationDate = createDate.AddMinutes(_configuration.Minutes);

            return new TokenDTO(
                true,
                createDate.ToString(DATE_FORMAT),
                expirationDate.ToString(DATE_FORMAT),
                accessToken,
                refreshToken
                );
        }

        public TokenDTO ValidateToken(TokenDTO token)
        {
            var accessToken = token.AccessToken;
            var refreshToken = token.RefreshToken;

            var principal = _tokenService.GetPrincipalFromExpiredToken(accessToken);

            var username = principal.Identity.Name;

            var user = _userRepository.ValidateUsername(username);

            if (user == null) return null;

            accessToken = _tokenService.GenerateAccessToken(principal.Claims);
            refreshToken = _tokenService.GenerateRefreshToken();

            _userRepository.RefreshUserInfo(user);

            DateTime createDate = DateTime.Now;
            DateTime expirationDate = createDate.AddMinutes(_configuration.Minutes);

            return new TokenDTO(
                true,
                createDate.ToString(DATE_FORMAT),
                expirationDate.ToString(DATE_FORMAT),
                accessToken,
                refreshToken
                );
        }
    }
}
