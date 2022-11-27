using DatabaseManager.Pattern.Interface;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DatabaseManager.Pattern.Repositories
{
    public class PostRepository : IRepository<Post>
    {

        private AppDbContext _context;

        public PostRepository(AppDbContext context)
        {
            _context = context;
        }

        public void AddElement(Post item)
        {
            _context.Posts.Add(item);
        }

        public void DeleteElement(int id, int oprionalId = 0)
        {
            Post postToDelete = _context.Posts.Find(id);
            if(postToDelete != null)
                _context.Posts.Remove(postToDelete);
        }

        public Post GetItem(int id, int oprionalId = 0)
        {
            return _context.Posts.Find(id);
        }

        public IEnumerable<Post> GetItems()
        {
            return _context.Posts.AsNoTracking().ToList();
        }

        public void UpdateElement(Post item)
        {
            _context.Entry(item).State = EntityState.Modified;
        }
    }
}
