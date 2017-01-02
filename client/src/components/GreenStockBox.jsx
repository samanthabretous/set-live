import React from 'react';
import ReactDOM from 'react-dom';
import GSAP from 'react-gsap-enhancer'

let createAnim = ({target}) =>{

  const box = target.find({className: 'box'})

  return new TimelineMax({repeat: -1})
    .to(box, 1, {scale: 1.23, y: '+=120'})
    .to(box, 1, {scale: 1, y: '-=120'})
    .to(box, 1, {rotation: 90}, 1)
}
class GreenStockBox extends React.Component{
  constructor(props) {
     super(props)
  }
  componentDidMount(){
    //console.log(this.addAnimation)
    this.addAnimation(createAnim)
    //console.log(this.jumpAnim)
    //const node = ReactDOM.findDOMNode(this);
    //TweenMax.to(node, 5, {x:299})
    //console.log(this.refs.getDOMNode)
  }
  render(){
    return (
      <div>
      <div style={{width: 100, height: 100, background: 'blue'}} className='box'></div>
      </div>
    )
  }
}

export default GSAP()(GreenStockBox)