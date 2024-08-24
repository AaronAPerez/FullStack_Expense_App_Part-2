using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

    [ApiController]
    [Route("api/[controller]")]
    public class ExpenseController : ControllerBase
    {
        private readonly ExpenseItemService _data;
        public ExpenseController(ExpenseItemService dataFromService)
        {
            _data = dataFromService;
        }

        [HttpPost("AddExpenseItems")]

        public bool AddExpenseItems(ExpenseItemModel newExpenseItem)

        {
            return _data.AddExpenseItems(newExpenseItem);
        }


        [HttpGet("GetExpenseItems")]

        public IEnumerable<ExpenseItemModel> GetAllExpenseItems()
        {
            return _data.GetAllExpenseItems();
        }


        [HttpGet("GetExpenseItemByCategory/{Category}")]

        public IEnumerable<ExpenseItemModel> GetItemByCategory(string Category)
        {
            return _data.GetItemByCategory(Category);
        }

        [HttpPost("UpdateExpenseItems")]

        public bool UpdateExpenseItems(ExpenseItemModel ExpenseUpdate)
        {
            return _data.UpdateBlogItems(ExpenseUpdate);
        }

        [HttpPost("DeleteExpenseItem/{ExpenseDelete}")]

        public bool DeleteExpenseItem(ExpenseItemModel ExpenseDelete)
        {
            return _data.DeleteExpenseItem(ExpenseDelete);
        }
    }





    // [HttpGet]
    // public async Task<IEnumerable<ExpenseItemModel>> GetExpense()
    // {
    //     var expenses = await _context.Expenses.AsNoTracking().ToListAsync();
    //     return expenses;
    // }

        
    //     [HttpPost]
    //     public async Task<IActionResult> Create (Expense expense)
    //     {  if(!ModelState.IsValid)
    //         {
    //             return BadRequest(ModelState);
    //         }
    //         await _context.AddAsync(expense);
 

    //     var result = await _context.SaveChangesAsync();

    //     if (result > 0)
    //     {
    //         return Ok("Expense Created Successfully");
    //     }

    //     return NotFound("Expense Not Created");

    // }


    // [HttpDelete("{id:int}")]
    // public async Task<IActionResult> Delete(int id)
    // {
    //     var expense = await _context.Expenses.FindAsync(id);
    //     if (expense == null)
    //     {
    //         return NotFound("Expense Not Found");
    //     }
    //     _context.Remove(expense);

    //     var result = await _context.SaveChangesAsync();

    //     if (result > 0)
    //     {
    //         return Ok("Expense deleted successfully");
    //     }
    //     return BadRequest("Unable to delete Expense");
    // }



    // [HttpPut("{id:int}")]
    // public async Task<IActionResult> EditExpense(int id, Expense expense)
    // {
    //     var expenseFromDb = await _context.Expenses.FindAsync(id);

    //     if (expenseFromDb == null)
    //     {
    //         return BadRequest("Student Not Found");
    //     }
    //     expenseFromDb.Description = expense.Description;
    //     expenseFromDb.Amount = expense.Amount;
    //     expenseFromDb.Category = expense.Category;


    //     var result = await _context.SaveChangesAsync();

    //     if (result > 0)
    //     {
    //         return Ok(" Expense updated "+ expense.Description);
    //     }
    //     return BadRequest("Unable to update expense" + expense.Description);
    //     }
    // }
