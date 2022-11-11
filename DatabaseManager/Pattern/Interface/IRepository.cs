using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseManager.Pattern.Interface
{
    internal interface IRepository<TEntity> where TEntity : class
    {
        IEnumerable<TEntity> GetItems();
        TEntity GetItem(int id, int oprionalId = 0);
        void AddElement(TEntity item);
        void UpdateElement(TEntity item);
        void DeleteElement(int id, int oprionalId = 0);
    }
}
