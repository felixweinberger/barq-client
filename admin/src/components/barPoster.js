import React from 'react';
import QRCode from 'qrcode-react';
import Popup from 'reactjs-popup';

const BarPoster = ({ data }) => {
  const url = `http://192.168.1.136:3002/${data._id}`;
  return (
    <div className="barPoster">

      <div className="leftBarPoster">
        <h1>{data.name}</h1>
        <QRCode value={url} />
        <h3>{url}</h3>
      </div>

      <div className="rightBarPoster">
        <h2>How does it work?</h2>
        <h3>
        Display your unique QR code and URL in your bar for customers to order their drinks.
        </h3>

        <Popup
          className="qr-popup"
          trigger={<button className="clickerSmall" id="generatePoster" type="button">Generate Poster</button>}
          modal
          contentStyle={{
            width: 'auto',
          }}
        >
          <div className="qr-popup__left">
            <h1>{data.name}</h1>
            <QRCode
              value={url}
              size={256}
            />
            <h1>{url}</h1>
          </div>
          <div className="qr-popup__right">
            <h1>1. Scan the QR Code or browse to the URL</h1>
            <h1>2. Select your drink and pay</h1>
            <h1>3. Pick up your drinks when they are ready</h1>
            <h1>4. Enjoy your drinks</h1>
          </div>
        </Popup>
      </div>

    </div>
  );
};

export default BarPoster;
