import React from 'react';

const MenuListItemDetail = ({ data }) => (
  <div>
    <h3>{data.name}</h3>
    {data.items ? data.items.map(item => (
      <div key={item.name}>
        <p>
          {item.name}
          :
          $
          {item.price}
        </p>
      </div>
    )) : null}
  </div>
);

export default MenuListItemDetail;
