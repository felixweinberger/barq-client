import React from 'react';

const StaffContainerItem = ({ barId, data, deleteStaffMember }) => (
  <div>
    <h3>{data.name}</h3>
    <p>{data.email}</p>
    <button type="submit" onClick={() => deleteStaffMember(barId, data._id)}>Delete</button>
  </div>
);

export default StaffContainerItem;
