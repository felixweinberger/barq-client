import React from 'react';
import Popup from 'reactjs-popup';
import '../styles/popupInfo.css';

const popupInfo = () => (
  <Popup
    trigger={<button className="popup-btn" type="submit" />}
    modal
  >
    {close => (
      <div className="popup-modal">
        <button type="submit" className="close" onClick={close}>
          &times;
        </button>
        <div className="popup-title">Info on this drink</div>
        <div className="popup-content">
          {' '}
        Peanuts, Gluten-Free, etc.
          <br />
        Other info
        </div>
      </div>
    )}
  </Popup>
);

export default popupInfo;
