using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;

namespace Project2.Models
{
    public class ToDoAppSeedData
    {
        private ToDoContext _context;
        private UserManager<ToDoUser> _userManager;

        public ToDoAppSeedData(ToDoContext context, UserManager<ToDoUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        public async Task SeedData()
        {
            if (await _userManager.FindByNameAsync("bsnell1") == null)
            {
                var adminUser = new ToDoUser()
                {
                    UserName = "bsnell1",
                    Email = "bsnell1@uco.edu"
                };
                IdentityResult x = await _userManager.CreateAsync(adminUser, "bsnell1");
            }
            if (await _userManager.FindByNameAsync("mbockus") == null)
            {
                var adminUser = new ToDoUser()
                {
                    UserName = "mbockus",
                    Email = "mbockus@uco.edu"
                };
                IdentityResult x = await _userManager.CreateAsync(adminUser, "mbockus1");
            }
            if (!_context.ToDos.Any())
            {
                _context.Add(new ToDo()
                {
                    Tags = "Cats, Illegal Stuff",
                    Description = "Come Crazy Stuff",
                    dueDate = "2010-08-24T02:58:00.000Z",
                    UserName = "bsnell1"
                });
                _context.Add(new ToDo()
                {
                    Tags = "Kittens, Less Illegal Stuff",
                    Description = "Some Even Crazier Stuff",
                    dueDate = "2017-12-31T06:59:00.000Z",
                    UserName = "mbockus"
                });
                _context.SaveChanges();
            }
            if (!_context.warning.Any())
            {
                _context.Add(new warningTime()
                {
                    days = 2,
                    hours = 0
                });
                _context.SaveChanges();
            }
        }
    }
}
