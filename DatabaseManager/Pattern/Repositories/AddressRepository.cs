using DatabaseManager.Pattern.Interface;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DatabaseManager.Pattern.Repositories
{
    public class AddressRepository : IRepository<Address>
    {
        private AppDbContext _context;

        public AddressRepository(AppDbContext context)
        {
            _context = context;
        }

        public void AddElement(Address item)
        {
            _context.Addresses.Add(item);
        }

        public void DeleteElement(int id, int oprionalId = 0)
        {
            Address addressToDelete = _context.Addresses.Find(id);
            if (addressToDelete != null)
            {
                _context.Addresses.Remove(addressToDelete);
            }
        }

        public Address GetItem(int id, int oprionalId = 0)
        {
            return _context.Addresses.Find(id);
        }

        public IEnumerable<Address> GetItems()
        {
            return _context.Addresses.AsNoTracking().ToList();
        }

        public void UpdateElement(Address item)
        {
            _context.Entry(item).State = EntityState.Modified;
        }
    }
}
