import React from 'react';
import QRCode from 'qrcode-react';

const BarPoster = ({ data }) => {
  const url = `http://www.barq.io/${data._id}`;
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
        <button className="clickerSmall" id="generatePoster" type="button">Generate Poster</button>
      </div>

    </div>
  );
};

export default BarPoster;
