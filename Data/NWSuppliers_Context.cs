﻿using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReactCRUD.Models;



namespace ReactCRUD.Data
{
    public class NWSuppliers_Context : DbContext
    {
        public NWSuppliers_Context(DbContextOptions options) : base(options)
        { 
        }
               

        public DbSet<ReactCRUD.Models.Suppliers> Suppliers{ get; set; }
        public DbSet<ReactCRUD.Models.PatientRecord> PatientRecord { get; set; }
        public DbSet<ReactCRUD.Models.Covid19Record> Covid19Record { get; set; }
    }
    
}   
