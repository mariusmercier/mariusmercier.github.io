import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import getMarkdownContent from '../../lib/markdown';

// Custom link component that detects icon markers and renders appropriate icons
const CustomLink = ({ href, children, ...props }) => {
  // Get the text content - children can be a string or array
  const linkText = typeof children === 'string' ? children : (Array.isArray(children) ? children.join('') : '');

  // Check if the original markdown had icon markers
  const hasPDFMarker = linkText.includes('[PDF-ICON]');
  const hasGitHubMarker = linkText.includes('[GITHUB-ICON]');

  // Clean up the markers from the displayed text
  const cleanText = linkText.replace(/\[PDF-ICON\]\s*/g, '').replace(/\[GITHUB-ICON\]\s*/g, '');

  return (
    <a href={href} {...props}>
      {hasPDFMarker && <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: '5px', width: '1em', height: '1em' }} />}
      {hasGitHubMarker && <FontAwesomeIcon icon={faGithub} style={{ marginRight: '5px', width: '1em', height: '1em' }} />}
      {cleanText}
    </a>
  );
};

CustomLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
};

CustomLink.defaultProps = {
  href: '',
  children: null,
};

const PublicationsPage = () => {
  const rawMarkdown = getMarkdownContent('publications.md');

  return (
    <article className="post markdown" id="publications">
      <header>
        <div className="title">
          <h2><Link href="/publications">Publications</Link></h2>
        </div>
      </header>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom renderer for links to detect markers and add icons
          a: CustomLink,
        }}
      >
        {rawMarkdown}
      </ReactMarkdown>
    </article>
  );
};

export default PublicationsPage;
