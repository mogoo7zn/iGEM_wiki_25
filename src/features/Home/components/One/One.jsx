import React from 'react';
import introImg from '@assets/images/Leukemia1.jpg';
import introImg2 from '@assets/images/intro2.jpg';
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
            Leukemia is a malignant hematologic tumor originating <br/>in the bone marrow. Conventional chemotherapy, while
            effective, can significantly harm the body, including adversely affecting the gut microbiota.
          </p>
          <img src={introImg2} loading="lazy" alt="Introduce" className="responsive-image" />
        </div>
      </div>
    </section>
  );
};

export default One;
