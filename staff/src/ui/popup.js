import React from 'react';
import Popup from 'reactjs-popup';
import '../styles/popup.css';

const PopUp = ({updatePage}) => (
  <div className="wrapper">
    <Popup
      contentStyle={{
        width: "100%",
        margin: 0,
      }}
      trigger={<button className="btn"></button>}
      position="top center">
      <div className="menu">
        <button className="menu-item" onClick={()=> updatePage('MAIN')}>Now</button>
        <button className="menu-item" onClick={()=> updatePage('HISTORY')}>History</button>
        <button className="menu-item" onClick={()=> updatePage('DISPLAY')}>Queue</button>
        <button className="menu-item">Block Orders</button>
        <button className="menu-item">LogOut</button>
      </div>
    </Popup>
  </div>
);

export default PopUp;