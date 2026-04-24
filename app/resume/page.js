import React from 'react';
import getMarkdownContent from '../../lib/markdown';
import getLastUpdated from '../../lib/lastUpdated';
import SiteScroll from '../../src/components/Site/SiteScroll';

const ResumePage = () => (
  <SiteScroll
    aboutMarkdown={getMarkdownContent('about.md')}
    lastUpdated={getLastUpdated()}
    initialAnchor="cv"
  />
);

export default ResumePage;
