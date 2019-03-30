import React from 'react';

const MenuListItemDetail = ({ data }) => (
  <div>
    <h3>{data.name}</h3>
    {data.items ? data.items.map(item => (
      <div key={item.name} className="menuListItemDetail">
        <p>{item.name}</p>
        <p>
          €
          {item.price}
        </p>
      </div>
    )) : null}
  </div>
);

export default MenuListItemDetail;
