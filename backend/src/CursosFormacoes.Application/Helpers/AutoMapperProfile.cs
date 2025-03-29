using AutoMapper;
using CursosFormacoes.Application.Dtos.CourseRegistration;
using CursosFormacoes.Application.Dtos.CourseTraining;
using CursosFormacoes.Application.Dtos.Teacher;
using CursosFormacoes.Domain.Entities;

namespace CursosFormacoes.Application.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Teacher, TeacherDTO>().ReverseMap();
            CreateMap<Teacher, TeacherAddOrEditDTO>().ReverseMap();
            CreateMap<Teacher, TeacherInativeDTO>().ReverseMap();

            CreateMap<CourseTraining, CourseTrainingDTO>().ReverseMap();
            CreateMap<CourseTraining, CourseTrainingAddOrEditDTO>().ReverseMap();
            CreateMap<CourseTraining, CourseTrainingInativeDTO>().ReverseMap();

            CreateMap<CourseRegistration, CourseRegistrationDTO>().ReverseMap();
            CreateMap<CourseRegistration, CourseRegistrationAddOrEditDTO>().ReverseMap();
            CreateMap<CourseRegistration, CourseRegistrationInativeDTO>().ReverseMap();
        }
    }
}
