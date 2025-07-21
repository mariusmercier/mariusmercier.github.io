'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import ContactIcons from '../Contact/ContactIcons';

const SideBar = () => {
  const pathname = usePathname();

  return (
    <section id="sidebar">
      <section id="intro">
        <Link href="/" className="logo">
          <img src="/images/me.png" alt="" />
        </Link>
        <header>
          <h2>Marius Mercier</h2>
        </header>
      </section>

      <section className="blurb">
      <h2>About</h2>
      <p>Hi, I&apos;m Marius. I am a French PhD student in Social Psychology at <a href="https://en.wikipedia.org/wiki/%C3%89cole_normale_sup%C3%A9rieure_(Paris)">the Ecole Normale Supérieure</a>,
        part of <a href="https://psl.eu/en/university/psl-international-rankings"> Paris Sciences & Letters (PSL) University </a>.
      </p>
      <ul className="actions">
        <li>
          {!pathname.includes('/resume') ? (
            <Link href="/resume" className="button">
              Learn More
            </Link>
          ) : (
            <Link href="/" className="button">
              About Me
            </Link>
          )}
        </li>
      </ul>
      </section>

      <section id="footer">
        <ContactIcons />
      </section>
    </section>
  );
};

export default SideBar;
