'use client';

import React from 'react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>Page Not Found</h1>
      <p>
        Return <Link href="/">home</Link>.
      </p>
    </div>
  );
};

export default NotFound;