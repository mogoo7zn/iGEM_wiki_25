import React from 'react';
import bannerImg from '@assets/images/leukemia2.jpg';
import introImg2 from '@assets/images/W231FoScGgHRYAul-generated_image.jpg'
import './Banner.css';
{/* 因为文档里面只有文字没有图片，所以我就直接在网上找了几张相关的图片（不过我感觉蓝色配粉红色还挺好看的）*/}

const Banner = React.memo(() => {
  return (
    <section id="banner">
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

Banner.displayName = 'Banner';

export default Banner;
