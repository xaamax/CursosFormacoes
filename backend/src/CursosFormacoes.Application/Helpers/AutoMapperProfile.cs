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
            CreateMap<Teacher, TeacherAddDTO>().ReverseMap();
            CreateMap<Teacher, TeacherEditDTO>().ReverseMap();

            CreateMap<CourseTraining, CourseTrainingDTO>().ReverseMap();
            CreateMap<CourseTraining, CourseTrainingAddDTO>().ReverseMap();
            CreateMap<CourseTraining, CourseTrainingEditDTO>().ReverseMap();

            CreateMap<CourseRegistration, CourseRegistrationDTO>().ReverseMap();
            CreateMap<CourseRegistration, CourseRegistrationWithDTO>()
                .ForMember(dest => dest.Teacher, opt => opt.MapFrom(src => src.Teacher))
                .ReverseMap();
            CreateMap<CourseRegistration, CourseRegistrationAddDTO>().ReverseMap();
            CreateMap<CourseRegistration, CourseRegistrationEditDTO>().ReverseMap();
            CreateMap<CourseRegistration, CourseRegistrationProgressDTO>().ReverseMap();
        }
    }
}
