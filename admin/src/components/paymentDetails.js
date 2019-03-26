import React, { Component } from 'react';

class PaymentDetails extends Component {
  state = {
    iban: '',
  }

  onChangeIban = (e) => {
    this.setState({
      iban: e.nativeEvent.target.value,
    });
  }

  onSubmitIban = (e) => {
    const { token, barId } = this.props;
    const { iban } = this.state;
    e.preventDefault();
    fetch(
      `/owner/bars/${barId}/iban`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ iban }),
      },
    )
      .then(res => res.json())
      .then(res => console.log(res)); // eslint-disable-line no-console
  }

  render() {
    const { iban } = this.props;
    return (
      <div className="paymentDetails">
        {iban}
        <input type="text" placeholder="IBAN" onChange={this.onChangeIban} />
        <input type="submit" value="Submit" onClick={this.onSubmitIban} />
      </div>
    );
  }
}

export default PaymentDetails;
