import React, { Component } from 'react';
import '../css/Login.css';
import { Redirect } from 'react-router-dom';
// import swal from 'sweetalert';
// import Navigation from '../Component/CustomNav';


class Login extends Component {
  constructor(props) {
    super(props);
    // const tokens = localStorage.getItem('tokens');
    //     let loggedIn = true
    //     if (tokens === null) {
    //         loggedIn = false
    //     }

    this.state = {
      username: '',
      password: '',
      // loggedIn
    }
  }
  getData = ((e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    })
    console.log(this.state);

  })
  sendDate = ((e) => {
    e.preventDefault();
    if (this.state.username === 'swaaf' && this.state.password === '123') {
      // localStorage.setItem('tokens','absdefghijklmnopqrstuvwxyz');  
      // this.setState({
      //   loggedIn : true
      // })
      alert('hi')
      // return <Redirect to='/home'/>
    } else {
      alert('Enter your password and username correctely');
      // return <Redirect to='/payProducts'/>
    }
  })
  render() {
    if (this.state.username === 'swaaf' && this.state.password === '123' ||
      this.state.username === 'abdo' && this.state.password === '123' ||
      this.state.username === 'khalaf' && this.state.password === '123' ||
      this.state.username === 'manager' && this.state.password === '123') {
      return <Redirect to='/products' />
    }
    return (
      <div>
        {/* <Navigation /> */}
        <section className="banner" >
          <div className="shadow">
            <h1 className="header">
            <span> مخزن</span> <span> الكافيتيريا</span>
            </h1>
            <form >
              <div className="form-group">
                <input type="text" className="form-control" id="emil" onChange={this.getData} placeholder="إسـم المستخـدم" value={this.state.name} name='username' />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" id="password" onChange={this.getData} placeholder="الرقـم السـرى" value={this.state.name} name='password' />
              </div>
              <button type="submit" onClick={this.sendDate} className="btn btn-default">
                {/* <NavLink to='/' >دخـول</NavLink> */}
                {/* <Redirect to='/' /> */}
                دخول
              </button>
            </form>
          </div>
        </section>
      </div>
    );
  }
}
export default Login;