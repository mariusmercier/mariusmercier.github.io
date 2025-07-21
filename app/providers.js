'use client';

import React from 'react';
import PropTypes from 'prop-types';

import Analytics from '../src/components/Template/Analytics';
import Navigation from '../src/components/Template/Navigation';
import SideBar from '../src/components/Template/SideBar';
import ScrollToTop from '../src/components/Template/ScrollToTop';

const Providers = ({ children }) => (
  <>
    <Analytics />
    <ScrollToTop />
    <div id="wrapper">
      <Navigation />
      <div id="main">{children}</div>
      <SideBar />
    </div>
  </>
);

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers;
