using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Project2.Models;
using Project2.ViewModels;
using Microsoft.AspNet.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AVPExamples.Controllers
{
    [Route("api/[controller]")]
    public class ProjectController : Controller
    {
        private IList<ProjectViewModel> Projects;
        private ProjectContext _context;

        public ProjectController(ProjectContext context)
        {
            Projects = new List<ProjectViewModel>()
            {
                new ProjectViewModel()
                {
                    Description = "Another fun angular project to do over spring break",
                    Name = "Project 4 - Reddit Implementation"
                },
                new ProjectViewModel()
                {
                    Description = "A fun web api for persisting projects",
                    Name = "Project 5 - Project manager"
                }
            };
            _context = context;
        }
        // GET: api/project
        [HttpGet]
        public IEnumerable<Project> Get()
        {
            var projects = _context.Projects.ToList();
            return projects;
        }

        // GET api/project/0/1
        [HttpGet("{id}/{subId}")]
        public JsonResult Get(int id, int subId)
        {
            JsonResult result = Json(Projects[id]);
            result.StatusCode = (int)HttpStatusCode.Accepted;
            return result;
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]ProjectViewModel newProject)
        {
            Response.StatusCode = (int)HttpStatusCode.Created;
            Projects.Add(newProject);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}