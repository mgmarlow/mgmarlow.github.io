---
title: 'Adaptable Data Stores in Angular'
date: '2017-09-02'
---

Managing state is at the core of client-side development. Recent paradigms have changed the way web applications manipulate and manage their state, transitioning from the two-way data binding mechanisms of AngularJS to the uni-directional flow of React and Redux.

With Angular 2 approaching "stability", time-old questions arise on how to best manage application state. Out of the box, Angular provides the following tools:

- `@Input` and `@Output`: pass state through a chain of components by wiring up event emitters and component-level bindings.

- Providers or services: separate classes that encapsulate state and are injected into components.

Although the `@Input` and `@Output` decorators work great for small components, large components quickly scale out of control. Services offer more flexibility, but do so with less guidance. What is the best way of encapsulating state in a service and how should it be used?

This article provides answers to those question with a scalable service pattern called the **data store**.

## The problem with component bindings

Component bindings are a great way of managing UI state within a single component. They are _not_ a great way of sharing that state throughout the application.

The problem isn't recognizing this fact, it's understanding when component bindings need to be migrated to a service. The signs often appear as painpoints:

- Components are difficult to refactor because their bindings are used in many places in the component hierarchy.

- New features are bug-prone because they interact in different ways with the same underlying component data.

- A new component that lives in a completely different section of the app needs to consume and manipulate the original data.

These painpoints all point towards a common problem: the data in the source component needs to be migrated into a separate place that is well-encapsulated. Ideally, the store should be implemented using side-effect free functions to reveal its intention and prevent misuse.

## Designing better services

Construct services as **data stores**:

1. Isolate a piece of data into a service so that it can be shared throughout an application.

2. Manage all mutations to this data so that changes are easily tracked.

3. Alert subscribers when the data is updated with new values.

4. Expose functions with single responsibilities to prevent side-effects.

Here's an example **data store** that stores a `boolean` value:

```typescript
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class AppState {
  private _isRed = new BehaviorSubject<boolean>(false)
  isRed: Observable<boolean> = this._isRed.asObservable()

  toggleRed() {
    this._isRed.next(!this._isRed.value)
  }
}
```

Key implementation ideas:

- The underlying data `_isRed` is private to the data store.

- `_isRed` is an instance of a [`BehaviorSubject`](https://rxjs.dev/api/index/class/BehaviorSubject) instead of a [`Subject`](https://rxjs.dev/api/index/class/Subject) so it can provide an initial value.

- The data is exposed via a [RxJS Observable](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html) so components can listen to changes in the data.

- A method on the service, `#toggleRed`, provides a single point of access for updating the data within the store.

RxJS is pulling a lot of weight with this technique. Consuming components cannot directly read from the **data store**. Instead, components must subscribe to an [Observable](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html) that notifies them with updates.

Likewise, consuming components cannot mutate data in the **data store**. They are limited to updating it with new values via [`#next`](https://rxjs.dev/api/index/class/BehaviorSubject#next).

## Example component

`HelloComponent` consumes the data store from the previous example, using the data to toggle a class:

```typescript
import { Component, Input, HostBinding } from '@angular/core'
import { AppState } from './app.state'

@Component({
  selector: 'hello',
  template: `
    <h1>Hello Data Store!</h1>
    <button (click)="toggleRed()">Toggle Red</button>
  `,
})
export class HelloComponent {
  @HostBinding('class.red') isRed = false

  # Inject the data store as a regular service
  constructor(private appState: AppState) {}

  ngOnInit() {
    # Subscribe to changes in the data store
    this.appState.isRed.subscribe((redState) => {
      this.isRed = redState
    })
  }

  toggleRed() {
    # Update the data store
    this.appState.toggleRed()
  }
}
```

[View the full example here](https://stackblitz.com/edit/angular-pah1j1).

Although this example has only one consumer of `AppState`, you can imagine that any number of components can subscribe to the data store at any given time. With so many components accessing this state, the **data store** paradigm helps minimize surprises by encapsulating it in RxJS primitives.

