import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';


import '../styles/login.css';

class Login extends Component {

  render() {
    return (
      <div>
        <div className="wrapper">
          <form className="form" onSubmit={this.props.onSubmit}>
            <div className="field">
              <div>
                <label className="label">Enter your pin</label>
                <input className="input" name="pin" type="password" placeholder="Pin" onChange={this.props.onChange} value={this.props.pin}/>
              </div>
            </div>
            <div className="field">
              <div className="control">
              <button className="submit" type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}


export default Login;