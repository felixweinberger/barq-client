import React, { Component } from 'react';
import axios from 'axios';

import Dashboard from './Dashboard';
import Login from './containers/login'

import './App.css';

class App extends Component {
  state = {
    page: 'DASHBOARD',
    pin: ''
  }
  switch = {
    DASHBOARD: () => (
      <Dashboard />
    ),
   
    LOGIN: () => (
      <Login onChange={this.onChange} pin={this.state.pin} onSubmit={this.staffLogin}/>
    )
  }

  onChange = (e) => {
    this.setState({pin: e.target.value});
  }

 staffLogin = (e) => {
   e.preventDefault();
   console.log(this.state.pin);
    // axios.get(`${this.url}/staff/id`, {headers: {"Content-type": "application/json"}})
    // .then(res => {
    //   console.log(res.data);
    //   const { } = res.data;
    //   this.props.updateQueue(queue.concat(history))
    // })
  }

  render() {
    console.log(this.state.page)
    return (
      <div className="App">
        {
          this.switch[this.state.page]()
        }
      </div>
    );
  }
}

export default App;