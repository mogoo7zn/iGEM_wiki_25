import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const bannerElement = document.getElementById('banner');
      if (bannerElement) {
        const bannerBottom = bannerElement.getBoundingClientRect().bottom;
        setIsScrolled(bannerBottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header id="header" className={isScrolled ? 'scrolled' : ''}>
        <div className="inner">
          <Link to="/" className="logo">
            USTC 2025 Wiki
          </Link>
          <nav id="nav" className={isNavOpen ? 'active' : ''}>
            <Link to="/">Home</Link>
            <Link to="/team">Team</Link>
            <Link to="/settings">Settings</Link>
          </nav>
          <a className="navPanelToggle" onClick={() => setIsNavOpen(!isNavOpen)} aria-label="Menu">
            <span className="fa fa-bars"></span>
          </a>
        </div>
      </header>
      {isNavOpen && <div className="navPanel" onClick={() => setIsNavOpen(false)} />}
    </>
  );
};

export default Header;
