using DatabaseManager.Pattern.Interface;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DatabaseManager.Pattern.Repositories
{
    public class UFileRepository : IRepository<UFile>
    {
        private AppDbContext _context;

        public UFileRepository()
        {
            _context = new AppDbContext(ConfigurationManager.GetDbOptions());
        }

        public UFileRepository(AppDbContext context)
        {
            _context = context;
        }

        public void AddElement(UFile item)
        {
            _context.UFiles.Add(item);
        }

        public void DeleteElement(int id, int oprionalId = 0)
        {
            UFile fileToDelete = _context.UFiles.Find(id);
            if (fileToDelete != null)
                _context.UFiles.Remove(fileToDelete);
        }

        public UFile GetItem(int id, int oprionalId = 0)
        {
            return _context.UFiles.Find(id);
        }

        public IEnumerable<UFile> GetItems()
        {
            return _context.UFiles.AsNoTracking().ToList();
        }

        public void UpdateElement(UFile item)
        {
            _context.Entry(item).State = EntityState.Modified;
        }
    }
}
