import React, { Component } from 'react';


import '../styles/login.css';

class Login extends Component {

  render() {
    return (
        <div className="login__wrapper">
          <form className="form" onSubmit={this.props.onSubmit}>
            <label className="label">Enter your pin</label>
            <input className="input" name="pin" type="password" placeholder="Pin" onChange={this.props.onChange} value={this.props.pin}/>
            { this.props.loginMessage !== '' && <div className="login-message" >{this.props.loginMessage}</div> }
            <button className="submit" type="submit">Submit</button>
          </form>
        </div>
    )
  }
}


export default Login;