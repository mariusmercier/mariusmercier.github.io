import React from 'react';
import { Link } from 'react-router-dom';
import Main from '../layouts/Main';
import Skills from '../components/Resume/Skills';
import { skills, categories } from '../data/resume/skills';

const sections = {
  Skills: () => <Skills skills={skills} categories={categories} />,
};

const Resume = () => (
  <Main
    title="Resume"
    description="Marius Mercier's CV"
  >
    <article className="post" id="resume">
      <header>
        <div className="title">
          <h2>
            <Link to="/resume">Resume</Link>
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

      {/* Embed your PDF CV directly from the public folder */}
      <h3>My CV</h3>
      <iframe
        title="Resume"
        src="/resume.pdf"
        width="100%"
        height="900px"
        style={{ border: 0 }}
      >
        {/* If someone’s browser doesn’t support iframes, they’ll see this text */}
        Your browser does not support iframes.
      </iframe>

      {Object.entries(sections).map(([name, Section]) => (
        <Section key={name} />
      ))}
    </article>
  </Main>
);

export default Resume;
