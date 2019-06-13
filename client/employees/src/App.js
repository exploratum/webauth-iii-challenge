import React from 'react';
import {Route} from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Users from './components/Users';


import './App.css';

class App extends React.Component {


  render() {
    return (
      <div className="App">
        <header className="App-header">
          Employee Web Site
        </header>

        <Route path="/signin" component={Signin} />
        <Route path='/signup' component={Signup} />
        <Route path='/users' component={Users} />
      </div>
    );
  }
  
}

export default App;
