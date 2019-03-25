import React from 'react';
import MenuListItemDetail from './menuListItemDetail';

const MenuListItem = ({ data, deleteMenu, barId }) => (
  <div>
    <h2>{data.name}</h2>
    <button type="submit" onClick={() => deleteMenu(barId, data._id)}>
        Delete
      {data.name}
    </button>
    {data.categories.map(cat => <MenuListItemDetail key={cat.name} data={cat} />)}
  </div>
);

export default MenuListItem;
