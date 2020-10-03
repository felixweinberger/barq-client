import React, { Component } from 'react';
import QRCode from 'qrcode-react';
import '../styles/qrcode.css';

class QrCode extends Component {  
  QRCode_URL = `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_PORT}/${this.props.barId}`
  render() {
    return (
      <div className="qrcode">
        <div className="qrcode__url">{this.QRCode_URL}</div>
        <QRCode size={500} value={this.QRCode_URL} />
      </div>
    );
  }
}

export default QrCode;
