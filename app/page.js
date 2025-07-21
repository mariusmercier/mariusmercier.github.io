import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import getMarkdownContent from '../lib/markdown';

const HomePage = () => {
  const markdown = getMarkdownContent('about.md');

  const count = markdown.split(/\s+/)
    .map((s) => s.replace(/\W/g, ''))
    .filter((s) => s.length).length;

  return (
    <article className="post markdown" id="index">
      <header>
        <div className="title">
          <h2><Link href="/">About Me</Link></h2>
          <p>(in {count} words)</p>
        </div>
      </header>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdown}
      </ReactMarkdown>
    </article>
  );
};

export default HomePage;
