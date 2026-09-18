import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import PaperCarousel, { thumbnailFor } from '../components/Site/PaperCarousel';

describe('thumbnailFor', () => {
  it('maps a self-hosted absolute PDF URL to its thumbnail', () => {
    expect(thumbnailFor('https://mariusmercier.github.io/files/Mercier-2026a.pdf'))
      .toBe('/images/papers/Mercier-2026a.png');
  });

  it('maps a root-relative PDF path to its thumbnail', () => {
    expect(thumbnailFor('/files/Mercier-2025b.pdf')).toBe('/images/papers/Mercier-2025b.png');
  });

  it('returns null for externally hosted PDFs', () => {
    expect(thumbnailFor('https://ars.els-cdn.com/content/image/1-s2.0-S0010027726001009-mmc1.pdf'))
      .toBeNull();
  });

  it('returns null when there is no PDF link', () => {
    expect(thumbnailFor(undefined)).toBeNull();
    expect(thumbnailFor('')).toBeNull();
  });
});

describe('PaperCarousel', () => {
  const paper = (title, name, selected) => ({
    title,
    selected,
    links: { pdf: `https://mariusmercier.github.io/files/${name}.pdf` },
  });

  it('shows only entries with a `selected` rank, ordered by it', () => {
    const papers = [
      paper('Fourth', 'D', 4),
      paper('Second', 'B', 2),
      { title: 'Not selected', links: { pdf: '/files/X.pdf' } },
      paper('First', 'A', 1),
      { title: 'No pdf', selected: 3, links: { preprint: 'https://osf.io/x' } },
    ];
    render(<PaperCarousel papers={papers} />);
    const titles = screen.getAllByRole('link').map((a) => a.querySelector('img').alt);
    expect(titles).toEqual(['First', 'Second', 'Fourth']);
  });

  it('renders nothing when no entry is selected', () => {
    const { container } = render(<PaperCarousel papers={[{ title: 'X', links: {} }]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
