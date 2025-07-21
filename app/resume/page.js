'use client';

import React from 'react';
import Link from 'next/link';

const sections = {
  CV: () => (
    <div className="cv-section">
      <h3 style={{ textAlign: 'center' }}>CV</h3>
      <iframe
        title="Resume"
        src="https://mariusmercier.github.io/cv/cv.pdf"
        width="100%"
        height="900px"
        style={{ border: 0 }}
      >
        Your browser does not support iframes.
      </iframe>
    </div>
  ),
};

const ResumePage = () => (
  <article className="post" id="resume">
    <header>
      <div className="title">
        <h2>
          <Link href="/resume">Resume</Link>
        </h2>
        <div className="link-container">
          {Object.keys(sections).map((sec) => (
            <h4 key={sec}>
              <a href={`#${sec.toLowerCase()}`}>{sec}</a>
            </h4>
          ))}
        </div>
      </div>
    </header>

    {Object.entries(sections).map(([name, Section]) => (
      <Section key={name} />
    ))}
  </article>
);

export default ResumePage;
