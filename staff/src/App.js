import React, { Component } from 'react';
import axios from 'axios';

import Dashboard from './Dashboard';
import Login from './containers/login'

import './App.css';

class App extends Component {
  state = {
    page: 'LOGIN',
    pin: '',
    token: null,
    loginMessage: '',
  }

  switch = {
    DASHBOARD: () => (
      <Dashboard barId={this.barId} token={this.state.token} logout={this.logout} />
    ),
    LOGIN: () => (
      <Login onChange={this.onChange} loginMessage={this.state.loginMessage} pin={this.state.pin} onSubmit={this.staffLogin}/>
    )
  }

  onChange = (e) => {
    this.setState({pin: e.target.value});
  }

  logout = (e) => {
    this.setState({ token: null });
    window.localStorage.clear();
  }

  staffLogin = (e) => {
   e.preventDefault();
   this.barId = window.location.pathname.replace(/\//g, '');
   const decoded = `${this.barId}:${this.state.pin}`
   const encoded = btoa(decoded);
    axios.get(`/staff/${this.barId}/code`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Basic ${encoded}`
      }
    })
    .then(res => {
      const { token } = res.data;
      window.localStorage.setItem('token', token);
      this.setState({ token });
    })
    .catch(err => {
      this.setState({ loginMessage: err.response.data })
    })
  }

  render() {
    return (
      <div className="App">
        {
         this.state.token
         ? this.switch['DASHBOARD']()
         : this.switch['LOGIN']()
        }
      </div>
    );
  }
}

export default App;