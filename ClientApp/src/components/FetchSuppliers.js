import React, { Component } from 'react';
import {  NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../css/Main.css';

let mydata = [];
let data = [];
let firstPage = 0;
let rowsPerPage = 5;
let totalCount = 0;
let pageSequence = "1 of 22";

export class FetchSuppliers extends Component {
    static displayName = FetchSuppliers.name;

    constructor(props) {
        super(props);
        this.state = {
            suppliers: [],
            loading: true
        };
        this.pagerClick = this.pagerClick.bind(this);
        
    }
    
    componentDidMount() {
        firstPage = 0;
        this.populateSuppliers();
        this.setPageCount();
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
                            <td className="invisibleColumn fictious">{suppliers.supplierID}</td>
                            <td className="fictious">{suppliers.companyName}</td>
                            <td className="fictious">{suppliers.contactName}</td>
                            <td className="fictious">{suppliers.contactTitle}</td>
                            <td className="fictious">{suppliers.address}</td>
                            <td className="fictious">{suppliers.city}</td>

                            <td className="fictious">{suppliers.country}</td>
                           
                            <td className="fictious">
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

    pagerClick(val) {
        //var oldFirstPage = firstPage;
        var limitReached = false;
        //document.querySelector("#mySpan").textContent = " you clicked button no: " + val;
        var wrk;
        switch (val){
            case 1:
                if (firstPage === 0)
                    return;
                firstPage = 0;
                break;
            case 2:
                if (firstPage !== 0) {
                    if (firstPage >= rowsPerPage) {
                        wrk = firstPage - rowsPerPage;
                        firstPage = wrk;
                    }
                }
                else
                    limitReached = true;
                break;
            case 3:
                
                if (firstPage <= totalCount - rowsPerPage) {
                    wrk = firstPage + rowsPerPage;
                    firstPage = wrk;
                }
                else
                    limitReached = true;
                break;
            case 4:
                if (firstPage <= totalCount - rowsPerPage) {
                    wrk = Math.floor(totalCount / rowsPerPage) * rowsPerPage;
                    firstPage = wrk;
                }
                else
                    limitReached = true;
                break;
            default:
        }

        if (limitReached) {
            limitReached = false;
            return;
        }
            

        var x = document.querySelectorAll(".fictious");
        for (var i = 0; i < x.length; i++)
            x[i].textContent = "";

                   

        for (var n = firstPage; n < firstPage + rowsPerPage; n++) {
            if (totalCount === n)
                break;
            //var a = data[n];
            mydata[n - firstPage] = data[n];
        }
        this.setPageCount();
        this.setState({ suppliers: mydata, loading: false }, () => this.doMessage());
       
        
    }

    setPageCount() {
        var num1 = Math.floor(firstPage / rowsPerPage) + 1;
        var num2 = Math.floor(totalCount / rowsPerPage) + 1;
        pageSequence = "Page "+ num1+ " of " + num2;

    }
   

    render() {

         let contents = this.state.loading
            ? <div><p> <em>Loading...</em></p><p id="messenger">Hello...</p></div>
            
            : FetchSuppliers.renderSuppliersTable(this.state.suppliers);
         return (
             <div>
                 
                 <h1 id="tabelLabel" >Suppliers</h1>
                 <span>{firstPage}</span>
                <p>DATA:</p>
                 {contents}
                 
                 <div className="gridPagerLayout">
                     <table style={{ width: "100%" }}>
                         <tr>
                             <td className="gridPagerToolButton" onClick={() => this.pagerClick(1)}>&lt;&lt;</td>
                             <td className="gridPagerToolButton" onClick={() => this.pagerClick(2)}>&lt;</td>
                             <td className="gridPagerToolButton1" >{pageSequence}</td>
                             <td className="gridPagerToolButton" onClick={() => this.pagerClick(3)}>&gt;</td>
                             <td className="gridPagerToolButton" onClick={() => this.pagerClick(4)}>&gt;&gt;</td>
                         </tr>
                     </table>
                 </div>
                 <span id="mySpan"></span>
             </div>
             
        );
    }

    doMessage() {
        FetchSuppliers.renderSuppliersTable(this.state.suppliers);
    }

    async populateSuppliers() {
        var step = 0;
        mydata = new Array(rowsPerPage);
        document.querySelector("#messenger").textContent = "populateSupplier";
        try {
            const resp = await axios.get('API/Suppliers');
            data = resp.data;
            totalCount = data.length;
            step = 1;
            var first = firstPage;
            this.setPageCount();
            step = 2;
            for (var n = first; n < rowsPerPage; n++) {
                //var a = data[n];
                mydata[n-first] = data[n];
            }
            step = 3;
            this.setState({ suppliers: mydata, loading: false }, () => this.doMessage());
           
        }
        catch (err) {
            document.querySelector("#messenger").textContent = err.message + " " + step.toString();
        }
        
    }
}