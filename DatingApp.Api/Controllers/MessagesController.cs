using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.Api.Data;
using DatingApp.Api.DTOs;
using DatingApp.Api.Helper;
using DatingApp.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.Api.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]  // used for user last active data or time
    [Route("api/user/{userId}/[controller]")]
    [ApiController]
    [Authorize]
    public class MessagesController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        public MessagesController(IDatingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("{id}", Name="GetMessage")]
        public async Task<IActionResult> GetMessages(int id, int userId){
            var currentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(userId != currentUser)
                return Unauthorized();
            
            var messageFromRepo = await _repo.GetMessage(id);

            if(messageFromRepo == null)
                return NotFound();
            
            return Ok(messageFromRepo);
        }

        [HttpPost("createmessage")] 
        // http://localhost:5000/api/user/1/messages/createmessage
        public async Task<IActionResult> CreateMessage(int userId, MessageForCreationDTO messageForCreationDTO)
        {
            var currentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(userId != currentUser)
                return Unauthorized();
            
            messageForCreationDTO.SenderId = userId;

            var receipient = _repo.GetUser(messageForCreationDTO.ReceipientId);

            if(receipient == null)
                return BadRequest("Could not find user");

            var message = _mapper.Map<Message>(messageForCreationDTO);

            _repo.Add(message);

            var messageToReturn = _mapper.Map<MessageForCreationDTO>(message);

            if(await _repo.SaveAll())
            return CreatedAtRoute("GetMessage", new{userId, id = message.Id}, messageToReturn);

        throw new Exception("Creating the message failed on save");
        }
    }
}