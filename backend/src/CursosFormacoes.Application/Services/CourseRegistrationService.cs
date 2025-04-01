using AutoMapper;
using Azure;
using CursosFormacoes.Application.Dtos.CourseRegistration;
using CursosFormacoes.Application.Services.Interfaces;
using CursosFormacoes.Domain.Entities;
using CursosFormacoes.Domain.Enums;
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

        public async Task<CourseRegistrationDTO> AddCourseRegistration(CourseRegistrationAddDTO dto)
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
        public async Task<CourseRegistrationDTO[]> GetAllCourseRegistrations()
        {
            try
            {
                var model = await _courseRegistrationRepository.GetAllCourseRegistrations();
                return _mapper.Map<CourseRegistrationWithDTO[]>(model);
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
        public async Task<CourseRegistrationDTO> UpdateCourseRegistration(CourseRegistrationEditDTO dto)
        {
            try
            {
                var model = _baseRepository.FindByID(dto.Id);
                if (model == null) throw new Exception("Nenhuma Inscrição encontrada.");
                model.UpdatedAt = DateTime.Now;
                _mapper.Map(dto, model);
                var updated = _baseRepository.Update(model);
                var response = await _courseRegistrationRepository.GetCourseRegistrationById(dto.Id);
                return _mapper.Map<CourseRegistrationDTO>(updated);
            }
            catch (Exception err)
            {
                throw new Exception(err.Message);
            }
        }
        public Task<CourseRegistrationDTO> VisibilityAtCourseRegistration(long id)
        {
            try
            {
                var model = _baseRepository.FindByID(id);
                if (model == null) throw new Exception("Nenhuma Inscrição encontrada.");
                model.DisabledAt = model.DisabledAt == null ? DateTime.Now : null;
                var updated = _baseRepository.Update(model);
                return Task.FromResult(_mapper.Map<CourseRegistrationDTO>(updated));
            }
            catch (Exception err)
            {
                throw new Exception(err.Message);
            }
        }

        public Task<CourseRegistrationDTO> ProgressCourseRegistration(long id, CourseRegistrationProgressDTO dto)
        {
            try
            {
                var model = _baseRepository.FindByID(id);
                if (model == null) throw new Exception("Nenhuma Inscrição encontrada.");
                bool isValidProgress = Enum.GetValues(typeof(CourseRegistrationProgressEnum))
                                            .Cast<CourseRegistrationProgressEnum>()
                                            .Any(e => e.GetEnumDescription() == dto.Progress);

                if (!isValidProgress)
                {
                    throw new Exception("Progressos permitidos: 'Não Iniciado', 'Em andamento', 'Concluído'.");
                }
                model.Progress = dto.Progress;
                model.CompletedAt = model.Progress.Equals("Concluído") ? DateTime.Now : null;
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
