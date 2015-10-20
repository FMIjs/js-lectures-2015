function sequence() {
  var funcs = [].slice.call(arguments);
  return function (arg) {
    return funcs.reduce(function (accum, fn) {
      return fn(accum);
    }, arg);
  };
}

function compose() {
  var funcs = [].slice.call(arguments);
  return function (arg) {
    return funcs.reduceRight(function (accum, fn) {
      return fn(accum);
    }, arg);
  };
}