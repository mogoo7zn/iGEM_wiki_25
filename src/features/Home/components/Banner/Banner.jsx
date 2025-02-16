import React from 'react';
import bannerImg from '@assets/images/banner.jpg';
import './Banner.css';

const Banner = React.memo(() => {
  return (
    <section id="banner">
      <div
        className="banner-background"
        style={{
          backgroundImage: `url(${bannerImg.src || bannerImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="inner">
        <h1 className="fade-in-left">
          TOMB RAIDER:
          <span>
            <br />a story beyond exile
            <br />
            <span className="fade-in-left custom-style">concluded by mogoo7zn</span>
          </span>
        </h1>
        <ul className="actions">
          <li>
            <a href="#one" className="button alt">
              Get Started
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
});

Banner.displayName = 'Banner';

export default Banner;
