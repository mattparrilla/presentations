% State Management with Redux
% ![](http://i.imgur.com/1dHHZw4.gif)


#First, What is Flux?

##All about managing state

##![](https://facebook.github.io/flux/img/flux-simple-f8-diagram-with-client-action-1300w.png)

* All application state lives in the store
* One-way data flow (no two-way binding)
* View only updates when store says so

##But flux is a pattern, not a library

#Enter Redux!

##
> * All state is stored in an object inside of a single store
> * The only way to change state is to emit an action
> * Actions are queued and can be replayed
> * To specify how actions transform state, you write pure reducers
> * No dispatcher

##(state, action) => state

##(accum, item) => accum

##An Action
```
function updateComparisonRange(comparisonRange) {
    return {
        type: UPDATE_COMPARISON_RANGE,
        comparisonRange
    };
}
```

##A Reducer

```
function reducer(state = {
    startDate,
    endDate,
    comparisonRange
}, action) {
    if (action.type === UPDATE_COMPARISON_RANGE) {
        return Object.assign({}, state, {
            comparisonDateRange: action.comparisonRange
        });
    } else {
      return state;
    }
})
```

##So what?

> * conceptually simple (single state tree FTW!!)
> * Undo/redo
> * Hot reloading
> * Useful error reporting
> * Immutable data in JS?
> * Redux is only 99 lines (without sanity checks)
