using DatabaseManager.Pattern.Interface;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseManager.Pattern.Repositories
{
    public class LikeRepository : IRepository<Like>
    {
        private AppDbContext _context;

        public LikeRepository(AppDbContext context)
        {
            _context = context;
        }

        public void AddElement(Like item)
        {
            _context.Likes.Add(item);
        }

        public void DeleteElement(int id, int oprionalId = 0)
        {
            Like likeToDelete = _context.Likes.Find(id);
            if (likeToDelete != null)
            {
                _context.Likes.Remove(likeToDelete);
            }
        }

        public Like GetItem(int id, int oprionalId = 0)
        {
            return _context.Likes.Find(id);
        }

        public IEnumerable<Like> GetItems()
        {
            return _context.Likes.AsNoTracking().ToList();
        }

        public void UpdateElement(Like item)
        {
            _context.Entry(item).State = EntityState.Modified;
        }
    }
}
