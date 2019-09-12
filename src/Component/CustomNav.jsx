import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './CustomNav.css';

class CustomNav extends Component {
  
    render() {
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container">
                        <div className="navbar-header navbar-right">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="">
                                <span> الكافيتيريا</span> <span> مخزن</span>
                            </a>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav navbar-left">
                                <li>
                                    <NavLink to='/'>تسجيل الخروج</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/reports'>التقارير</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/payProducts'>بيع منتجات</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/addAddations'>إضافة منتجات</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/products' >المنتجات </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
export default CustomNav;