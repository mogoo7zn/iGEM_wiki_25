import React, { useState } from 'react';
import styles from './Two.module.scss';
import eventBus from '../../../utils/eventBus';

const Two = () => {
  const FMT1 = '/assets/images/FMT1.jpg';
  const FMT2 = '/assets/images/FMT2.png';

  // 检测鼠标是否进入了某个 column
  const [hoveredColumn, setHoveredColumn] = useState(null);

  const handleMouseEnter = (column) => {
    setHoveredColumn(column);
  };

  const handleMouseLeave = () => {
    setHoveredColumn(null);
  };

  return (
    <section id="two">
      <div className={styles.section}>
        <div className={styles.inner}>
          <article
            className={`${styles.column} ${hoveredColumn === 'left' ? styles.hovered : ''}`}
            onMouseEnter={() => handleMouseEnter('left')}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.content}>
              <header>
                <h3>Fecal Microbiota Transplantation (FMT):</h3>
              </header>
              <div className={styles.fit}>
                <img
                  src={FMT1}
                  loading="lazy"
                  alt="FMT Image"
                  className={styles['responsive-image']}
                />
              </div>
              <p>
                Chemotherapy can disrupt the balance of the gut microbiota, leading to dysbiosis,
                inflammation, and increased risk of infections. FMT involves transferring fecal
                material from a healthy donor to a recipient to restore gut microbiome diversity,
                potentially mitigating the adverse effects of chemotherapy on the gut microbiota.
              </p>
            </div>
          </article>

          <article
            className={`${styles.column} ${hoveredColumn === 'right' ? styles.hovered : ''}`}
            onMouseEnter={() => handleMouseEnter('right')}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.content}>
              <header>
                <h3>Probiotic Supplements:</h3>
              </header>
              <div className={styles.fit}>
                <img
                  src={FMT2}
                  loading="lazy"
                  alt="Probiotic Image"
                  className={styles['responsive-image']}
                />
              </div>
              <p>
                Probiotics are live microorganisms that confer health benefits when administered in
                adequate amounts. Some studies suggest that specific probiotic strains may help
                maintain gut microbiota diversity during chemotherapy, potentially reducing
                treatment-related gut toxicities.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Two;
