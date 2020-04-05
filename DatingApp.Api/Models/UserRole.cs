using DatingApp.Api.Controllers.Models;
using Microsoft.AspNetCore.Identity;

namespace DatingApp.Api.Models
{
    public class UserRole : IdentityUserRole<int>
    {
        public User User { get; set; }
        public Role Role { get; set; }
    }
}