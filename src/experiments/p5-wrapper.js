import React from 'react'

const P5Wrapper = ({ sketch }) => {
  let canvas = React.useRef(null)
  const sketchContainer = React.useRef(null)

  React.useEffect(() => {
    canvas.current = new window.p5(sketch, sketchContainer.current)

    return () => {
      canvas.current.remove()
    }
  }, [sketch])

  return <div ref={sketchContainer} className="section" />
}

export default P5Wrapper
