import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Main from '../layouts/Main';
import Skills from '../components/Resume/Skills';
import { skills, categories } from '../data/resume/skills';

// Use the GitHub Pages path since that's where it will be hosted
const PDF_PATH = '/personal-site/resume.pdf';

const sections = {
  Skills: () => <Skills skills={skills} categories={categories} />,
};

const Resume = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
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

        <h3>My CV</h3>
        {isClient && (
          <iframe
            title="Resume"
            src={PDF_PATH}
            width="100%"
            height="900px"
            style={{ border: 0 }}
          >
            Your browser does not support iframes.
          </iframe>
        )}

        {Object.entries(sections).map(([name, Section]) => (
          <Section key={name} />
        ))}
      </article>
    </Main>
  );
};

export default Resume;
