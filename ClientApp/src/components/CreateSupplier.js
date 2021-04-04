import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Main.css';

export class CreateSupplier extends Component {
    static displayName = CreateSupplier.name;

    constructor(props) {
        super(props);
        this.state =
        {
            id: "",
            supplier: [],
            loading: true
        };
        this.validateSupplier = this.validateSupplier.bind(this);
        this.createSupplier = this.createSupplier.bind(this);
    }    

    validateSupplier() {
        if (document.querySelector(".companyName").value.trim() === "")
            return false;
        else
            return true;
    }


    async createSupplier(){
        if (this.validateSupplier() === true) {
            var myData = JSON.stringify({
                SupplierID: 0,
                CompanyName: document.querySelector(".companyName").value,
                ContactName: document.querySelector(".contactName").value,
                ContactTitle: document.querySelector(".contactTitle").value,
                Address: document.querySelector(".address").value,
                City: document.querySelector(".city").value,
                Region: document.querySelector(".region").value,
                PostalCode: document.querySelector(".postalCode").value,
                Country: document.querySelector(".country").value,
                Phone: document.querySelector(".phone").value,
                Fax: document.querySelector(".fax").value,
                HomePage: document.querySelector(".homePage").value
            });
            const headers = { 'Content-Type': 'application/json' };

          await  axios.post('API/Suppliers', myData, { headers })
                .then((data) => {
                    if (data.status === 201) {
                        //var t = "Saved , OK";
                        this.ShowMessage("Created successfully....")
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }

    }

    ShowMessage(message) {
        var win = document.querySelector(".notifierHidden");
        win.textContent = message;
        win.style.visibility = "visible";
        setTimeout(() => { document.querySelector('.notifierHidden').style.visibility = 'hidden' }, 3000);
    }  

    render() {
        return (
            <div className="divCreate">
                <p><b>Create supplier</b></p>    
                <div className="notifierHidden"></div>
                <hr />
                <NavLink tag={Link} to={'/FetchSuppliers/'}>Back</NavLink>
                <br />
                <br />
                <div class="divHighLight">
                    You can only add a supplier if the amount of suppliers is less than 50.
                    <br />
                    This is in order to that the Supplier table will not grow beyond bounds.
                    <br /><br />
                </div>
                <table className="specTable" border="0">
                    <tbody>
                        <tr>
                            <td>
                                    <label>Company name</label>
                                <input type="text" className="form-control col-md-8 companyName" defaultValue="" />
                            </td>
                            <td>
                                <label>Contact name</label>
                                <input type="text" className="form-control col-md-8 contactName" defaultValue="" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Contact title</label>
                                <input type="text" className="form-control col-md-6 contactTitle" defaultValue="" />
                            </td>
                            <td>
                                <label>Adress</label>
                                <input type="text" className="form-control col-md-6 address" defaultValue="" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>City</label>
                                <input type="text" className="form-control col-md-4 city" defaultValue="" />
                            </td>
                            <td>
                                <label>Region</label>
                                <input type="text" className="form-control col-md-2 region" defaultValue="" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Postal code</label>
                                <input type="text" className="form-control col-md-4 postalCode" defaultValue="" />
                            </td>
                            <td>
                                <label>Country</label>
                                <input type="text" className="form-control col-md-3 country" defaultValue="" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Phone</label>
                                <input type="text" className="form-control col-md-3 phone" defaultValue="" />
                            </td>
                            <td>
                                <label>Fax</label>
                                <input type="text" className="form-control col-md-3 fax" defaultValue="" />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <label>Home page</label>
                                <input type="text" className="form-control col-md-5 homePage" defaultValue="" />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">

                                <input type="button" className="btn btn-info" value="Create" onClick={this.createSupplier} />
                            </td>
                        </tr>
                    </tbody>
                </table>


            </div>
        );
    }
    
}