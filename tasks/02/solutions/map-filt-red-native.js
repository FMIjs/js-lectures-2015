/**
 * this implementation works on a list with a last element always a list or nothing
 * cons(1, cons(2, cons(3, cons(4, cons(5)))))
 */

function map(c, f) {
  return typeof c === 'function' && cons(f(car(c)), map(cdr(c), f));
}

function filter(c, f) {
  if (typeof c !== 'function') {
    return undefined;
  }
  if (f(car(c))) {
    return cons(car(c), filter(cdr(c), f));
  }
  return filter(cdr(c), f);
}

function forEach(c, f) {
  if (typeof c === 'function' && car(c)) {
    f(car(c));
    forEach(cdr(c), f);
  }
}

function reduce(c, fn, init) {
  return typeof c === 'function' ? reduce(cdr(c), fn, fn(init, car(c))) : init;
}