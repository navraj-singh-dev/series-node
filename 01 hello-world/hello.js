const { name1, name2 } = require("./math.js");
// i can also require built in modules like http, https, fs in node or javascript

console.log(name1(4, 5));
console.log(name2(5, 4));

// or
// exports.add = (a, b) => a + b;
// exports.sub = (a, b) => a - b;
