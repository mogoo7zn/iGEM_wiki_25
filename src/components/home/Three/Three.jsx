import React from 'react';
import styles from './Three.module.scss';

const Three = () => {
  const TRImg = '/assets/images/L-asparaginase1 (1).jpg';

  return (
    <section id="three">
      <div className={styles.inner}>
        <div className={styles.columns}>
          <article>
            <div className={styles.fit}>
              <img
                src={TRImg}
                sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
                loading="lazy"
                alt="L-asparaginase"
                className={styles['responsive-image']}
              />
            </div>
            <div className={styles.description}>
              <h3>L-Asparaginase in Leukemia Treatment:</h3>
              <p>
                L-asparaginase is an enzyme used in leukemia treatment to deplete asparagine, an
                amino acid essential for leukemia cell survival. Escherichia coli (E. coli) is a
                common source of this enzyme. However, the production cost of L-asparaginase is
                high, making it an expensive treatment option.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Three;
