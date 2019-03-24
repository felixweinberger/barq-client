import React from 'react';

import MenuContainer from './menuContainer';
import StaffContainer from './staffContainer';

const BarDetails = (props) => {
  const {
    token, data, addMenu, deleteMenu, addStaffMember, deleteStaffMember,
  } = props;
  return (
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
        addStaffMember={addStaffMember}
        deleteStaffMember={deleteStaffMember}
      />
    </div>
  );
};

export default BarDetails;
