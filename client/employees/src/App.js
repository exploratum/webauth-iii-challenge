import React from 'react';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Users from './components/Users';
import {NavLink, withRouter, Route} from 'react-router-dom';


import './App.css';

class App extends React.Component {


  render() {
    return (
      <div className="App">
        <header className="App-header">
          Employee Web Site
          <NavLink to='/signin'>Login</NavLink>
          <NavLink to='/signup'>Sign Up</NavLink>
          <button onClick={this.logout}>Logout</button>
        </header>

        <Route path="/signin" component={Signin} />
        <Route path='/signup' component={Signup} />
        <Route path='/users' component={Users} />
      </div>
    );
  }

  logout = () => {
    localStorage.removeItem('token');
    this.props.history.push('/signin');
  };
  
}

export default withRouter(App);
