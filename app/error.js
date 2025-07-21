'use client';

import React from 'react';

export default function Error({ error, reset }) {
  return (
    <div className="error-page">
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}