using AutoMapper;
using CursosFormacoes.Application.Dtos.Teacher;
using CursosFormacoes.Application.Interfaces;
using CursosFormacoes.Domain.Entities;
using CursosFormacoes.Persistence.Repository.Interfaces;


namespace CursosFormacoes.Application
{
    public class TeacherService : ITeacherService
    {
        private readonly IBaseRepository<Teacher> _baseRepository;
        private readonly IMapper _mapper;

        public TeacherService(
            IBaseRepository<Teacher> baseRepository,
            IMapper mapper)
        {
            _baseRepository = baseRepository;
            _mapper = mapper;
        }

        public Task<TeacherDTO> AddTeacher(TeacherAddOrEditDTO dto)
        {
            try
            {
                var model = _mapper.Map<Teacher>(dto);
                var createdModel = _baseRepository.Create(model);
                return Task.FromResult(_mapper.Map<TeacherDTO>(createdModel));
            }
            catch (Exception err)
            {
                throw new Exception(err.Message);
            }
        }

        public Task<TeacherDTO> InactiveTeacher(int id, TeacherDeleteDTO dto)
        {
            try
            {
                var model = _baseRepository.FindByID(id);
                if (model == null) throw new Exception("Nenhum Professor encontrado.");
                model.UpdatedAt = DateTime.Now;
                _mapper.Map(dto, model);
                var updated = _baseRepository.Update(model);
                return Task.FromResult(_mapper.Map<TeacherDTO>(updated));
            }
            catch (Exception err)
            {
                throw new Exception(err.Message);
            }
        }

        public Task<TeacherDTO[]> GetAllTeachers()
        {
            try
            {
                var model = _baseRepository.FindAll();
                return Task.FromResult(_mapper.Map<TeacherDTO[]>(model));
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao buscar Professores.", ex);
            }
        }

        public Task<TeacherDTO> GetTeacherById(int id)
        {
            try
            {
                var model = _baseRepository.FindByID(id);
                if (model == null) throw new Exception("Nenhum Professor encontrado.");
                return Task.FromResult(_mapper.Map<TeacherDTO>(model));
            }
            catch (Exception err)
            {
                throw new Exception(err.Message);
            }
        }

        public Task<TeacherDTO> UpdateTeacher(int id, TeacherAddOrEditDTO dto)
        {
            try
            {
                var model = _baseRepository.FindByID(id);
                if (model == null) throw new Exception("Nenhum Professor encontrado.");
                model.UpdatedAt = DateTime.Now;
                _mapper.Map(dto, model);
                var updated = _baseRepository.Update(model);
                return Task.FromResult(_mapper.Map<TeacherDTO>(updated));
            }
            catch (Exception err)
            {
                throw new Exception(err.Message);
            }
        }

        public void DeleteTeacher(long id)
        {
            _baseRepository.Delete(id);
        }
    }
}
