/**
 * this implementation works on a list which can have last element 
 * different than a list 
 * cons(1, cons(2, cons(3, cons(4, cons(5, 6)))))
 */

function applyFunction(fn) {
  var args = [].slice.call(arguments, 1);
  args.forEach(fn);
}

function isPair(c) {
  return typeof c === 'function' && typeof cdr(c) !== 'function' && 
    typeof cdr(c) !== 'undefined';
}

function forEach(c, f) {
  if (typeof c === 'function' && typeof (cdr(c)) === 'function') {
    f(car(c));
    forEach(cdr(c), f);
  } else if (isPair(c)) {
    applyFunction(f, car(c), cdr(c));
  } else {
    f(car(c));
  }
}

function print(list) {
  forEach(list, function (el) {
    console.log(el);
  });
};

function map(c, fn) {
  if (typeof c === 'function' && typeof cdr(c) === 'function') {
    return cons(fn(car(c)), map(cdr(c), fn));
  } else if (isPair(c)) {
    return cons(fn(car(c)), fn(cdr(c)));
  }
}

function filter(c, pred) {
  if (typeof c !== 'function') {
    return undefined;
  }
  if (isPair(c)) {
    var args = [car(c), cdr(c)].filter(pred);
    return args.length > 0 ? cons.apply(null, args) : undefined;
  }
  if (pred(car(c))) {
    return cons(car(c), filter(cdr(c), pred));
  }
  return filter(cdr(c), pred);
}

function reduce(c, fn, init) {
  if (typeof c !== 'function') {
    return init;
  } else if (isPair(c)) {
    return car(c) + cdr(c) + init; 
  }
  return reduce(cdr(c), fn, fn(init, car(c)));
}