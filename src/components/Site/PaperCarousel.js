'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import { event as gaEvent } from '../../../lib/gtag';
import { COLORS } from './tokens';

const CARD_WIDTH = 360;
const CARD_HEIGHT = 468; // ~1:1.3 — a Letter page shows almost whole, A4 loses the bottom ~8%
// Cards shrink below CARD_WIDTH on narrow columns, always leaving a peek of the next card.
const CARD_BASIS = `min(${CARD_WIDTH}px, 85%)`;
const GAP = 16;
const ARROW_SIZE = 32;
const EDGE_TOLERANCE = 2;

// Only self-hosted PDFs (public/files/<name>.pdf) get a thumbnail, produced by
// scripts/make-paper-thumbnails.sh as public/images/papers/<name>.png (3x CARD_WIDTH wide).
const SELF_HOSTED_PDF = /^(?:https?:\/\/mariusmercier\.github\.io)?\/files\/([^/]+)\.pdf$/;

export const thumbnailFor = (pdfUrl) => {
  const match = SELF_HOSTED_PDF.exec(pdfUrl || '');
  return match ? `/images/papers/${match[1]}.png` : null;
};

const arrowStyle = (side) => ({
  position: 'absolute',
  top: '50%',
  [side]: -ARROW_SIZE / 2,
  transform: 'translateY(-50%)',
  width: ARROW_SIZE,
  height: ARROW_SIZE,
  padding: 0,
  borderRadius: '50%',
  border: `0.5px solid ${COLORS.line}`,
  color: COLORS.ink,
  fontSize: 20,
  lineHeight: 1,
  zIndex: 2,
  // background / cursor / opacity change on :hover and :disabled, so they live in
  // .paper-carousel-arrow in src/static/css/main.scss (inline styles would override them).
});

const PaperCarousel = ({ papers }) => {
  const scrollerRef = useRef(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: true });

  // Entries with a numeric `selected` (1 = first) and a self-hosted PDF, in that order.
  const cards = useMemo(() => papers
    .filter((p) => Number.isFinite(p.selected))
    .sort((a, b) => a.selected - b.selected)
    .flatMap((p) => {
      const pdf = p.links && p.links.pdf;
      const thumbnail = thumbnailFor(pdf);
      return thumbnail ? [{ title: p.title, pdf, thumbnail }] : [];
    }), [papers]);

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxLeft = el.scrollWidth - el.clientWidth;
    const atStart = el.scrollLeft <= EDGE_TOLERANCE;
    const atEnd = el.scrollLeft >= maxLeft - EDGE_TOLERANCE;
    setEdges((prev) => (
      prev.atStart === atStart && prev.atEnd === atEnd ? prev : { atStart, atEnd }
    ));
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return undefined;
    updateEdges();
    el.addEventListener('scroll', updateEdges, { passive: true });
    window.addEventListener('resize', updateEdges);
    return () => {
      el.removeEventListener('scroll', updateEdges);
      window.removeEventListener('resize', updateEdges);
    };
  }, [updateEdges, cards.length]);

  const scrollByCards = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.firstElementChild;
    const step = first ? first.getBoundingClientRect().width + GAP : el.clientWidth;
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  if (cards.length === 0) return null;

  return (
    <section aria-label="Selected papers" style={{ position: 'relative' }}>
      <button
        type="button"
        className="paper-carousel-arrow"
        aria-label="Previous papers"
        disabled={edges.atStart}
        onClick={() => scrollByCards(-1)}
        style={arrowStyle('left')}
      >
        &lsaquo;
      </button>
      <div
        ref={scrollerRef}
        className="paper-carousel"
        style={{
          display: 'flex',
          gap: GAP,
          overflowX: 'auto',
          overscrollBehaviorX: 'contain',
          scrollSnapType: 'x proximity',
          // Room for the 3px hover lift and its shadow: overflow-x: auto also clips vertically.
          padding: '8px 0 16px',
        }}
      >
        {cards.map(({ title, pdf, thumbnail }) => (
          <a
            key={thumbnail}
            className="paper-card"
            href={pdf}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => gaEvent({
              action: 'publication_link_click',
              category: 'publication',
              label: `${title} — thumbnail`,
            })}
            style={{
              flex: `0 0 ${CARD_BASIS}`,
              scrollSnapAlign: 'start',
              display: 'block',
              lineHeight: 0,
            }}
          >
            <img
              src={thumbnail}
              alt={title}
              width={CARD_WIDTH}
              height={CARD_HEIGHT}
              loading="lazy"
              decoding="async"
              draggable={false}
              style={{
                display: 'block',
                width: '100%',
                height: 'auto',
                aspectRatio: `${CARD_WIDTH} / ${CARD_HEIGHT}`,
                objectFit: 'cover',
                objectPosition: 'top',
                border: `0.5px solid ${COLORS.line}`,
                background: COLORS.panel,
              }}
            />
          </a>
        ))}
      </div>
      <button
        type="button"
        className="paper-carousel-arrow"
        aria-label="Next papers"
        disabled={edges.atEnd}
        onClick={() => scrollByCards(1)}
        style={arrowStyle('right')}
      >
        &rsaquo;
      </button>
    </section>
  );
};

PaperCarousel.propTypes = {
  papers: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    selected: PropTypes.number,
    links: PropTypes.objectOf(PropTypes.string),
  })).isRequired,
};

export default PaperCarousel;
