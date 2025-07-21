'use client';

import React from 'react';
import PropTypes from 'prop-types';

const GlobalError = ({ reset }) => (
  <div>
    <h2>Something went wrong!</h2>
    <button type="button" onClick={() => reset()}>Try again</button>
  </div>
);

GlobalError.propTypes = {
  reset: PropTypes.func.isRequired,
};

export default GlobalError;
