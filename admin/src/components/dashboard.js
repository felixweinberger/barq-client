import React, { Component } from 'react';

import BarList from './barList';
import BarDetails from './barDetails';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerData: {},
      activeBar: null,
      staffCode: null,
    };
  }

  getOwnerData = () => {
    const { token } = this.props;
    return fetch('/owner/me',
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
        if (activeBar && barId === activeBar._id) this.setState({ activeBar: null });
      });
  }

  selectBar = (barData) => {
    this.setState({ activeBar: barData, staffCode: null });
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
        if (barToUpdate.activeMenu && barToUpdate.activeMenu._id === menuId) {
          barToUpdate.activeMenu = null;
        }
        this.setState({ activeBar: barToUpdate });
      });
  }

  activateMenu = (barId, menuId) => {
    const { token } = this.props;
    fetch(`/owner/bars/${barId}/menus/${menuId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => res.json())
      .then((res) => {
        const { activeBar } = this.state;
        const updatedActiveBar = res.bars.find(bar => bar._id === activeBar._id);
        this.setState({ ownerData: res, activeBar: updatedActiveBar });
      });
  }

  generateStaffCode = (barId) => {
    const { token } = this.props;
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
      .then(res => this.setState({ staffCode: res }));
  }

  updateIban = (barId, iban) => {
    const { token } = this.props;
    const { activeBar } = this.state;
    fetch(
      `/owner/bars/${barId}/iban`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ iban }),
      },
    )
      .then(res => res.json())
      .then((res) => {
        this.setState({
          activeBar: {
            ...activeBar,
            iban: res,
          },
        });
        this.getOwnerData();
      });
  }

  refreshHistory = async () => {
    await this.getOwnerData();
    const { activeBar, ownerData } = this.state;
    ownerData.bars.forEach((bar) => {
      if (activeBar._id === bar._id) {
        this.setState({ activeBar: bar });
      }
    });
  }

  componentDidMount = () => {
    this.getOwnerData();
  }

  render() {
    const { logout } = this.props;
    const { activeBar, ownerData, staffCode } = this.state;
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
                staffCode={staffCode}
                generateStaffCode={this.generateStaffCode}
                addMenu={this.addMenu}
                deleteMenu={this.deleteMenu}
                activateMenu={this.activateMenu}
                updateIban={this.updateIban}
                refreshHistory={this.refreshHistory}
              />
            )
            : (
              <div className="welcomeToDash">
                <h3>Welcome to your BarQ dashboard.</h3>
                Add a new bar or select an existing one to begin.
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
