import React from 'react';

import SecondaryHead from './secondaryHead';
import MenuItem from './menuItem';

import '../styles/category.css';

const Category = ({ category: { name, items } }) => (
  <div className="category">
    <SecondaryHead title={name} />
    {
      items.map(item => (
        <MenuItem
          key={item._id}
          item={item}
        />
      ))
    }
  </div>
);

export default Category;
