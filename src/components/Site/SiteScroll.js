'use client';

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import publications from '../../data/publications';
import contacts from '../../data/contact';

const COLORS = {
  bg: '#f3efe6',
  panel: '#ebe6d8',
  ink: '#16130e',
  muted: '#6a6253',
  line: '#d0c8b4',
  accent: '#5a4a2a',
  marker: '#a8724c',
};

const FONTS = {
  serif: '"Source Serif 4", "Source Serif Pro", Georgia, serif',
  body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
};

const SECTIONS = [
  ['top', '00', 'Index'],
  ['about', '01', 'About'],
  ['publications', '02', 'Publications'],
  ['cv', '03', 'CV'],
  ['contact', '04', 'Contact'],
];

const MOBILE_BREAKPOINT = 720;
const NAV_OFFSET_DESKTOP = 64;
const NAV_OFFSET_MOBILE = 52;

const NAV_BUTTON_RESET = {
  background: 'transparent',
  border: 'none',
  padding: 0,
  textAlign: 'left',
  font: 'inherit',
  color: 'inherit',
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

function scrollToSection(id, isMobile) {
  if (typeof window === 'undefined') return;
  const target = document.querySelector(`[data-sec="${id}"]`);
  if (!target) return;
  const offset = isMobile ? NAV_OFFSET_MOBILE : NAV_OFFSET_DESKTOP;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

function stripWrappingParagraph(children) {
  if (Array.isArray(children) && children.length === 1) {
    const only = children[0];
    if (only && only.props && only.type === 'p') return only.props.children;
  }
  return children;
}

function displayForContact(entry) {
  const { link, label } = entry;
  if (label === 'Email') return link.replace('mailto:', '');
  // Strip protocol + trailing slash for display
  return link.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

function labelKey(label) {
  if (label === 'BlueSky') return 'bluesky';
  return label.toLowerCase();
}

const ACTION_LABELS = {
  pdf: 'pdf',
  esm: 'esm',
  code: 'code',
  doi: 'doi',
  preprint: 'preprint',
};

const Kicker = ({ children }) => (
  <div
    style={{
      fontFamily: FONTS.mono,
      fontSize: 11,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: COLORS.muted,
      marginBottom: 14,
      paddingTop: 20,
    }}
  >
    {children}
  </div>
);

Kicker.propTypes = { children: PropTypes.node.isRequired };

const Chip = ({ children }) => (
  <span
    style={{
      padding: '4px 10px',
      border: `0.5px solid ${COLORS.line}`,
      background: COLORS.panel,
      color: COLORS.ink,
      letterSpacing: '0.02em',
    }}
  >
    {children}
  </span>
);

Chip.propTypes = { children: PropTypes.node.isRequired };

const Grp = ({ label }) => (
  <div
    style={{
      fontFamily: FONTS.mono,
      fontSize: 10.5,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: COLORS.muted,
      marginTop: 28,
      marginBottom: 8,
    }}
  >
    {label}
  </div>
);

Grp.propTypes = { label: PropTypes.string.isRequired };

const SectionHeader = ({
  id,
  n,
  title,
  note,
}) => (
  <div
    data-sec={id}
    style={{
      marginBottom: 28,
      paddingTop: 64,
      borderTop: `0.5px solid ${COLORS.line}`,
    }}
  >
    <Kicker>§ {n} — {note}</Kicker>
    <h2
      style={{
        fontFamily: FONTS.serif,
        fontSize: 'clamp(30px, 6vw, 40px)',
        fontWeight: 400,
        letterSpacing: '-0.02em',
        margin: 0,
        lineHeight: 1.05,
      }}
    >
      {title}
    </h2>
  </div>
);

SectionHeader.propTypes = {
  id: PropTypes.string.isRequired,
  n: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
};

const AuthorsList = ({ authors }) => (
  <>
    {authors.map((a, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <React.Fragment key={i}>
        <span style={a.bold ? { color: COLORS.ink, fontWeight: 500 } : undefined}>
          {a.name}
          {a.mark ? <sup>{a.mark}</sup> : null}
        </span>
        {i < authors.length - 1 ? ', ' : ''}
      </React.Fragment>
    ))}
  </>
);

AuthorsList.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    bold: PropTypes.bool,
    mark: PropTypes.string,
  })).isRequired,
};

