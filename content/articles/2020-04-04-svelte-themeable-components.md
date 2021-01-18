---
title: 'Creating Themeable Svelte Components'
date: '2020-04-05'
---

React makes theming components easy. My preferred way combines
[classnames](https://github.com/JedWatson/classnames) and
[CSS modules](https://github.com/css-modules/css-modules)
to create locally-scoped styles that can be easily modified:

```jsx
import React from 'react'
import classnames from 'classnames'
import styles from './Themeable.module.css'

const ThemableComponent = ({ className }) => (
  <div className={classnames(className, styles.wrapper)}>
    <p>content goes here</p>
  </div>
)
```

A CSS module-compiled class is passed as props to override the
default styles of a component:

```jsx
import styles from './ParentComponent.module.css'

const ParentComponent = () => (
  <div>
    <Themeable className={styles.someOtherStyle} />
  </div>
)
```

This simple pattern enables flexibility in React design systems.
How can we achieve something similar in Svelte?

## Converting the pattern to Svelte

The classes generated from Svelte's compiler will scope CSS to
their associated components out of the box, so we can ditch
CSS modules. However, since the Svelte compiler functions
differently than React webpack configurations, we need to
do a little extra work
to translate the above React pattern into Svelte.

Here is a first approximation:

```html
// ThemeableComponent.svelte
<script>
  export let className
</script>

<div class="{className}">
  <p>content goes here</p>
</div>
```

`ThemeableComponent` takes in `className` as a prop and
simply passes it into its template.

```html
// ParentComponent.svelte
<script>
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
telling us that our CSS is not actually going to be applied:

```
Unused CSS selector (6:2)
```

This is a fundamental difference between the React method and
the Svelte method. Classes within style tags are only
processed by the Svelte compiler if they are referenced by
a `class` keyword in the component's template.

Since the `ParentComponent` doesn't use `class` in its template,
but instead uses `className`, the `.wrapper` class will never
actually be compiled. While the compiled template is what we
expect, it is missing its CSS output.

```html
// Compiled output
<style></style>

<div class="wrapper">
  <p>content goes here</p>
</div>
```

## Enabling CSS compilation with :global

In order to achieve the same sort of API as the
React counterpart, we need to make use of Svelte's `:global`
modifier and disable the CSS component scoping:

```html
// ParentComponent.svelte
<script>
  import ThemeableComponent from './ThemeableComponent.svelte'
</script>

<style>
  :global(.wrapper) {
    color: red;
  }
</style>

<ThemeableComponent className="wrapper" />
```

The code now runs as expected because the Svelte compiler
will compile the `.wrapper` class, regardless of whether
or not it can detect its use.

Note the inclusion of a new randomly-generated class,
`"svelte-ldiwpm"`, in the compiled output, signaling that
Svelte successfully compiled our CSS:

```html
// Compiled output
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

## A better approach

The compiled output points out a very important difference
between the current Svelte iteration and the React counterpart.
The class, `.wrapper`, is not scoped to an element.
This means that any component that uses a similar convention,
`:global(.wrapper)` will override this style.

This issue can be mitigated with an extra CSS selector and
HTML element:

```html
// ParentComponent.svelte
<script>
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

By introducing a `div` and updating the CSS selector, the
compiled output is now scoped to our component:

```html
// Compiled output
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
