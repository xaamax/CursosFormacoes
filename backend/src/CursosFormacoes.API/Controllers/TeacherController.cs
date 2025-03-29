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
        public async Task<IActionResult> GetAllTeachers()
        {
            var response = await _teacherService.GetAllTeachers();
            return Ok(response);
        }

        [HttpGet("{id}/details")]
        public async Task<IActionResult> GetTeacherById(int id)
        {
            var response = await _teacherService.GetTeacherById(id);
            return Ok(response);
        }

        [HttpPost("create")]
        public async Task<IActionResult> AddTeacher(TeacherAddOrEditDTO dto)
        {
            var response = await _teacherService.AddTeacher(dto);
            return Created("", response); ;
        }

        [HttpPut("{id}/update")]
        public async Task<IActionResult> UpdateTeacher(int id, TeacherAddOrEditDTO dto)
        {
            var response = await _teacherService.UpdateTeacher(id, dto);
            return Ok(response);
        }

        [HttpPatch("{id}/inactive")]
        public async Task<IActionResult> InactiveTeacher(int id, TeacherInativeDTO dto)
        {
            var response = await _teacherService.InactiveTeacher(id, dto);
            return Ok(response);
        }

        [HttpDelete("{id}/delete")]
        public IActionResult DeleteTeacher(long id)
        {
            _teacherService.DeleteTeacher(id);
            return NoContent();
        }
    }
}
