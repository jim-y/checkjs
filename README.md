Check.js
========

Checkjs is a minimal, easy to write, easy to read type checking JavaScript library with a grammar similar to [shouldjs](https://github.com/shouldjs/should.js). The basic purpos of this API is to make type checking in JavaScript easier, and more readable. Ever wrote lines like this?

```js
function createComponent(jsonObj) {
  var product = jsonObj && jsonObj.products && isArray(jsonObj.products) && typeof jsonObj.products[0] === 'string';

  if (product) {
    handleProduct(jsonObj.products[0].toLowerCase());
  }
}
```

It's a really simple example where checkjs could be handy.

`check.js`

```js
function createComponent(jsonObj) {
  if (check(jsonObj).is.object().and.have('products').which.is.array()) {
    handleProduct(jsonObj.products[0].toLowerCase());
  }
}
```

*Note*: you can pass multiple arguments to check(). ;)

# Under Development

## Usage

You need to wrap your values with the `ckeck` method to create a Cheak instance.

### Grammar elements:

In the API there are class properties which are present only to read your tests easier. These are unfunctional.

* a
* an
* and
* all
* be
* have
* if
* is
* isAll
* it
* of
* the
* toBe
* which
* with

Example

    check(1).if.it.is.a.number()

Although you can write expressions like these, i **do not recommend** this, because this much (dots) can be easily confusing.

    check(1).if.number()

I recommend only to write one *glue* word between the check, and the type function.

### Negation elements

There are currently 3 negation elements, which will negate the result.

* not
* notAll
* notToBe

Example

    check('hello', 'world', '!').notAll.string()

Would return `false`.

### Type methods

* number()
* string()
* array()
* object()
* method() *function is a reserved word*
* bool() *bollean is a reserved word*
* regexp()
* date()
* error()

## TBC

* has, have
* ~~empty~~
* ~~exist~~
* and
* more glues, better glues
