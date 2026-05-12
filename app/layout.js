import React from 'react';
import PropTypes from 'prop-types';
import Script from 'next/script';
import Providers from './providers';
import { GA_TRACKING_ID } from '../lib/gtag';
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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300..700;1,8..60,300..700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
    </head>
    <body>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', { send_page_view: false });
        `}
      </Script>
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
