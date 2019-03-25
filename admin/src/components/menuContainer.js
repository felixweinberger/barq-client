import React from 'react';
import csv from 'csvtojson';

import MenuListItem from './menuListItem';

const convertToObject = (input) => {
  return input.reduce((categories, el) => {
    if (!categories[el[2]]) categories[el[2]] = [];
    categories[el[2]].push({ name: el[0], price: el[1] });
    return categories;
  }, {})
};

class MenuContainer extends React.Component {

  state = {
    file: null,
    json: [],
    menuName: '',
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
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = () => {
      const binaryStr = reader.result;
      csv({ noheader: false, output: 'csv' })
        .fromString(binaryStr)
        .then(csvRow => {
          const { barId, addMenu } = this.props;
          const categories = Object.entries(convertToObject(csvRow))
            .map(el => ({ name: el[0], items: el[1] }));
          addMenu({ name: this.state.menuName, categories }, barId);
        })
    };

    reader.readAsBinaryString(this.state.file)
  }

  render() {
    const { data, deleteMenu, barId } = this.props;

    return (
      <div className="menuContainer">
        <h1>Menus</h1>
        {data
          ? data.map(item => (
            <MenuListItem
              key={item._id}
              data={item}
              deleteMenu={deleteMenu}
              barId={barId}
            />
          ))
          : null}

        <form>
          <input type="text" placeholder="Name" onChange={this.onChangeName} />
          <input type="file" name="file" onChange={this.onFileChange} />
          <input type="submit" value="Submit" onClick={this.onSubmit} />
        </form>
      </div>
    );
  }
}

export default MenuContainer;
