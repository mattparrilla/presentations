% React + Flux + Webpack =
% ![](http://i.imgur.com/1dHHZw4.gif)



#What is React?

##A library for creating user interfaces

AKA: the "V" in MVC

##What is it not?

![](http://thesalesblog.com/wp-content/uploads/2010/06/Kitchen-Sink.jpg)

##BYO

> * AJAX library
> * localization
> * etc.

##How does it work?

![](http://i.imgur.com/BYK8D6u.png)

## But what about the "M" and "C"?



#What the Flux?

##All about managing state

##![](https://facebook.github.io/flux/img/flux-simple-f8-diagram-with-client-action-1300w.png)

> * All application state lives in the store
> * One-way data flow (no two-way binding)

##But flux is a pattern, not a library



#Enter: Redux

##An implementation of Flux

> * All state is stored in an object inside of a single store
> * The only way to change state is to emit an action
> * Actions are queued and can be replayed
> * To specify how actions transform state, you write pure reducers.

##An Action
```
function updateComparisonRange(newRange) {
    return {
        type: UPDATE_COMPARISON_RANGE,
        data: {
            comparisonDateRangeType: newRange
        }
    };
}
```

##A Reducer

```
function reducer(state = {
    startDate,
    endDate,
    comparisonDateRangeType
}, action) {
    if (action.type === UPDATE_COMPARISON_RANGE) {
        return Object.assign({}, state, {
            comparisonDateRangeType: action.data.comparisonDateRangeType
        });
    } else {
      return state;
    }
})
```

##(state, action) => state

##(accum, item) => accum



#What is Webpack?

##A module bundler

>It's like browserify but can split your app into multiple files. If you have multiple pages in a single-page app, the user only downloads code for just that page. If they go to another page, they don't redownload common code.

##What else?

> * Loaders (ESLint! Babel!)
> * HTML Templating
> * Hot reloading
> * Most Gulp Tasks



#So What?

##The Good
> * Having all your state in one place makes it easy to reason about
> * Less code & less complexity
> * BYO library pattern decouples you from framework
> * Module pattern allows for code sharing across organization
> * Functional Programming! ...if you're into that sort of thing
> * Component logic and templates in one place
> * VirtualDOM performance gains

##The Bad
> * BYO library pattern means more decisions need to be made
> * Module pattern can lead to greater diversity of JS libraries
> * Functional Programming! ...if you hate that sort of thing
> * We're already using Angular
> * Doesn't like libraries that touch the DOM
> * Haven't figured out source maps (yet)



#What Does All Of This Look Like?

##
* [Project Structure](https://github.dev.dealertrack.com/Analytics/react-prototype#application-structure)
* [webpack.config.js](https://github.dev.dealertrack.com/Analytics/react-prototype/blob/master/webpack.config.js)
* [Report.jsx (our "smart" component)](https://github.dev.dealertrack.com/Analytics/react-prototype/blob/master/src/reports/content-details/Report.jsx)
* [Area Chart (a "dumb" component)](https://github.dev.dealertrack.com/Analytics/react-prototype/blob/master/src/components/charts/AreaChart/index.jsx)
* [actions.js](https://github.dev.dealertrack.com/Analytics/react-prototype/blob/master/src/reports/content-details/actions.js)
* [store.js](https://github.dev.dealertrack.com/Analytics/react-prototype/blob/master/src/reports/content-details/store.js)
