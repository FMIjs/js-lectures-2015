function sum(a, b) {
  if (typeof b === 'undefined') {
    return function (c) {
      return a + c;
    };
  } else {
    return a + b;
  }
}
var addTen = sum(10);

addTen(10)
// > 20