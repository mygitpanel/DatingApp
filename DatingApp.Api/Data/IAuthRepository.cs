using System.Threading.Tasks;

namespace DatingApp.Api.Controllers.Models.Data
{
    public interface IAuthRepository
    {
         Task<User> Register(User user,string password);
         Task<User> Login(string username,string password);
         Task<bool> UserExist(string username);
    }
}