function sumSquaresOfOddArgs() {
  return [].call(arguments)
    .filter(function (el) {
      return el % 2 === 1;
    })
    .map(function (el) {
      return el * el;
    })
    .reduce(function (accumulation, current) {
      return accumulation + current;
    }, 0);
}


function mapAndFilter() {
  return [].map.call(arguments, function (a) {
    return a * a;
  }).filter(function (el) {
    return el % 2 === 0;
  });
}