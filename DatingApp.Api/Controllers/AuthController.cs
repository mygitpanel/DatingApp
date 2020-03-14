using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.Api.Controllers.Models;
using DatingApp.Api.Controllers.Models.Data;
using DatingApp.Api.DTOs;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace DatingApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repository;
        private readonly IConfiguration _config;
        public AuthController(IAuthRepository repository, IConfiguration config)
        {
            _config = config;
            this._repository = repository;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegiserDTO userregister)
        {
            // if(!ModelState.IsValid)
            //     return BadRequest(ModelState);  We can check use this also if [ApiController] attribute is not used.

            userregister.Username = userregister.Username.ToLower();
            if (await _repository.UserExist(userregister.Username))
                return BadRequest("User already exist");

            var UserToCreate = new User
            {
                username = userregister.Username
            };

            var CreatedUser = await _repository.Register(UserToCreate, userregister.Password);

            return StatusCode(201);
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDTO userLoginDTO)
        {
           // throw new Exception("Computer says No");
            var user = await _repository.Login(userLoginDTO.Username, userLoginDTO.Password);

            if (user == null)
                return Unauthorized();

            var claims = new[]{
             new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
             new Claim(ClaimTypes.Name, user.username)
         };

            var key = new SymmetricSecurityKey
            (Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new {
                token = tokenHandler.WriteToken(token)
            });
        }
    }
}