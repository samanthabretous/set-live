import React from 'react';
import { Link } from 'react-router';
import GSAP from 'react-gsap-enhancer';
import Play from '../../../images/play.inline.svg';
import HowToPlay from '../../../images/howToPlay.inline.svg';

const Home = () => (
  <aside className="home">
    <Link className="home__button" to="/play">
      <Play />
    </Link>
    <a className="home__button" target="_blank" href="https://github.com/samanthabretous/set-live">
      <HowToPlay />
    </a>
  </aside>
);

export default Home;
