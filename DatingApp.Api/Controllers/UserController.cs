using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using DatingApp.Api.Controllers.Models;
using DatingApp.Api.Data;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly DatingRepository _repo;
        public UserController(DatingRepository repo)
        {
            this._repo = repo;

        }
        [HttpGet]
        public async Task<IActionResult> Getusers(){
            var users = await _repo.GetUsers();
            return Ok();
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Getuser(int id){
            var user = await _repo.GetUser(id);
            return Ok();
        }
    }
}