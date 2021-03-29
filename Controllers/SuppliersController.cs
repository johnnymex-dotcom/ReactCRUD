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

        //-----------------------------

        [HttpGet("GetAllPatients", Name = "GetAllPatients")]
        public async Task<ActionResult<IEnumerable<PatientRecord>>> GetAllPatients()
        {
            var data = await _context.PatientRecord.ToListAsync();
            return data;
        }

        [HttpGet("GetPatientsWithRecords", Name = "GetPatientsWithRecords")]
        public async Task<ActionResult<IEnumerable<PatientCovid>>> GetPatientsWithRecords()
        {
            var data = await  _context.PatientRecord
                        .GroupJoin(
                           _context.Covid19Record,
                           e => e.PatienRecordId,
                           d => d.PatRecordId,
                           (e, ej) =>
                              new
                              {
                                  e = e,
                                  ej = ej
                              }
                        )
                        .SelectMany(
                           temp0 => temp0.ej.DefaultIfEmpty(),
                           (temp0, d) =>
                              new
                              {
                                  temp0 = temp0,
                                  d = d
                              }
                        )
                            .OrderBy(temp1 => temp1.temp0.e.PatienRecordId)
                        .Select(
                           temp1 =>
                              new PatientCovid()
                              {
                                 PatienRecordId = temp1.temp0.e.PatienRecordId,
                                 CaseNo = temp1.temp0.e.CaseNo,
                                 FirstName = temp1.temp0.e.FirstName,
                                 LastName = temp1.temp0.e.LastName,
                                 YearOfBirth = temp1.temp0.e.YearOfBirth,
                                 DateOfHospitalization = temp1.temp0.e.DateOfHospitalization,
                                 RegistrationDate= temp1.d.RegistrationDate,
                                 PCR =temp1.d.PCR ? "Yes" : "",
                                 LastTestDate=temp1.d.LastTestDate,
                                 Covid19Vaccinated = temp1.d.Covid19Vaccinated ? "Yes" : ""
                              }
                        ).ToListAsync();
            return data;
        }

        [HttpPost("AddPatient", Name = "AddPatient")]
        public bool AddPatient([FromBody] PatientCovid patient)
        {
            PatientRecord pr = new PatientRecord()
            {
                FirstName = patient.FirstName,
                LastName = patient.LastName,
                YearOfBirth = patient.YearOfBirth,
                CaseNo = "zx23450",
                DateOfHospitalization = patient.DateOfHospitalization,

            };
            _context.PatientRecord.Add(pr);
            _context.SaveChanges();

            if ( 
                (patient.LastTestDate == null) || (patient.LastTestDate == System.Convert.ToDateTime("01-01-0001") 
                && 
                (patient.RegistrationDate == null) || (patient.RegistrationDate == System.Convert.ToDateTime("01-01-0001"))
                &&  patient.Covid19Vaccinated !="true" && patient.PCR != "true")
                )
            return true;

            var pid = _context.PatientRecord
                .OrderByDescending(x => x.PatienRecordId).First().PatienRecordId;

            Covid19Record cr19 = new Covid19Record()
            {
               PatRecordId = pid,
               LastTestDate = (DateTime)patient.LastTestDate,
               RegistrationDate = (DateTime)patient.RegistrationDate,
               PCR = patient.PCR == "true" ? true:false,
               Covid19Vaccinated = patient.Covid19Vaccinated == "true" ? true : false
            };
            _context.Covid19Record.Add(cr19);
            _context.SaveChanges();

            return true;

        }

        private bool SuppliersExists(int id)
        {
            return _context.Suppliers.Any(e => e.SupplierID == id);
        }
    }
}
