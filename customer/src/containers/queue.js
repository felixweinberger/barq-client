import React from 'react';

const Queue = ({ order }) => { // eslint-disable-line
  return (
    <div>
      {
        order.map(item => <div key={item.name}>{item.name}</div>)
      }
    </div>
  );
};

export default Queue;
