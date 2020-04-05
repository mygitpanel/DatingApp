using System.Collections.Generic;
using System.Linq;
using DatingApp.Api.Controllers.Models;
using DatingApp.Api.Controllers.Models.Data;
using DatingApp.Api.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace DatingApp.Api.Data
{
    public class Seed
    {
        public static void SeedUser(UserManager<User> userManager, RoleManager<Role> roleManager)
        {

            if(!userManager.Users.Any()) 
            {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json"); // Read json file data

                var users = JsonConvert.DeserializeObject<List<User>>(userData); // Deserialize json data from variable userData

            // Create Some Roles

                var roles = new List<Role>{
                    new Role{Name = "Member"},
                    new Role{Name = "Admin"},
                    new Role{Name = "Moderator"},
                    new Role{Name = "VIP"},
                };

                foreach(var role in roles)
                {
                    roleManager.CreateAsync(role).Wait();
                }

                foreach(var user in users){
                    userManager.CreateAsync(user, "password").Wait();
                    userManager.AddToRoleAsync(user, "Member").Wait();
                }

                var adminUser = new User
                {
                    UserName = "RahulSharma",
                    Gender = "male",
                    KnownAs = "raghu",
                    Introduction = "test",
                    LookingFor = "test",
                    Interests = "test",
                    City = "test",
                    Country = "test"
                };

                var result = userManager.CreateAsync(adminUser, "password").Result;

                if(result.Succeeded)
                {
                    var admin = userManager.FindByNameAsync("RahulSharma").Result;
                    //admin.UserRoles = new[] {"Admin","Moderator"};
                    var addResult = userManager.AddToRolesAsync(admin, new [] {"Admin", "Moderator"}).Result;
                }   
            }
        }
    // Method from Auth Repository in data just copy from there and make it static....
         public static void CreatePasswordHashdHash(string password, out byte[] passwordHash, out byte[] passwordSalt){
            using(var hmac = new System.Security.Cryptography.HMACSHA512()){
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}