using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Migrations;
using Project2.Models;

namespace Project2.Migrations
{
    [DbContext(typeof(ToDoContext))]
    [Migration("20160403234949_InitDatabase")]
    partial class InitDatabase
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0-rc1-16348")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Project2.Models.ToDo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<bool>("State");

                    b.Property<string>("Tags");

                    b.Property<string>("dueDate");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("Project2.Models.Warning", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<bool>("State");

                    b.Property<string>("Tags");

                    b.Property<string>("dueDate");

                    b.HasKey("Id");
                });
        }
    }
}
