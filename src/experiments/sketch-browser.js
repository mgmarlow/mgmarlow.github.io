import React from 'react'
import P5Wrapper from './p5-wrapper'
import SketchList from './sketch-list'

const SketchBrowser = () => {
  const [selectedName, setSelectedName] = React.useState('')
  const [sketch, setSketch] = React.useState(null)

  const sketches = ['example-sketch-1', 'example-sketch-2']

  React.useEffect(() => {
    if (selectedName) {
      import(
        /* webpackChunkName: "p5-sketches" */ `./sketches/${selectedName}`
      ).then(setSketch)
    }
  }, [selectedName, setSketch])

  return (
    <div>
      <h2>Sketch browser</h2>
      <SketchList
        sketches={sketches}
        selectedName={selectedName}
        onSelect={setSelectedName}
      />
      <P5Wrapper sketch={sketch && sketch.default} />
    </div>
  )
}

export default SketchBrowser
