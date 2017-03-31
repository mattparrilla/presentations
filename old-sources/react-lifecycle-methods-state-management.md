% Lifecycle Methods and State Managment
% Level Up 2

## You Are Here

Link to tag

---

### Helpful Documentation
- [State and Lifecycle Overview](https://facebook.github.io/react/docs/state-and-lifecycle.html)
- [Component Lifecycle](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle)
- [State Managment In React](https://facebook.github.io/react/docs/lifting-state-up.html)

# Lifecycle Methods

## In Hatchery App

    class HatcheryContainer extends Component {
        constructor() {
            // initialize state
        }

        componentWillMount() {
            // make network request
            // set state
        }

        render() {
            // render my stuff
        }
    }

## The Lifecycle

> * mount
> * update
> * unmount

>> mount happens once on initialization
>> update happens many times
>> unmount happens when component exits

---

### When do components update?

> * new props from parent
> * the state changes

# State Management

---

### What is state?

> * If you think of your application as a function, state is your input.
> * It is minimum amount of information needed to render your app.

---

### Presentational vs Container Components

---

### Presentational Components

    const Counter = ({ count, incrementCount }) => (
        <div>
            <button onClick={incrementCount} />
            <span>{ count }</span>
        </div>
    );

> * Contain no "state"
> * Typically functional components
> * Just your "view"

---

### Container Components

    class CounterContainer extends Component {
        constructor() {
            super();
            this.state = { count: 0 };
            this.incrementCount = this.setState(({ count }) => ({ count: count + 1 }));
        }
        render() {
            <Counter count={this.state.count} incrementCount={this.incrementCount} />
        }
    }

> * Manage your state here!

---

### Where Should State Live?

As low as it can go!

# Now What?


---

### We need a component that:

> * Connects `NewIdeaForm` to `HatcheryContainer`
> * Shows a button to create a new idea
> * When you click the button, it is replaced by `NewIdeaForm`

# Bonus: When You *Might* Need A State Management Library

---

When you have lots of components across the component hierarchy needing to know about the same pieces of application state.

---

### State Managment Libraries

| Pros | Cons |
| --- | --- |
| avoid heavy container components | more boilerplate |
| great developer tools | more *stuff* |
| nice debugging | more indirection |

---

### So What To Do?

Start by managing state in your components.

When you find you're passing state down many levels and you've got container components that know a little too much about the universe, consider using a library for some (but probably not all) of your state.
