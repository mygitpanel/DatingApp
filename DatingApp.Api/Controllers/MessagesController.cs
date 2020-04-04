using System;
using System.Collections;
using System.Collections.Generic;
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

        [HttpGet("getmessagelist")]
        public async Task<IActionResult> GetMessagesForuser(int userId,[FromQuery] MessageParams messageParams)
        {
            var currentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(userId != currentUser)
                return Unauthorized();

            messageParams.UserId = userId;
            
            var messagesFromRepo = await _repo.GetMessageForUser(messageParams);

            var messages = _mapper.Map<IEnumerable<MessageToReturnDTO>>(messagesFromRepo);

            Response.AddPagination(messagesFromRepo.CurrentPage, messagesFromRepo.PageSize, messagesFromRepo.TotalCount, messagesFromRepo.TotalPages);

            return Ok(messages);
        }

        [HttpGet("thread/{receipientId}")] 
        public async Task<IActionResult> GetMessageThread(int userId, int receipientId)
        {
            var currentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(userId != currentUser)
                return Unauthorized(); 
            
            var messageFromRepo = await _repo.GetMessageThread(userId, receipientId);

            var messageThread = _mapper.Map<IEnumerable<MessageToReturnDTO>>(messageFromRepo);

            return Ok(messageThread);
        }

        [HttpPost("createmessage")] 
        // http://localhost:5000/api/user/1/messages/createmessage
        public async Task<IActionResult> CreateMessage(int userId, MessageForCreationDTO messageForCreationDTO)
        {
            var sender = await _repo.GetUser(userId);

            var currentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(sender.Id != currentUser)
                return Unauthorized();
            
            messageForCreationDTO.SenderId = userId;

            var receipient = _repo.GetUser(messageForCreationDTO.ReceipientId);

            if(receipient == null)
                return BadRequest("Could not find user");

            var message = _mapper.Map<Message>(messageForCreationDTO);

            _repo.Add(message);

            

            if(await _repo.SaveAll()){
            var messageToReturn = _mapper.Map<MessageToReturnDTO>(message);
            return CreatedAtRoute("GetMessage", new{userId, id = message.Id}, messageToReturn);
            }

        throw new Exception("Creating the message failed on save");
        }

       [HttpPost("deletemessage/{messageid}")]
       public async Task<IActionResult> DeleteMessage(int messageid, int userId)
       {
            var currentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(userId != currentUser)
                return Unauthorized();
            
            var messagefromRepo = await _repo.GetMessage(messageid);

            if(messagefromRepo.SenderId == userId)
                messagefromRepo.SenderDeleted = true;

            if(messagefromRepo.ReceipientId == userId)
                messagefromRepo.ReceipientDeleted = true;

            if(messagefromRepo.SenderDeleted && messagefromRepo.ReceipientDeleted)
            _repo.Delete(messagefromRepo);

            if(await _repo.SaveAll())
                return NoContent();
            
            throw new Exception("Error Deleting the message");
       }
        
    }
}