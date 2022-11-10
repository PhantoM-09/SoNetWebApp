﻿using Microsoft.EntityFrameworkCore;

namespace DatabaseManager
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) 
            : base(options)
        {
            Database.EnsureCreated();
        }


    }
}
