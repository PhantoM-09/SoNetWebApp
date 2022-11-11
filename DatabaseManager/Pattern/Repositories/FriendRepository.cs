using DatabaseManager.Pattern.Interface;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DatabaseManager.Pattern.Repositories
{
    public class FriendRepository : IRepository<Friend>
    {
        private AppDbContext _context;

        public FriendRepository()
        {
            _context = new AppDbContext(ConfigurationManager.GetDbOptions());
        }

        public FriendRepository(AppDbContext context)
        {
            _context = context;
        }

        public void AddElement(Friend item)
        {
            _context.Friends.Add(item);
        }

        public void DeleteElement(int id, int oprionalId = 0)
        {
            Friend friendToDelete = _context.Friends.Find(id, oprionalId);
            if(friendToDelete != null)
                _context.Friends.Remove(friendToDelete);
        }

        public Friend GetItem(int id, int oprionalId = 0)
        {
            return _context.Friends.Find(id, oprionalId);
        }

        public IEnumerable<Friend> GetItems()
        {
            return _context.Friends.AsNoTracking().ToList();
        }

        public void UpdateElement(Friend item)
        {
            _context.Entry(item).State = EntityState.Modified;
        }
    }
}
