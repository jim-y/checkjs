var typer = (function() {
  
  function Typer(component) {
    this[0] = component;
    this.length = 1;
    this.is = this;
    this.a = this;
  }

  /*['an', 'of', 'a', 'and', 'be', 'have', 'with', 'is', 'which', 'the'].forEach(function(name) {
    Object.defineProperty(Typer.prototype, name, {
      get: function() {
        return this;
      },
      enumerable: true
    });
  });*/

  Typer.prototype = {
    constructor: Typer,
    get not() {
      this.negation = true;
      return this;
    }
  };

  Typer.prototype.number = Typer.prototype.isNumber = function() {
    return this.negation ? Object.prototype.toString.call(this[0]) !== '[object Number]' : 
      Object.prototype.toString.call(this[0]) === '[object Number]';
  };

  Typer.prototype.string = Typer.prototype.isString = function() {
    return Object.prototype.toString.call(this[0]) === '[object String]';
  };

  Typer.prototype.array = Typer.prototype.isArray = function() {
    return Object.prototype.toString.call(this[0]) === '[object Array]';
  };

  Typer.prototype.object = Typer.prototype.isObject = function() {
    return Object.prototype.toString.call(this[0]) === '[object Object]';
  };

  return function(component) {
    return new Typer(component);
  };
}());
