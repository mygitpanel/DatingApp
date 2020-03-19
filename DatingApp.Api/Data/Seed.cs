using System.Collections.Generic;
using System.Linq;
using DatingApp.Api.Controllers.Models;
using DatingApp.Api.Controllers.Models.Data;
using Newtonsoft.Json;

namespace DatingApp.Api.Data
{
    public class Seed
    {
        public static void SeedUser(DataContext context){
            if(!context.users.Any()) {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json"); // Read json file data
                var users = JsonConvert.DeserializeObject<List<User>>(userData); // Deserialize json data from variable userData
                foreach(var user in users){
                    byte[] passwordHash, passwordSalt;
                    CreatePasswordHashdHash("password", out passwordHash, out passwordSalt); // Method for passwordHash and passwordSalt
                    user.PasswordHash = passwordHash;
                    user.PasswordSalt = passwordSalt;
                    user.username = user.username.ToLower();
                    context.users.Add(user);  // Adding users
                }
                    context.SaveChanges(); // Save all data changes
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