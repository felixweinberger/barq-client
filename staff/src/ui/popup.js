import React from 'react';
import Popup from 'reactjs-popup';
import '../styles/popup.css';

const PopUp = () => (
  <div className="wrapper">
    <Popup trigger={<button className="btn">Trigger</button>} position="left center">
      <div className="menu">
        <button className="menu-item">Now</button>
        <button className="menu-item">History</button>
        <button className="menu-item">Queue</button>
        <button className="menu-item">Block Orders</button>
        <button className="menu-item">LogOut</button>
      </div>
    </Popup>
  </div>
);

export default PopUp;