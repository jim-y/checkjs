var check = (function() {
  
  var toString = Object.prototype.toString,
    types = {
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Array]': 'array',
      '[object Object]': 'object'
    };

  function getType(obj) {
    return types[toString.call(obj)];
  }

  function isType(type) {
    return function() {
      return getType(this[0]) === type;
    }
  }

  /**
   * Check constructor
   * @param {*} component [description]
   * @constructor
   */
  function Check(component) {
    this[0] = component;
    this.length = 1;
    this.is = this;
    this.a = this;
  }

  Check.prototype = {
    constructor: Check,
    get not() {
      this.negation = true;
      return this;
    },
    number: isType('number'),
    isNumber: isType('number'),
    string: isType('string'),
    isString: isType('string'),
    array: isType('array'),
    isArray: isType('array'),
    object: isType('object'),
    isObject: isType('object')
  };

  ['an', 'of', 'a', 'and', 'be', 'have', 'with', 'is', 'which', 'the'].forEach(function(prop) {
    Object.defineProperty(Check.prototype, prop, {
      get: function() {
        return this;
      } 
    });
  });

  return function(component) {
    return new Check(component);
  };
}());

/*['an', 'of', 'a', 'and', 'be', 'have', 'with', 'is', 'which', 'the'].forEach(function(name) {
    Object.defineProperty(Check.prototype, name, {
      get: function() {
        return this;
      },
      enumerable: true
    });
  });*/
