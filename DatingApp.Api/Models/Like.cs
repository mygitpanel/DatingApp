using DatingApp.Api.Controllers.Models;

namespace DatingApp.Api.Models
{
    public class Like
    {
        public int LikerId { get; set; }    
        public int LikeeId { get; set; }
        public User Liker { get; set; }
        public User Likee { get; set; }
    }
}