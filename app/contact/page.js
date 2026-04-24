import React from 'react';
import getMarkdownContent from '../../lib/markdown';
import getLastUpdated from '../../lib/lastUpdated';
import SiteScroll from '../../src/components/Site/SiteScroll';

const ContactPage = () => (
  <SiteScroll
    aboutMarkdown={getMarkdownContent('about.md')}
    lastUpdated={getLastUpdated()}
    initialAnchor="contact"
  />
);

export default ContactPage;
