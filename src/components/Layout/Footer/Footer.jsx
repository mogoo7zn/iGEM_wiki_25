import React from 'react';
import styles from './Footer.module.scss';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.branding}>
            <h3 className={styles.logo}>iGEM Team 2025</h3>
            <p>Innovating synthetic biology solutions for a better world.</p>
          </div>

          <div className={styles.links}>
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/team">Team</Link>
              </li>
              <li>
                <Link href="/project">Project</Link>
              </li>
              <li>
                <Link href="/results">Results</Link>
              </li>
            </ul>
          </div>

          <div className={styles.links}>
            <h4>Resources</h4>
            <ul>
              <li>
                <a href="https://igem.org" target="_blank" rel="noopener noreferrer">
                  iGEM Foundation
                </a>
              </li>
              <li>
                <a href="https://parts.igem.org" target="_blank" rel="noopener noreferrer">
                  Registry of Parts
                </a>
              </li>
              <li>
                <a href="https://igem.org/resources" target="_blank" rel="noopener noreferrer">
                  iGEM Resources
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.contact}>
            <h4>Contact Us</h4>
            <p>Email: team@example.edu</p>
            <div className={styles.social}>
              <a href="#" aria-label="Twitter">
                <i className="fa fa-twitter"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fa fa-instagram"></i>
              </a>
              <a href="#" aria-label="GitHub">
                <i className="fa fa-github"></i>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {currentYear} iGEM Team. All rights reserved.</p>
          <p>
            Built with{' '}
            <span role="img" aria-label="heart">
              ❤️
            </span>{' '}
            for iGEM 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
