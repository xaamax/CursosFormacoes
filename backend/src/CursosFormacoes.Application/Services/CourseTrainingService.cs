using AutoMapper;
using CursosFormacoes.Application.Dtos.CourseTraining;
using CursosFormacoes.Application.Services.Interfaces;
using CursosFormacoes.Domain.Entities;
using CursosFormacoes.Persistence.Repository.Base;
using CursosFormacoes.Persistence.Repository.Interfaces;

namespace CursosFormacoes.Application.Services
{
    public class CourseTrainingService : ICourseTrainingService
    {
        private readonly IBaseRepository<CourseTraining> _baseRepository;
        private readonly IMapper _mapper;

        public CourseTrainingService(
            IBaseRepository<CourseTraining> baseRepository,
            IMapper mapper)
        {
            _baseRepository = baseRepository;
            _mapper = mapper;
        }

        public Task<CourseTrainingDTO> AddCourseTraining(CourseTrainingAddDTO dto)
        {
            try
            {
                var model = _mapper.Map<CourseTraining>(dto);
                var createdModel = _baseRepository.Create(model);
                return Task.FromResult(_mapper.Map<CourseTrainingDTO>(createdModel));
            }
            catch (Exception err)
            {
                throw new Exception(err.Message);
            }
        }

        public Task<CourseTrainingDTO[]> GetAllCourseTrainings()
        {
            try
            {
                var model = _baseRepository.FindAll();
                return Task.FromResult(_mapper.Map<CourseTrainingDTO[]>(model));
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao buscar Cursos/Formaçoes.", ex);
            }
        }

        public Task<CourseTrainingDTO> GetCourseTrainingById(int id)
        {
            try
            {
                var model = _baseRepository.FindByID(id);
                if (model == null) throw new Exception("Nenhum Curso/Formação encontrado.");
                return Task.FromResult(_mapper.Map<CourseTrainingDTO>(model));
            }
            catch (Exception err)
            {
                throw new Exception(err.Message);
            }
        }

        public Task<CourseTrainingDTO> UpdateCourseTraining(CourseTrainingEditDTO dto)
        {
            try
            {
                var model = _baseRepository.FindByID(dto.Id);
                if (model == null) throw new Exception("Nenhum Curso/Formação encontrado.");
                model.UpdatedAt = DateTime.Now;
                _mapper.Map(dto, model);
                var updated = _baseRepository.Update(model);
                return Task.FromResult(_mapper.Map<CourseTrainingDTO>(updated));
            }
            catch (Exception err)
            {
                throw new Exception(err.Message);
            }
        }

        public Task<CourseTrainingDTO> VisibilityCourseTraining(int id)
        {
            try
            {
                var model = _baseRepository.FindByID(id);
                if (model == null) throw new Exception("Nenhum Curso/Formação encontrado.");
                model.DisabledAt = model.DisabledAt == null ? DateTime.Now : null;
                var updated = _baseRepository.Update(model);
                return Task.FromResult(_mapper.Map<CourseTrainingDTO>(updated));
            }
            catch (Exception err)
            {
                throw new Exception(err.Message);
            }
        }

        public void DeleteCourseTraining(long id)
        {
            _baseRepository.Delete(id);
        }
    }
}
