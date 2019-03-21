import React from 'react';

import { sumBy } from 'lodash';

import SecondaryHead from '../ui/secondaryHead';
import MenuItem from '../ui/menuItem';
import Loader from '../ui/loader';
import Footer from '../ui/footer';

import '../styles/containers/menu.css';

const Menu = ({ bar: { menu }, updatePage, order }) => (
  <div className="menu">
    {
      !menu
        ? <Loader />
        : (
          <>
            <div className="menu__categories">
              {
                menu.map(({ name: categoryName, items }) => (
                  <div key={categoryName} className="menu__category">
                    <SecondaryHead title={categoryName} />
                    {
                      items.map(item => (
                        <MenuItem
                          key={item.name}
                          item={item}
                        />
                      ))
                    }
                  </div>
                ))
              }
            </div>
            <Footer
              primaryButtonName={sumBy(order, 'quantity') > 0 ? 'Checkout' : 'Nothing Selected'}
              primaryButtonType={sumBy(order, 'quantity') > 0 ? 'success' : 'neutral'}
              primaryButtonClickable={sumBy(order, 'quantity') > 0}
              onPrimaryClick={() => updatePage('CHECKOUT')}
            />
          </>
        )
   }
  </div>
);

export default Menu;
