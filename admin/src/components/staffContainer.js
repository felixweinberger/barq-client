import React, { Component } from 'react';

import StaffContainerItem from './staffContainerItem';

class StaffContainer extends Component {
  state = {
    name: '',
    email: '',
  }

  onChangeName = (e) => {
    const name = e.nativeEvent.target.value;
    this.setState({ name });
  }

  onChangeEmail = (e) => {
    const email = e.nativeEvent.target.value;
    this.setState({ email });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { barId, addStaffMember } = this.props;
    const { name, email } = this.state;
    if (name.length < 1 || email.length < 1) {
      alert('Error: Please ensure that you submit both a name and email.'); // eslint-disable-line no-alert
      return 1;
    }
    addStaffMember({ name, email }, barId);
    return 0;
  }

  render() {
    const { data, barId, deleteStaffMember } = this.props;
    return (
      <div className="staffContainer">

        {data
          ? data.map(staff => (
            <StaffContainerItem
              data={staff}
              key={staff.name}
              barId={barId}
              deleteStaffMember={deleteStaffMember}
            />
          ))
          : null}

        <form>
          <input type="text" placeholder="Name" onChange={this.onChangeName} />
          <input type="text" placeholder="Email" onChange={this.onChangeEmail} />
          <input type="submit" value="Submit" onClick={this.onSubmit} />
        </form>
      </div>
    );
  }
}

export default StaffContainer;
