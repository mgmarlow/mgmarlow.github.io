import React from 'react'
import classnames from 'classnames'
import styles from './sketch-list.module.css'

const SketchLink = ({ name, onSelect, active }) => {
  const link = `https://github.com/mgmarlow/mgmarlow.github.io/tree/gatsby/src/experiments/sketches/${name}.js`

  // TODO: Style
  const buttonCNames = classnames(styles.sketchLink, {
    [styles.active]: active === name,
  })

  return (
    <li>
      <button className={buttonCNames} onClick={() => onSelect(name)}>
        {name}
      </button>{' '}
      (<a href={link}>source</a>)
    </li>
  )
}

const SketchList = ({ sketches, onSelect, selectedName }) => (
  <ul>
    {sketches.map(name => (
      <SketchLink
        key={name}
        onSelect={onSelect}
        name={name}
        active={selectedName}
      />
    ))}
  </ul>
)

export default SketchList
