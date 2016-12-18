import React from 'react'

const Display = React.createClass({
  render() {
    return (
      (this.props.if) ? <div>{this.props.children}</div> : null
    )
  }
})

export default Display