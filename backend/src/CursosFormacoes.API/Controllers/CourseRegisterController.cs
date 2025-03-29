using AutoMapper;
using CursosFormacoes.Application.Dtos.CourseRegistration;
using CursosFormacoes.Application.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CursosFormacoes.API.Controllers
{
    [Route("api/course_register")]
    [ApiController]
    public class CourseRegisterController : ControllerBase
    {
        private readonly ICourseRegistrationService _courseRegistrationService;
        private readonly IMapper _mapper;

        public CourseRegisterController(ICourseRegistrationService courseRegistrationService, IMapper mapper)
        {
            _mapper = mapper;
            _courseRegistrationService = courseRegistrationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCourseRegistrations()
        {
            var response = await _courseRegistrationService.GetAllCourseRegistrations();
            return Ok(response);
        }

        [HttpGet("{id}/details")]
        public async Task<IActionResult> GetCourseRegistrationById(int id)
        {
            var response = await _courseRegistrationService.GetCourseRegistrationById(id);
            return Ok(response);
        }

        [HttpPost("create")]
        public async Task<IActionResult> AddCourseRegistration(CourseRegistrationAddOrEditDTO dto)
        {
            var response = await _courseRegistrationService.AddCourseRegistration(dto);
            return Created("", response); ;
        }

        [HttpPut("{id}/update")]
        public async Task<IActionResult> UpdateCourseRegistration(int id, CourseRegistrationAddOrEditDTO dto)
        {
            var response = await _courseRegistrationService.UpdateCourseRegistration(id, dto);
            return Ok(response);
        }


        [HttpPatch("{id}/inactive")]
        public async Task<IActionResult> InactiveCourseRegistration(int id, CourseRegistrationInativeDTO dto)
        {
            var response = await _courseRegistrationService.InactiveCourseRegistration(id, dto);
            return Ok(response);
        }

        [HttpDelete("{id}/delete")]
        public IActionResult DeleteCourseRegistration(long id)
        {
            _courseRegistrationService.DeleteCourseRegistration(id);
            return NoContent();
        }
    }
}
