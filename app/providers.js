'use client';

import React from 'react';
import PropTypes from 'prop-types';

import Analytics from '../src/components/Template/Analytics';

const Providers = ({ children }) => (
  <>
    <Analytics />
    {children}
  </>
);

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers;
