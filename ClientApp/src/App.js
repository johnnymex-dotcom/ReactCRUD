import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';

import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { FetchSuppliers } from './components/FetchSuppliers';
import { UpdateSupplier } from './components/UpdateSupplier';
import { CreateSupplier } from './components/CreateSupplier';
import { DeleteSupplier } from './components/DeleteSupplier';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        
        <Route path='/fetchsuppliers' component={FetchSuppliers} />
        <Route path='/UpdateSupplier/:SupplierID' component={UpdateSupplier} />
        <Route path='/CreateSupplier' component={CreateSupplier} />
        <Route path='/DeleteSupplier/:SupplierID' component={DeleteSupplier} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
      </Layout>
    );
  }
}
