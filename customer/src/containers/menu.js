import React from 'react';

import SecondaryHead from '../ui/secondaryHead';
import MenuItem from '../ui/menuItem';
import Loader from '../ui/loader';
import Logo from '../ui/logo';
import Footer from '../ui/footer';

import '../styles/containers/menu.css';

const Menu = ({ bar: { menu, name: barName }, updatePage }) => (
  <div className="menu">
    {
      !menu
        ? <Loader />
        : (
          <>
            <Logo logoPath="/logo.jpg" barName={barName} />
            <div className="menu__categories">
              {
                menu.map(({ name: categoryName, items }) => (
                  <div key={categoryName} className="category">
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
              primaryButtonName="Checkout"
              onPrimaryClick={() => updatePage('CHECKOUT')}
            />
          </>
        )
   }
  </div>
);

export default Menu;
