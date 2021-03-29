import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';

import { Counter } from './components/Counter';
import { FetchSuppliers } from './components/FetchSuppliers';
import { UpdateSupplier } from './components/UpdateSupplier';
import { CreateSupplier } from './components/CreateSupplier';
import { DeleteSupplier } from './components/DeleteSupplier';
import { Patients } from './components/Patients';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route path='/FetchSuppliers' component={FetchSuppliers} />
        <Route path='/UpdateSupplier/:SupplierID' component={UpdateSupplier} />
        <Route path='/CreateSupplier' component={CreateSupplier} />
        <Route path='/DeleteSupplier/:SupplierID' component={DeleteSupplier} />
        <Route path='/counter' component={Counter} />
        <Route path='/Patients' component={Patients} />
      </Layout>
    );
  }
}
