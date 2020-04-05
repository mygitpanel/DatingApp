using DatingApp.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Api.Controllers.Models.Data
{
    public class DataContext:IdentityDbContext<User, Role, int, IdentityUserClaim<int>,UserRole, 
                             IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options):base(options){}

        public DbSet<Value> values{get;set;}
       // public DbSet<User> users{get;set;}
        public DbSet<Photo> Photos{get; set;}
        public DbSet<Like> Likes { get; set; }
        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder){

            base.OnModelCreating(builder);

            builder.Entity<UserRole>(userRole => {

              userRole.HasKey(ur => new{ur.UserId, ur.RoleId});

              userRole.HasOne(ur => ur.Role)
              .WithMany(r => r.UserRoles)
              .HasForeignKey(ur => ur.RoleId)
              .IsRequired();

               userRole.HasOne(ur => ur.User)
              .WithMany(r => r.UserRoles)
              .HasForeignKey(ur => ur.UserId)
              .IsRequired();

            });

            builder.Entity<Like>()
                .HasKey(k => new{k.LikerId, k.LikeeId});   // Created primary key is the combination of both LikerId and LikeId
            
            
            builder.Entity<Like>()
                .HasOne(u => u.Likee)       // Likee from Like class
                .WithMany(u => u.Likers)    // Likers from user class at bottom Icollection
                .HasForeignKey(u => u.LikeeId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Like>()
                .HasOne(u => u.Liker)   // Liker from user class
                .WithMany(u => u.Likees) // Likees from user class in Icollection
                .HasForeignKey(u => u.LikerId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
                .HasOne(u => u.Sender)
                .WithMany(m => m.MessagesSent)
                .OnDelete(DeleteBehavior.Restrict);
            
            builder.Entity<Message>()
                .HasOne(u => u.Receipient)
                .WithMany(m => m.MessagesReceived)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}