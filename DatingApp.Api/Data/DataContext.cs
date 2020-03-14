using Microsoft.EntityFrameworkCore;

namespace DatingApp.Api.Controllers.Models.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options):base(options){}

        public DbSet<Value> values{get;set;}
        public DbSet<User> users{get;set;}
        public DbSet<Photo> Photos{get; set;}
    }
}