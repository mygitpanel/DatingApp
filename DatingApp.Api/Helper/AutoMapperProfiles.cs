using System.Linq;
using AutoMapper;
using DatingApp.Api.Controllers.Models;
using DatingApp.Api.DTOs;

namespace DatingApp.Api.Helper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserListDTO>()
            .ForMember(dest => dest.PhotoUrl, opt =>  opt.MapFrom(src => src.Photo.FirstOrDefault(p => p.IsMain).Url))
            .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalCulateAge()));

            CreateMap<User, UserForDetailedDTO>()
            .ForMember(dest => dest.PhotoUrl, opt =>  opt.MapFrom(src => src.Photo.FirstOrDefault(p => p.IsMain).Url))
            .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalCulateAge()));

            CreateMap<Photo, PhotosDetailedDTO>();
            CreateMap<userForUpdateDTO, User>();
            CreateMap<PhotoCreationDTO, Photo>();
            CreateMap<Photo,PhotoForReturnDTO>();
        }
    }
}