using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.Api.Controllers.Models;
using DatingApp.Api.Controllers.Models.Data;
using DatingApp.Api.Data;
using DatingApp.Api.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace DatingApp.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
           // CreateHostBuilder(args).Build().Run(); // Existing default Code
          var host = CreateHostBuilder(args).Build();
          using(var scope = host.Services.CreateScope()){
              var services = scope.ServiceProvider;
              try{
                  var context = services.GetRequiredService<DataContext>();
                  var userManager = services.GetRequiredService<UserManager<User>>();
                  var roleManager = services.GetRequiredService<RoleManager<Role>>();
                  context.Database.Migrate();
                  Seed.SeedUser(userManager, roleManager);
              }
              catch(Exception ex){
                  var logger = services.GetRequiredService<ILogger<Program>>();
                  logger.LogError(ex, "An error occured during migration");
              }
          }
          host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
