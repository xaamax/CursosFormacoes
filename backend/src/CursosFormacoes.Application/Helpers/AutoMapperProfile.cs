using AutoMapper;
using CursosFormacoes.Application.Dtos.CourseRegistration;
using CursosFormacoes.Application.Dtos.CourseTraining;
using CursosFormacoes.Application.Dtos.Teacher;
using CursosFormacoes.Application.Dtos.User;
using CursosFormacoes.Domain.Entities;

namespace CursosFormacoes.Application.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserAuthDTO>().ReverseMap();

            CreateMap<Teacher, TeacherDTO>().ReverseMap();
            CreateMap<Teacher, TeacherAddOrEditDTO>().ReverseMap();
            CreateMap<Teacher, TeacherInativeDTO>().ReverseMap();

            CreateMap<CourseTraining, CourseTrainingDTO>().ReverseMap();
            CreateMap<CourseTraining, CourseTrainingAddOrEditDTO>().ReverseMap();
            CreateMap<CourseTraining, CourseTrainingInativeDTO>().ReverseMap();

            CreateMap<CourseRegistration, CourseRegistrationDTO>()
                .ForMember(dest => dest.Teacher, opt => opt.MapFrom(src => src.Teacher))
                .ReverseMap();
            CreateMap<CourseRegistration, CourseRegistrationAddOrEditDTO>().ReverseMap();
            CreateMap<CourseRegistration, CourseRegistrationProgressDTO>().ReverseMap();
            CreateMap<CourseRegistration, CourseRegistrationInativeDTO>().ReverseMap();
        }
    }
}
