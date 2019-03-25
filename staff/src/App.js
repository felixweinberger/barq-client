import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import Login from './containers/login'
class App extends Component {
  state = {
    page: 'LOGIN',
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

  componentDidMount() {
  }

  listAllOrders = () => {
    axios.get(`${this.url}/queue`, {headers: {"Content-type": "application/json"}})
     .then(res => {
       const { queue } = res.data;
       this.props.updateQueue(queue)
     })
  }

  toggleBlocked = () => {
    axios.post(`${this.url}/open`, {
      open: !this.props.isOpen
    })
    .then(res => {
      this.props.setOpen(!this.props.isOpen);
    })
  onChange = (e) => {
    this.setState({pin: e.target.value});
  }

 staffLogin = (e) => {
   e.preventDefault();
   console.log(this.state.pin)
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
      <div>
        {
          this.switch[this.state.page]()
        }
      </div>
    );
  }
}

export default App;