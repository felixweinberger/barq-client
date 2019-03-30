import React from 'react';
import Popup from 'reactjs-popup';

import IconButton from './iconButton';
import Text from './text';
import icon from '../assets/info.png';

import '../styles/popupInfo.css';

const popupInfo = () => (
  <Popup
    trigger={<IconButton iconUrl={icon} type="submit" />}
    modal
  >
    {() => (
      <div className="popup-modal">
        <div className="popup-content">
          <Text
            content="Peanuts, Gluten-Free, etc. Other info"
            style={{
              fontSize: '1.5rem',
              background: 'var(--primary-color-on)',
              padding: '1rem',
              color: 'var(--primary-color)',
            }}
          />
        </div>
      </div>
    )}
  </Popup>
);

export default popupInfo;
