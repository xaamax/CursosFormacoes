using System.ComponentModel;
using System.Reflection;
using CursosFormacoes.Domain.Entities;
using CursosFormacoes.Domain.Entities.Base;
using CursosFormacoes.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace CursosFormacoes.Persistence.Context
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<CourseTraining> CoursesTrainings { get; set; }
        public DbSet<CourseRegistration> CoursesRegistrations { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Encontra todas as entidades que herdam BaseEntity
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                var entity = entityType.ClrType;
                // Verifica se a entidade herda de BaseEntity
                if (typeof(BaseEntity).IsAssignableFrom(entity))
                {
                    var entityBuilder = modelBuilder.Entity(entity);
                    // Configura 'created_at' para usar GETDATE() como valor padrão
                    entityBuilder.Property(nameof(BaseEntity.CreatedAt))
                        .HasDefaultValueSql("GETDATE()");
                    // 'email' deve ser único
                    modelBuilder.Entity<Teacher>()
                        .HasIndex(c => c.Email)
                        .IsUnique();
                }
            }

            modelBuilder.Entity<CourseRegistration>()
            .Property(p => p.Progress)
            .HasDefaultValue("Não iniciado");
        }

        }
    }
