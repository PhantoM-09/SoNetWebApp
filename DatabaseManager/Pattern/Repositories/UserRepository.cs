using DatabaseManager.Pattern.Interface;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DatabaseManager.Pattern.Repositories
{
    public class UserRepository : IRepository<User>
    {
        private AppDbContext _context;

        public UserRepository()
        {
            _context = new AppDbContext(ConfigurationManager.GetDbOptions());
        }

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public void AddElement(User item)
        {
            _context.Users.Add(item);
        }

        public void DeleteElement(int id, int oprionalId = 0)
        {
            User userToDelete = _context.Users.Find(id);
            if (userToDelete != null)
                _context.Remove(userToDelete);
        }

        public User GetItem(int id, int oprionalId = 0)
        {
            return _context.Users.Find(id);
        }

        public IEnumerable<User> GetItems()
        {
            return _context.Users.AsNoTracking().ToList();
        }

        public void UpdateElement(User item)
        {
            _context.Entry(item).State = EntityState.Modified;
        }
    }
}
