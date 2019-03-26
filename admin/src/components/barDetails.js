import React from 'react';

import MenuContainer from './menuContainer';
import StaffContainer from './staffContainer';
import OrderHistory from './orderHistory';
import PaymentDetails from './paymentDetails';

const BarDetails = ({
  token, data, addMenu, deleteMenu, addStaffMember, deleteStaffMember, updateIban,
}) => (
  <div className="barDetails">
    <div>Menu Container</div>
    <MenuContainer
      token={token}
      data={data.menus}
      barId={data._id}
      addMenu={addMenu}
      deleteMenu={deleteMenu}
    />
    <div>Staff Container</div>
    <StaffContainer
      token={token}
      data={data.staff}
      barId={data._id}
      addStaffmember={addStaffMember}
      deleteStaffMember={deleteStaffMember}
    />
    <div>Payment Details</div>
    <PaymentDetails
      token={token}
      barId={data._id}
      iban={data.iban}
      updateIban={updateIban}
    />
    <div>Order History</div>
    <OrderHistory
      history={data.history}
    />
  </div>
);


export default BarDetails;