const ContactLine = ({ label, href, display }) => {
  const content = (
    <>
      <span style={{ color: COLORS.marker }}>→</span> {display}
    </>
  );
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr',
        gap: 14,
        alignItems: 'baseline',
        padding: '2px 0',
      }}
    >
      <span style={{ color: COLORS.muted }}>{label}</span>
      {href ? (
        <a
          href={href}
          target={href.startsWith('mailto:') ? undefined : '_blank'}
          rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
          style={{ color: COLORS.ink, wordBreak: 'break-word' }}
        >
          {content}
        </a>
      ) : (
        <span style={{ color: COLORS.ink, wordBreak: 'break-word' }}>{content}</span>
      )}
    </div>
  );
};

ContactLine.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  display: PropTypes.string.isRequired,
};

ContactLine.defaultProps = { href: null };

const TopNav = ({
  onJump,
  isMobile,
  open,
  setOpen,
  anchor,
}) => (
  <div
    style={{
      borderBottom: `0.5px solid ${COLORS.line}`,
      background: COLORS.bg,
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}
  >
    <div
      style={{
        maxWidth: 1080,
        margin: '0 auto',
        padding: isMobile ? '14px 20px' : '16px 56px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: FONTS.mono,
        fontSize: 12,
      }}
    >
      <div
        onClick={() => onJump('top')}
        style={{ cursor: 'pointer', letterSpacing: '0.02em' }}
      >
        <span style={{ color: COLORS.marker }}>→</span> marius.mercier
        {!isMobile && <span style={{ color: COLORS.muted }}> / ens-psl</span>}
      </div>
      {isMobile ? (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          style={{
            background: 'transparent',
            border: `0.5px solid ${COLORS.line}`,
            padding: '4px 10px',
            fontFamily: FONTS.mono,
            fontSize: 11,
            color: COLORS.ink,
            cursor: 'pointer',
            letterSpacing: '0.04em',
          }}
        >
          {open ? '× close' : '☰ menu'}
        </button>
      ) : (
        <div style={{ color: COLORS.muted, letterSpacing: '0.04em' }}>
          computational social cognition · paris · v.2026
        </div>
      )}
    </div>
    {isMobile && open && (
      <div
        style={{
          borderTop: `0.5px solid ${COLORS.line}`,
          background: COLORS.bg,
          padding: '8px 20px 14px',
        }}
      >
        {SECTIONS.map(([k, n, v]) => (
          <button
            type="button"
            key={k}
            onClick={() => onJump(k)}
            style={{
              ...NAV_BUTTON_RESET,
              display: 'grid',
              gridTemplateColumns: '32px 1fr',
              alignItems: 'center',
              padding: '10px 0',
              width: '100%',
              fontFamily: FONTS.mono,
              fontSize: 13,
              color: anchor === k ? COLORS.ink : COLORS.muted,
              cursor: 'pointer',
            }}
          >
            <span style={{ color: COLORS.muted }}>{n}</span>
            <span>{v}</span>
          </button>
        ))}
      </div>
    )}
  </div>
);

TopNav.propTypes = {
  onJump: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  anchor: PropTypes.string.isRequired,
};

const Sidebar = ({ anchor, onJump, lastUpdated }) => (
  <div style={{ position: 'sticky', top: 88, alignSelf: 'start' }}>
    <div
      style={{
        width: 160,
        height: 180,
        marginBottom: 24,
        border: `0.5px solid ${COLORS.line}`,
        overflow: 'hidden',
        background: COLORS.panel,
      }}
    >
      <img
        src="/images/me.jpg"
        alt="Marius Mercier"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          filter: 'saturate(0.9)',
        }}
      />
    </div>
    <div
      style={{
        fontFamily: FONTS.mono,
        fontSize: 10,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: COLORS.muted,
        marginBottom: 16,
      }}
    >
      Sections
    </div>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {SECTIONS.map(([k, n, v]) => {
        const active = anchor === k;
        return (
          <button
            type="button"
            key={k}
            onClick={() => onJump(k)}
            style={{
              ...NAV_BUTTON_RESET,
              display: 'grid',
              gridTemplateColumns: '32px 1fr',
              alignItems: 'center',
              padding: '9px 0',
              width: '100%',
              fontFamily: FONTS.mono,
              fontSize: 12,
              color: active ? COLORS.ink : COLORS.muted,
              cursor: 'pointer',
              borderLeft: active ? `2px solid ${COLORS.marker}` : '2px solid transparent',
              paddingLeft: 12,
              transition: 'color .12s, border-color .12s',
            }}
          >
            <span style={{ color: COLORS.muted }}>{n}</span>
            <span style={{ letterSpacing: '0.02em' }}>{v}</span>
          </button>
        );
      })}
    </div>
    <div
      style={{
        marginTop: 40,
        paddingTop: 20,
        borderTop: `0.5px solid ${COLORS.line}`,
        fontFamily: FONTS.mono,
        fontSize: 10.5,
        color: COLORS.muted,
        lineHeight: 1.7,
        letterSpacing: '0.02em',
      }}
    >
      last updated<br />
      <span style={{ color: COLORS.ink }}>{lastUpdated}</span>
    </div>
  </div>
);

