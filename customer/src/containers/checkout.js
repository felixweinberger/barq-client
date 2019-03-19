import React, { useState } from 'react';

import Loader from '../ui/loader';
import MenuItem from '../ui/menuItem';
import Footer from '../ui/footer';
import Price from '../ui/price';
import TextInput from '../ui/inputs/textInput';

import '../styles/containers/checkout.css';

const Checkout = ({ order, totals, updatePage }) => {
  const [tip, setTip] = useState(0); // eslint-disable-line
  const [specialWishes, setSpecialWishes] = useState('');
  return (
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
                <div>
                  VAT.....
                  <Price price={totals.vat} />
                </div>
                <div>
                  Total...
                  <Price price={totals.total} />
                </div>
                <TextInput title="Special Wishes" value={specialWishes} onChange={e => setSpecialWishes(e.target.value)} />
              </div>
              <Footer
                primaryButtonName="Pay"
                onPrimaryClick={() => updatePage('PAY')}
                secondaryButtonName="Back"
                onSecondaryClick={() => updatePage('MENU')}
              />
            </>
          )
    }
    </div>
  );
};

export default Checkout;
