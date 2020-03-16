import React from 'react'

const P5Wrapper = ({ sketch }) => {
  let canvas = React.useRef(null)
  const sketchContainer = React.useRef(null)

  React.useEffect(() => {
    if (!sketch) {
      return
    }

    canvas.current = new window.p5(sketch, sketchContainer.current)

    return () => {
      canvas.current.remove()
    }
  }, [sketch])

  if (!sketch) {
    return (
      <div
        style={{ backgroundColor: '#eee', width: '200px', height: '200px' }}
      ></div>
    )
  }

  return <div ref={sketchContainer} className="section" />
}

export default P5Wrapper
