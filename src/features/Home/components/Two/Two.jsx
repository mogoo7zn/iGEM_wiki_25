import React from 'react';
import gameImg from '@assets/images/game.jpg';
import movieImg from '@assets/images/movie.jpg';
import './Two.css';

const Two = () => {
  return (
    <section id="two">
      <div className="inner">
        <div className="columns">
          <article>
            <div className="content">
              <header>
                <h3>video game</h3>
              </header>
              <div className="image fit">
                <img
                  src={gameImg}
                  loading="lazy"
                  alt="TR Video Game Image"
                  className="responsive-image"
                />
              </div>
              <p>
                Fecal Microbiota Transplantation (FMT):
                <br />
                FMT involves transferring fecal matter from a healthy donor to a patient to restore a balanced gut microbiota. This
                approach has been explored in cancer management to mitigate chemotherapy-induced dysbiosis and enhance
                treatment efficacy.
              </p>
            </div>
          </article>

          <article className="alt">
            <div className="content">
              <header>
                <h3>movie</h3>
              </header>
              <div className="image fit">
                <img
                  src={movieImg}
                  loading="lazy"
                  alt="TR Movie Image"
                  className="responsive-image"
                />
              </div>
              <p>
                L-asparaginase is an enzyme used in leukemia treatment to deplete asparagine, an amino acid essential for
                leukemia cell survival. Escherichia coli (E. coli) is a common source of this enzyme. However, the production cost of
                L-asparaginase is high, making it an expensive treatment option.
                <br />
                <br />
                High-Yield L-Asparaginase-Producing E. coli:
                <br />
                Researchers have identified E. coli strains capable of high-yield production of L-asparaginase. Optimizing the
                cultivation conditions of these strains can enhance enzyme production, potentially reducing treatment costs.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Two;
