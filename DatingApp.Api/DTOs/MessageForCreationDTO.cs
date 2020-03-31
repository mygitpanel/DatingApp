using System;

namespace DatingApp.Api.DTOs
{
    public class MessageForCreationDTO
    {
        public int SenderId { get; set; }
        public int ReceipientId { get; set; }
        public DateTime MessageSent { get; set; }
        public string Content { get; set; }
        public MessageForCreationDTO()
        {
            MessageSent = DateTime.Now;
        }
    }
}