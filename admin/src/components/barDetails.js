import React from 'react';

import MenuContainer from './menuContainer';
import StaffContainer from './staffContainer';

const BarDetails = ({
  token, data, addMenu, deleteMenu, addStaffMember, deleteStaffMember,
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
  </div>
);


export default BarDetails;
