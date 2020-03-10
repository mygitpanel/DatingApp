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
    }
}