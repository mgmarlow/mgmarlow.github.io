---
path: '/react-redux-memoization'
title: 'React Redux Memoization'
date: '2019-08-17'
---

The new react-redux [hooks API](https://react-redux.js.org/next/api/hooks) makes working with redux feel fresh. Long gone are the days of writing extensive `connect` boilerplate for each container component (not to mention trying to statically type it). However, with the new hooks API comes a change to the fundamental equality comparison that `react-redux` uses to select state off of the store. The change is noted in the hooks documentation:

> With mapState, all individual fields were returned in a combined object. It didn't matter if the return object was a new reference or not - connect() just compared the individual fields. With useSelector(), returning a new object every time will always force a re-render by default.

It's clear in the documentation that selecting an object or array directly from `useSelector` is not a good idea. However, even after reading this paragraph three times I didn't have a clear idea of how the change would affect my application's rendering cycle. Was this a serious performance hindrance, or something I could safely ignore? This post will dive into a detailed example to show exactly what types of situations the new equality comparison effects.

## Performance Implications

To discuss the equality comparison changes in `react-redux`, it is easiest to put together a quick example. In this example, I'll utilize a `boolean` value, `show`, to toggle a list of snacks. The application's state will be arranged such that each reducer occupies its own slice, combined into the `rootReducer` with `combineReducers`:

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

// Initial store state:
// {
//   snacks: {
//     show: false
//   }
// }
```

Here's a simple component that consumes this state to handle the rendering of a list of snacks:

```js
function SnackList() {
  // Purposefully selecting snacks instead of snacks.show for
  // demonstration purposes
  const snacks = useSelector(state => state.snacks)
  const snackList = SNACKS.map(item => <li key={item.id}>{item.name}</li>)

  console.log('SnackList rendering')

  return (
    <div>
      <h3>snacks:</h3>
      {snacks.show && <ul>{snackList}</ul>}
    </div>
  )
}
```

Given what we know about `react-redux`, a call to `"SHOW_SNACKS"` that changes the value of `show` from `false` to `true` should result in fresh renders of the `SnackList` component, since it relies on the `show` state. Likewise, a call to `"HIDE_SNACKS"` should have the same effect, given that `show` is initially `true`. However, what about a call to `"SHOW_SNACKS"` when the value of `show` is already `true`? React components using that value of state _won't need_ to update since they already have the correct value. Right?

However, this isn't the case for the `SnackList` component. Since `useSelector` is configured to grab the entire `snacks` state object, rather than the `boolean` value `show`, the `SnackList` is rendered even when identical values are pushed into the store, resulting in renders that make no UI changes. Try clicking "show" multiple times in this example:

<iframe src="https://codesandbox.io/embed/elated-fast-j971o?expanddevtools=1&fontsize=14" title="elated-fast-j971o" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

This is exactly the sort of performance optimization that the `react-redux` documentation is referring to. Ideally, React components should not update if they already have the most recent value of any given state value. However, the way that `react-redux` determines whether or not a value has changed is by using a `===` equality comparison. That means we need to be careful when dealing with objects and arrays, as they will never be equal to previous versions, since `redux` disallows any mutation in its reducers. Let's run through a few `useSelector` cases using the above state shape:

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

By changing the usage of useSelector in the snack list example, I can prevent unnecessary renders. Try clicking "show" multiple times in this example:

<iframe src="https://codesandbox.io/embed/sharp-jang-68cdh?expanddevtools=1&fontsize=14" title="sharp-jang-68cdh" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
