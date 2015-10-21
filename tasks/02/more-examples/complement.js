function complement(predicate) {
  return function () {
    return !predicate.apply(null, arguments)
  };
}

// example usage

function isCool(person) {
  return person.isCool === true;
}

var isNotCool = complement(isCool);

var people = [{
    name: 'Ivan'
    isCool: true
}, {
  name: 'Pesho',
  isCool: false
}, {
  name: 'Dragan',
  isCool: false
}];

var coolPeople = people.filter(isCool);
var notCoolPeople = people.filter(complement(isCool));