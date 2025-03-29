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

        public AuthController(IAuthService authService)
        {
            _authService = authService;
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
    }
}
