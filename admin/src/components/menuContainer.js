import React from 'react';
import csv from 'csvtojson';
import Popup from 'reactjs-popup';

import MenuListItem from './menuListItem';

const convertToObject = input => input.reduce((categories, el) => {
  if (!categories[el[2]]) categories[el[2]] = []; // eslint-disable-line
  categories[el[2]].push({ name: el[0], price: el[1] });
  return categories;
}, {});

class MenuContainer extends React.Component {
  state = {
    file: null,
    menuName: '',
    error: '',
  }

  onChangeName = (e) => {
    this.setState({
      menuName: e.nativeEvent.target.value,
    });
  }

  onFileChange = (e) => {
    const { files } = e.target;
    this.setState({ file: files[0] });
  }

  onSubmit = async (e) => {
    const { file, menuName } = this.state;
    e.preventDefault();
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const binaryStr = reader.result;
        csv({ noheader: false, output: 'csv' })
          .fromString(binaryStr)
          .then((csvRow) => {
            const { barId, addMenu } = this.props;
            const categories = Object.entries(convertToObject(csvRow))
              .map(el => ({ name: el[0], items: el[1] }));
            addMenu({ name: menuName, categories }, barId);
          });
      };
      reader.readAsBinaryString(file);
    } else {
      this.setState({ error: 'You must choose a file' });
    }
  }

  render() {
    const {
      data, deleteMenu, activateMenu, barId, activeMenu,
    } = this.props;
    const { error } = this.state;
    return (
      <div className="menuContainer">
        <h1>My Menus</h1>
        {activeMenu
          ? (
            <div className="activeMenuCard">
              <MenuListItem
                data={activeMenu}
                deleteMenu={deleteMenu}
                barId={barId}
              />
            </div>
          ) : null}
        <div>
        {data ? data.map((item) => { //eslint-disable-line
          if (!activeMenu || item._id !== activeMenu._id) {
            return (
              <MenuListItem
                key={item._id}
                data={item}
                deleteMenu={deleteMenu}
                activateMenu={activateMenu}
                barId={barId}
              />
            );
          }
        }) : null }
        </div>
        <form className="addMenuForm">
          <div className="addMenuHeaderContainer">
            <h2 id="addMenuHeader">Add a New Menu</h2>
            <Popup trigger={<div className="iSym">ⓘ</div>} position="center">
              <div className="infoPopup">
                Please upload a&nbsp;
                <u>CSV file</u>
                &nbsp;of three columns:
                <ol>
                  <li className="infoLi">
                    <u>Name:</u>
                    &nbsp;the name of the individual menu item
                  </li>
                  <li className="infoLi">
                    <u>Price:</u>
                    &nbsp;the price of the item in numbers only
                  </li>
                  <li className="infoLi">
                    <u>Category:</u>
                    &nbsp;the menu category of the item
                  </li>
                </ol>
              </div>
            </Popup>
          </div>
          <input className="addMenuInput" type="text" placeholder="Name" onChange={this.onChangeName} />
          <input className="addMenuInput" type="file" accept=".csv" name="file" onChange={this.onFileChange} />
          <input className="clicker" id="addMenu" type="submit" value="Add Menu" onClick={this.onSubmit} />
          {error}
        </form>
      </div>
    );
  }
}

export default MenuContainer;
