using DatabaseManager.Pattern.Interface;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DatabaseManager.Pattern.Repositories
{
    public class MessageRepository : IRepository<Message>
    {
        private AppDbContext _context;

        public MessageRepository(AppDbContext context)
        {
            _context = context;
        }

        public void AddElement(Message item)
        {
            _context.Messages.Add(item);
        }

        public void DeleteElement(int id, int oprionalId = 0)
        {
            Message messageToDelete = _context.Messages.Find(id);
            if(messageToDelete != null)
                _context.Messages.Remove(messageToDelete);
        }

        public Message GetItem(int id, int oprionalId = 0)
        {
            return _context.Messages.Find(id);
        }

        public IEnumerable<Message> GetItems()
        {
            return _context.Messages.AsNoTracking().ToList();
        }

        public void UpdateElement(Message item)
        {
            _context.Entry(item).State = EntityState.Modified;
        }
    }
}
