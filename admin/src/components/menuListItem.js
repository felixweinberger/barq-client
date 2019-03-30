import React from 'react';
import MenuListItemDetail from './menuListItemDetail';

const MenuListItem = ({
  data, deleteMenu, activateMenu, barId,
}) => (
  <div className="menuListItem">
    <div className="menuListItemHeader">
      <h2>{data.name}</h2>

    </div>
    {data.categories.map(cat => <MenuListItemDetail key={cat.name} data={cat} />)}
    <div>

      { activateMenu
        ? (
          <button type="submit" className="clicker" id="selectMenu" onClick={() => activateMenu(barId, data._id)}>
            {activateMenu ? 'Make Active Menu' : 'ACTIVE MENU'}
          </button>
        )
        : null
      }


      <button type="submit" className="clicker" id="deleteMenu" onClick={() => deleteMenu(barId, data._id)}>
        Delete Menu
      </button>
    </div>
  </div>
);

export default MenuListItem;
