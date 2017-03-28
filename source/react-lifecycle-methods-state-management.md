% Lifecycle Methods and State Managment
% Level Up 2

## You Are Here

Link to tag

---

### Documentation
[State and Lifecycle](https://facebook.github.io/react/docs/state-and-lifecycle.html)

# Lifecycle Methods

---

### Documentation
[Component Lifecycle](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle)

---

## mount
happens once on initialization

> * constructor()
> * componentWillMount()
> * render()
> * componentDidMount()

---

## update
can happen many times

> * componentWillReceiveProps()
> * shouldComponentUpdate()
> * componentWillUpdate()
> * render()
> * componentDidUpdate()

## unmount

happens once prior to component being removed from DOM

> * componentWillUnmount()

---

### When do components update?

> * new props from parent
> * the state changes

---

### What to do with lifecycle methods?

> * initialize state - **constructor**
> * make network requests, update state - **componentDidUpdate**
> * interact with the DOM (only if you must) - **componentDidMount, componentDidUpdate**
> * prevent an unecessary render - **shouldComponentUpdate**
> * clean up event listeners, etc - **componentWillUnmount**

# State Management

---

### Documentation
[State Managment In React](https://facebook.github.io/react/docs/lifting-state-up.html)

---

## What is state?

> * If you think of your application as a function, state are your inputs.
> * The minimum amount of information needed to render your app

---

### In React, Data Flows Down

Example

---

## How to manage state

> * Push it as far down as you can
> * Only when a component elsewhere in the component hierarchy needs to know about a piece of state do you share it with that component.
> * To do that, hoist it up to closest ancestor component

---

Show diagram

---

# When You Might Need A State Management Library

When you have lots of components across the component hierarchy needing to know about different pieces of application state.

---

### Pros and Cons of State Managment Libraries

Pros:
> * can avoid state-heavy root component and avoid passing state down through the hierarchy (as props)
> * great developer tools
> * nice debugging
> * explicit

Cons:
> * more indirection
> * more boilerplate
> * more *stuff*

---

### So What To Do?

Start by managing state in your components.

When you find you're passing state down many levels and you've got container components that know a little too much about the universe, consider using a library for some (but probably not all) of your state.
