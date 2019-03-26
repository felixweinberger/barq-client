import React from 'react';
import Popup from 'reactjs-popup';
import '../styles/popup.css';

const PopUp = ({page, isOpen, updatePage, toggleBlocked, logout}) => (
  <div className="wrapper">
    <Popup
      contentStyle={{
        width: "100%",
        padding: 0,
        margin: 0,
        border: "none"
      }}
      overlayStyle={{
        background: "none",
        padding: 0,
        margin: 0,
        border: "none"
      }}
      offsetY={-8}
      arrowStyle={{
        height: 0,
      }}
      trigger={<button className="btn"></button>}
      closeOnDocumentClick
      position="top center">
      <div className="menu">
        <button className={`menu-item${page === 'MAIN' ? '--selected' : ''}`} onClick={() => updatePage('MAIN')}>Now</button>
        <button className={`menu-item${page === 'HISTORY' ? '--selected' : ''}`} onClick={() => updatePage('HISTORY')}>History</button>
        <button className={`menu-item${page === 'DISPLAY' ? '--selected' : ''}`} onClick={() => updatePage('DISPLAY')}>Queue</button>
        <button className={`menu-item${page === 'QRCODE' ? '--selected' : ''}`} onClick={() => updatePage('QRCODE')}>QR Code</button>
        <button className={`menu-item__block${!isOpen ? '--selected' : ''}`} onClick={() => toggleBlocked()}>{`${isOpen ? 'Block' : 'Open'} Orders`}</button>
        <button className={`menu-item__logout`} onClick={logout}>Log Out</button>
      </div>
    </Popup>
  </div>
);

export default PopUp;