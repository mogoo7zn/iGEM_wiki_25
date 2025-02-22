import React from 'react';
import bannerImg from '@assets/images/leukemia2.jpg';
import introImg2 from '@assets/images/W231FoScGgHRYAul-generated_image.jpg'
import './Banner.css';

const HomeBanner = React.memo(() => {
  return (
    <section id="home-banner" className='banner'>
      <div
        className="banner-background"
        style={{
          backgroundImage: `url(${introImg2.src || introImg2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="inner">
        <h1 className="fade-in-left">
          FMT:
          <span>
            <br />A way to contribute to the fight against leukemia
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

HomeBanner.displayName = 'HomeBanner';

export default HomeBanner;
