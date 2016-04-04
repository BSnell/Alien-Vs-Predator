using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Project2.Models;
using Project2.Repositories;

namespace Project2.Repositories
{
    class ToDoRepository : IToDoRepository
    {
        private ToDoContext _context;

        public ToDoRepository(ToDoContext context)
        {
            _context = context;
        }

        public void Create(ToDo todo)
        {
            _context.ToDos.Add(todo);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var todoToDelete = FindById(id);
            if (todoToDelete != null)
            {
                _context.ToDos.Remove(todoToDelete);
                _context.SaveChanges();
            }
        }

        public void Update(ToDo todo)
        {
            var todoToUpdate = FindById(todo.Id);
            todoToUpdate.Tags = todo.Tags;
            todoToUpdate.Description = todo.Description;
            todoToUpdate.dueDate = todo.dueDate;
            todoToUpdate.State = todo.State;
            _context.SaveChanges();
        }

        public IEnumerable<ToDo> List()
        {
            var ToDos = _context.ToDos.ToList();
            return ToDos;
        }

        public ToDo FindById(int id)
        {
            var ToDos = _context.ToDos.First(p => p.Id == id);
            return ToDos;
        }

        public IEnumerable<ToDo> FindBySearchString(string queryString)
        {
            return _context.ToDos.Where(p => p.Description.Contains(queryString));
        }
    }
}