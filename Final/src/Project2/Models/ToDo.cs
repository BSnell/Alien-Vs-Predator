using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Authorization.Infrastructure;

namespace Project2.Models
{
    public class ToDo
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string dueDate { get; set; }
        public string UserName { get; set; }
        public bool State { get; set; }
        public string Tags { get; set; }
    }
}
