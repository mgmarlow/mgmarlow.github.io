import React from 'react'
import P5Wrapper from '../experiments/p5-wrapper'
import exampleSketch from '../experiments/sketches/example-sketch'

const loadP5 = () =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script')
    document.body.appendChild(script)
    script.onload = resolve
    script.onerror = reject
    script.async = true
    script.src = 'https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/p5.js'
  })

const ExperimentsPage = () => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    loadP5().then(() => {
      setMounted(true)
    })
  }, [setMounted])

  if (!mounted) {
    return <p>loading...</p>
  }

  // TODO: add code link
  // https://github.com/mgmarlow/mgmarlow.github.io/tree/gatsby/src/experiments
  return (
    <div>
      <P5Wrapper sketch={exampleSketch} />
    </div>
  )
}

export default ExperimentsPage
