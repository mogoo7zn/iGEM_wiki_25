import React from 'react';
import TRImg from '@assets/images/L-asparaginase1.jpg';
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
                alt="L-asparaginase"
                className="responsive-image"
                width={TRImg.width}
                height={TRImg.height}
              />
            </div>
            <div className="description">
              <h3>L-Asparaginase in Leukemia Treatment:</h3>
              <p>
                L-asparaginase is an enzyme used in leukemia treatment to deplete asparagine, an amino acid essential for
                leukemia cell survival. Escherichia coli (E. coli) is a common source of this enzyme. However, the production cost of
                L-asparaginase is high, making it an expensive treatment option.
              </p>
            </div>
          </article>
          {/* ...remaining articles... */}
        </div>
      </div>
    </section>
  );
};

export default Three;
