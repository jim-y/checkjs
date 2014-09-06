(function(global) {

  'use strict';

  var toString = Object.prototype.toString,
    slice = Array.prototype.slice,
    types = {
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Array]': 'array',
      '[object Object]': 'object',
      '[object Function]': 'function',
      '[object Boolean]': 'boolean',
      '[object RegExp]': 'regexp',
      '[object Date]': 'date',
      '[object Error]': 'error'
    };

  /**
   * Perform an XOR on the operands.
   * @param {Boolean} leftOp
   * @param {Boolean} rightOp
   * @return {Boolean}
   */
  function XOR(leftOp, rightOp) {
    return leftOp !== rightOp;
  }

  /**
   * Check the type of the argument
   * @param  {*} obj [description]
   * @return {string}
   * @private
   */
  function _getType(obj) {
    if (obj === null) {
      return 'null';
    }
    return types[toString.call(obj)] || 'object';
  }

  /**
   * Returns a closure which checks the types of the inner values, if
   * every value is of the same type.
   * @param  {string}  String representation of the type what we want to check
   * @return {Function}
   */
  function _isType(type) {
    return function() {
      var allPass,
        negate = this.negate,
        self = slice.call(this);

      allPass = self.every(function(elem) {
        return _getType(elem) === type;
      });
      return XOR(negate, allPass);
    };
  }

  /**
   * Checks for empty values.
   * @return {Boolean}
   */
  function _empty(obj) {
    if (_getType(obj) === 'array') {
      return obj.length === 0;
    } else if (_getType(obj) === 'object') {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          return false;
        }
      }
      return true;
    } else {
      return !obj;
    }
  }

  /**
   * Check existence of the values. By definition only returns true, if all
   * of the inner elements are existing (non undefined, non null) values.
   * @param  {*} obj
   * @return {Boolean}
   * @private
   */
  function _exist(obj) {
    return typeof obj !== 'undefined' && obj !== null;
  }

  /**
   * The method iterates over the class's components and checks the callback
   * {Function} fn on every element
   * @param  {Check}    self  Check instance
   * @param  {Function} fn    filter function
   * @return {Boolean}
   */
  function _checkValues(self, fn) {
    var result,
      negate = self.negate,
      args = slice.call(self);

    result = args.every(fn);
    return XOR(negate, result);
  }

  /**
   * Check constructor
   * @param {*} components [description]
   * @constructor
   */
  function Check(components) {
    for (var i = 0, len = components.length; i < len; ++i) {
      this[i] = components[i];
    }
    this.length = components.length;
    this.negate = false;
  }

  Check.prototype = {
    constructor: Check,
    get not() {
      this.negate = !this.negate;
      return this;
    },
    get notToBe() {
      this.negate = !this.negate;
      return this;
    },
    get notAll() {
      this.negate = !this.negate;
      return this;
    },
    number: _isType('number'),
    string: _isType('string'),
    array: _isType('array'),
    object: _isType('object'),
    method: _isType('function'),
    bool: _isType('boolean'),
    regexp: _isType('regexp'),
    date: _isType('date'),
    error: _isType('error'),
    empty: function() {
      return _checkValues(this, function(elem) {
        return _empty(elem);
      });
    },
    exist: function() {
      return _checkValues(this, function(elem) {
        return _exist(elem);
      });
    }
  };

  ['an', 'of', 'a', 'and', 'be', 'have', 'with', 'it', 'is', 'which',
    'the', 'toBe', 'if', 'all', 'isAll'].forEach(function(prop) {
    Object.defineProperty(Check.prototype, prop, {
      get: function() {
        return this;
      }
    });
  });

  /**
   * Tha main function what we will set as global, this is the entry point of
   * the API
   * @return {[type]} [description]
   */
  var check = function() {
    var args;

    if (arguments.length === 0) {
      return new Check([null]);
    }
    args = slice.call(arguments);
    return new Check(args);
  };

  if (typeof module === 'object' && typeof module.exports === 'object') {
    // For nodejs
    module.exports = check;
  } else {
    // For the browser
    global.check = check;
  }

}(this));
