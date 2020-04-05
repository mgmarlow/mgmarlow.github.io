---
path: '/themeable-svelte-components'
title: 'Creating Themeable Svelte Components'
date: '2020-04-04'
---

Designing themeable Svelte components is a little different than
what I've been used to in React. In React, my primary technique
is to use a combination of
[classnames](https://github.com/JedWatson/classnames) and
[CSS modules](https://github.com/css-modules/css-modules):

```jsx
import React from 'react'
import classnames from 'classnames'
import styles from './Themeable.module.css'

const ThemableComponent = ({ className }) => (
  <div className={classnames(className, styles.wrapper)}>
    <button>Click!</button>
  </div>
)
```

Even though the above component implements its own set of
default styles (from `.wrapper`), any of the properties can be
overriden from the parent context.

```jsx
const ParentComponent = () => (
  <div>
    <Themeable className={styles.someOtherStyle} />
  </div>
)
```

This pattern is great for creating flexible design systems.
Components maintain the benefits of CSS Module-scoped styles
and the flexibility of custom theming.

The HTML output for the above example looks like the following:

```html
<div
  class="_src_ParentComponent__someOtherStyle _src_ThemeableComponent__wrapper"
>
  <button>Click!</button>
</div>
```

## Similar patterns in Svelte

Svelte is CSS-component scoped by default, meaning that we don't
need to utilize CSS modules to avoid CSS name collisions. However,
this built-in CSS-component scoping actually becomes an issue
when we try to move those styles through components via props.

Let's try to replicate React-style theming with Svelte:

```html
<script>
  // ThemeableComponent.svelte
  export let className
</script>

<div class="{className}">
  <button>Click!</button>
</div>
```

`ThemeableComponent` takes in a `className` as a prop, and passes it
directly into its template.

```html
<script>
  // ParentComponent.svelte
  import ThemeableComponent from './ThemeableComponent.svelte'
</script>

<style>
  .wrapper {
    color: red;
  }
</style>

<ThemeableComponent className="wrapper" />
```

Attempt to compile this code and you'll see the following warning,
telling us that our CSS is not actually going to be applied.

```
Unused CSS selector (6:2)
```

Svelte style compilation works similarly
to CSS modules in that randomly-generated classes accompany the
generated stylesheets, but it differs in that the style names are
not available as JavaScript objects and are thereby inaccessible
to the template.

## The initial approach

In other words, in order to achieve the same sort of API as the
React counterpart, we need to make use of Svelte's `:global`
modifier to disable the CSS component scoping.

```html
<script>
  // ParentComponent.svelte
  import ThemeableComponent from './ThemeableComponent.svelte'
</script>

<style>
  :global(.wrapper) {
    color: red;
  }
</style>

<ThemeableComponent className="wrapper" />
```

Now the code runs as expected because `ThemeableComponent`
is using a globally-available style, `"wrapper"`. The compiled
output looks like the following:

```html
<style>
  .wrapper {
    background-color: red;
  }
</style>

<div class="svelte-ldiwpm">
  <div class="wrapper">
    <p>content goes here</p>
  </div>
</div>
```

## The better approach

Now this comparison is missing an additional facet, because now
any use of the class `"wrapper"` in our app will result in
style collisions. We can use an extra CSS selector to help
mitigate this issue:

```html
<script>
  // ParentComponent.svelte
  import ThemeableComponent from './ThemeableComponent.svelte'
</script>

<style>
  div :global(.wrapper) {
    color: red;
  }
</style>

<div>
  <ThemeableComponent className="wrapper" />
</div>
```

Now the theme-specific style is contained in a safely nested
wrapper that will prevent CSS collisions.

```html
<style>
  div.svelte-ldiwpm .wrapper {
    color: red;
  }
</style>

<div class="svelte-ldiwpm">
  <div class="wrapper">
    <p>content goes here</p>
  </div>
</div>
```
