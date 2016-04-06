% Beyond The Fat Arrow
% Functional Programming in Javascript

![The Complexity Iceberg](http://openlab.ncl.ac.uk/hci-digitalcivics-2015/files/2015/11/glacier_iceberg_under_water.jpg)

## My background

> * No CS degree (Physics)
> * Learned Array methods (map, reduce, filter) ~ 1 yr ago
> * Started writing React + Redux ~ 6 months ago (inspired by Ben's talk!)
> * I first heard the term "functional programming" ~ 6 months ago

## Standard Disclaimer

> * I'm only pretending that I know what I'm talking about
> * So if you know better, please chime in!

## What is Functional Programming?

> * A pattern
> * Eliminate *side-effects* when possible and isolate them when not
> * Declarative as opposed imperative style
> * Rooted in mathematics (Lambda Calculus)
> * And more!

>> it's a WAY to write code, you're likely already doing some of the things Ben & I will be talking about, even if you don't know it
>> In declarative programming you describe WHAT you want to do, rather than how you want to do it. You tend to use more abstract tools, rather than bothering with the control flow.
>> This contrasts with imperative programming, which is probably the kind of programming that you started out doing, where you describe HOW to do the thing you're trying to describe. Think for loops and lots of conditionals.
>> there's a formal system, called Lambda Calculus, that provides the foundation that functional languages are built upon; but you don't need to know any kind of Calculus to write more functional code

# Pure Functions

---

### What is a pure function?

> * Have no *side-effects*
> * Have no *side-causes*
> * Result in *referrential transparency*
> * Save us from the complexity iceberg!

>> Pure functions are one of the central concepts of funcitonal programming.
>> Pure functions have no side effects, no side causes, and result in referrential transparency. We'll unpack each of those
>> simply put, a pure function always returns the same result given the same arguments. It turns out, that's a very useful feature for some code!
>> declared inputs and outputs are the tip of the iceberg, but lurking beneath, out of view is a hulking behemoth of unknown danger, ready to sink your ship

## Side-Effects

> * Hidden output
> * An observable interaction with the outside world
> * This is a bad thing ...usually!
> * What does it do that isn't part of the return value?

>> by "hidden output" we mean that a function does something besides provide a new return value. Maybe it changes some global state.
>> when is a side effect not bad? when you are deliberately causing one!
>> ASK: what are some examples of side effects that you might deliberately cause?
>> answers: print to a screen, write to file system, etc.

## Side-Cause

> * "A function with side-causes has undocumented assumptions about what *external* factors it depends on."
> * Hidden input
> * What does it need that isn't in the argument list

## Referential Transparency

A pure, function can be replaced by the value it returns.

>> referential transparency means that functional programs can be analyzed and evaluated as mathematics, and in true functional languages they can be optimized at compile time.


# Now, some examples!

## A Side Effect

    const myGlobalArray = [1, 1, 1];

    function someFunction(anArray) {
        const lastItem = anArray.pop();
        // do some stuff
        return resultOfStuff;
    };

    // elsewhere...
    const someValue = someFunction(myGlobalArray);
    const sum = myGlobalArray.reduce((a, b) => a + b); // 2!



## Another Side-Effect

    function doStuff(anObject) {
        var keys = Object.keys(anObject);
        cleanKeys(keys);

        return keys.filter(item => name !== 'Matt');
    }

## Some Array Gotchas

    const x = [1, 2, 3];
    const y = x.push(1);
    console.log(x); // [1, 2, 3, 1]

    const z = x.sort();
    console.log(x); // [1, 1, 2, 3]

>> It doesn't matter that we're creating a new reference, these array methods operate on the array in place!
>> And it doesn't matter that we're using the `const` keyword. Const doesn't make the reference immutable, const will only throw if we try and reassign the reference.

## Array Methods

| Mutator Methods | Pure Methods |
| --- | ---|
| pop | concat |
| push | includes |
| reverse | join |
| shift | slice |
| sort | map |
| splice | filter |
| unshift | reduce |

[Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype#Methods)

## A Side-Cause

    import moment from 'moment';

    function getTodaysVisits(visits) {
        const today = moment().format('YYYY-MM-DD');

        return visits[today];
    }


## Is this pure?

    import moment from 'moment';

    function getYearAgoVisits(visits, today = moment()) {
        const yearAgo = today.subtract(1, 'year');

        return visits[yearAgo];
    }

# Why write pure functions?

## ![](http://orig10.deviantart.net/e188/f/2011/007/e/e/jack_and_rose_from_titanic_by_kaorixluvsxnachoes88-d36o22o.jpg)

## Pure functions are...

> * Easier to think about
> * Easier to test
> * Easier to debug
> * Easier to ...maintain!
> * More Reusable
> * Memoizable

>> it might take longer to write, but as developers we spend most of our time reading code. When the API of a function is all there is to it, it becomes a lot easier to think about.
>> my brain is single threaded. I want to think about this piece of code, right here in front of me, right now. I don't want to be avoiding icebergs all day.
>> when a function is allowed to depend on anything, and cause anything, the bugs could be anywhere!

## What do they cost?

> * A little more time up-front
> * Flexibility
> * Discipline!

>> am I missing anything?

## How can we write pure functions?

> * Declare all inputs as arguments
> * Writing unit tests can help you identify side causes
> * Write functions that return values, rather than "do stuff"
> * Don't mutate data!

>> It's a lot easier to test functions that have all their inputs declared!
>> That last point is going to be the focus for the second part of my talk: immutability.

## One way to not mutate data: by convention

> * Use the array methods mentioned earlier
> * Make copies of things!
> * Spread operator
> * Discipline! And not just you!

## Object.assign()

    const personalInfo = {
        name: 'Matt',
        town: 'Burlington',
        age: 29
    };

    const olderMatt = Object.assign(
        {},
        personalInfo,
        { age: 30 }
    );

## Spread Operator

A little syntastic sugar on top of Object.assign()

    const olderMatt = {
        ...personalInfo,
        age: 30
    };

    // hey, where do people look up what stage features are in?

Part of ES2017

# Immutability

##

> Mutable state is to software as movable parts are to hardware. There are a group of problems that cannot be solved without it, but introducing it makes everything a bit more fragile.

[- Hacker News comment](https://news.ycombinator.com/item?id=11395837)

## Benefits of immutability

> * "Like mutable data, but with one fewer feature: you can't edit it. It is simpler"
> * Protect your data from side effects
> * Cheap equality comparison

## Immutability 2 Ways

> * Object.freeze
> * External Libraries
    * Immutable.js
    * seamless-immutable

>> immutable data structures are one of our best defenses against side effects
>> it becomes a lot easier to avoid mutating global state when you can't

##

### Immutable.js

> * 12k stars
> * Persistence
> * Lazy Evaluation

### seamless-immutable

> * 1.6k stars
> * Backwards compatible with vanilla arrays and objects

## Object.freeze()

> * Shallowly immutable
> * Updates fail silently
> * Often good enough

---

### Object.freeze() example

    const x = Object.freeze({ a: 1, b: 2 });
    x.a = 5;
    console.log(x); // { a: 1, b: 2}

    const y = Object.freeze({ a: 1, b: 2, c: [1, 2, 3]})
    y.c[0] = 5;
    console.log(y); // { a: 1, b: 2, c: [5, 2, 3]}

## Immutable.js

> * Shallow and deeply immutable data structures
> * Updates return new values
> * Complex updates benefit from persistence

##
![Initial data](http://i.imgur.com/ZKjNcaN.png)

##
![After updating a node](http://i.imgur.com/HaVfud4.png)

---

### Immutable.js Example

    const x = Immutable.Map({ a: 1, b: 2 });
    x.set('a', 5) // returns a new Map
    console.log(x.toJS()); // { a: 1, b: 2}, unchanged

    // data structures are only shallowly immutable
    const y = Immutable.Map({ a: 1, b: 2, c: [1, 2, 3]})
    y.set('a', 5) // returns a new Map
    console.log(y.toJS()); // { a: 1, b: 2, c: [5, 2, 3]}

## Deeply convert to immutable object

> * Can deeply convert using Object.freeze:
[deepFreeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze#Examples)
> * Using fromJS() with Immutable.js();

# Why Immutable Is A Big Deal

## With a vanilla Javascript array

    const x = [1, 2, 3];

> * How to tell if x changed?
> * If I then change x[2], the reference to x doesn't change, but the value there has
> * In order to tell that x changed, we can just look at the reference, we need to check all of the values!

## With an immutable array

    const x = Immutable.List([1, 2, 3])

> * In order to tell if x changed, we can just check if the reference has changed
> * This costs the same regardless of size

## How it's used in the wild

    shouldComponentUpdate(nextProps) {
        return this.props !== nextProps;
    }

> * If the reference is equal, no need to render!
> * You are guaranteed the data is the same.

## How does it help?

    const state = Immutable.fromJS([
        { name: 'Matt', age: 29 },
        { name: 'Amy', age: 35 }
    ]);

    const nextState = state.setIn([0, 'name'], 'Matthew');

    state.get(0) === nextState.get(0); // true

#  ![icebreaker](http://payload12.cargocollective.com/1/1/63129/2547742/IceBreakerB_3_1060.png)

## Places I Stole Ideas From

> * [Simple Made Easy](http://www.infoq.com/presentations/Simple-Made-Easy)
> * [React Conf 2015: Immutable.js](https://www.youtube.com/watch?v=I7IdS-PbEgI)
> * [Are We There Yet?](http://www.infoq.com/presentations/Are-We-There-Yet-Rich-Hickey)
> * ["Side Cause" blog post](http://blog.jenkster.com/2015/12/what-is-functional-programming.html)
> * [(Another) Excellent HN Comment](https://news.ycombinator.com/item?id=8108394)

## Thanks!
