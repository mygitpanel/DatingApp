using System;
using System.Collections;
using System.Collections.Generic;
using DatingApp.Api.Models;
using Microsoft.AspNetCore.Identity;

namespace DatingApp.Api.Controllers.Models
{
    public class User : IdentityUser<int>
    {

        // Commented these properties because we are using Identity and it's already contains these properties
        //public int Id { get; set; }
        //public string username{get;set;}
        //public byte[] PasswordHash{get;set;}
        //public byte[] PasswordSalt{get;set;}
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public ICollection<Photo> Photo { get; set; }
        public ICollection<Like> Likers { get; set; }
        public ICollection<Like> Likees { get; set; }
        public ICollection<Message> MessagesSent { get; set; }
        public ICollection<Message> MessagesReceived { get; set; }
        public UserRole MyProperty { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
    }
}