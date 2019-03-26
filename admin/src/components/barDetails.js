import React from 'react';

import MenuContainer from './menuContainer';
import StaffContainer from './staffContainer';

const BarDetails = ({
  token, data, addMenu, deleteMenu, addStaffMember, deleteStaffMember,
}) => (
  <div>
    <div className="barDetails">
      <MenuContainer
        token={token}
        data={data.menus}
        barId={data._id}
        addMenu={addMenu}
        deleteMenu={deleteMenu}
      />
      <StaffContainer
        token={token}
        data={data.staff}
        barId={data._id}
        addStaffMember={addStaffMember}
        deleteStaffMember={deleteStaffMember}
      />
    </div>
  </div>
);


export default BarDetails;
