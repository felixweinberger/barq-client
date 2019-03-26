import React from 'react';

import MenuContainer from './menuContainer';
import StaffContainer from './staffContainer';
import BarPoster from './barPoster';
import OrderHistory from './orderHistory';
import PaymentDetails from './paymentDetails';

const BarDetails = ({
  token, data, addMenu, deleteMenu, addStaffMember, deleteStaffMember,
  generateStaffCode, staffCode, updateIban, refreshHistory,
}) => (
  <div className="barDetails">
    <MenuContainer
      token={token}
      data={data.menus}
      barId={data._id}
      addMenu={addMenu}
      deleteMenu={deleteMenu}
    />
    <div className="barDetailsRightPanel">
      <BarPoster data={data} />
      <StaffContainer
        token={token}
        staffCode={staffCode}
        data={data.staff}
        barId={data._id}
        addStaffMember={addStaffMember}
        deleteStaffMember={deleteStaffMember}
        generateStaffCode={generateStaffCode}
      />
      <PaymentDetails
        token={token}
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
