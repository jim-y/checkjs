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
    },
    glues = [
      'an', 'and', 'of', 'a', 'be', 'have', 'with', 'it', 'is', 'which',
      'the', 'toBe', 'if', 'all', 'isAll'
    ],
    tokens = [
      'isnumber', 'arenumbers', 'isstring', 'arestrings', 'isobject',
      'areobjects', 'isfunction', 'arefunctions', 'isboolean', 'arebooleans',
      'isregexp', 'areregexps', 'isdate', 'aredates', 'iserror', 'areerrors'
    ];

  /**
   * Perform an XOR on the operands.
   * @param {Boolean} leftOp
   * @param {Boolean} rightOp
   * @return {Boolean}
   * @private
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
   * Sets a type to a function
   * @param {string} type
   * @return {Function}
   * @private
   */
  function _setType(type) {
    return function(elem) {
      return _getType(elem) === type;
    };
  }

  /**
   * Capitalize one letter in a string
   * @param  {string} name the uncapitalized string
   * @param  {number} ind  the index of the letter to capitalize
   * @return {string}      the capitalized new string
   * @private
   */
  function _capitalize(name, ind) {
    return name.split('').map(function(char, index) {
      return index === ind ? char.toUpperCase() : char;
    }).join('');
  }

  /**
   * Checks for empty values.
   * @param {*} obj arbitrary value to check empitness on
   * @return {Boolean}
   * @private
   */
  function _emptiness(obj) {
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
  function _existence(obj) {
    return typeof obj !== 'undefined' && obj !== null;
  }

  /**
   * The method iterates over the class's components and checks the callback
   * {Function} fn on every element
   * @param  {Check}    self  Check instance
   * @param  {Function} fn    filter function
   * @return {Boolean}
   * @private
   */
  function _checkValuesFor(fn) {
    return function() {
      var result,
        negate = this.negate,
        args = slice.call(this);

      result = args.every(function(elem) {
        return fn(elem);
      });
      return XOR(negate, result);
    };
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
    this.cache = [];
    this.negate = false;

    this.isNumber = _checkValuesFor(_setType('number'));
    this.areNumbers = _checkValuesFor(_setType('number'));
    this.isString = _checkValuesFor(_setType('string'));
    this.areStrings = _checkValuesFor(_setType('string'));
    this.isArray = _checkValuesFor(_setType('array'));
    this.areArrays = _checkValuesFor(_setType('array'));
    this.isObject = _checkValuesFor(_setType('object'));
    this.areObjects = _checkValuesFor(_setType('object'));
    this.isFunction = _checkValuesFor(_setType('function'));
    this.areFunctions = _checkValuesFor(_setType('function'));
    this.isBoolean = _checkValuesFor(_setType('boolean'));
    this.areBooleans = _checkValuesFor(_setType('boolean'));
    this.isRegExp = _checkValuesFor(_setType('regexp'));
    this.areRegExps = _checkValuesFor(_setType('regexp'));
    this.isDate = _checkValuesFor(_setType('date'));
    this.areDates = _checkValuesFor(_setType('date'));
    this.isError = _checkValuesFor(_setType('error'));
    this.areErrors = _checkValuesFor(_setType('error'));
    this.isEmpty = _checkValuesFor(_emptiness);
    this.allEmpty = _checkValuesFor(_emptiness);
    this.doExist = _checkValuesFor(_existence);
    this.allExists = _checkValuesFor(_existence);

    this.test = function() {
      var cache = this.cache,
        len = cache.length,
        result = cache[0];

      if (len === 0) {
        return false;
      }
      if (len > 1) {
        for (var i = 1; i < len; ++i) {
          result = result && cache[i];
        }
      }
      return result;
    };
  }

  Check.prototype = {
    constructor: Check,
    get not() {
      this.negate = !this.negate;
      return this;
    },
    get empty() {
      this.cache.push(this.isEmpty());
      return this;
    },
    get allempty() {
      return this.isempty;
    },
    get exist() {
      this.cache.push(this.doExist());
      return this;
    },
    get allexists() {
      return this.exist;
    }
  };

  // ========================
  // Populating the prototype
  // ========================

  glues.forEach(function(glue) {
    Object.defineProperty(Check.prototype, glue, {
      get: function() {
        return this;
      }
    });
  });

  tokens.forEach(function(token) {
    var fnName = token.indexOf('is') === 0 ?
      _capitalize(token, 2) : _capitalize(token, 3);

    Object.defineProperty(Check.prototype, token, {
      get: function() {
        this.cache.push(this[fnName]());
        return this;
      }
    });
  });

  /**
   * Tha main function what we will set as global, this is the entry point of
   * the API
   * @return {Check} Check instance
   * @public
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
    /*node*/module.exports = check;
  } else {
    /*browser*/global.check = check;
  }
}(this));
