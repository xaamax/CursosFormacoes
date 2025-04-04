using AutoMapper;
using CursosFormacoes.Application.Dtos.CourseRegistration;
using CursosFormacoes.Application.Services.Interfaces;
using CursosFormacoes.Persistence.Repository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CursosFormacoes.API.Controllers
{
    [Route("api/course_registration")]
    [ApiController]
    [Authorize("Bearer")]
    public class CourseRegistrationController : ControllerBase
    {
        private readonly ICourseRegistrationService _courseRegistrationService;
        private readonly ICourseRegistrationRepository _courseRegistrationRepository;

        public CourseRegistrationController(
            ICourseRegistrationService courseRegistrationService,
            ICourseRegistrationRepository courseRegistrationRepository
            )
        {
            _courseRegistrationService = courseRegistrationService;
            _courseRegistrationRepository = courseRegistrationRepository;
        }

        [HttpGet]
        public async Task<IActionResult> CourseRegistrationsGetAll()
        {
            var response = await _courseRegistrationService.GetAllCourseRegistrations();
            return Ok(response);
        }

        [HttpGet("teachers_courses_trainings")]
        public async Task<object> CourseRegistrationsTeacherCourseTrainingGetAll()
        {
            var response = await _courseRegistrationRepository.GetAllTeachersCoursesTrainings();
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> CourseRegistrationGetById(int id)
        {
            var response = await _courseRegistrationService.GetCourseRegistrationById(id);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> CourseRegistrationAdd([FromBody] CourseRegistrationAddDTO dto)
        {
            bool alreadyRegistered = await _courseRegistrationRepository.GetByTeacherAndCourse(dto.TeacherId, dto.CourseTrainingId);
            if (alreadyRegistered)
            {
                return Conflict(new
                {
                    statusCode = StatusCodes.Status409Conflict,
                    message = "O professor já está inscrito neste curso."
                });
            }
            var response = await _courseRegistrationService.AddCourseRegistration(dto);
            return Created("", response); ;
        }

        [HttpPut]
        public async Task<IActionResult> CourseRegistrationUpdate([FromBody] CourseRegistrationEditDTO dto)
        {
            var response = await _courseRegistrationService.UpdateCourseRegistration(dto);
            return Ok(response);
        }

        [HttpPatch("{id}/visibility")]
        public async Task<IActionResult> CourseRegistrationVisibility(int id)
        {
            var response = await _courseRegistrationService.VisibilityAtCourseRegistration(id);
            return Ok(response);
        }

        [HttpPatch("{id}/progress")]
        public async Task<IActionResult> CourseRegistrationProgress(int id, [FromBody] CourseRegistrationProgressDTO dto)
        {
            var response = await _courseRegistrationService.ProgressCourseRegistration(id, dto);
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public IActionResult CourseRegistrationDelete(long id)
        {
            _courseRegistrationService.DeleteCourseRegistration(id);
            return NoContent();
        }
    }
}
