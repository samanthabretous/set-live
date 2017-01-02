import React from 'react';
import GSAP from 'react-gsap-enhancer'

const createAnim = ({target}) =>{

  const box = target.find({className: 'box'})

  return new TimelineMax({repeat: -1})
    .to(box, 1, {scale: 1.23, y: '+=120'})
    .to(box, 1, {scale: 1, y: '-=120'})
    .to(box, 1, {rotation: 90}, 1)
}

class HowToPlayButton extends React.Component{
  constructor(props) {
     super(props)
  }
  componentDidMount(){
    this.addAnimation(createAnim)
  }
  render(){
    return (
      <div className="howToPlay_button">
        How to Play
      </div>
    )
  }
}

export default GSAP()(HowToPlayButton)