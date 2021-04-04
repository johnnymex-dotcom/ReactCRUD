import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Main.css';

export class DeleteSupplier extends Component {
    static displayName = DeleteSupplier.name;

    constructor(props) {
        super(props);
        this.state =
        {
            id: "",
            loading: true
        };
        this.deleteSupplier = this.deleteSupplier.bind(this);
    }   

    componentDidMount() {
        this.setState({ id: this.props.match.params.SupplierID },
            () => this.doTask());
    }

    doTask() {
        /*var dummy = this.state.id;*/
    }

   async deleteSupplier() {
        const headers = {};

        if (this.state.id > 30) {
            await axios.delete('API/Suppliers/' + this.state.id, {}, { headers })
                .then((data) => {
                    if (data.status === 200) {
                        var t = "Saved , OK";
                        document.querySelector("#punk").textContent = t;

                    }
                })
                .catch((err) => {
                    console.log(err);
                })
            this.ShowMessage("Deleted , OK !!");
        }
        else
            this.ShowMessage("Deleted [FAKE] , OK !!");
    }

    ShowMessage(message) {
        var win = document.querySelector(".notifierHidden");
        win.textContent = message;
        win.style.visibility = "visible";
        setTimeout(() => { document.querySelector('.notifierHidden').style.visibility = 'hidden' }, 3000);
    }   
  
    render() {
        return (
            <div>
                <span><b>Delete supplier</b></span>
                <br /><br />
                <NavLink tag={Link} to={'/FetchSuppliers/'}>Back</NavLink>
                <div className="notifierHidden"></div>
                <div className="warningText">
                    Do you really want to delete supplier with ID: {this.state.id} ?
                </div>
                <div className="divHighLight" >
                    You can only delete a supplier with an ID greater than 29, which is the range of the original Nortwind suppliers that we don't touch.
                    <br />
                    It will indicate this if you choose lower than 30, simply by using the word <b>FAKE</b>
                    <br /><br />
                </div>
                <br />
                <input type="button" className="btn btn-warning editLink" value="Yes, go ahead and delete it." onClick={this.deleteSupplier} />
                <NavLink tag={Link} to={'/FetchSuppliers/'}>&nbsp;&nbsp;&nbsp;No, Leave it !</NavLink>

            </div>
        );

    }
}