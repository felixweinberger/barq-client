import React from 'react';
import MenuListItemDetail from './menuListItemDetail';

const MenuListItem = ({ data, deleteMenu, barId }) => (
  <div className="menuListItem">
    <div className="menuListItemHeader">
      <h2>{data.name}</h2>
      <button type="submit" className="clicker" id="deleteMenu" onClick={() => deleteMenu(barId, data._id)}>
          Delete Menu
      </button>
    </div>
    {data.categories.map(cat => <MenuListItemDetail key={cat.name} data={cat} />)}
  </div>
);

export default MenuListItem;
