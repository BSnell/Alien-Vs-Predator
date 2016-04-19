using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.Entity;

namespace Project2.Models
{
    public class ToDoContext : DbContext
    {
        public ToDoContext()
        {
            Database.EnsureCreated();
        }

        public DbSet<ToDo> ToDos { get; set; }
        public DbSet<warningTime> warning { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = Startup.Configuration["Data:ProjectAppConnectionString"];
            optionsBuilder.UseSqlServer(connectionString);
            base.OnConfiguring(optionsBuilder);
        }
    }
}