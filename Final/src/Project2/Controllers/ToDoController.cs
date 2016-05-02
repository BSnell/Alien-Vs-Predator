using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Project2.Models;
using Project2.Repositories;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Authorization;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Project2.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class ToDoController : Controller
    {
        private IToDoRepository _repository;

        public ToDoController(IToDoRepository repository)
        {
            _repository = repository;
        }

        // GET: api/project
        [HttpGet("{userName}")]
        public IEnumerable<ToDo> Get(string userName)
        {
            var ToDos = _repository.List(userName);
            return ToDos;
        }
        [HttpGet("warning")]
        public IEnumerable<warningTime> GetWarning()
        {
            var warning = _repository.ListWarning();
            return warning;
        }

        // GET api/project/search/{queryString}
        [HttpGet("search/{queryString}")]
        public IEnumerable<ToDo> Search(string queryString)
        {
            return _repository.FindBySearchString(queryString);
        }

        // POST api/project
        [HttpPost]
        public void Post([FromBody]ToDo newProject)
        {
            Response.StatusCode = (int)HttpStatusCode.Created;
            _repository.Create(newProject);
        }

        // PUT api/project
        [HttpPut()]
        public void Put([FromBody]ToDo todo)
        {

            _repository.Update(todo);
        }

        [HttpPut("{days}/{hours}")]
        public void PutWarning(int days, int hours)
        {

            _repository.UpdateWarning(days, hours);
        }

        // DELETE api/project/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _repository.Delete(id);
        }
    }
}