Sidebar.propTypes = {
  anchor: PropTypes.string.isRequired,
  onJump: PropTypes.func.isRequired,
  lastUpdated: PropTypes.string.isRequired,
};

const Intro = ({ isMobile }) => (
  <div data-sec="top" style={{ paddingTop: isMobile ? 20 : 32, paddingBottom: 24 }}>
    <div
      style={{
        fontFamily: FONTS.mono,
        fontSize: 11,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: COLORS.muted,
        marginBottom: 24,
      }}
    >
      §  00  —  Marius Mercier
    </div>
    <h1
      style={{
        fontFamily: FONTS.serif,
        fontSize: 'clamp(32px, 6.5vw, 46px)',
        fontWeight: 400,
        letterSpacing: '-0.025em',
        margin: 0,
        lineHeight: 1.1,
        textWrap: 'balance',
      }}
    >
      PhD student in social cognition, studying how impressions
      form and update under{' '}
      <em style={{ color: COLORS.marker, fontStyle: 'italic' }}>
        noisy evidence
      </em>.
    </h1>
    <div
      style={{
        marginTop: 32,
        display: 'flex',
        gap: 10,
        flexWrap: 'wrap',
        fontFamily: FONTS.mono,
        fontSize: 11,
        letterSpacing: '0.04em',
      }}
    >
      <Chip>ENS–PSL</Chip>
      <Chip>Paris</Chip>
      <Chip>Supervisor: Hugo Mercier</Chip>
    </div>
  </div>
);

Intro.propTypes = { isMobile: PropTypes.bool.isRequired };

