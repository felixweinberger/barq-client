import React, { Component } from 'react';

class AddBarForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      currency: null,
    };
  }

  handleChange = (event, field) => {
    if (field === 'name') this.setState({ name: event.target.value });
    else if (field === 'currency') this.setState({ currency: event.target.value });
  }

  render() {
    const { addBar } = this.props;
    return (
      <div className="addBarForm">
        <h3>Add a New Bar</h3>
        <form className="addBarForm">
          <input className="addBarInput" type="text" placeholder="Name" onChange={event => this.handleChange(event, 'name')} />
          <input className="addBarInput" type="text" placeholder="Currency" onChange={event => this.handleChange(event, 'currency')} />
          <input className="clicker" id="addBar" type="submit" value="Add Bar" onClick={event => addBar(event, this.state)} />
        </form>
      </div>
    );
  }
}

export default AddBarForm;
