using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.Api.Controllers.Models;
using DatingApp.Api.Controllers.Models.Data;
using DatingApp.Api.Data;
using DatingApp.Api.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace DatingApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        public SignInManager<User> _SignInManager { get; set; }
        public UserManager<User> _UserManager { get; set; }
         public IDatingRepository _repo { get; }
        public AuthController(IConfiguration config, IMapper mapper, UserManager<User> userManager,
       
        SignInManager<User> signInManager, IDatingRepository repo)
        {
            _repo = repo;
            _UserManager = userManager;
            _SignInManager = signInManager;
            _mapper = mapper;
            _config = config;

        }
    [HttpPost("register")]
    // http://localhost:5000/api/Auth/register
    public async Task<IActionResult> Register(UserRegiserDTO userregister)
    {
        // if(!ModelState.IsValid)
        //     return BadRequest(ModelState);  We can check use this also if [ApiController] attribute is not used.

        var UserToCreate = _mapper.Map<User>(userregister);

        var result = await _UserManager.CreateAsync(UserToCreate, userregister.Password);

        var userToReturn = _mapper.Map<UserForDetailedDTO>(UserToCreate);

        if (result.Succeeded)
        {

            return CreatedAtRoute("GetUser", new { Controller = "User", id = UserToCreate.Id }, userToReturn);

        }

        return BadRequest(result.Errors);

    }
    [HttpPost("login")]
    // http://localhost:5000/api/Auth/login
    public async Task<IActionResult> Login(UserLoginDTO userLoginDTO)
    {
        // throw new Exception("Computer says No");
        var user = await _UserManager.FindByNameAsync(userLoginDTO.Username);

        var result = await _SignInManager.CheckPasswordSignInAsync(user, userLoginDTO.Password, false);

        if (result.Succeeded)
        {
            var userData = _mapper.Map<UserListDTO>(user);
            if (string.IsNullOrEmpty(userData.PhotoUrl))
            {
                var userMainPhoto = await _repo.GetMainPhoto(userData.Id);
                if (userMainPhoto != null)
                 userData.PhotoUrl = userMainPhoto.Url;
            }

            return Ok(new
            {
                token = GenerateJwtToken(user).Result,
                userData
            });
        }

        return Unauthorized();
    }

    private async Task<string> GenerateJwtToken(User user)
    {
        var claims = new List<Claim>{
             new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
             new Claim(ClaimTypes.Name, user.UserName)
         };

        var userRoles = await _UserManager.GetRolesAsync(user);

        foreach (var roles in userRoles)
        {
            claims.Add(new Claim(ClaimTypes.Role, roles));
        }

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

        return tokenHandler.WriteToken(token);
    }
}
}