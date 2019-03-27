import React, { forwardRef } from 'react';
import { sumBy } from 'lodash';

import SecondaryHead from '../ui/secondaryHead';
import MenuItem from '../ui/menuItem';
import Loader from '../ui/loader';
import Footer from '../ui/footer';

import '../styles/containers/menu.css';

const Menu = forwardRef((props, ref) => {
  const {
    bar: { menu }, updatePage, order, total, isMenuOpen,
  } = props;
  return (
    <div ref={ref} className="menu">
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
                primaryButtonName={sumBy(order, 'quantity') > 0 ? `Checkout (${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(total)})` : 'Nothing Selected'}
                primaryButtonType={sumBy(order, 'quantity') > 0 ? 'success' : 'neutral'}
                primaryButtonClickable={sumBy(order, 'quantity') > 0}
                onPrimaryClick={() => isMenuOpen()
                  .then(isOpen => (isOpen ? updatePage('CHECKOUT') : updatePage('CLOSED')))
                }
              />
            </>
          )
    }
    </div>
  );
});

export default Menu;
