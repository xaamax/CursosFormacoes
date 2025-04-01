using AutoMapper;
using CursosFormacoes.Application.Dtos.Teacher;
using CursosFormacoes.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CursosFormacoes.API.Controllers
{
    [Route("api/teacher")]
    [ApiController]
    [Authorize("Bearer")]
    public class TeacherController : ControllerBase
    {
        private readonly ITeacherService _teacherService;
        private readonly IMapper _mapper;

        public TeacherController(ITeacherService teacherService, IMapper mapper)
        {
            _mapper = mapper;
            _teacherService = teacherService;
        }

        [HttpGet]
        public async Task<IActionResult> TeachersGetAll()
        {
            var response = await _teacherService.GetAllTeachers();
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> TeacherGetById(int id)
        {
            var response = await _teacherService.GetTeacherById(id);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> AddTeacher(TeacherAddDTO dto)
        {
            var response = await _teacherService.AddTeacher(dto);
            return Created("", response); ;
        }

        [HttpPut]
        public async Task<IActionResult> UpdateTeacher(TeacherEditDTO dto)
        {
            var response = await _teacherService.UpdateTeacher(dto);
            return Ok(response);
        }

        [HttpPatch("{id}/visibility")]
        public async Task<IActionResult> TeacherVisibility(int id)
        {
            var response = await _teacherService.VisibilityTeacher(id);
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTeacher(long id)
        {
            _teacherService.DeleteTeacher(id);
            return NoContent();
        }
    }
}
