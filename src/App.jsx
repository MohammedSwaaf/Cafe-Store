import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter , Route } from 'react-router-dom';
import Login from './Routes/Login';
import Product from './Routes/Products';
import AddProducts from './Routes/AddProducts';
import Update from './Routes/EditProducts';
import Addation from './Routes/GoodsAddation';
import Payment from './Routes/payProducts';
import Report from './Routes/Report';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          {/* <CustomNav /> */}
          <Route exact path='/' component={Login} />
          <Route path='/products' component={Product} />
          <Route path='/AddProducts' component={AddProducts}/>
          <Route path='/editProducts' component={Update} />
          <Route path='/addAddations' component={Addation} title='Welcome' />
          <Route path='/payProducts' component={Payment} />
          <Route path='/reports' component={Report} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
