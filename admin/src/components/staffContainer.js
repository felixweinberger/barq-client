import React, { Component } from 'react';

class StaffContainer extends Component {
  state = {
    staffCode: '',
  }

  onSubmit = (e) => {
    const { token, barId } = this.props;
    e.preventDefault();
    fetch(
      `/owner/bars/${barId}/code`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then(res => res.json())
      .then(res => this.setState({ staffCode: res })); // eslint-disable-line no-console
  }

  render() {
    const { staffCode } = this.state;
    return (
      <div className="staffContainer">
        {staffCode}
        <input type="submit" value="Generate code" onClick={this.onSubmit} />
      </div>
    );
  }
}

export default StaffContainer;
