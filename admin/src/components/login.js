/* eslint-disable no-console */
import React, { Component } from 'react';

import logo from '../assets/SmallLogo.png';

class LogIn extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    message: '',
  }

  componentDidMount() {
    const { token } = this.props;
    const storedToken = window.localStorage.getItem('token');
    if (storedToken) {
      this.autoLogIn(storedToken);
    }
    if (token) this.autoLogIn();
  }

  componentDidUpdate(prevProps) {
    const { token } = this.props;
    if (prevProps.token !== token) this.autoLogIn();
  }

  autoLogIn = async (storedToken) => {
    try {
      const { setSession, toggleDashboard } = this.props;
      const result = await fetch(
        '/owner/me', {
          method: 'GET',
          headers: {
            authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await result.json();
      setSession(json.user, storedToken);
      toggleDashboard();
    } catch (e) {
      console.log(e);
    }
  }

  onChange = (e) => {
    const newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  onSubmit = async (e) => {
    try {
      e.preventDefault();
      const { email, password } = this.state;
      const { setSession, toggleDashboard } = this.props;
      const auth = btoa(`${email}:${password}`);
      const result = await fetch(
        '/owner', {
          method: 'GET',
          headers: {
            authorization: `Basic ${auth}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (result.status === 500) throw new Error('Server error');
      if (result.status === 401) throw new Error('Please check your credentials');
      const json = await result.json();
      window.localStorage.setItem('token', json.token);
      setSession(email, json.token);
      toggleDashboard();
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  render() {
    const {
      email, password, error, message,
    } = this.state;
    const { toggleRegister } = this.props;
    return (
      <div className="welcome">
        <div className="loginContainer">
          <img src={logo} width="180" alt="BarQ" />
          <div className="leftLogin">
            <form className="welcome__login">
              <input className="loginInput" placeholder="Email" type="text" name="email" value={email} onChange={this.onChange} />
              <input className="loginInput" placeholder="Password" type="password" name="password" value={password} onChange={this.onChange} />
              { error !== '' && <div className="loginError">{error}</div> }
              { message !== '' && <div className="loginMessage">{message}</div> }
              <input className="clicker" type="submit" onClick={this.onSubmit} value="LET&apos;S GO" />
              <button className="clicker signUp" type="button" onClick={toggleRegister}>Need an account?</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LogIn;
