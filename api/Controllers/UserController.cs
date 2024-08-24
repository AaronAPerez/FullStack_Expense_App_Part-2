using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Models.DTO;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
    
    private readonly UserService _data;
    public UserController(UserService dataFromService) => _data = dataFromService;

    // // Add a User
    [HttpPost("AddUsers")]
        public bool AddUser(CreateAccountDTO UserToAdd)
        {
            return _data.AddUser(UserToAdd);
        }

    // // GetAllUser Endpoint
    [HttpGet("GetAllUsers")]

    public IEnumerable<UserModel> GetAllUsers()
    {
        {
            return _data.GetAllUsers();
        }
    }

    // // GetUserByUserName
    [HttpGet("GetUserByUsername/{username}")]

        public UserIdDTO GetUserIdDTOByUsername(string username)
        {
            return _data.GetUserIdDTOByUserName(username);
        }


        // // Login
        [HttpPost("Login")]

        public IActionResult Login([FromBody] LoginDTO User)
        {
            return _data.Login(User);
        }

        [HttpPost("DeleteUser/{userToDelete}")]
        public bool DeleteUser(string userToDelete)
        {
            return _data.DeleteUser(userToDelete);
        }

        [HttpPost("UpdateUser")]
        public bool UpdateUser(int id, string username)
        {
            return _data.UpdateUser(id,username);
        }

    }
 