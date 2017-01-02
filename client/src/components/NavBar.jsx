import React from 'react';
import {Link} from 'react-router'
import GSAP from 'react-gsap-enhancer'
import PlayButton from './PlayButton'
import HowToPlayButton from './HowToPlayButton'
import ProfileButton from './ProfileButton'

const createAnim = ({target}) =>{

  const box = target.find({className: 'box'})

  return new TimelineMax({repeat: -1})
    .to(box, 1, {scale: 1.23, y: '+=120'})
    .to(box, 1, {scale: 1, y: '-=120'})
    .to(box, 1, {rotation: 90}, 1)
}

class NavBar extends React.Component{
  constructor(props) {
     super(props)
  }
  componentDidMount(){
    this.addAnimation(createAnim)
  }
  render(){
    return (
      <div className="nav_bar">
         <Link to="/play">
          <PlayButton />
         </Link>
         <Link to="/how-to-play">
          <HowToPlayButton />
         </Link>
         <Link to="/stats">
          <ProfileButton />
         </Link>
      </div>
    )
  }
}

export default GSAP()(NavBar)

