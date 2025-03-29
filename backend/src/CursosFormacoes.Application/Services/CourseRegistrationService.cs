using AutoMapper;
using CursosFormacoes.Application.Dtos.CourseRegistration;
using CursosFormacoes.Application.Services.Interfaces;
using CursosFormacoes.Domain.Entities;
using CursosFormacoes.Persistence.Repository.Interfaces;

namespace CursosFormacoes.Application.Services
{
    public class CourseRegistrationService : ICourseRegistrationService
    {
        private readonly IBaseRepository<CourseRegistration> _baseRepository;
        private readonly IMapper _mapper;

        public CourseRegistrationService(
            IBaseRepository<CourseRegistration> repository,
            IMapper mapper)
        {
            _baseRepository = repository;
            _mapper = mapper;
        }

        public Task<CourseRegistrationDTO> AddCourseRegistration(CourseRegistrationAddOrEditDTO dto)
        {
            try
            {
                var model = _mapper.Map<CourseRegistration>(dto);
                var createdModel = _baseRepository.Create(model);
                return Task.FromResult(_mapper.Map<CourseRegistrationDTO>(createdModel));
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

        public Task<CourseRegistrationDTO> GetCourseRegistrationById(int id)
        {
            try
            {
                var model = _baseRepository.FindByID(id);
                if (model == null) throw new Exception("Nenhuma Inscrição encontrada.");
                return Task.FromResult(_mapper.Map<CourseRegistrationDTO>(model));
            }
            catch (Exception err)
            {
                throw new Exception(err.Message);
            }
        }
        public Task<CourseRegistrationDTO> UpdateCourseRegistration(int id, CourseRegistrationAddOrEditDTO dto)
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
        public Task<CourseRegistrationDTO> InactiveCourseRegistration(int id, CourseRegistrationInativeDTO dto)
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
