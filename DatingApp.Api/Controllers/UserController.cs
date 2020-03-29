using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using DatingApp.Api.Controllers.Models;
using DatingApp.Api.Data;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using DatingApp.Api.DTOs;
using System.Collections.Generic;
using System.Security.Claims;
using System;
using DatingApp.Api.Helper;

namespace DatingApp.Api.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
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
        public async Task<IActionResult> Getusers([FromQuery]UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var userFromRepo = await _repo.GetUser(currentUserId);
             userParams.UserId = currentUserId;
            if(string.IsNullOrEmpty(userParams.Gender)){
                userParams.Gender = userFromRepo.Gender == "male" ? "female" : "male";
            }

            var users = await _repo.GetUsers(userParams);
           
            var usersToReturn = _mapper.Map<IEnumerable<UserListDTO>>(users);

            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);
            return Ok(usersToReturn);
        }
        [HttpGet("getuser/{id}", Name="GetUser")]
        public async Task<IActionResult> Getuser(int id)
        {
            var user = await _repo.GetUser(id);
            var userToReturn = _mapper.Map<UserForDetailedDTO>(user);
            return Ok(userToReturn);
        }

        [HttpPut("updateUser/{id}")]
        public async Task<IActionResult> updateUser(int id, userForUpdateDTO userForUpdate){
            int currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);  // getting current user from identity
            if(id != currentUserId)
            return Unauthorized();

            var userFromRepo = await _repo.GetUser(id);
            _mapper.Map(userForUpdate, userFromRepo);

            if(await _repo.SaveAll())
                return NoContent();
            
           throw new Exception($"Updating user {id} failed on save");
        }
    }
}