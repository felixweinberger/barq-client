import React from 'react';

import Category from '../ui/category';

import '../styles/containers/menu.css';

const Menu = ({ menu: { categories } }) => (
  <div>
    {
      categories.map(category => (
        <Category key={category._id} category={category} />
      ))
    }
  </div>
);

export default Menu;
