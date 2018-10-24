using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TaskManagement.Api.Dto;

namespace TaskManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoListController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<TodoList>> Get()
        {
            var lists = new List<TodoList>();
            lists.Add(GetTodoList("ToDo"));
            lists.Add(GetTodoList("In Progress"));
            lists.Add(GetTodoList("Done"));
            return lists;
        }

        private TodoList GetTodoList(string name)
        {
            return new TodoList
            {
                Id = Guid.NewGuid().ToString(),
                Name = name,
                Todos = new []{GetTodoItem("First item"), GetTodoItem("Second item"), GetTodoItem("Third item")}
            };
        }

        private TodoItem GetTodoItem(string name){
            return new TodoItem{
                Id = Guid.NewGuid().ToString(),
                Name = name
            };
        }
    }
}
