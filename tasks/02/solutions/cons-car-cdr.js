
function cons(a, b) {
  return (executor) => executor(a, b);
}

function car(c) {
  return c((a, b) => a);
}

function cdr(c) {
  return c((a, b) => b);
}
