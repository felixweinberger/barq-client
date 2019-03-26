import React from 'react';

const StaffContainer = ({ barId, generateStaffCode, staffCode }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    generateStaffCode(barId);
  };
  return (
    <div className="staffContainer">
      <h2>Staff Login</h2>
      <h3>For security purposes, we recommend that you update your staff code every week.</h3>
      <div className="codeGenerator">
        <button className="clicker" type="button" value="Generate code" onClick={onSubmit}>Get New Login Code</button>
        <div className="staffCode">{staffCode}</div>
      </div>
    </div>
  );
};

export default StaffContainer;
