import React, { Component } from 'react';
import {  NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../css/Main.css';

export class FetchSuppliers extends Component {
    static displayName = FetchSuppliers.name;

    constructor(props) {
        super(props);
        this.state = { suppliers: [], loading: true };
    }
    
    componentDidMount() {
        this.populateSuppliers();
    }

    static renderSuppliersTable(suppliers) {
        return (

            <div>
                <span id="secondMess"></span>
                <NavLink tag={Link} to={'/CreateSupplier/'}>Create a new supplier.</NavLink>
                <table className='table' style={{fontSize:12}} >
                    
                <thead>
                    <tr>
                        <th className="invisibleColumn"></th>
                        <th>CompanyName</th>
                        <th>ContactName</th>
                        <th>ContactTitle</th>
                        <th>Address</th>
                        <th>City</th>

                        <th>Country</th>
                        
                        <th>links</th>

                    </tr>
                </thead>
                <tbody>
                    {suppliers.map(suppliers =>
                        <tr key={suppliers.supplierID}>
                            <td className="invisibleColumn">{suppliers.supplierID}</td>
                            <td>{suppliers.companyName}</td>
                            <td>{suppliers.contactName}</td>
                            <td>{suppliers.contactTitle}</td>
                            <td>{suppliers.address}</td>
                            <td>{suppliers.city}</td>

                            <td>{suppliers.country}</td>
                           
                            <td>
                                <NavLink className="editLink" tag={Link} to={'/UpdateSupplier/' + suppliers.supplierID}>Edit</NavLink>
                                <NavLink tag={Link} to={'/DeleteSupplier/' + suppliers.supplierID}>Delete</NavLink>
                            </td>

                        </tr>
                    )}
                </tbody>
            </table>
            </div>
        );
    }

    funky(id) {

    }


    render() {
        let contents = this.state.loading
            ? <div><p> <em>Loading...</em></p><p id="messenger">Hello...</p></div>
            
            : FetchSuppliers.renderSuppliersTable(this.state.suppliers);
         return (
            <div>
                <h1 id="tabelLabel" >Suppliers</h1>

                <p>DATA:</p>
                {contents}
            </div>
        );
    }

    doMessage() {
        document.querySelector("#secondMess").textContent = "populateSupplier done";
    }

    async populateSuppliers() {
        document.querySelector("#messenger").textContent = "populating Suppliers....";
        try {
            const resp = await axios.get('API/Suppliers');
            const data = resp.data;
            this.setState({ suppliers: data, loading: false }, () => this.doMessage());
            
        }
        catch (err) {
            document.querySelector("#messenger").textContent = err.message;
        }
        
    }
}