const markdownComponents = {
  h1: () => null,
  h2: ({ children }) => (
    <h3
      style={{
        fontFamily: FONTS.mono,
        fontSize: 11,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: COLORS.muted,
        marginTop: 28,
        marginBottom: 10,
        fontWeight: 500,
      }}
    >
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p style={{ marginTop: 0, marginBottom: 16 }}>{children}</p>
  ),
  a: ({ children, href }) => {
    const samePage = href && (href.startsWith('/') || href.startsWith('#'));
    const isCitation = href && /^#(pub|wp)-\d+$/.test(href);
    if (isCitation) {
      return (
        <a
          href={href}
          style={{
            fontFamily: FONTS.mono,
            fontSize: '0.85em',
            color: COLORS.marker,
            letterSpacing: '0.02em',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
          }}
        >
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        {...(samePage ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
        style={{
          color: COLORS.ink,
          borderBottom: `1px dotted ${COLORS.muted}`,
          cursor: 'pointer',
        }}
      >
        {children}
      </a>
    );
  },
  strong: ({ children }) => (
    <strong style={{ fontWeight: 600, color: COLORS.ink }}>{children}</strong>
  ),
  em: ({ children }) => (
    <em style={{ fontStyle: 'italic' }}>{children}</em>
  ),
  hr: () => (
    <hr
      style={{
        border: 'none',
        borderTop: `0.5px solid ${COLORS.line}`,
        margin: '28px 0',
      }}
    />
  ),
  ol: ({ children }) => (
    <ol style={{ paddingLeft: 20, marginBottom: 16 }}>
      {stripWrappingParagraph(children)}
    </ol>
  ),
  li: ({ children }) => (
    <li style={{ marginBottom: 6 }}>{children}</li>
  ),
};

const About = ({ aboutMarkdown, wordCount }) => (
  <>
    <SectionHeader id="about" n="01" note={`${wordCount} words`} title="About" />
    <div style={{ fontSize: 15.5, lineHeight: 1.75 }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {aboutMarkdown}
      </ReactMarkdown>
    </div>
  </>
);

About.propTypes = {
  aboutMarkdown: PropTypes.string.isRequired,
  wordCount: PropTypes.number.isRequired,
};

const PubRow = ({ entry, id }) => {
  const {
    n,
    year,
    authors,
    title,
    venue,
    note,
    links,
  } = entry;
  const actions = Object.entries(links || {}).filter(([, href]) => href);
  return (
    <div
      {...(id ? { id } : {})}
      style={{
        display: 'grid',
        gridTemplateColumns: '36px 1fr',
        gap: 16,
        padding: '18px 0',
        borderTop: `0.5px dashed ${COLORS.line}`,
        alignItems: 'baseline',
        scrollMarginTop: 80,
      }}
    >
      <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.muted }}>
        [{n}]
      </div>
      <div>
        <div style={{ fontSize: 14.5, lineHeight: 1.55, marginBottom: 6 }}>
          <span style={{ color: COLORS.muted }}>
            <AuthorsList authors={authors} />
          </span>{' '}
          <span style={{ color: COLORS.muted }}>({year}) </span>
          <span style={{ color: COLORS.ink }}>{title}</span>
          <span style={{ color: COLORS.muted, fontStyle: 'italic' }}>. {venue}.</span>
        </div>
        {note && (
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 10.5,
              color: COLORS.muted,
              marginBottom: 6,
              letterSpacing: '0.02em',
            }}
          >
            {note}
          </div>
        )}
        {actions.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: 14,
              flexWrap: 'wrap',
              fontFamily: FONTS.mono,
              fontSize: 11,
              color: COLORS.marker,
            }}
          >
            {actions.map(([key, href]) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: COLORS.marker, cursor: 'pointer' }}
              >
                → {ACTION_LABELS[key] || key}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

PubRow.propTypes = {
  entry: PropTypes.shape({
    n: PropTypes.number.isRequired,
    year: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      bold: PropTypes.bool,
      mark: PropTypes.string,
    })).isRequired,
    title: PropTypes.string.isRequired,
    venue: PropTypes.string.isRequired,
    note: PropTypes.string,
    links: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  id: PropTypes.string,
};

PubRow.defaultProps = { id: undefined };

const Publications = () => (
  <>
    <SectionHeader id="publications" n="02" note="peer reviewed · working" title="Publications" />
    <Grp label="Peer-reviewed articles" />
    {publications.peerReviewed.map((p) => (
      <PubRow key={`pr-${p.n}`} id={`pub-${p.n}`} entry={p} />
    ))}
    <Grp label="Working papers" />
    {publications.workingPapers.map((p) => (
      <PubRow key={`wp-${p.n}`} id={`wp-${p.n}`} entry={p} />
    ))}
  </>
);

const CV = ({ isMobile }) => (
  <>
    <SectionHeader id="cv" n="03" note="pdf below" title="Curriculum Vitae" />
    <div
      style={{
        border: `0.5px solid ${COLORS.line}`,
        background: COLORS.panel,
        padding: 2,
      }}
    >
      <iframe
        title="Marius Mercier CV"
        src="/cv/cv.pdf"
        width="100%"
        height={isMobile ? 620 : 880}
        style={{ border: 0, display: 'block', background: COLORS.bg }}
      >
        Your browser does not support embedded PDFs.
      </iframe>
    </div>
    <div style={{ marginTop: 18 }}>
      <a
        href="/cv/cv.pdf"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: FONTS.mono,
          fontSize: 12,
          color: COLORS.marker,
          cursor: 'pointer',
          letterSpacing: '0.04em',
        }}
      >
        → download full cv (pdf)
      </a>
    </div>
  </>
);

