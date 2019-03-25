import React from 'react';
import csv from 'csvtojson';

import MenuListItem from './menuListItem';

const convertToObject = (input) => {
  const categories = {};
  input.forEach((el) => {
    if (!categories[el[2]]) categories[el[2]] = [];
    categories[el[2]].push({ name: el[0], price: el[1] });
  });
  return categories;
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

  onSubmit = (e) => {
    e.preventDefault();
    const { file } = this.state;
    if (!file) {
      alert('Error: Please ensure that you submit a csv file.'); // eslint-disable-line no-alert
      return 1;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const binaryStr = reader.result;
      csv({ noheader: false, output: 'csv' })
        .fromString(binaryStr)
        .then((csvRow) => {
          const categoriesArr = [];
          Object.entries(convertToObject(csvRow))
            .forEach(el => categoriesArr.push({ name: el[0], items: el[1] }));
          this.setState({ json: categoriesArr });
        });
    };
    reader.readAsBinaryString(file);
    return 0;
  }

  onConfirm = async () => {
    const { json, menuName } = this.state;
    const { barId, addMenu } = this.props;
    if (json.length < 1 || menuName.length < 1) {
      alert('Error: Please ensure that you submit both a menu and name.'); // eslint-disable-line no-alert
      return 1;
    }
    const newMenu = { name: menuName, categories: json };
    addMenu(newMenu, barId);
    return 0;
  }

  // renderMenu = (jsonMenu) => {
  //   const renderCategory = category => (
  //     <div key={category.name}>
  //       <div className="category__title">{category.name}</div>
  //       {category.items.map(item => (
  //         <div className="category__listitem" key={item.name}>
  //           {`${item.name} ${Number(item.price).toFixed(2)}`}
  //         </div>
  //       ))}
  //     </div>
  //   );
  //   const renderedMenu = jsonMenu.map(renderCategory);
  //   return renderedMenu;
  // }

  render() {
    const { data, deleteMenu, barId } = this.props;

    return (
      <div className="menuContainer">
        <h1>Menus</h1>
        {data
          ? data.map(item => (
            <MenuListItem
              key={item.name}
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
          <input type="submit" value="Confirm" onClick={this.onConfirm} />
        </form>
      </div>
    );
  }
}

export default MenuContainer;
