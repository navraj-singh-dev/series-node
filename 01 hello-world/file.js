const fs = require("fs");
const os = require("os");

// // sync
// fs.writeFileSync( "./test.txt", "write synccc" );

// // async
// fs.writeFile( "./test.txt", "readFile", (err) => {
//     console.log("error")
// });

// // sync
// const result = fs.readFileSync("./contacts.txt", "utf-8");
// console.log(result)

// // async
// fs.readFile("./contacts.txt", "utf-8", (err, result) => {
//     if (err) {
//         console.log("error", err);
//     } else {
//         console.log(result) 
//         // async dont return 
//     }
// });


// fs.appendFileSync( "./hello-world/test.txt", "\nappended text");
// fs.cpSync("./hello-world/test.txt", "./hello-world/copy.txt");
// fs.unlinkSync("./hello-world/copy.txt");

console.log( os.cpus().length );
