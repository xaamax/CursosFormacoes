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
using CursosFormacoes.Application.Configurations;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;

var builder = WebApplication.CreateBuilder(args);
var appName = "CursosFormacoes";
var appVersion = "v1";
var appDescription = $"API RESTful desenvolvida para Gerenciamento de cursos e formações para professores com ASP.NET Core 8.";

//Configurations
var tokenConfigurations = new TokenConfiguration();
new ConfigureFromConfigurationOptions<TokenConfiguration>(
        builder.Configuration.GetSection("TokenConfigurations")
    )
    .Configure(tokenConfigurations);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
    options.SwaggerDoc(appVersion,
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

    // Configuração para usar Bearer Token
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new List<string>()
        }
    });
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = tokenConfigurations.Issuer,
        ValidAudience = tokenConfigurations.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenConfigurations.Secret))
    };
});

builder.Services.AddAuthorization(auth =>
{
    auth.AddPolicy("Bearer", new AuthorizationPolicyBuilder()
        .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
        .RequireAuthenticatedUser().Build());
});


builder.Services.AddCors(options =>
{

    options.AddDefaultPolicy(
        policy =>
        {
            policy.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddDbContext<DatabaseContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("SQLServerConnection")));

//AutoMapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

//Dependency Injection
builder.Services.AddSingleton(tokenConfigurations);

builder.Services.AddTransient<DatabaseSeeder>();

builder.Services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ITeacherRepository, TeacherRepository>();
builder.Services.AddScoped<ICourseRegistrationRepository, CourseRegistrationRepository>();

builder.Services.AddTransient<IAuthService, AuthService>();
builder.Services.AddTransient<ITokenService, TokenService>();
builder.Services.AddTransient<ITeacherService, TeacherService>();
builder.Services.AddTransient<ICourseTrainingService, CourseTrainingService>();
builder.Services.AddTransient<ICourseRegistrationService, CourseRegistrationService>();

var app = builder.Build();

// Chama o método Seed ao iniciar a aplicação
using (var scope = app.Services.CreateScope())
{
    var seeder = scope.ServiceProvider.GetRequiredService<DatabaseSeeder>();
    seeder.Seed();
}

//Middlewares
app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.Run();