CV.propTypes = { isMobile: PropTypes.bool.isRequired };

const Contact = () => {
  // Order: email first (preferred), then the rest.
  const email = contacts.find((c) => c.label === 'Email');
  const others = contacts.filter((c) => c.label !== 'Email');
  return (
    <>
      <SectionHeader id="contact" n="04" note="preferred: email" title="Contact" />
      <div style={{ fontFamily: FONTS.mono, fontSize: 13, lineHeight: 1.9 }}>
        {email && (
          <ContactLine
            label="email"
            href={email.link}
            display={displayForContact(email)}
          />
        )}
        {others.map((c) => (
          <ContactLine
            key={c.label}
            label={labelKey(c.label)}
            href={c.link}
            display={displayForContact(c)}
          />
        ))}
      </div>
      <p
        style={{
          marginTop: 32,
          fontSize: 14,
          color: COLORS.muted,
          maxWidth: 480,
        }}
      >
        Feel free to get in touch. Happy to hear about potential collaborations.
      </p>
    </>
  );
};

const SiteScroll = ({ aboutMarkdown, lastUpdated, initialAnchor }) => {
  const isMobile = useIsMobile();
  const [anchor, setAnchor] = useState('top');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const didInitialScroll = useRef(false);

  const jump = useCallback((id) => {
    scrollToSection(id, isMobile);
    setMobileNavOpen(false);
  }, [isMobile]);

  useEffect(() => {
    if (didInitialScroll.current) return;
    didInitialScroll.current = true;
    if (initialAnchor && initialAnchor !== 'top') {
      // Run after layout so offsetTop is stable.
      setTimeout(() => {
        const target = document.querySelector(`[data-sec="${initialAnchor}"]`);
        if (!target) return;
        const offset = window.innerWidth < MOBILE_BREAKPOINT
          ? NAV_OFFSET_MOBILE
          : NAV_OFFSET_DESKTOP;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'auto' });
      }, 30);
    }
  }, [initialAnchor]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 140;
      let cur = 'top';
      SECTIONS.forEach(([id]) => {
        const el = document.querySelector(`[data-sec="${id}"]`);
        if (el && el.getBoundingClientRect().top + window.scrollY <= y) cur = id;
      });
      setAnchor(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const wordCount = React.useMemo(() => {
    if (!aboutMarkdown) return 0;
    return aboutMarkdown
      .split(/\s+/)
      .map((s) => s.replace(/\W/g, ''))
      .filter((s) => s.length)
      .length;
  }, [aboutMarkdown]);

  return (
    <div
      style={{
        background: COLORS.bg,
        color: COLORS.ink,
        fontFamily: FONTS.body,
        fontSize: isMobile ? 15 : 14.5,
        lineHeight: 1.65,
        letterSpacing: '-0.003em',
        minHeight: '100vh',
      }}
    >
      <TopNav
        onJump={jump}
        isMobile={isMobile}
        open={mobileNavOpen}
        setOpen={setMobileNavOpen}
        anchor={anchor}
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '220px 1fr',
          maxWidth: 1080,
          margin: '0 auto',
          gap: isMobile ? 0 : 80,
          padding: isMobile ? '24px 24px 80px' : '56px 56px 120px',
        }}
      >
        {!isMobile && <Sidebar anchor={anchor} onJump={jump} lastUpdated={lastUpdated} />}
        <div style={{ maxWidth: isMobile ? '100%' : 640, width: '100%' }}>
          <Intro isMobile={isMobile} />
          <About aboutMarkdown={aboutMarkdown} wordCount={wordCount} />
          <Publications />
          <CV isMobile={isMobile} />
          <Contact />
        </div>
      </div>
    </div>
  );
};

SiteScroll.propTypes = {
  aboutMarkdown: PropTypes.string.isRequired,
  lastUpdated: PropTypes.string,
  initialAnchor: PropTypes.string,
};

SiteScroll.defaultProps = {
  lastUpdated: '',
  initialAnchor: 'top',
};

export default SiteScroll;
