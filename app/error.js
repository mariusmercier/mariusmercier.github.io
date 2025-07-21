'use client';

import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ reset }) => (
  <div className="error-page">
    <h2>Something went wrong!</h2>
    <button type="button" onClick={() => reset()}>Try again</button>
  </div>
);

Error.propTypes = {
  reset: PropTypes.func.isRequired,
};

export default Error;
