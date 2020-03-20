using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using DatingApp.Api.Controllers.Models;
using DatingApp.Api.Data;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using DatingApp.Api.DTOs;
using System.Collections.Generic;

namespace DatingApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        public UserController(IDatingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            this._repo = repo;

        }
        [HttpGet("getusers")]
        public async Task<IActionResult> Getusers()
        {
            var users = await _repo.GetUsers();
            var usersToReturn = _mapper.Map<IEnumerable<UserListDTO>>(users);
            return Ok(usersToReturn);
        }
        [HttpGet("getuser/{id}")]
        public async Task<IActionResult> Getuser(int id)
        {
            var user = await _repo.GetUser(id);
            var userToReturn = _mapper.Map<UserForDetailedDTO>(user);
            return Ok(userToReturn);
        }
    }
}