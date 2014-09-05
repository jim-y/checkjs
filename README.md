Check.js
========

# Under Development

## Usage

```js
check('hello world').is.string(); 
check({}).is.not.array(); 
```

Longer

```js
check([]).is.an.array(); 
```

Shorter

```js
check(1).isNumber();
```

## TBC

* has
* empty
* exist
* and

Plans

```js
if (check(myObj).isObject.and.have('property')) {
  // doStuff
}
```
