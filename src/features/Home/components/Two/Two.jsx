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
                Tomb Raider is an action-adventure video game franchise that debuted in 1996,
                created by Core Design and published by Eidos Interactive (later acquired by Square
                Enix and now owned by Embracer Group). The series follows Lara Croft, a fearless
                British archaeologist who explores ancient tombs, solves puzzles, and battles
                enemies while uncovering lost artifacts and hidden secrets.
                <br /> Tomb Raider remains one of the most influential franchises in gaming history,
                setting the foundation for modern action-adventure titles.
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
                The Tomb Raider movies are action-adventure films based on the popular Tomb Raider
                video game series, featuring the iconic archaeologist Lara Croft as she embarks on
                dangerous expeditions to uncover ancient secrets.
                <br />
                The Tomb Raider films have cemented Lara Croft's status as an iconic
                action-adventure heroine, bringing the thrill of the games to the big screen.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Two;
