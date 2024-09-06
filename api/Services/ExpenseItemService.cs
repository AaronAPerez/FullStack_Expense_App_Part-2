using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Services.Context;
using Microsoft.AspNetCore.Mvc;


namespace api.Services;

public class ExpenseItemService : ControllerBase
{

    private readonly DataContext _context;

    public ExpenseItemService(DataContext context)
    {
        _context = context;
    }
    public bool AddExpenseItems(ExpenseItemModel newExpenseItem)
    {
        bool result = false;
        _context.Add(newExpenseItem);
        result = _context.SaveChanges() != 0;
        return result;
    }
    
    public bool DeleteExpenseItem(ExpenseItemModel expenseDelete)
    {
        throw new NotImplementedException();
    }

    public IEnumerable<ExpenseItemModel> GetAllExpenseItems()
    {
        return _context.ExpenseInfo;
    }

    public IEnumerable<ExpenseItemModel> GetItemByCategory(string category)
    {
        return _context.ExpenseInfo.Where(item => item.Category == category);
    }

    public IEnumerable<ExpenseItemModel> GetItemsByDate(string date)
    {
        throw new NotImplementedException();
    }
    
    public List<ExpenseItemModel> GetExpensesByTag(string Tag)
    {
        List<ExpenseItemModel> AllExpensesWithTag = new List<ExpenseItemModel>();
        var allItems = GetAllExpenseItems().ToList();
        for(int i = 0; i < allItems.Count; i++)
        {
        ExpenseItemModel Item = allItems[i];
        var itemArr = Item.Tag.Split(',');
        for(int j = 0; j < itemArr.Length; j++)
        {
            if(itemArr[j].Contains(Tag))
            {
                AllExpensesWithTag.Add(Item);
                break;
            }
        }
    }
    return AllExpensesWithTag;
    }

    public bool UpdateExpenseItems(ExpenseItemModel expenseUpdate)
    {
        _context.Update<ExpenseItemModel>(expenseUpdate);
            return _context.SaveChanges() !=0;
    }

    public IEnumerable<ExpenseItemModel> GetItemsByUserId(int userId)
    { 
         return _context.ExpenseInfo.Where(item => item.UserId == userId && item.IsDeleted == false);

    }
       public IEnumerable<ExpenseItemModel> GetPublishedItems() {
        return _context.ExpenseInfo.Where(item => item.IsPublished && item.IsDeleted == false);
    }

    internal List<ExpenseItemModel> GetItemsByTag(string tag)
    {
        throw new NotImplementedException();
    }
}
