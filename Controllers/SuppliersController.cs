using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactCRUD.Data;
using ReactCRUD.Models;

namespace ReactCRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuppliersController : ControllerBase
    {
        private readonly NWSuppliers_Context _context;

        public SuppliersController(NWSuppliers_Context context)
        {
            _context = context;
        }

        // GET: api/Suppliers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Suppliers>>> GetSuppliers()
        {
            var data = await _context.Suppliers.ToListAsync();
            return data;
        }


        // GET: api/Suppliers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Suppliers>> GetSuppliers(int id)
        {
            var suppliers = await _context.Suppliers.FindAsync(id);

            if (suppliers == null)
            {
                return NotFound();
            }

            return suppliers;
        }

        // PUT: api/Suppliers/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSuppliers(int id, Suppliers suppliers)
        {
            if (id != suppliers.SupplierID)
            {
                return BadRequest();
            }

            _context.Entry(suppliers).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SuppliersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(); //NoContent();
        }

        // POST: api/Suppliers
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Suppliers>> PostSuppliers(Suppliers suppliers)
        {
            if (_context.Suppliers.Count() < 50)
            { 
                _context.Suppliers.Add(suppliers);
                await _context.SaveChangesAsync();
            }

            return CreatedAtAction("GetSuppliers", new { id = suppliers.SupplierID }, suppliers);
        }

        // DELETE: api/Suppliers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Suppliers>> DeleteSuppliers(int id)
        {
            var suppliers = await _context.Suppliers.FindAsync(id);
            if (suppliers == null)
            {
                return NotFound();
            }
            if (id > 0 && id <= 30)
                return suppliers;
            _context.Suppliers.Remove(suppliers);
            await _context.SaveChangesAsync();

            return suppliers;
        }

        private bool SuppliersExists(int id)
        {
            return _context.Suppliers.Any(e => e.SupplierID == id);
        }
    }
}
