'use client';

import React from 'react';
import PropTypes from 'prop-types';

const GlobalError = ({ reset }) => (
  <html lang="en">
    <body>
      <h2>Something went wrong!</h2>
      <button type="button" onClick={() => reset()}>Try again</button>
    </body>
  </html>
);

GlobalError.propTypes = {
  reset: PropTypes.func.isRequired,
};

export default GlobalError;
