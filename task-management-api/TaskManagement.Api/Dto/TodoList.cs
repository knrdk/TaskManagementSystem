using System.Collections.Generic;

namespace TaskManagement.Api.Dto
{
    public class TodoList
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<TodoItem> Todos { get; set; }
    }
}