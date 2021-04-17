import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import '../css/Main.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

    menuClickEvt(self) {
        document.querySelector("#m1").className = "menuSection";
        document.querySelector("#m2").className = "menuSection";
        document.querySelector("#m" + self).className = "menuSection selectedPost";
    }

  render () {
    return (
      <header>
            <p className="headerStyle">Pick a function....</p>
            <p onClick={this.toggleNavbar} >
                <div className="menuSection" id="m1" onClick={() => this.menuClickEvt(1)}>
                    <NavLink tag={Link} to="/FetchSuppliers">Fetch suppliers</NavLink>
                </div>
                <div className="menuSection" id="m2" onClick={() => this.menuClickEvt(2)}>
                    <NavLink tag={Link} to="/Patients">Patients</NavLink>
                </div>
   
            </p>
      </header>
    );
  }
}
