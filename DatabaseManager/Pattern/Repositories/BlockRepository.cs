using DatabaseManager.Pattern.Interface;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DatabaseManager.Pattern.Repositories
{
    public class BlockRepository : IRepository<Block>
    {
        private AppDbContext _context;

        public BlockRepository()
        {
            _context = new AppDbContext(ConfigurationManager.GetDbOptions());
        }

        public BlockRepository(AppDbContext context)
        {
            _context = context;
        }

        public void AddElement(Block item)
        {
            _context.Blocks.Add(item);
        }

        public void DeleteElement(int id, int oprionalId = 0)
        {
            Block blockToDelete = _context.Blocks.Find(id);
            if(blockToDelete != null)
            {
                _context.Blocks.Remove(blockToDelete);
            }
        }

        public Block GetItem(int id, int oprionalId = 0)
        {
            return _context.Blocks.Find(id);
        }

        public IEnumerable<Block> GetItems()
        {
            return _context.Blocks.AsNoTracking().ToList();
        }

        public void UpdateElement(Block item)
        {
            _context.Entry(item).State = EntityState.Modified;
        }
    }
}
