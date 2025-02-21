import React from 'react';
import introImg from '@assets/images/intro.jpg';
import './One.css';

const One = () => {
  return (
    <section id="one">
      <div className="inner">
        <header>
          <h2>Background</h2>
        </header>
        <div className="content">
          <p>
            Leukemia is a malignant hematologic tumor originating in the bone marrow. Conventional chemotherapy, while
            effective, can significantly harm the body, including adversely affecting the gut microbiota.
            <br />
            <br />
            Chemotherapy can disrupt the balance of the gut microbiota, leading to dysbiosis, which may contribute to
            gastrointestinal side effects and influence the overall health of patients. Studies have shown that fecal microbiota
            transplantation (FMT) can alleviate chemotherapy-induced gut microbiota disturbances, potentially improving
            patient outcomes.
          </p>
          <img src={introImg} loading="lazy" alt="Intro Tomb" className="responsive-image" />
        </div>
      </div>
    </section>
  );
};

export default One;
