import React from 'react';
import TRImg from '@assets/images/TR.jpg';
import './Three.css';

const Three = () => {
  return (
    <section id="three">
      <div className="inner">
        <div className="columns">
          <article>
            <div className="image fit">
              <img
                src={TRImg}
                sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
                loading="lazy"
                alt="Tomb Raider"
                className="responsive-image"
                width={TRImg.width}
                height={TRImg.height}
              />
            </div>
            <div className="description">
              <p>
                Integrating engineered E. coli probiotics that produce L-asparaginase into leukemia treatment regimens offers a
                promising strategy to reduce costs and mitigate chemotherapy-induced gut microbiota disturbances. Further
                research and clinical trials are necessary to validate the safety and efficacy of this approach.
              </p>
            </div>
            <ul className="actions">
              <li>
                <a href="#" className="button">
                  Learn More
                </a>
              </li>
            </ul>
          </article>
          {/* ...remaining articles... */}
        </div>
      </div>
    </section>
  );
};

export default Three;
