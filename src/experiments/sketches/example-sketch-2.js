const sketch = p => {
  let x = 100
  let y = 100

  p.setup = function() {
    p.createCanvas(700, 410)
  }

  p.draw = function() {
    p.background(0)
    p.fill(100)
    p.rect(x, y, 100, 100)
  }
}

export default sketch
