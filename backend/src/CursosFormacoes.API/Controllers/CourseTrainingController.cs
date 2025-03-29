using AutoMapper;
using CursosFormacoes.Application.Dtos.CourseTraining;
using CursosFormacoes.Application.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CursosFormacoes.API.Controllers
{
    [Route("api/course_training")]
    [ApiController]
    public class CourseTrainingController : ControllerBase
    {
        private readonly ICourseTrainingService _courseTrainingService;
        private readonly IMapper _mapper;

        public CourseTrainingController(ICourseTrainingService courseTrainingService, IMapper mapper)
        {
            _mapper = mapper;
            _courseTrainingService = courseTrainingService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCourseTrainings()
        {
            var response = await _courseTrainingService.GetAllCourseTrainings();
            return Ok(response);
        }

        [HttpGet("{id}/details")]
        public async Task<IActionResult> GetCourseTrainingById(int id)
        {
            var response = await _courseTrainingService.GetCourseTrainingById(id);
            return Ok(response);
        }

        [HttpPost("create")]
        public async Task<IActionResult> AddCourseTraining(CourseTrainingAddOrEditDTO dto)
        {
            var response = await _courseTrainingService.AddCourseTraining(dto);
            return Created("", response); ;
        }

        [HttpPut("{id}/update")]
        public async Task<IActionResult> UpdateCourseTraining(int id, CourseTrainingAddOrEditDTO dto)
        {
            var response = await _courseTrainingService.UpdateCourseTraining(id, dto);
            return Ok(response);
        }

        [HttpPatch("{id}/inactive")]
        public async Task<IActionResult> InactiveCourseTraining(int id, CourseTrainingDeleteDTO dto)
        {
            var response = await _courseTrainingService.InactiveCourseTraining(id, dto);
            return Ok(response);
        }

        [HttpDelete("{id}/delete")]
        public IActionResult DeleteCourseTraining(long id)
        {
            _courseTrainingService.DeleteCourseTraining(id);
            return NoContent();
        }
    }
}
