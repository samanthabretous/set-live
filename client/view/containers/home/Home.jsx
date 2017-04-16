import React from 'react';
import { Link } from 'react-router';
import { PlayButton, HowToPlayButton, ProfileButton } from '../../components';

const Home = () => (
  <aside className="home">
    <Link to="/play">
      <PlayButton />
    </Link>
    <Link to="/how-to-play">
      <HowToPlayButton />
    </Link>
    <Link to="/profile">
      <ProfileButton />
    </Link>
  </aside>
);

export default Home;
