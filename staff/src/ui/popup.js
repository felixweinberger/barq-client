import React from 'react';
import Popup from 'reactjs-popup';
import '../styles/popup.css';

const PopUp = ({page, updatePage}) => (
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
        { page !== 'MAIN' && <button className="menu-item" onClick={() => updatePage('MAIN')}>Now</button> }
        { page !== 'HISTORY' && <button className="menu-item" onClick={() => updatePage('HISTORY')}>History</button> }
        { page !== 'DISPLAY' && <button className="menu-item" onClick={() => updatePage('DISPLAY')}>Queue</button> }
        { page !== 'QRCODE' && <button className="menu-item" onClick={() => updatePage('QRCODE')}>QR Code</button> }
        { page === '' && <button className="menu-item">Block Orders</button> }
        { page === '' && <button className="menu-item">LogOut</button> }
      </div>
    </Popup>
  </div>
);

export default PopUp;