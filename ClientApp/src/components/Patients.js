import React, { Component } from 'react';

import '../css/Main.css';




const myDivStyle = {
    display: "none"
}
let data = [];
export class Patients extends Component {
    static displayName = Patients.name;

    constructor(props) {
        super(props);
        this.state = {
            Patients: [],
            loading: true,
        };

        this.addAPatient = this.addAPatient.bind(this);
        this.checkAndSend = this.checkAndSend.bind(this);
        
    }

    componentDidMount() {
        this.populatePatients();
    }

    showPatients(patients) {
        return (
            <table className='table' style={{ fontSize: 12 }}>
                <thead>
                    <tr>
                        <th className="hiddenColoumn"></th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Year of birth</th>
                        <th>Hospitalization date</th>
                        <th>Registration date</th>
                        <th>PCR</th>
                        <th>Last test date</th>
                        <th>Covid19 Vaccinated</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map(patient =>
                        
                        <tr key={patient.patienRecordId}>
                            <td className="hiddenColoumn">{patient.patienRecordId}</td>
                            <td>{patient.firstName}</td>
                            <td>{patient.lastName}</td>
                            <td>{patient.yearOfBirth}</td>
                            {/*<td>{patient.dateOfHospitalization}</td>*/}
                            <td>{this.formatDate(patient.dateOfHospitalization)}</td>
                            <td>{this.formatDate(patient.registrationDate)}</td>
                            <td>{patient.pcr}</td>
                            <td>{this.formatDate(patient.lastTestDate)}</td>
                            <td>{patient.covid19Vaccinated}</td>
                            <td><input type="button" onClick={() => this.getPatientWithId(patient.patienRecordId)} value="Edit" /></td>
                            <td><input type="button" onClick={() => this.deletePatient(patient.patienRecordId, patient.firstName, patient.lastName)} value="Delete"/></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    async deletePatient(id,firstName,lastName) {

        if (window.confirm("Do you really want to delete patient with name: " + firstName + " " + lastName + " ?")) {
            const resp =
                await fetch("api/Suppliers/deletePatient/" + id,
                    {
                        method: "GET",
                        headers: { 'Content-Type': 'application/json' },
                    });
            let mydata = await resp.json();
            if (mydata == 0) {
                document.querySelector("#messBox").textContent = "Patient deleted  OK....";
                document.querySelector("#messBox").style.setProperty("display", "block");
                setTimeout(() => {
                    document.querySelector("#messBox").style.setProperty("display", "none");
                }, 3000);
                this.setState({ loading: true, Patients: [] }, () => this.populatePatients());
            }
        }
    }

    async getPatientWithId(id) {
        const resp =
            await fetch("api/Suppliers/GetPatient/"+id,
                {
                    method: "GET",
                    headers: { 'Content-Type': 'application/json' },
                });
        let mydata = await resp.json();
        this.editPatient(mydata);
    }

    formatDate(date) {
        if (date===null || date.trim() === "")
            return "";
        let year = date.substring(0, 4);
        let month = date.substring(5, 7);
        let day = date.substring(8, 10);
        if (year === "0001" && month === "01" && day === "01")
            return "";
        return day+"."+month+"."+year;
    }

    editPatient(data) {

        document.querySelector("#patientRecordId").value = data.patienRecordId;
        document.querySelector(".patientHeader").textContent = "Edit patient";
        document.querySelector("#firstName").value = data.firstName;
        document.querySelector("#lastName").value = data.lastName;
        document.querySelector("#yearOfBirth").value = data.yearOfBirth;
        document.querySelector("#dateOfHospitalization").value = data.dateOfHospitalization.substring(0, 10);
        document.querySelector("#pcr").checked = data.pcr==="Yes"? true:false;
        document.querySelector("#registrationDate").value =
            data.registrationDate===null? "":data.registrationDate.substring(0, 10);
        document.querySelector("#covid19Vaccinated").checked = data.covid19Vaccinated === "Yes" ? true : false;
        document.querySelector("#lastTestDate").value = 
            data.lastTestDate === null ? "" : data.lastTestDate.substring(0, 10);
        document.querySelector(".DivPostFrame").style.setProperty("display", "block");
        document.querySelector("#btnAddPatient").disabled = true;

    }

    addAPatient() {
        document.querySelector(".patientHeader").textContent = "Add a new patient";
        document.querySelector("#firstName").value = "";
        document.querySelector("#lastName").value = "";
        document.querySelector("#yearOfBirth").value = "";
        document.querySelector("#dateOfHospitalization").value = "";


        document.querySelector(".DivPostFrame").style.setProperty("display", "block");
        document.querySelector("#btnAddPatient").disabled = true;
        
    }

    cancelRequest() {
        document.querySelector(".DivPostFrame").style.setProperty("display", "none");
        document.querySelector("#btnAddPatient").disabled = false;
    }

    async sendRequest(patientRecordId) {
       
        if (document.querySelector("#registrationDate").value === "")
            document.querySelector("#registrationDate").value = "0001-01-01";
        if (document.querySelector("#lastTestDate").value === "")
            document.querySelector("#lastTestDate").value= "0001-01-01";

        let transData =
            JSON.stringify({
                FirstName: document.querySelector("#firstName").value,
                LastName: document.querySelector("#lastName").value,
                yearOfBirth: document.querySelector("#yearOfBirth").value,
                dateOfHospitalization: document.querySelector("#dateOfHospitalization").value,
                registrationDate: document.querySelector("#registrationDate").value,
                pcr: document.querySelector("#pcr").checked ? "true" : "false",
                lastTestDate: document.querySelector("#lastTestDate").value,
                covid19Vaccinated: document.querySelector("#covid19Vaccinated").checked ? "true" : "false"
            });

        let resp = "";
        let mydata = "";
        if (document.querySelector(".patientHeader").textContent === "Add a new patient") {
            resp = await fetch("api/Suppliers/AddPatient",
                {
                    method: "POST",
                    body: transData,
                    headers: { 'Content-Type': 'application/json' },
                });
            mydata = await resp.json();
        }
        else {
            resp = await fetch("api/Suppliers/EditPatient/" + patientRecordId,
                {
                    method: "PUT",
                    body: transData,
                    headers: { 'Content-Type': 'application/json' },
                });
            mydata = await resp.json();

        }

        //document.querySelector("#mySpan").textContent="Return data is " + mydata;
    

        document.querySelector(".DivPostFrame").style.setProperty("display", "none");
        
        document.querySelector("#btnAddPatient").disabled = false;

        if (document.querySelector(".patientHeader").textContent === "Add a new patient")
            this.showResult("Patient created- OK....");
        else
            this.showResult("Patient edited  OK....");
        this.setState({ loading: true, Patients:[] }, () => this.populatePatients());
    }

    showResult(message) {
        document.querySelector("#messBox").textContent = message;
        document.querySelector("#messBox").style.setProperty("display", "block");
        setTimeout(() => {
            document.querySelector("#messBox").style.setProperty("display", "none");
        }, 3000);
    }


    checkAndSend() {
        if (
            document.querySelector("#firstName").value.trim() === "" ||
            document.querySelector("#lastName").value.trim() === "" ||
            document.querySelector("#yearOfBirth").value.trim() === "" ||
            document.querySelector("#dateOfHospitalization").value.trim() === ""
        ) {
            alert("Not all the required fields have been filled out !");
            return;
        }
        var yct = parseInt(document.querySelector("#yearOfBirth").value.trim());
        if (yct < 1930 || yct > 2021) {
            alert("Year of birth should be between 1930 and 2021 !");
            return;
        }
        this.sendRequest(document.querySelector("#patientRecordId").value);
    }

    render() {
        const divStyle = {
            display:"none"
        };

        let contents = this.state.loading
            ? <div><p> <em>Loading...</em></p><p id="messenger">Please wait...</p></div>
            : this.showPatients(this.state.Patients);
        return (
            <div>
                <div id="messBox" style={divStyle} className="messageBox"></div>
                <h1 id="tabelLabel" >Patients</h1>
                {contents}
                <span id="mySpan"></span>
                <br />
                
                <span id="testSpan"></span>
                <input type="button" id="btnAddPatient" value="Add patient" onClick={this.addAPatient} />
                <div className="DivPostFrame" style={myDivStyle}>
                    <div className="patientHeader"></div>
                    <div className="dialogContent">
                        <span className="redStar"> <b>*</b> </span> <b>Must be filled out.</b>
                        <br /><br />
                        <table>
                            <tbody>
                                <tr>
                                    <td colSpan="2">
                                        <input type="hidden" id="patientRecordId"/>
                                    </td>
                                </tr>
                            <tr>
                                    <td>First name:</td>
                                    <td><input id="firstName" type='text'/><span className="redStar"> *</span></td>
                            </tr>
                            <tr>
                                <td>Last name:</td>
                                    <td><input id="lastName" type='text' /><span className="redStar"> *</span></td>
                            </tr>
                            <tr>
                                <td>Year of birth:</td>
                                    <td><input id="yearOfBirth" type='number' /><span className="redStar"> *</span></td>
                            </tr>
                            <tr>
                                <td>Hospitalized on date:</td>
                                    <td><input id="dateOfHospitalization" type='date' /><span className="redStar"> *</span></td>
                            </tr>
                            <tr>
                                <td>Registered date:</td>
                                    <td><input id="registrationDate" type='date' /></td>
                            </tr>
                            <tr>
                                <td>PCR:</td>
                                <td><input id="pcr" type='checkbox' /></td>
                            </tr>
                            <tr>
                                <td>Last test date:</td>
                                    <td><input id="lastTestDate" type='date' /></td>
                            </tr>
                            <tr>
                                <td>Covid 19 vaccinated:</td>
                                    <td><input id="covid19Vaccinated" type='checkbox' /></td>
                                    </tr>
                        </tbody>
                            </table>
                    </div>
                    <br/>
                    <input type="button" value="Send" onClick={this.checkAndSend} />
                    &nbsp;
                    <input type="button" value="Cancel" onClick={this.cancelRequest} />
                        
                </div>
            </div>
        );
    }   

    doAction() {
        this.showPatients(this.state.Patients);
    }

    async populatePatients() {
        const resp = await fetch('API/Suppliers/GetPatientsWithRecords');
        data = await resp.json();
        this.setState({ Patients: data, loading: false }, () => this.doAction());
    }
}