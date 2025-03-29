import React from 'react';
import styles from './One.module.scss';

const One = () => {
  const introImg = '/assets/images/Leukemia1.jpg';
  const introImg2 = '/assets/images/intro2.jpg';

  return (
    <section id={styles.one}>
      <div className={styles.inner}>
        <header>
          <h2>Intro</h2>
        </header>
        <div className={styles.content}>
          <p>
            Leukemia is a malignant hematologic tumor originating <br />
            in the bone marrow. Conventional chemotherapy, while effective, can significantly harm
            the body, including adversely affecting the gut microbiota.
          </p>
          <img
            src={introImg2}
            loading="lazy"
            alt="Introduce"
            className={styles['responsive-image']}
          />
        </div>
      </div>
    </section>
  );
};

export default One;
