import React from 'react';

import MenuContainer from './menuContainer';
import StaffContainer from './staffContainer';
import BarPoster from './barPoster';
import OrderHistory from './orderHistory';
import PaymentDetails from './paymentDetails';

const BarDetails = ({
  data, addMenu, deleteMenu, activateMenu, generateStaffCode, staffCode, updateIban, refreshHistory,
}) => (
  <div className="barDetails">
    <MenuContainer
      data={data.menus}
      activeMenu={data.activeMenu}
      barId={data._id}
      addMenu={addMenu}
      deleteMenu={deleteMenu}
      activateMenu={activateMenu}
    />
    <div className="barDetailsRightPanel">
      <BarPoster data={data} />
      <StaffContainer
        data={data.staff}
        barId={data._id}
        generateStaffCode={generateStaffCode}
        staffCode={staffCode}
      />
      <PaymentDetails
        barId={data._id}
        iban={data.iban}
        updateIban={updateIban}
      />
      <OrderHistory
        history={data.history}
        refreshHistory={refreshHistory}
      />
    </div>
  </div>
);


export default BarDetails;
