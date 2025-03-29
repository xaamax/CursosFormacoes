using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace CursosFormacoes.Persistence.Context
{
    public class DatabaseSeeder
    {
        private readonly DatabaseContext _context;
        private readonly IConfiguration _configuration;

        public DatabaseSeeder(DatabaseContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public void Seed()
        {
            var userExists = _context.Users.Any(u => u.UserName == "max.souza");

            if (!userExists)
            {
                var solutionDirectory = Path.GetFullPath(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "..", "..", "..", ".."));
                var scriptPath = Path.Combine(solutionDirectory, "CursosFormacoes.Persistence", "Dataset", "Insert_Data_In_Users.sql");
                if (File.Exists(scriptPath))
                {
                    var sqlScript = File.ReadAllText(scriptPath);
                    _context.Database.ExecuteSqlRaw(sqlScript); // Executa o script no banco
                }
                else
                {
                    Console.WriteLine($"O arquivo SQL não foi encontrado em: {scriptPath}");
                }
            }
        }
    }
}
