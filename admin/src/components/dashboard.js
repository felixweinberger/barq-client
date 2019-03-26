import React, { Component } from 'react';

import BarList from './barList';
import BarDetails from './barDetails';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerData: {},
      activeBar: null,
    };
  }

  getOwnerData = () => {
    const { token } = this.props;
    fetch('/owner/me',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => res.json())
      .then(res => this.setState({ ownerData: res.user }));
  }

  addBar = (event, barObj) => {
    event.preventDefault();
    const { token } = this.props;
    fetch('/owner/bars',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(barObj),
      })
      .then(res => res.json())
      .then(res => this.setState({ ownerData: res }));
  }

  deleteBar = (barId) => {
    const { token } = this.props;
    const { activeBar } = this.state;
    fetch(`/owner/bars/${barId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => res.json())
      .then(res => this.setState({ ownerData: res }))
      .then(() => {
        if (barId === activeBar._id) this.setState({ activeBar: null });
      });
  }

  selectBar = (barData) => {
    this.setState({ activeBar: barData });
  }

  addStaffMember = (staff, barId) => {
    const { token } = this.props;
    fetch(`/owner/bars/${barId}/staff`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(staff),
    })
      .then(response => response.json())
      .then(response => this.setState({
        ownerData: response,
        activeBar: response.bars.find(bar => bar._id === barId),
      }));
  }

  deleteStaffMember = (barId, staffId) => {
    const { token } = this.props;
    const { ownerData } = this.state;
    fetch(`/owner/bars/${barId}/staff/${staffId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        const barToUpdate = ownerData.bars.find(bar => bar._id === barId);
        const remainingStaff = barToUpdate.staff.filter(staff => staff._id !== staffId);
        barToUpdate.staff = remainingStaff;
        this.setState({ activeBar: barToUpdate });
        this.getOwnerData();
      });
  }

  addMenu = (menu, barId) => {
    const { token } = this.props;
    fetch(`/owner/bars/${barId}/menus`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menu),
      })
      .then(res => res.json())
      .then((response) => {
        this.setState({
          ownerData: response,
          activeBar: response.bars.find(bar => bar._id === barId),
        });
      });
  }

  deleteMenu = (barId, menuId) => {
    const { token } = this.props;
    const { ownerData } = this.state;
    fetch(`/owner/bars/${barId}/menus/${menuId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        const barToUpdate = ownerData.bars.find(bar => bar._id === barId);
        const remainingMenus = barToUpdate.menus.filter(menu => menu._id !== menuId);
        barToUpdate.menus = remainingMenus;
        this.setState({ activeBar: barToUpdate });
        this.getOwnerData();
      });
  }

  componentDidMount = () => {
    this.getOwnerData();
  }

  render() {
    const { logout, token } = this.props;
    const { activeBar, ownerData } = this.state;
    return (
      <div>
        <div className="dashboardHeader">
          <div className="headerLogo">BarQ</div>
          <button className="clicker" type="button" id="logout" onClick={logout}>Log out</button>
        </div>


        <div className="dashboard">
          <BarList
            data={ownerData}
            addBar={this.addBar}
            deleteBar={this.deleteBar}
            selectBar={this.selectBar}
          />
          {activeBar
            ? (
              <BarDetails
                data={activeBar}
                token={token}
                addStaffMember={this.addStaffMember}
                deleteStaffMember={this.deleteStaffMember}
                addMenu={this.addMenu}
                deleteMenu={this.deleteMenu}
              />
            )
            : null}
        </div>
      </div>
    );
  }
}

export default Dashboard;
