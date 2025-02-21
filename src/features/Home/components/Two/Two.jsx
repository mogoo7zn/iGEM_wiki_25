import React, { useState } from 'react';
import FMT1 from '@assets/images/FMT1.jpg';
import FMT2 from '@assets/images/FMT2.png';
import './Two.css';

const Two = () => {
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
      <div className="inner">
        <div className="columns">
          <article
            className={`column ${hoveredColumn === 'left' ? 'hovered' : ''}`}
            onMouseEnter={() => handleMouseEnter('left')}
            onMouseLeave={handleMouseLeave}
          >
            <div className="content">
              <header>
                <h3>Impact of Chemotherapy on Gut Microbiota:</h3>
              </header>
              <div className="image fit">
                <img
                  src={FMT1}
                  loading="lazy"
                  alt="FMT Image"
                  className="responsive-image"
                />
              </div>
              <p>
                Chemotherapy can disrupt the balance of the gut microbiota, leading to dysbiosis, which may contribute to
                gastrointestinal side effects and influence the overall health of patients. Studies have shown that fecal microbiota
                transplantation (FMT) can alleviate chemotherapy-induced gut microbiota disturbances, potentially improving
                patient outcomes.
              </p>
            </div>
          </article>

          <article
            className={`column ${hoveredColumn === 'right' ? 'hovered' : ''}`}
            onMouseEnter={() => handleMouseEnter('right')}
            onMouseLeave={handleMouseLeave}
          >
            <div className="content">
              <header>
                <h3>Fecal Microbiota Transplantation (FMT):</h3>
              </header>
              <div className="image fit">
                <img
                  src={FMT2}
                  loading="lazy"
                  alt="FMT Image"
                  className="responsive-image"
                />
              </div>
              <p>
                FMT involves transferring fecal matter from a healthy donor to a patient to restore a balanced gut microbiota. This
                approach has been explored in cancer management to mitigate chemotherapy-induced dysbiosis and enhance
                treatment efficacy.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Two;