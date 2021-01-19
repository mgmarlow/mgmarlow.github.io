---
title: 'Understanding useSelector Memoization'
date: '2019-08-17'
---

The new react-redux [hooks API](https://react-redux.js.org/next/api/hooks)
makes working with redux feel fresh. Long gone are the days of writing
extensive `connect()` boilerplate for container components, not to mention
the nightmare of adding types. However, with the new hooks API comes
a change to the fundamental equality comparison that React Redux uses to
select state off of the store. The change is noted as follows in the
[documentation](https://react-redux.js.org/next/api/hooks#equality-comparisons-and-updates):

> With mapState, all individual fields were returned in a combined object. It
> didn't matter if the return object was a new reference or not - connect()
> just compared the individual fields. With useSelector(),
> **returning a new object every time will always force a re-render by default**.

Even after reading this paragraph three times I didn't have a clear idea of
how this change would affect my application's rendering cycle. Was this a
serious performance hindrance, or something I could safely ignore? It turns out
that it only concerns situations where duplicate values are pushed onto
the store. Let's dive into an example.

## Performance Implications

The example application will toggle the visibility of a list of snacks,
`SnackList`, based on the value of a boolean, `show`. This boolean value
lives on its own slice in state (as it would in a real application), combined
into the `rootReducer` with `combineReducers`:

```js
const initialState = {
  show: false,
}

function snackReducer(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_SNACKS':
      return { ...state, show: true }
    case 'HIDE_SNACKS':
      return { ...state, show: false }
    default:
      return state
  }
}

const store = createStore(
  combineReducers({
    snacks: snacksReducer,
  }),
)

//
// Initial store:
//
// {
//   snacks: {
//     show: false
//   }
// }
```

Here's the `SnackList` component that consumes this state and renders a list of
snacks. Notice that I'm selecting the entire slice of state, `snacks`, off of
the store, rather than just the value of `show`.

```js
function SnackList() {
  // Note: selecting state.snacks to demonstrate an inefficient selection
  const snacks = useSelector((state) => state.snacks)
  const snackList = SNACKS.map((item) => <li key={item.id}>{item.name}</li>)

  console.log('SnackList rendering')

  return (
    <div>
      <h3>snacks:</h3>
      {snacks.show && <ul>{snackList}</ul>}
    </div>
  )
}
```

Given what we know about React Redux, a call to `"SHOW_SNACKS"` that
changes the value of `show` from `false` to `true` should result in a new
render of the `SnackList` component, since it depends on the `snacks` state.
However, what about a call to `"SHOW_SNACKS"` when the value of `show` is
already `true`? React components using that value
of state _shouldn't need_ to update since they already have the correct value.
Right?

Try clicking "show" multiple times in this example:

<iframe src="https://codesandbox.io/embed/elated-fast-j971o?expanddevtools=1&fontsize=14" title="elated-fast-j971o" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

This is not the case for the `SnackList` component. Since
`useSelector` is configured to grab the entire `snacks` object off state, any
change to the `snacks` state has React Redux comparing equality with
`state.snacks === prevState.snacks`. Given that Redux creates a new object
from every reducer function, this equality check will always result in
`false`, as the references for `state` and `prevState` are not the same.

Even though an identical value is being pushed into the store, our use of
`useSelector` is not able to detect that the values are the same since the
object reference is different.

## Fixing Unnecessary Renders

The `SnackList` example is the exact sort of performance optimization that the React Redux
documentation is referring to. Fortunately, they provide an alternative equality
comparison function: `shallowEqual`. Let's run through a few `useSelector`
cases using the above state shape:

```jsx
// GOOD
// Selecting boolean value, react-redux is able to compute
// equality to eliminate unnecessary renders
// if (state.snacks.show === prevState.snacks.show)
const showSnacks = useSelector(state => state.snacks.show)
return {showSnacks && <SnackList />}


// BAD
// Selecting object, react-redux is not able to compute equality,
// resulting in unnecessary renders
// if (state.snacks === prevState.snacks)
const snacks = useSelector(state => state.snacks)
return {snacks.show && <SnackList />}


// GOOD
// Selecting object, but using a different method of computing
// equality, eliminating unnecessary renders
// if (isEqual(state.snacks, prevState.snacks))
const snacks = useSelector(state => state.snacks, shallowEqual)
return {snacks.show && <SnackList />}
```

Updating `SnackList` to use `shallowEqual` resolves the issue of extra
re-renders. Try clicking "show" multiple times in this example:

<iframe src="https://codesandbox.io/embed/sharp-jang-68cdh?expanddevtools=1&fontsize=14" title="sharp-jang-68cdh" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

The message "SnackList rendering" is only logged when the value of `show` is
changed to a new value. Our application no longer needlessly renders the
list of snacks.
