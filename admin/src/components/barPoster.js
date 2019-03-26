import React from 'react';
import QRCode from 'qrcode-react';

const BarListItem = ({ data }) => {
  const url = `http://www.barq.io/${data._id}`;
  return (
    <div className="barPoster">
      <h2>{data.name}</h2>
      <QRCode value={url} />
      <h3>{url}</h3>
      <button className="clicker" type="button">Generate Poster</button>
    </div>
  );
};

export default BarListItem;
