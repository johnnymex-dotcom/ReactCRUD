import React, { Component } from 'react';
import axios from 'axios';
import '../css/Main.css';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';



export class UpdateSupplier extends Component {
    static displayName = UpdateSupplier.name;

    constructor(props) {
        super(props);
        this.state =
        {
            id: "",
            supplier: [],
            loading: true
        };
        this.updateSupplier = this.updateSupplier.bind(this);
        
    }
    
    componentDidMount() {
        document.querySelector("#punk").textContent = "";
        this.setState({ id: this.props.match.params.SupplierID },
        () => this.doTask());
    }   

    doTask() {
        document.querySelector("#junk").textContent = this.state.id;
        this.getUpdateSupplier(this.state.id);
    }

    async updateSupplier() {
        var privateId = this.state.supplier.supplierID;
        var myData = JSON.stringify({
            SupplierID: privateId,
            CompanyName: document.querySelector(".companyName").value,
            ContactName: document.querySelector(".contactName").value,
            ContactTitle: document.querySelector(".contactTitle").value,
            Address: document.querySelector(".address").value,
            City: document.querySelector(".city").value,
            Region: document.querySelector(".region").value,
            PostalCode: document.querySelector(".postalCode").value,
            Country: document.querySelector(".country").value,
            //Phone: document.querySelector(".phone").value,
            Fax: document.querySelector(".fax").value,
            HomePage: document.querySelector(".homePage").value
        });
        const headers = { 'Content-Type': 'application/json'    };

        await axios.put('API/Suppliers/' + this.state.supplier.supplierID, myData, { headers })
            .then((data) => {
                if (data.status === 200) {
                    var t = "Saved , OK";
                    document.querySelector("#punk").textContent = t;
                    this.ShowMessage("Updated OK !!");
                }
            })
            .catch((err)=>{
                console.log(err);
            })

       
        
    };
    
    ShowMessage(message) {
        var win = document.querySelector(".notifierHidden");
        win.textContent = message;
        win.style.visibility = "visible";
        setTimeout(() => { document.querySelector('.notifierHidden').style.visibility = 'hidden' }, 3000);
        
    }   
    
    render() {
        return (
            <div className="divUpdate">
                <p><b>Edit supplier</b></p>
                <input type="hidden" id="junk" value=""/>
                <div className="notifierHidden"></div>
                <div id="punk"></div>
          
                <hr />
                <NavLink tag={Link} to={'/FetchSuppliers/'}>Back</NavLink>
                <br /><br />
                <table className="specTable" border="0">
                    <tbody>
                        <tr>
                            <td>
                                <label>Company name</label>
                                <input type="text" className="form-control col-md-8 companyName" defaultValue={this.state.supplier.companyName} />
                            </td>
                           <td>
                                <label>Contact name</label>
                                <input type="text" className="form-control col-md-8 contactName" defaultValue={this.state.supplier.contactName} />
                            </td>
                        </tr>
                        <tr>
                        <td>
                            <label>Contact title</label>
                            <input type="text" className="form-control col-md-6 contactTitle" defaultValue={this.state.supplier.contactTitle} />
                        </td>
                        <td>
                            <label>Adress</label>
                            <input type="text" className="form-control col-md-6 address" defaultValue={this.state.supplier.address} />
                        </td>
                    </tr>
                        <tr>
                        <td>
                            <label>City</label>
                            <input type="text" className="form-control col-md-4 city" defaultValue={this.state.supplier.city} />
                         </td>
                        <td>
                                <label>Region</label>
                                <input type="text" className="form-control col-md-2 region" defaultValue={this.state.supplier.region} />
                        </td>
                    </tr>
                        <tr>
                        <td>
                            <label>Postal code</label>
                            <input type="text" className="form-control col-md-4 postalCode" defaultValue={this.state.supplier.postalCode} />
                        </td>
                        <td>
                           <label>Country</label>
                           <input type="text" className="form-control col-md-3 country" defaultValue={this.state.supplier.country} />
                        </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Phone</label>
                                <input type="text" className="form-control col-md-3 phone" defaultValue={this.state.supplier.phone} />
                            </td>
                            <td>
                                <label>Fax</label>
                                <input type="text" className="form-control col-md-3 fax" defaultValue={this.state.supplier.fax} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <label>Home page</label>
                                <input type="text" className="form-control col-md-5 homePage" defaultValue={this.state.supplier.homePage} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                            
                                <input type="button" className="btn btn-info" value="Update" onClick={this.updateSupplier}/>
                            </td>
                            </tr>
                        </tbody>
                </table>
            </div>
        );
    }
    
     async getUpdateSupplier(id) {
        const resp = await axios.get('api/Suppliers/' + id);
        const data = resp.data;
        this.setState({ supplier: data, loading: false });
        return resp.ok;
    }
}