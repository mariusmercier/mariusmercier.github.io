'use client';

import React from 'react';

import Analytics from '../src/components/Template/Analytics';
import Navigation from '../src/components/Template/Navigation';
import SideBar from '../src/components/Template/SideBar';
import ScrollToTop from '../src/components/Template/ScrollToTop';

const Providers = ({ children }) => {
  return (
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
};

export default Providers;