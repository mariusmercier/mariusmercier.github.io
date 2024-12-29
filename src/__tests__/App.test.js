/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';

const jsonMock = jest.fn(() => Promise.resolve({}));
const textMock = jest.fn(() => Promise.resolve('# Test markdown'));

beforeAll(() => {
  // Mock scrollTo
  window.scrollTo = jest.fn();
  // Mock fetch
  global.fetch = jest.fn(() => Promise.resolve({
    json: jsonMock,
    text: textMock,
  }));
});

beforeEach(async () => {
  // Create root element
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
  await act(async () => {
    render(<App />);
  });
});

afterEach(() => {
  // Clean up
  document.body.innerHTML = '';
  jest.clearAllMocks();
});

describe('renders the app', () => {
  it('should render the app', async () => {
    expect.assertions(2);
    expect(document.getElementById('root')).toBeInTheDocument();
    expect(document.title).toContain('Marius Mercier');
  });

  it('should render the title', () => {
    expect.assertions(1);
    expect(document.title).toContain('Marius Mercier');
  });

  it('can navigate to /about', async () => {
    expect.assertions(4);
    const aboutLink = document.querySelector('#header > nav > ul > li:nth-child(1) > a');
    expect(aboutLink).toBeInTheDocument();
    await act(async () => {
      aboutLink.click();
    });
    expect(document.title).toContain('Marius Mercier');
    expect(window.location.pathname).toBe('/');
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('can navigate to /resume', async () => {
    expect.assertions(3);
    const resumeLink = document.querySelector('#header > nav > ul > li:nth-child(2) > a');
    expect(resumeLink).toBeInTheDocument();
    await act(async () => {
      await resumeLink.click();
    });
    expect(document.title).toContain('Resume |');
    expect(window.location.pathname).toBe('/resume');
  });

  it('can navigate to /publications', async () => {
    expect.assertions(3);
    const publicationsLink = document.querySelector('#header > nav > ul > li:nth-child(3) > a');
    expect(publicationsLink).toBeInTheDocument();
    await act(async () => {
      await publicationsLink.click();
    });
    expect(document.title).toContain('Publications |');
    expect(window.location.pathname).toBe('/publications');
  });
});
