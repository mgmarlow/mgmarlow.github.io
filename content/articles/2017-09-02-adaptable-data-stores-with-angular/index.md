---
path: '/adaptable-data-stores-angular'
title: 'Adaptable Data Stores in Angular'
date: '2017-09-02'
---

One of the most interesting issues addressed during application development is managing state. New paradigms have changed the way web applications deal with and manipulate their state, deviating from the two-way data binding mechanisms of AngularJS to a more functional uni-directional flow with React and Redux. Now that Angular has been out for a while and is approaching “stability”, the same questions arise on how to best manage application state. Sending and manipulating data through `@Input` bindings and `@Output` events can works great for small applications but quickly becomes unwieldy as an application grows.
For those wanting to work without third-party dependencies, Angular provides a couple tools that address most state-management concerns:

- `@Input` and `@Output`: pass state through a chain of components by wiring up event emitters and component-level bindings

- Providers/Services: Carefully manage data with dependency injection

In this article I am going to discuss a pattern for the service approach to state management that I have found particularly useful when an application needs more flexibility than component bindings.

## @Input and @Output

These `@Input` and `@Output` keywords are familiar to all Angular developers, as they provide the most straightforward (and often the most used) approach to managing state. With careful component construction, shared state lives in parent components that spread that state to many children, a process that visually resembles a tree. Any time a child wishes to update the parent’s state, they must do so through an `@Output` binding. This provides a clear separation for the state shared throughout the parent-child relationship.

The `@Input` component hierarchy works great for small applications or isolated component groups. However, this model falters when expanding an application. When new components are introduced that are far away in the component hierarchy from the original source of the data it becomes difficult to communicate with those components. In these situations, services are utilized to ferry data between components.

Although the service is a great solution to this problem it is often poorly
implemented. Because the data contained in these services is often mutable
(most applications have their state modeled in arrays or objects) consumers of
said service have to be careful about how they utilize it, lest they produce
[side-effects](https://softwareengineering.stackexchange.com/questions/40297/what-is-a-side-effect).
Additionally, services that have too much logic can be a pain to
maintain as their functionality is often used in so many places throughout an
application.

## Data Management with Services

When dealing with a large application we want to avoid services that contain too much logic and cover a lot of mutable data. Therefore, I propose a simple way to approach state management with services in the form of a “data store”.

The idea behind the data store is threefold:

1. Isolate a piece of data into a service so that it can be shared throughout an application

2. Moderate all mutations to this data so that the changes can be easily tracked

3. Limit the degree to which the state can be changed to prevent unwanted side-effects.

Imagine we have an application that is going to contain data complex enough that we cannot solely rely on `@Input` and `@Output` bindings. In this app, we want to toggle the color of a title with a button by calling into our data store and changing the data across the whole application. Perhaps we have a number of different panels, articles, and pages that offer this toggling functionality that all live in different areas of the application.

The component that I’m describing looks like the following:

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

  constructor(private appState: AppState) {}

  ngOnInit() {
    this.appState.isRed.subscribe(redState => (this.isRed = redState))
  }

  toggleRed() {
    this.appState.toggleRed()
  }
}
```

Although this component is rather simple, the core principles of the data store still apply. Within the component we pass in our data store through Angular’s built in DI with the line: `constructor(private appState: AppState) {}` so that we can access application state in the component. Within the `ngOnInit()` lifecycle function, we subscribe to the application’s state (in this case, a boolean) that will provide us fresh new state each time the store is changed. In order to toggle the color of the text, we tap into a method that manipulates the store’s data through the store itself, `this.appState.toggleRed()`.

Thanks to the subscription, the store contains the most up-to-date application data. Any time the data is changed all subscribers to the store (e.g. this component) will be automatically updated. With the help of the private BehaviorSubject, any component that wants to change state on the store has to do so through the store itself, ensuring that no one is able to manipulate data in a way that will break the application.

Here is the data store service from the sample application:

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

There are three main techniques going on in the above code. The first is the actual data inside our application is private to the data store, unchangeable by any consuming component. The line `private _isRed = new BehaviorSubject<boolean>(false);` initializes this private data with RxJS’s BehaviorSubject, used to represent a value that can change over time. A BehaviorSubject is used over a regular Subject because it can be provided an initial value, in this case: `false`.

Second, the data within the store is exposed through an RxJS [Observable](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html),
allowing consumers to receive the most up-to-date data without being able to directly modify it (through subscribing). Since an Observable cannot be directly changed, the data within our store is safe and isolated.

Finally, to allow consumers to change the data in the data store, an API is provided that will force all changes to go through the store itself. This prevents the need to keep track of all components that interact with this data in order to trace changes made to it. When the component from our sample application wishes to change the color of its text, for example, it has to do so by calling the `toggleRed` method available in the data store. Only then will the data store dictate how it will update its data.

## Conclusion

The data store service model requires a bit of extra code to get going but it offers numerous advantages over simply storing the data directly on a property of a service. Not only is the data isolated to a single source, it is easier to manage changes and updates through the backing API. By utilizing many of these stores for isolated groups of data in an application (think: `PhoneNumberStore`, `EmailStore`, `LoginStore`, etc.) it becomes much easier to manage the complexity of a large application.

Although I don’t mention it above, there are also numerous third-party libraries that provide different solutions to the problem of state management. My personal favorite is [ngrx](https://github.com/ngrx),
a library that provides a heavily Redux-inspired approach to application management. These libraries come with the cost of additional configuration and up-front learning, but can prove useful for applications with complex data needs.

## Resources

- [View the interactive source code](https://stackblitz.com/edit/angular-pah1j1).
