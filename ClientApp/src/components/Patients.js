import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
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
    }

    componentDidMount() {
        this.populatePatients();
    }

    static showPatients(patients) {
        return (
            <table lassName='table' style={{ fontSize: 12 }}>
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Year of birth</th>
                        <th>Hospitalization date</th>
                        <th>Registration date</th>
                        <th>PCR</th>
                        <th>Last test date</th>
                        <th>Covid19 Vaccinated</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map(patient =>
                        
                        <tr key={patient.patienRecordId}>
                            <td>{patient.firstName}</td>
                            <td>{patient.lastName}</td>
                            <td>{patient.yearOfBirth}</td>
                            <td>{patient.dateOfHospitalization}</td>
                            <td>{patient.registrationDate}</td>
                            <td>{patient.pcr}</td>
                            <td>{patient.lastTestDate}</td>
                            <td>{patient.covid19Vaccinated}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    addAPatient() {
        //alert ('This is not ready yet, please wait a little while...')
        document.querySelector(".DivPostFrame").style.setProperty("display", "block");
    }

    cancelRequest() {
        document.querySelector(".DivPostFrame").style.setProperty("display", "none");
    }
    

    render() {
        
        let contents = this.state.loading
            ? <div><p> <em>Loading...</em></p><p id="messenger">Please wait...</p></div>
            : Patients.showPatients(this.state.Patients);
        return (
            <div>
                <h1 id="tabelLabel" >Patients</h1>
                {contents}
                <span id="mySpan"></span>
                <br/>   
                <input type="button" value="Add patient" onClick={this.addAPatient} />
                <div className="DivPostFrame" style={myDivStyle}>
                    <br /><br />
                    <table>
                    <tr>
                            <td>First name:</td>
                            <td><input type='text'/></td>
                    </tr>
                    <tr>
                        <td>Last name:</td>
                        <td><input type='text' /></td>
                    </tr>
                    <tr>
                        <td>Year of birth:</td>
                        <td><input type='number' /></td>
                    </tr>
                    <tr>
                        <td>Hospitalized on date:</td>
                        <td><input type='date' /></td>
                    </tr>
                    <tr>
                        <td>Registered date:</td>
                        <td><input type='date' /></td>
                    </tr>
                    <tr>
                        <td>PCR:</td>
                        <td><input type='checkbox' /></td>
                    </tr>
                    <tr>
                        <td>Last test date:</td>
                        <td><input type='date' /></td>
                    </tr>
                    <tr>
                        <td>Covid 19 vaccinated:</td>
                        <td><input type='checkbox' /></td>
                    </tr>
                    </table>
                    <br/>
                    <input type="button" value="Send" />
                    &nbsp;
                    <input type="button" value="Cancel" onClick={this.cancelRequest} />
                        
                </div>
            </div>
        );
    }   

    doAction() {
        Patients.showPatients(this.state.Patients);
    }

    async populatePatients() {
        const resp = await fetch('API/Suppliers/GetPatientsWithRecords');
        data = await resp.json();
        this.setState({ Patients: data, loading: false }, () => this.doAction());
    }
}