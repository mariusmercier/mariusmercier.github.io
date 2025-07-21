import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import getMarkdownContent from '../../lib/markdown';

// Custom link component to add icons
const CustomLink = ({ href, children, ...props }) => {
  const linkText = children?.[0];
  let icon = null;

  // Add PDF icon for PDF links (check both text and URL)
  if ((typeof linkText === 'string' && (
    linkText.trim().includes('PDF')
    || linkText.trim().includes('ESM')
    || linkText.trim().includes('Pre-print')
  )) || (href && href.includes('.pdf'))) {
    icon = <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: '5px' }} />;
  }

  // Add GitHub icon for GitHub/code links
  if (typeof linkText === 'string' && (
    linkText.includes('Code')
    || linkText.includes('Data')
    || href?.includes('github.com')
  )) {
    icon = <FontAwesomeIcon icon={faGithub} style={{ marginRight: '5px' }} />;
  }

  return (
    <a href={href} {...props}>
      {icon}
      {children}
    </a>
  );
};

const PublicationsPage = () => {
  const rawMarkdown = getMarkdownContent('publications.md');

  // Simply remove the icon tags and render the markdown normally
  const cleanedMarkdown = rawMarkdown
    .replace(/<PDF \/>/g, '')
    .replace(/<GitHub \/>/g, '');

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
          // Custom renderer for links to add icons
          a: CustomLink,
        }}
      >
        {cleanedMarkdown}
      </ReactMarkdown>
    </article>
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

export default PublicationsPage;
