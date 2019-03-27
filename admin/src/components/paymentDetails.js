import React from 'react';

const PaymentDetails = ({ barId, iban, updateIban }) => {
  const onSubmitIban = (e) => {
    e.preventDefault();
    const newIban = e.nativeEvent.target[0].value;
    updateIban(barId, newIban);
  };

  return (
    <div className="staffContainer">
      <div className="leftBarPoster">
        <h1>Order History and Payment</h1>
        <h3>Add your IBAN number for payment.</h3>
        {iban
          ? (
            <p id="existingIban">
              Existing IBAN:
              {iban}
            </p>
          )
          : <p id="existingIban">No IBAN added yet</p>}
      </div>
      <div className="rightBarPoster">
        <form className="addIBAN" onSubmit={onSubmitIban}>
          <input id="ibanTextField" type="text" placeholder="IBAN" />
          <button className="clickerSmall" id="addIban" type="submit">Add New IBAN</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentDetails;
