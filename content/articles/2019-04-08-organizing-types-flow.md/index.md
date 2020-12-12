---
path: '/articles/organizing-javascript-static-types'
title: 'Organizing Types in Web Applications'
date: '2019-04-08'
---

[Flow](https://flow.org/) and [TypeScript](https://www.typescriptlang.org/)
help aid the maintainability of web applications by providing
tools that evolve JavaScript without requiring developers to make
many concessions. That said, the structure and organization of types
in client applications is often an afterthought.

Type placements begin humbly, constrained by the nature of lean
components and smart design. However, as an application grows and
designs change, components are crammed into boxes that they don't
quite fit. The structures of component types and their respective
props define the contracts that components adhere to, affecting
both their maintainability and reusability.

Scalable type organization begins with the following:

1. Types from the API layer must be separated from the rest
   of the app so they can grow alongside their server-side
   counterparts.

2. General-use types (domain language
   definitions) that don't belong to a particular component, class,
   or function live together in a folder at a project's root.

3. Types that describe the contract of a component,
   class, or function live with their respective implementation.

This strategy creates a type structure that is easy to predict,
enforce, and maintain.

## Example Project

The following example will use
[create-react-app](https://github.com/facebook/create-react-app)
with [Flow](https://flow.org/). Although Flow was picked for this
example, all of the code shown is applicable to TypeScript.

Build a new React project and enable Flow:

```
npx create-react-app example-app
cd example-app
yarn add --dev flow-bin
yarn run flow init
```

## API Definitions

Since most SPAs rely on some API as their primary data source, it is important
to clearly define and separate those types.

Public APIs are easy. Utilize type
definitions that are already created with [flow-typed](https://github.com/flow-typed/flow-typed).
For private APIs, imitate the `flow-typed` structure
while taking care not to modify the `./flow-typed/` folder manually, as it may
be overridden with updates. The structure followed in this guide is outlined
[in the flow-typed documentation](https://github.com/flow-typed/flow-typed/wiki/Importing-And-Using-Type-Definitions#manualcustom-definitions).

Create a new folder at the root of the project named `./custom-definitions/`. Within
this directory, add a file with the name of the API in question. This file will
contain all of that API's type definitions.

```js
// ./custom-definitions/news.js

declare module 'news-api' {
  declare type Article = {
    id: number,
    // ...
  }
}
```

This folder needs to be added to the project's `.flowconfig`, telling Flow
where to look for additional library definitions.

```
// .flowconfig

[libs]
./custom-definitions/
```

With this structure in place, components can import API types with a clear,
concise syntax. Additionally, because the definitions are contained outside
the project's `src/` directory, it is clear that they should not
be modified, except to match the server's implementation.

Example usage:

```jsx
// @flow
import React from 'react'
import type { Article } from 'news-api'

type Props = {
  article: Article,
}

const NewspaperComponent = ({ article }: Props) => {
  return <p>{article.content}</p>
}
```

## Domain Language Definitions

The domain language definitions are types that don't belong to any particular API,
component, class, or function. In other words, a domain language type is a term
that is thrown around the entire application but lacks a spot that one can point
to and say, "that's where it's from".

For example, say the `news-api` defined above doesn't contain a definition for
`Author`, yet the application has four or five components that depend on one.
The `Author` type can be exported from a general `types/` directory, a place
that serves as the general grab-bag of application types.

The directory for domain language types will live at `./src/types/`. Within
this folder, the file `author.type.js` is created, exporting the `Author` type.
The `*.type.js` extension is used to aid the search-ability of these types.

```js
// ./src/types/author.type.js

export type Author = {
  name: string,
  avatarURL: string,
}
```

Another file, `index.js`, is created alongside `author.type.js` to barrel its
export for ease of use.

```js
// ./src/types/index.js

export type { Author } from './author.type'
```

Placing domain language types in a shared `~/src/types/` directory carries
a few advantages.

1. The import path is concise thanks to the barreling in `index.js`.
2. Types are easy to search for with the `*.type.js` extension.
3. General-use types are no longer littered throughout the app or in
   opaque `util/` folders.

```jsx
// @flow
import React from 'react'
import type { Author } from '~/types'

type Props = {
  author: Author,
}

const AuthorAvatarComponent = ({ author }: Props) => {
  return <img src={author.avatarURL} />
}
```

## Contract Definitions

The previous class of domain language types don't belong to any particular
component, class, or function. This should be the minority of types in
a given application, since they are glorified global types imported by many
different components.

The majority of components should contain type definitions
that are exported alongside the component, class, or function that they
modify. These are called "contract definitions" because they define the
contract that consumers must adhere to when utilizing the exported
resource.

A great example of this category of type is the higher-order component:

```jsx
import withI18n, { type I18n } from '~/hoc/withI18n'

type Props = {
  i18n: I18n,
}

const TitleComponent = ({ i18n }: Props) => (
  <p>{i18n.text('hello', 'Hello, World')}</p>
)

export default withI18n(TitleComponent)
```

There is no question as to where the type `I18n` belongs, since it is clearly
written in the import statement. Consumers of a component or HOC defined in
this way now have an easy-to-remember import path that is both clear
and expressive.

This is one of those scenarios where it aids the developer to not over-complicate
implementation. When types can be grouped so easily together with a given
implementation, it makes perfect sense to export them together.

```jsx
// @flow
import React from 'react'

export type I18n = {
  t: (string, string) => string,
}

const withI18n<Config: {}> = (WrappedComponent: AbstractComponent<Config>) => {
  return (props: $Diff<Config, I18n>) => {
    return <WrappedComponent i18n={I18n} />
  }
}

export default withI18n
```

## Type Organization

With these guidelines in mind, almost all type definitions that are
necessary for web applications have their own, dedicated destinations.

Approaching a project with this type of organization defined from the
outset will help enable that project to scale without any friction caused
by awkward placement of static types. For tools designed to stay out of
the programmer's way, some due diligence is required in order to
prevent static types from encumbering development far into a project's
lifetime.
