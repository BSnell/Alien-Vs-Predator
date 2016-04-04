using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Project2.Models;

namespace Project2.Repositories
{
    public interface IToDoRepository
    {
        void Create(ToDo todo);

        void Delete(int id);

        void Update(ToDo todo);

        IEnumerable<ToDo> List();

        ToDo FindById(int id);
        IEnumerable<ToDo> FindBySearchString(string queryString);
    }
}