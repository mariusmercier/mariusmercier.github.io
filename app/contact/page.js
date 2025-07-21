'use client';

import React from 'react';
import Link from 'next/link';

import ContactIcons from '../../src/components/Contact/ContactIcons';

const ContactPage = () => {
  return (
    <article className="post" id="contact">
      <header>
        <div className="title">
          <h2>
            <Link href="/contact">Contact</Link>
          </h2>
        </div>
      </header>
      <div className="email-at">
        <p> Feel free to get in touch. You can email me at: MariusMercier1@gmail.com </p>
      </div>
      <ContactIcons />
    </article>
  );
};

export default ContactPage;