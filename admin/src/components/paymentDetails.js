import React from 'react';

const PaymentDetails = (props) => {
  const { barId, iban, updateIban } = props;

  const onSubmitIban = (e) => {
    e.preventDefault();
    const newIban = e.nativeEvent.target[0].value;
    updateIban(barId, newIban);
  };

  return (
    <div className="paymentDetails">
      {iban}
      <form onSubmit={onSubmitIban}>
        <input type="text" placeholder="IBAN" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default PaymentDetails;
