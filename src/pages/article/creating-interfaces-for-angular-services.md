---
title: Creating Interfaces for Angular Services
date: 2017-10-01
layout: ../../layouts/article.astro
---

When dealing with a class that needs access to different data sources depending on its context, it is often useful to model those data sources with a common interface. Likewise in Angular, we may run across situations where an injected service needs to have different implementations depending on its context, a perfect candidate for an interface. However, since interfaces are not compiled into the JavaScript output of TypeScript, achieving this with an Angular service is rather unintuitive.

This guide will walk through a simple application that demonstrates how to create a service interface in Angular.

In this [bare-bones application](https://github.com/mgmarlow/Creating-Interfaces-Angular-Services), I am going to set up a todo-list component that is compatible with two different types of data: (a) public data, containing todos that are visible to everyone and (b) private data, containing todos only visible to the given user. I will then demonstrate how an interface service can be utilized in this situation to help promote code reuse.

## Interfacing Services

I mentioned above that Angular does not allow us to provide interfaces as providers because interfaces aren’t compiled by TypeScript. Therefore, when modelling a service as an interface, we actually have to use an abstract class. For this reason, when I reference interface services, I am actually referring to abstract classes.

Let’s set up the first service that will serve as the base:

```typescript
import { Injectable } from '@angular/core'

export interface Todo {
  title: string
  description: string
  done: boolean
}

@Injectable()
export abstract class TodoListService {
  /**
   * Returns a list of all of the current user's todos.
   */
  abstract getTodos(): Todo[]
}
```

The `TodoListService` is a simple abstract class that holds nothing but the definitions for the shared logic between our public and private implementations (shown later). This class is really no more than a container that informs Angular about the `getTodos` method. By using this service, we can leverage Angular’s built-in dependency injection to swap in/out implementations for public or private data.

Let’s make some quick services for the public and private todos:

```typescript
import { Injectable } from '@angular/core'
import { Todo, TodoListService } from './todo-list.service'

@Injectable()
export class TodoListPublicService implements TodoListService {
  getTodos() {
    const todos: Todo[] = [
      {
        title: 'get groceries',
        description: 'eggs, milk, etc.',
        done: false,
      },
    ]

    return todos
  }
}
```

```typescript
import { Injectable } from '@angular/core'
import { Todo, TodoListService } from './todo-list.service'

@Injectable()
export class TodoListPrivateService implements TodoListService {
  getTodos() {
    const todos: Todo[] = [
      {
        title: 'secret',
        description: 'All of my deepest, darkest secrets.',
        done: false,
      },
    ]

    return todos
  }
}
```

The line, `implements TodoListService`, is the crucial piece that tells Angular that using either of these services in place of the base service, `TodoListService`, is okay. The only other thing these services need to do is provide implementations for all of the methods defined in the interface service; in this case, that method is `getTodos`.

Lastly, let’s set up the component for the list of todos:

```typescript
import { Component } from '@angular/core'
import { Todo, TodoListService } from './services/todo-list.service'
import { TodoListPublicService } from './services/todo-list-public.service'

@Component({
  selector: 'app-todo-list',
  template: `
    <div *ngFor="let todo of todos">
      <h3>{{ todo.title }}</h3>
      <p>{{ todo.description }}</p>
    </div>
  `,
  providers: [{ provide: TodoListService, useClass: TodoListPublicService }],
})
export class TodoListComponent {
  todos: Todo[]

  constructor(private todoListService: TodoListService) {}

  ngOnInit() {
    this.todos = this.todoListService.getTodos()
  }
}
```

This is where the real power of the interface service comes into play. Within the `TodoListComponent`'s constructor, we can refer to the `TodoListService`, our base-level class, without needing to differentiate between the public or private implementations. **To the component, any service that implements `TodoListService` is valid**. That means we can swap in/out the public and private implementations depending on what we may need in a particular component or module.

The actual swapping takes place within the `providers` array in the component definition. The line: `{ provide: TodoListService, useClass: TodoListPublicService }` informs Angular that any reference to `TodoListService` within the component will instead call the same method on the `TodoListPublicService`. Similarly, if we wanted to switch to private data, we could simply swap the `useClass` property to `TodoListPrivateService`.

It is important to note that this `providers` array does not need to exist on the component in order to use this pattern. The same technique can be used at the module-level.

## Resources:

- [App code](https://github.com/mgmarlow/Creating-Interfaces-Angular-Services])
