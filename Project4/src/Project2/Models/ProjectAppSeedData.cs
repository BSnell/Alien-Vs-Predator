using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project2.Models
{
    public class ProjectAppSeedData
    {
        private ProjectContext _context;

        public ProjectAppSeedData(ProjectContext context)
        {
            _context = context;
        }
        public void SeedData()
        {
            if (!_context.Projects.Any())
            {
                _context.Add(new Project()
                {
                    Name = "Project 1",
                    Description = "My favorite projects"
                });
                _context.Add(new Project()
                {
                    Name = "Project 3",
                    Description = "Angular project of death"
                });
                _context.SaveChanges();
            }
        }
    }
}
