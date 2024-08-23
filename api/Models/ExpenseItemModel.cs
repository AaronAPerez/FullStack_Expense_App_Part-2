using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models;

public class ExpenseItemModel
{
    public required int Id { get; set; }
    public int UserId { get; set; }
    public string Description { get; set; }

    public required int Amount { get; set; }

    public required string Category { get; set; }
    
    public ExpenseItemModel()
  {
    
  }


}

