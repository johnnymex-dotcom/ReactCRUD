using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ReactCRUD.Models
{
    public class PatientRecord
    {
        [Key]
        public int PatienRecordId { get; set; }
        public  string CaseNo { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public Decimal YearOfBirth { get; set; }
        public  DateTime DateOfHospitalization { get; set; }
        public string Remarks { get; set; }
        public string MedicalInCharge { get; set; }
    }

    public class Covid19Record
    {
        [Key]
        public int CovidPatientId { get; set; }
        public DateTime RegistrationDate { get; set; }
        public bool PCR { get; set; }
        public DateTime LastTestDate { get; set; }
        public bool Covid19Vaccinated { get; set; }
        public int PatRecordId { get; set; }
    }

    public class PatientCovid
    {
        public int PatienRecordId { get; set; }
        public string CaseNo { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Decimal YearOfBirth { get; set; }
        public DateTime DateOfHospitalization { get; set; }
        public DateTime? RegistrationDate { get; set; }
        public string? PCR { get; set; }
        public DateTime? LastTestDate { get; set; }
        public string? Covid19Vaccinated { get; set; }
    }
}   
