using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Services.Context;

namespace api.Services
{
    public class ExpenseItemService
    {
        private readonly DataContext _context;

        public ExpenseItemService(DataContext context)
        {
            _context = context;
        }
        internal bool AddExpenseItems(ExpenseItemModel newExpenseItem)
        {
            bool result = false;
            _context.Add(newExpenseItem);
            result = _context.SaveChanges() != 0;
            return result;
        }

        internal bool DeleteExpenseItem(ExpenseItemModel expenseDelete)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ExpenseItemModel> GetAllExpenseItems()
        {
            return _context.ExpenseInfo;
        }

        internal IEnumerable<ExpenseItemModel> GetItemByCategory(string category)
        {
            return _context.ExpenseInfo.Where(item => item.Category == category);
        }

        public bool UpdateBlogItems(ExpenseItemModel expenseUpdate)
        {
            throw new NotImplementedException();
        }
    }
}