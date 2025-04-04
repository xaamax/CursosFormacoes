using CursosFormacoes.Application.Dtos.User;
using CursosFormacoes.Application.Services;
using CursosFormacoes.Application.Services.Interfaces;
using CursosFormacoes.Domain.Entities;
using CursosFormacoes.Persistence.Repository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CursosFormacoes.API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IAuthService _authService;
        private ITokenService _tokenService;

        public AuthController(IAuthService authService, ITokenService tokenService)
        {
            _authService = authService;
            _tokenService= tokenService;
        }

        [HttpPost]
        [Route("signin")]
        public IActionResult Signin(UserAuthDTO user)
        {
            if (user == null) return BadRequest("Credenciais inválidas.");
            var token = _authService.ValidateCredentials(user);
            if (token == null) return Unauthorized();
            return Ok(token);
        }

        [HttpGet("validate_token")]
        public IActionResult ValidateToken([FromHeader] string authorization)
        {
            if (string.IsNullOrEmpty(authorization) || !authorization.StartsWith("Bearer "))
                return Unauthorized(new { message = "Token inválido ou ausente." });
            var token = authorization.Substring(7);
            var isValid = _tokenService.ValidateToken(token);
            if (!isValid)
                return Unauthorized(new { message = "Token inválido." });
            return Ok(new { message = "Token válido." });
        }
    }
}
