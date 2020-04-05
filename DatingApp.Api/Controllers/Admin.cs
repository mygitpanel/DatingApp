using System.Linq;
using System.Threading.Tasks;
using DatingApp.Api.Controllers.Models;
using DatingApp.Api.Controllers.Models.Data;
using DatingApp.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly DataContext _dbContext;
        public UserManager<User> _UserManager { get; }

        public AdminController(DataContext dbContext, UserManager<User> userManager)
        {
            _UserManager = userManager;
            _dbContext = dbContext;

        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("getUserwitroles")]
        public async Task<IActionResult> GetuserWithRoles()
        {
            var admin = await _dbContext.Users.OrderBy(x => x.UserName).Select(user => new
            {
                Id = user.Id,
                username = user.UserName,
                Roles = (from userrole in user.UserRoles join role in _dbContext.Roles on userrole.RoleId equals role.Id select role.Name).ToList()
            }).ToListAsync();

            return Ok(admin);
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("adminandmoderator")]
        public IActionResult GetPhotosForModeration()
        {
            return Ok("Admin & Moderator can see this");
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("editRoles/{username}")]
        public async Task<IActionResult> editRoles(string username, RoleEditDto roleEditDto)
        {
            var user = await _UserManager.FindByNameAsync(username);

            var userrole =  await _UserManager.GetRolesAsync(user);

            var selectedRoles = roleEditDto.userRoles;

        //  shorthand syntax of if else
            selectedRoles = selectedRoles ?? new string[]{};

            var result  = await _UserManager.AddToRolesAsync(user, selectedRoles.Except(userrole));

            if(!result.Succeeded)
            {
                return BadRequest("Failed to add to roles");
            }

            result = await _UserManager.RemoveFromRolesAsync(user, userrole.Except(selectedRoles));

            if(!result.Succeeded)
            {
                return BadRequest("Failed to remove to roles");
            }

            return Ok(await _UserManager.GetRolesAsync(user));

        }
    }
}