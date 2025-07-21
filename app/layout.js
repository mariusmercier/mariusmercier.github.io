import React from 'react';
import Providers from './providers';
import '../src/static/css/main.scss';

export const metadata = {
  title: {
    default: 'Marius Mercier',
    template: '%s | Marius Mercier',
  },
  description: "Marius Mercier's personal website.",
};

const RootLayout = ({ children }) => {
  return (
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
};

export default RootLayout;