using Microsoft.OpenApi.Models;

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

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
