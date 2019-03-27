import React, { forwardRef } from 'react';

import '../styles/containers/closed.css';

const Closed = forwardRef((props, ref) => (
  <div ref={ref} {...props} className="container-popup">
    <div className="popup">Sorry, the counter is closed</div>
  </div>
));

export default Closed;
