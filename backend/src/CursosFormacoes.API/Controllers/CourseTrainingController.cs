using AutoMapper;
using CursosFormacoes.Application.Dtos.CourseTraining;
using CursosFormacoes.Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CursosFormacoes.API.Controllers
{
    [Route("api/course_training")]
    [ApiController]
    [Authorize("Bearer")]
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
        public async Task<IActionResult> CourseTrainingsGetAll()
        {
            var response = await _courseTrainingService.GetAllCourseTrainings();
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> CourseTrainingGetById(int id)
        {
            var response = await _courseTrainingService.GetCourseTrainingById(id);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> CourseTrainingAdd([FromBody] CourseTrainingAddDTO dto)
        {
            var response = await _courseTrainingService.AddCourseTraining(dto);
            return Created("", response); ;
        }

        [HttpPut]
        public async Task<IActionResult> CourseTrainingUpdate([FromBody] CourseTrainingEditDTO dto)
        {
            var response = await _courseTrainingService.UpdateCourseTraining(dto);
            return Ok(response);
        }

        [HttpPatch("{id}/visibility")]
        public async Task<IActionResult> CourseTrainingVisibility(int id)
        {
            var response = await _courseTrainingService.VisibilityCourseTraining(id);
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCourseTraining(long id)
        {
            _courseTrainingService.DeleteCourseTraining(id);
            return NoContent();
        }
    }
}
