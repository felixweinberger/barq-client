import React, { Component } from 'react';

class AddBarForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      currency: null,
      vat: null,
    };
  }

  handleChange = (event, field) => {
    if (field === 'name') this.setState({ name: event.target.value });
    else if (field === 'currency') this.setState({ currency: event.target.value });
    else if (field === 'vat') this.setState({ vat: event.target.value });
  }

  render() {
    const { addBar } = this.props;
    return (
      <div>
        <form>
          <input type="text" placeholder="Bar name" onChange={event => this.handleChange(event, 'name')} />
          <input type="text" placeholder="Bar currency" onChange={event => this.handleChange(event, 'currency')} />
          <input type="text" placeholder="Bar VAT" onChange={event => this.handleChange(event, 'vat')} />
          <input type="submit" value="Add Bar" onClick={event => addBar(event, this.state)} />
        </form>
      </div>
    );
  }
}

export default AddBarForm;
