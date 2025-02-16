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
                The game follows Lara Croft, a 21-year-old archaeology graduate, on her first
                expedition aboard the ship Endurance. Seeking the lost kingdom of Yamatai, Lara and
                her crew become shipwrecked on a mysterious island in the Dragon's Triangle. As Lara
                struggles to survive, she uncovers the island's dark secret: Himiko's soul is
                trapped in an eternal cycle, transferring into new priestesses, and her supernatural
                powers keep the island's storms raging, preventing escape. Lara's journey transforms
                her from an inexperienced survivor into a battle-hardened adventurer as she rescues
                her friends, fights off cultists, and ultimately destroys Himiko's remains, ending
                her reign and allowing escape from the island.
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
