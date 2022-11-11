

using DatabaseManager.Pattern.Interface;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DatabaseManager.Pattern.Repositories
{
    public class CommentRepository : IRepository<Comment>
    {
        private AppDbContext _context;

        public CommentRepository()
        {
            _context = new AppDbContext(ConfigurationManager.GetDbOptions());
        }

        public CommentRepository(AppDbContext context)
        {
            _context = context;
        }

        public void AddElement(Address item)
        {
            _context.Addresses.Add(item);
        }

        public void AddElement(Comment item)
        {
            _context.Comments.Add(item);
        }

        public void DeleteElement(int id, int oprionalId = 0)
        {
            Comment commentToDelete = _context.Comments.Find(id);
            if(commentToDelete != null)
                _context.Comments.Remove(commentToDelete);
        }

        public Comment GetItem(int id, int oprionalId = 0)
        {
            return _context.Comments.Find(id);
        }

        public IEnumerable<Comment> GetItems()
        {
            return _context.Comments.AsNoTracking().ToList();
        }

        public void UpdateElement(Comment item)
        {
            _context.Entry(item).State = EntityState.Modified;
        }
    }
}
