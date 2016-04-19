using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project2.Models
{
    public class ToDoAppSeedData
    {
        private ToDoContext _context;

        public ToDoAppSeedData(ToDoContext context)
        {
            _context = context;
        }
        public void SeedData()
        {
            if (!_context.ToDos.Any())
            {
                _context.Add(new ToDo()
                {
                    Tags = "Cats, Illegal Stuff",
                    Description = "Come Crazy Stuff",
                    dueDate = "2010-08-24T02:58:00.000Z"
                });
                _context.Add(new ToDo()
                {
                    Tags = "Kittens, Less Illegal Stuff",
                    Description = "Some Even Crazier Stuff",
                    dueDate = "2017-12-31T06:59:00.000Z"
                });
                _context.SaveChanges();
            }
            if (!_context.warning.Any())
            {
                _context.Add(new warningTime()
                {
                    hours = 2,
                    minutes = 0
                });
                _context.SaveChanges();
            }
        }
    }
}
