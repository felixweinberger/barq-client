import React from 'react';

import Loader from '../ui/loader';
import MenuItem from '../ui/menuItem';
import Footer from '../ui/footer';
import Price from '../ui/price';
// import TextInput from '../ui/inputs/textInput';

import '../styles/containers/checkout.css';

const Checkout = ({ order, totals, updatePage }) => (
  <div className="checkout">
    {
      !order
        ? <Loader />
        : (
          <>
            <div className="bill">
              {
                order.length === 0
                  ? <div>No items selected...</div>
                  : order.map(item => <MenuItem key={item.name} item={item} />)
              }
              <div className="checkout__vat">
                VAT.....
                <Price style={{ textAlign: 'right', fontSize: '1.25rem' }} price={totals.vat} />
              </div>
              <div className="checkout__total">
                Total...
                <Price style={{ textAlign: 'right', fontSize: '1.25rem' }} price={totals.total} />
              </div>
              {/* <TextInput title="Special Wishes" value={specialWishes}
            onChange={e => setSpecialWishes(e.target.value)} /> */}
            </div>
            <Footer
              primaryButtonName="Pay"
              onPrimaryClick={() => {
                window.localStorage.setItem('order', JSON.stringify({ items: order }));
                updatePage('PAY');
              }}
              secondaryButtonName="Back"
              onSecondaryClick={() => updatePage('MENU')}
            />
          </>
        )
  }
  </div>
);

export default Checkout;
