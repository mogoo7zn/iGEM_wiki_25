import React from 'react';
import introImg from '@assets/images/intro.jpg';
import './One.css';

const One = () => {
  return (
    <section id="one">
      <div className="inner">
        <header>
          <h2>Intro</h2>
        </header>
        <div className="content">
          <p>
            Tomb Raider is a globally recognized action-adventure video game franchise that debuted
            in 1996, created by Core Design and published by Eidos Interactive (later acquired by
            Square Enix and now owned by Embracer Group). The series follows the adventures of Lara
            Croft, an intelligent and athletic British archaeologist who explores ancient tombs,
            uncovering secrets, solving puzzles, and battling enemies.
          </p>
          <img src={introImg} loading="lazy" alt="Intro Tomb" className="responsive-image" />
        </div>
      </div>
    </section>
  );
};

export default One;
