import React, { useState } from 'react';
import styles from './Four.module.scss';

const Four = () => {
  const leuk3 = '/assets/images/fphar-14-1208277-g001.jpg';
  const leuk4 = '/assets/images/41467_2019_13336_Fig1_HTML.png';
  const [hoveredColumn, setHoveredColumn] = useState(null);

  const handleMouseEnter = (column) => {
    setHoveredColumn(column);
  };

  const handleMouseLeave = () => {
    setHoveredColumn(null);
  };

  return (
    <section id="four">
      <div className={styles.inner}>
        <div className={styles.columns}>
          <article
            className={`${styles.column} ${hoveredColumn === 'left' ? styles.hovered : ''}`}
            onMouseEnter={() => handleMouseEnter('left')}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.content}>
              <header>
                <h3>L-Asparaginase Production in E. coli:</h3>
              </header>
              <div className={styles.fit}>
                <img
                  src={leuk3}
                  loading="lazy"
                  alt="Leukemia Image"
                  className={styles['responsive-image']}
                />
              </div>
              <p>
                Researchers have identified E. coli strains capable of high-yield production of
                L-asparaginase. Some strategies include:
              </p>
              <ol>
                <li>
                  Optimizing fermentation conditions such as temperature, pH, and nutrient
                  composition to enhance L-asparaginase yield.
                </li>
                <li>
                  Modifying E. coli to overexpress genes responsible for L-asparaginase production
                  is another approach. This can involve inserting additional copies of the gene
                  encoding the enzyme or using promoters that enhance gene expression.
                </li>
              </ol>
            </div>
          </article>

          <article
            className={`${styles.column} ${hoveredColumn === 'right' ? styles.hovered : ''}`}
            onMouseEnter={() => handleMouseEnter('right')}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.content}>
              <header>
                <h3>E. coli as a Probiotic Platform:</h3>
              </header>
              <div className={styles.fit}>
                <img
                  src={leuk4}
                  loading="lazy"
                  alt="Leukemia Image"
                  className={styles['responsive-image']}
                />
              </div>
              <p>
                E. coli is naturally adapted to the human intestinal environment. By engineering E.
                coli to function as a probiotic, it can produce therapeutic enzymes like
                L-asparaginase directly in the gut. This approach could offer a cost-effective
                alternative to traditional enzyme therapy, eliminating the need for continuous
                injections and potentially improving patient compliance.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Four;
