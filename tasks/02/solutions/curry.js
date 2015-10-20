var curry = function(fn) {
  return function(){
    var outerArgs = [].slice.call(arguments, 0);
    if (outerArgs.length < fn.length) {
      return function() {
        var innerArgs = [].slice.call(arguments, 0);
        var totalArgsLength = outerArgs.length + innerArgs.length;
        if (totalArgsLength < fn.length) {
          return fn.apply(this, outerArgs.concat(innerArgs).concat([].slice.call(arguments, 0)));
        }
        return fn.apply(this, outerArgs.concat(innerArgs));
      }
    }
    return fn.apply(this, outerArgs);
  }
}

var curry = function (fn) {
  var arity = fn.length;
  return function g() {
    var args = [].slice.call(arguments);
    if (args.length >= arity) {
      return fn.apply(null, args);
    } else {
      return function () {
        var innerArgs = [].slice.call(arguments);
        return g.apply(null, args.concat(innerArgs));
      }
    }
  }
}