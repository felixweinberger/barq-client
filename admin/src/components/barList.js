import React from 'react';

import BarListItem from './barListItem';
import AddBarForm from './addBarForm';

const BarList = ({ data, deleteBar, selectBar, addBar,}) => {
  return (
    <div className="barList">
      <h1>My Bars</h1>
      {data.bars
        ? data.bars.map((bar, i) => (
          <BarListItem
            barData={bar}
            deleteBar={deleteBar}
            selectBar={selectBar}
            key={i}
          />
        ))
        : null}
      <AddBarForm addBar={addBar} />
    </div>
  );
};

export default BarList;


// {this.props.data.bars.map(bar => <BarListItem />)}
