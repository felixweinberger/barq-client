import React, { Component } from 'react';

import logo from '../assets/SmallLogo.png';

class Register extends Component {
  state = {
    email: '',
    name: '',
    password: '',
    passwordRepeat: '',
    error: '',
    success: '',
  }

  get passwordMatch() {
    const { password, passwordRepeat } = this.state;
    return password === passwordRepeat;
  }

  onChange = (e) => {
    const newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  onSubmit = async (e) => {
    try {
      e.preventDefault();
      const { email, name, password } = this.state;
      if (!this.passwordMatch) return;
      const result = await fetch(
        '/owner', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, name, password }),
        },
      );
      if (result.status === 500) throw new Error('Server error');
      if (result.status === 401) throw new Error('Email taken');
      this.setState({ success: 'Account created!' });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  render() {
    const {
      email, name, password, passwordRepeat, error, success,
    } = this.state;
    const { toggleLogin } = this.props;
    return (
      <div className="welcome">
        <div className="loginContainer">
          <img src={logo} width="180" alt="BarQ" />
          <div className="leftLogin">
            <form className="welcome__login" onSubmit={this.onSubmit}>
              {
                !success
                && (
                <>
                  <input className="loginInput" placeholder="Email" type="text" name="email" value={email} onChange={this.onChange} />
                  <input className="loginInput" placeholder="Name" type="text" name="name" value={name} onChange={this.onChange} />
                  <input className="loginInput" placeholder="Password" type="password" name="password" value={password} onChange={this.onChange} />
                  <input className="loginInput" placeholder="Repeat Password" type="password" name="passwordRepeat" value={passwordRepeat} onChange={this.onChange} />
                </>
                )
              }
              { this.passwordMatch || <div className="loginError">Passwords do not match!</div>}
              { error !== '' && <div className="loginError">{error}</div> }
              { success !== '' && <div className="loginSuccess">{success}</div> }
              { !success && <input className="clicker" type="submit" /> }
              <button type="submit" className="clicker signUp" onClick={toggleLogin}>Log In</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
