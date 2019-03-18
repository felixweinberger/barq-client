import React from 'react';

import MenuItem from './menuItem';

const Category = ({ category: { name, menuItems } }) => {
  return (
    <div>
      {name}
      {
        menuItems.map(menuItem => (
          <MenuItem
            key={menuItem._id}
            menuItem={menuItem}
          />
        ))
      }
    </div>
  );
}

export default Category;
