using AutoMapper;
using CursosFormacoes.Application.Dtos.Teacher;
using CursosFormacoes.Domain.Entities;

namespace Eventos.Application.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Teacher, TeacherDTO>().ReverseMap();
            CreateMap<Teacher, TeacherAddOrEditDTO>().ReverseMap();
            CreateMap<Teacher, TeacherDeleteDTO>().ReverseMap();
        }
    }
}
