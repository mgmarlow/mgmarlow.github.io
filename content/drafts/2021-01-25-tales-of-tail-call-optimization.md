_The journey of tail call optimization in ECMAScript implementations._

One downside to recursive algorithms is call stack expansion. Because this data is stored on the call stack for every call of a recursive function, algorithms can end up storing a lot of information in the call stack at any given time.

Take a factorial implementation and pass in a ridiculous value to see a call stack error:

```js
function factorial(n) {
  if (n === 1)
    return 1

  return n * factorial(n-1)
}

factorial(123456)

// Results in:
//
// Uncaught InternalError: too much recursion
//     factorial debugger eval code:2
//     factorial debugger eval code:5
//     factorial debugger eval code:5
// ...
```

This [`InternalError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Too_much_recursion) is thrown when there are too many functions on the call stack.

With Dr. Axel's [maximum call stack function](https://2ality.com/2014/04/call-stack-size.html) you can compute the maximum number of allowed recursive calls in modern browsers. Here are his results from 2014:

- Node.js: 11034
- Firefox: 50994
- Chrome: 10402

Note that this is likely an inaccurate number for the real maximum number of calls, as that probably varies based on the context of the function used, available system memory, and other variables. This example is meant to illustrate that an upper bound does exist and that upper bound depends on the particular vendor's ECMAScript implementation.



