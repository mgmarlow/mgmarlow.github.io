import React from 'react'
import P5Wrapper from '../components/experiments/p5-wrapper'

const sketch = p => {
  let x = 100
  let y = 100

  p.setup = function() {
    p.createCanvas(700, 410)
  }

  p.draw = function() {
    p.background(0)
    p.fill(255)
    p.rect(x, y, 50, 50)
  }
}

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

  return (
    <div>
      <P5Wrapper sketch={sketch} />
    </div>
  )
}

export default ExperimentsPage
