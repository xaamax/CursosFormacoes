using CursosFormacoes.Application.Interfaces;
using CursosFormacoes.Persistence.Context;
using CursosFormacoes.Persistence.Repository;
using CursosFormacoes.Persistence.Repository.Base;
using CursosFormacoes.Persistence.Repository.Interfaces;
using CursosFormacoes.Application;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using CursosFormacoes.API.Middleware;
using CursosFormacoes.Application.Services;
using CursosFormacoes.Application.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);
var appName = "CursosFormacoes";
var appVersion = "v1";
var appDescription = $"API RESTful desenvolvida para Gerenciamento de cursos e formações para professores com ASP.NET Core 8.";

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c => {
    c.SwaggerDoc(appVersion,
        new OpenApiInfo
        {
            Title = appName,
            Version = appVersion,
            Description = appDescription,
            Contact = new OpenApiContact
            {
                Name = "Max Fernandes de Souza",
                Url = new Uri("https://github.com/xaamax")
            }
        });
});

builder.Services.AddDbContext<DatabaseContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("SQLServerConnection")));

//AutoMapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

//Dependency Injection
builder.Services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
builder.Services.AddScoped<ITeacherRepository, TeacherRepository>();

builder.Services.AddTransient<ITeacherService, TeacherService>();
builder.Services.AddTransient<ICourseTrainingService, CourseTrainingService>();

var app = builder.Build();

//Middlewares
app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
