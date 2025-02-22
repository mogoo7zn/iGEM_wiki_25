import React, { useState } from 'react';
import leuk3 from '@assets/images/fphar-14-1208277-g001.jpg';
import leuk4 from '@assets/images/41467_2019_13336_Fig1_HTML.png';
import './Four.css';

const Four = () => {
  const [hoveredColumn, setHoveredColumn] = useState(null);

  const handleMouseEnter = (column) => {
    setHoveredColumn(column);
  }

  const handleMouseLeave = () => {
    setHoveredColumn(null);
  }

  return (
    <section id="four">
      <div className="inner">
        <div className="columns">
          <article
            className={`column ${hoveredColumn === 'left' ? 'hovered' : ''}`}
            onMouseEnter={() => handleMouseEnter('left')}
            onMouseLeave={handleMouseLeave}
          >
            <div className="content">
              <header>
                <h3>High-Yield L-Asparaginase-Producing E. coli:</h3>
              </header>
              <div className="image fit">
                <img src={leuk3} loading="lazy" alt="Leukemia Image" className="responsive-image" />
              </div>
              <p>
                Researchers have identified E. coli strains capable of high-yield production of
                L-asparaginase. Optimizing the cultivation conditions of these strains can enhance
                enzyme production, potentially reducing treatment costs.
              </p>
              <p>
                To improve production, several strategies are employed:
                <ol>
                  <li>
                    <strong>Optimizing Cultivation Conditions:</strong>
                    By adjusting parameters such as temperature, pH, oxygen levels, and nutrient composition, researchers can increase
                    the efficiency of enzyme production.
                    For example, reducing the glucose concentration in the growth medium can sometimes enhance enzyme yield.
                  </li>
                  <li>
                    <strong>Genetic Engineering:</strong>
                    Modifying E. coli to overexpress genes responsible for L-asparaginase production is another approach.
                    This can involve inserting additional copies of the gene encoding the enzyme or using promoters that enhance gene expression.
                  </li>
                </ol>
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
                <h3>E. coli as a Probiotic Platform:</h3>
              </header>
              <div className="image fit">
                <img src={leuk4} loading="lazy" alt="Leukemia Image" className="responsive-image" />
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
