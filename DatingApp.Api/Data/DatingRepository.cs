using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.Api.Controllers.Models;
using DatingApp.Api.Controllers.Models.Data;
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
 
        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.users.Include(p => p.Photo).ToListAsync();
            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0; // return true if savechanges count is greater then 0 else return false;
        }
    }
}