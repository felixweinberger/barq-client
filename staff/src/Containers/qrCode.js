import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import '../styles/qrcode.css';

const QRCode_URL = `192.168.1.185:${process.env.REACT_APP_PORT}${window.location.pathname}`

class QrCode extends Component {  
  render() {
    console.log(QRCode_URL)
    return (
      <div className="qrcode">
        <QRCode size={500} value={QRCode_URL} />
        {QRCode_URL}
      </div>
    );
  }
}

export default QrCode;