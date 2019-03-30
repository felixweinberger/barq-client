/* eslint-disable */
import React, { Component } from 'react';
import './App.css';

import logo from './assets/LightSmallLogo.png';
import Landing from './Landing.js';
import Dashboard from './components/dashboard';
import Register from './components/register';
import Login from './components/login';

class App extends Component {
  // if user is not null, render dashboard
  // if it is null, redirect to login
  state = {
    user: null,
    authPage: 'login',
    token: null,
    page: 'LANDING',
  }

  renderLogin = () => (
    <Login
      toggleRegister={() => this.setState({page: 'REGISTER'})}
      toggleDashboard={() => this.setState({page: 'DASHBOARD'})}
      setSession={(user, token) => this.setState({ user, token })}
    />
  );

  renderRegister = () => (
    <Register
      toggleLogin={() => this.setState({page: 'LOGIN'})}
      toggleRegister={() => this.setState({page: 'REGISTER'})}
      setSession={(user, token) => this.setState({ user, token })}
    />
  );

  renderDashboard = () => (
    <Dashboard
      user={this.state.user}
      token={this.state.token}
      logout={this.logout}
      updateUser={this.updateUser}
    />
  );

  renderLanding = () => (
    <Landing 
      toggleLogin={() => this.setState({page: 'LOGIN'})}
    />
  );

  switch = {
    LOGIN: this.renderLogin,
    REGISTER: this.renderRegister,
    DASHBOARD: () => (
      this.state.user && this.state.token
      ? this.renderDashboard()
      : this.renderLogin()
    ),
    LANDING: this.renderLanding,
  }

  logout = () => {
    this.setState({
      user: null,
      authPage: 'login',
      token: null,
    });
    window.localStorage.removeItem('token');
  }

  render() {
    const { page } = this.state;
    return (
      <div className="App">
        { this.switch[page]() }
      </div>
    );
  }
}

export default App;
