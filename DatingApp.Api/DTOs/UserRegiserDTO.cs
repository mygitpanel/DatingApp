using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.Api.DTOs
{
    public class UserRegiserDTO
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(8,MinimumLength=6, ErrorMessage="password must be six character long.")]
        public string Password { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string KnownAs { get; set; }

        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Country { get; set; }

        public UserRegiserDTO(){
            this.Created  = DateTime.Now;
            this.LastActive = DateTime.Now;
        }
    }
}