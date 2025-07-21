import React from 'react';
import PropTypes from 'prop-types';
import Providers from './providers';
import '../src/static/css/main.scss';

export const metadata = {
  title: {
    default: 'Marius Mercier',
    template: '%s | Marius Mercier',
  },
  description: "Marius Mercier's personal website.",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <head>
      <link
        href="//fonts.googleapis.com/css?family=Source+Sans+Pro:400,700|Raleway:400,800,900"
        rel="stylesheet"
      />
    </head>
    <body>
      <Providers>
        {children}
      </Providers>
    </body>
  </html>
);

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RootLayout;
