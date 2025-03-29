using AutoMapper;
using Azure;
using CursosFormacoes.Application.Dtos.CourseRegistration;
using CursosFormacoes.Application.Services.Interfaces;
using CursosFormacoes.Domain.Entities;
using CursosFormacoes.Persistence.Repository.Interfaces;

namespace CursosFormacoes.Application.Services
{
    public class CourseRegistrationService : ICourseRegistrationService
    {
        private readonly IBaseRepository<CourseRegistration> _baseRepository;
        private readonly ICourseRegistrationRepository _courseRegistrationRepository;
        private readonly IMapper _mapper;

        public CourseRegistrationService(
            IBaseRepository<CourseRegistration> repository,
           ICourseRegistrationRepository courseRegistrationRepository,
            IMapper mapper)
        {
            _baseRepository = repository;
            _courseRegistrationRepository = courseRegistrationRepository;
            _mapper = mapper;
        }

        public async Task<CourseRegistrationDTO> AddCourseRegistration(CourseRegistrationAddOrEditDTO dto)
        {
            try
            {
                var model = _mapper.Map<CourseRegistration>(dto);
                _baseRepository.Create(model);
                var response = await _courseRegistrationRepository.GetCourseRegistrationById(model.Id);
                return _mapper.Map<CourseRegistrationDTO>(response);
            }
            catch (Exception err)
            {
                throw new Exception(err.Message);
            }
        }
        public Task<CourseRegistrationDTO[]> GetAllCourseRegistrations()
        {
            try
            {
                var model = _baseRepository.FindAll();
                return Task.FromResult(_mapper.Map<CourseRegistrationDTO[]>(model));
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao buscar Inscrições.", ex);
            }
        }

        public async Task<CourseRegistrationDTO> GetCourseRegistrationById(long id)
        {
            try
            {
                var model = await _courseRegistrationRepository.GetCourseRegistrationById(id);
                if (model == null) throw new Exception("Nenhuma Inscrição encontrada.");
                return _mapper.Map<CourseRegistrationDTO>(model);
            }
            catch (Exception err)
            {
                throw new Exception(err.Message);
            }
        }
        public async Task<CourseRegistrationDTO> UpdateCourseRegistration(long id, CourseRegistrationAddOrEditDTO dto)
        {
            try
            {
                var model = _baseRepository.FindByID(id);
                if (model == null) throw new Exception("Nenhuma Inscrição encontrada.");
                model.UpdatedAt = DateTime.Now;
                _mapper.Map(dto, model);
                var updated = _baseRepository.Update(model);
                var response = await _courseRegistrationRepository.GetCourseRegistrationById(id);
                return _mapper.Map<CourseRegistrationDTO>(updated);
            }
            catch (Exception err)
            {
                throw new Exception(err.Message);
            }
        }
        public Task<CourseRegistrationDTO> InactiveCourseRegistration(long id, CourseRegistrationInativeDTO dto)
        {
            try
            {
                var model = _baseRepository.FindByID(id);
                if (model == null) throw new Exception("Nenhuma Inscrição encontrada.");
                model.UpdatedAt = DateTime.Now;
                _mapper.Map(dto, model);
                var updated = _baseRepository.Update(model);
                return Task.FromResult(_mapper.Map<CourseRegistrationDTO>(updated));
            }
            catch (Exception err)
            {
                throw new Exception(err.Message);
            }
        }
        public void DeleteCourseRegistration(long id)
        {
            _baseRepository.Delete(id);
        }
    }
}
