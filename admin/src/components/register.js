import React, { Component } from 'react';

class Register extends Component {
  state = {
    email: '',
    name: '',
    password: '',
    passwordRepeat: '',
    error: ''
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
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  render() {
    const {
      email, name, password, passwordRepeat, error,
    } = this.state;
    const { toggleLogin } = this.props;
    return (
      <div className="welcome">
        <form className="welcome__login" onSubmit={this.onSubmit}>
          <h1 className="welcome__title">BarQ</h1>
          <input className="welcome__username" placeholder="Email" type="text" name="email" value={email} onChange={this.onChange} />
          <input className="welcome__username" placeholder="Name" type="text" name="name" value={name} onChange={this.onChange} />
          <input className="welcome__password" placeholder="Password" type="password" name="password" value={password} onChange={this.onChange} />
          <input className="welcome__password" placeholder="Repeat Password" type="password" name="passwordRepeat" value={passwordRepeat} onChange={this.onChange} />
          { this.passwordMatch || <div className="welcome__warning">Passwords do not match!</div>}
          { error !== '' && <div className="loginError">{error}</div> }
          <input className="welcome__submit" type="submit" />
          <button type="submit" className="welcome__toggle" onClick={toggleLogin}>Log In</button>
        </form>
      </div>
    );
  }
}

export default Register;
