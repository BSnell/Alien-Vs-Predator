using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Project2.Models;
using Project2.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AVPExamples.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private SignInManager<ToDoUser> _signInManager;

        public LoginController(SignInManager<ToDoUser> signinManager)
        {
            _signInManager = signinManager;
        }
        // GET: api/values
        [HttpPost]
        public async Task<HttpStatusCodeResult> Login([FromBody] LoginViewModel loginViewModel)
        {
            var signinResult = await _signInManager.PasswordSignInAsync(loginViewModel.UserName, loginViewModel.Password, true,
                false);
            if (!signinResult.Succeeded)
            {
                return new HttpUnauthorizedResult();
            }
            return new HttpOkResult();
        }


    }
}