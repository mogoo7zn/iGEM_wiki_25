'use client';
import React from 'react';
import styles from './Five.module.scss';

const Five = () => {
  const conclusionImg = '/assets/images/Conclusion.jpg';

  return (
    <section id="five">
      <div className={styles.inner}>
        <header>
          <h2>Conclusion</h2>
        </header>
        <div className={styles.content}>
          <img
            src={conclusionImg}
            loading="lazy"
            alt="Conclusion"
            className={styles['responsive-image']}
          />
          <p>
            Integrating engineered E. coli probiotics that produce L-asparaginase into leukemia
            treatment regimens offers a promising strategy to reduce costs and mitigate
            chemotherapy-induced gut microbiota disturbances. Further research and clinical trials
            are necessary to validate the safety and efficacy of this approach.
          </p>
        </div>
        <ul>
          <li>
            <a href="#" className={styles.button}>
              Learn More
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Five;
