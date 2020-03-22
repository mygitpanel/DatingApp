using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.Api.Controllers.Models;
using DatingApp.Api.Data;
using DatingApp.Api.DTOs;
using DatingApp.Api.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DatingApp.Api.Controllers
{
    [Authorize]
    [Route("api/User/{userId}/photo")]
    [ApiController]
    public class PhotoController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public PhotoController(IDatingRepository repo, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _repo = repo;

        // Cloudinary Method Account
            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);

        }
        [HttpGet(Name="GetPhoto")] // Name in attribute is used at Httppost methos at retun CreatedAtRoute();
        public async Task<IActionResult> getPhoto(int id)
        {
            var photoFromRepo = await _repo.GetPhoto(id);

            var photo = _mapper.Map<PhotoForReturnDTO>(photoFromRepo);

            return Ok(photo);

        }

        [HttpPost]
        public async Task<IActionResult> AddUserPhoto(int userId, [FromForm] PhotoCreationDTO photoCreationDTO){
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(userId != currentUserId)
                return Unauthorized();
            
            var userFromRepo = await _repo.GetUser(userId);

            var file = photoCreationDTO.File;

            var UploadResult = new ImageUploadResult(); //ImageUploadResult cloudinary method to upload photo;

            if(file.Length > 0)
            {
                using(var stream = file.OpenReadStream()){
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    UploadResult = _cloudinary.Upload(uploadParams); 
                }
            }
            photoCreationDTO.Url = UploadResult.Uri.ToString();
            photoCreationDTO.PublicId = UploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoCreationDTO);  // photoCreationDTO is the object of PhotoCreationDTO class;

            if(userFromRepo.Photo.Any(u => u.IsMain))
            photo.IsMain = true;

            userFromRepo.Photo.Add(photo);

            if(await _repo.SaveAll())
            {
                var photoToReturn = _mapper.Map<PhotoForReturnDTO>(photo);
                return CreatedAtRoute("GetPhoto", new{userId = userId, id = photo.Id}, photoToReturn);
            }

            return BadRequest("Could not add photo");
        }


    }
}