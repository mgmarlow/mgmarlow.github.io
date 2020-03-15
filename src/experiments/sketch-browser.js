import React from 'react'
import classnames from 'classnames'
import P5Wrapper from './p5-wrapper'
import styles from './sketch-browser.module.css'

const SketchLink = ({ name, onSelect, active }) => {
  const link = `https://github.com/mgmarlow/mgmarlow.github.io/tree/gatsby/src/experiments/sketches/${name}`

  // TODO: Style
  const buttonCNames = classnames(styles.sketchLink, {
    [styles.active]: active === name,
  })

  return (
    <div>
      <button className={buttonCNames} onClick={() => onSelect(name)}>
        {name}
      </button>{' '}
      (<a href={link}>source</a>)
    </div>
  )
}

const SketchBrowser = () => {
  const [selectedName, setSelectedName] = React.useState('')
  const [sketch, setSketch] = React.useState(null)

  const sketches = ['example-sketch-1', 'example-sketch-2']

  const handleSelect = name => {
    setSelectedName(name)
    import(`./sketches/${name}`).then(res => {
      setSketch(res)
    })
  }

  return (
    <div>
      <h2>Sketch browser</h2>
      {sketches.map(name => (
        <SketchLink onSelect={handleSelect} name={name} active={selectedName} />
      ))}
      {sketch && <P5Wrapper sketch={sketch.default} />}
    </div>
  )
}

export default SketchBrowser
