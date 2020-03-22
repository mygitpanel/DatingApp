using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.Api.DTOs
{
    public class PhotoCreationDTO
    {
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded{get; set;}
        public IFormFile File{get; set;}
        public string PublicId { get; set; }

        public PhotoCreationDTO()
        {
            DateAdded = DateTime.Now;
        }
    }
}