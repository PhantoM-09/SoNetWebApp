using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DatabaseManager
{
    public class ConfigurationManager
    {
        public static DbContextOptions<AppDbContext> GetDbOptions()
        {
            var builder = new ConfigurationBuilder();
            builder.SetBasePath(Directory.GetCurrentDirectory());
            builder.AddJsonFile("ConfigurationFiles/appsettings.json");

            var config = builder.Build();
            string connectionString = config.GetConnectionString("DefaultConnection");

            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
            return optionsBuilder.UseSqlServer(connectionString).Options;

        }
    }
}
