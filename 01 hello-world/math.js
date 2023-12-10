// 4.modular programming in js

// Basically making a js module and importing it in another file
// using require function. and exporting the module using module.export
// OR exports.function name

function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

module.exports = { name1: add, name2: sub };
