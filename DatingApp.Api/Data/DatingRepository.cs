using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.Api.Controllers.Models;
using DatingApp.Api.Controllers.Models.Data;
using DatingApp.Api.Helper;
using DatingApp.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Api.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _context;
        public DatingRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Like> GetLikes(int userId, int receipientId)
        {
            return await _context.Likes.FirstOrDefaultAsync(u => u.LikerId == userId && u.LikeeId == receipientId);
        }

        public async Task<Photo> GetMainPhoto(int userId)
        {
          var mainPhoto = await _context.Photos.Where(u => u.UserId == userId).FirstOrDefaultAsync(p => p.IsMain);
          return mainPhoto;
        }

        public async Task<Photo> GetPhoto(int Photoid)
        {
           var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == Photoid);

           return photo;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.users.Include(p => p.Photo).FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }
 
        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = _context.users.Include(p => p.Photo).OrderByDescending(u => u.LastActive).AsQueryable();

            users = users.Where(u => u.Id != userParams.UserId);

            users = users.Where(u => u.Gender == userParams.Gender);

            if(userParams.Likers)
            {
                var userLikers = await GetUserLikes(userParams.UserId, userParams.Likers);
                users = users.Where(u => userLikers.Contains(u.Id));
            }

            if(userParams.Likees)
            {
                var userLikees = await GetUserLikes(userParams.UserId, userParams.Likers);
                users = users.Where(u => userLikees.Contains(u.Id));
            }

            if(userParams.MinAge != 18 || userParams.MaxAge != 99){
                var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
                var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

                users = users.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);
            }

            if (!string.IsNullOrEmpty(userParams.orderBy)){
                switch(userParams.orderBy){
                    case "created":
                        users = users.OrderByDescending(u => u.Created);
                        break;
                    default:
                        users = users.OrderByDescending(u => u.LastActive);
                        break;
                }
            }

            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        private async Task<IEnumerable<int>> GetUserLikes(int userId, bool likers){
            var user = await _context.users
            .Include(x => x.Likers)
            .Include(x => x.Likees)
            .FirstOrDefaultAsync(u => u.Id == userId);

            if(likers)
            {
                return user.Likers.Where(u => u.LikeeId == userId).Select(i => i.LikerId);
            }
            else
            {
                return user.Likees.Where(u => u.LikerId == userId).Select(i => i.LikeeId);
            }
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0; // return true if savechanges count is greater then 0 else return false;
        }
 
        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages.FirstOrDefaultAsync(m => m.Id == id);
        } 

        public async Task<PagedList<Message>> GetMessageForUser(MessageParams messageParams)
        {
            var messages = _context.Messages
                         .Include(u => u.Sender).ThenInclude(p => p.Photo)
                         .Include(u => u.Receipient).ThenInclude(p => p.Photo)
                         .AsQueryable();
            
            switch(messageParams.MessageContainer)
            {
                case "Inbox":
                    messages = messages.Where(u => u.ReceipientId == messageParams.UserId && u.ReceipientDeleted == false);
                    break;
                
                case "Outbox":
                    messages = messages.Where(u => u.SenderId == messageParams.UserId && u.SenderDeleted == false);
                    break;
                
                default:
                    messages = messages.Where(u => u.ReceipientId == messageParams.UserId && u.IsRead == false 
                                              && u.ReceipientDeleted == false);
                    break;
            }

            messages = messages.OrderByDescending(d => d.MessageSent);
            return await PagedList<Message>.CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<Message>> GetMessageThread(int userId, int receipientId)
        {
             var messages = await _context.Messages
                         .Include(u => u.Sender).ThenInclude(p => p.Photo)
                         .Include(u => u.Receipient).ThenInclude(p => p.Photo)
                         .Where(m => m.ReceipientId == userId && m.ReceipientDeleted == false && m.SenderId == receipientId
                         ||     m.ReceipientId == receipientId && m.SenderDeleted == false && m.SenderId == userId)
                         .OrderByDescending(m => m.MessageSent)
                         .ToListAsync();
            
            return messages;
        }
    }
}