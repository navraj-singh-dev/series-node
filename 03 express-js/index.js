const express = require("express");
const app = express();

const port = 8080

app.get("/", (req, res) => {
    return res.send(`On HomePage : Hi, ${req.query.name}`)
})

app.get("/about", (req, res) => {
    return res.send(`On About : Your Age Is, ${req.query.age}`);
})

app.listen(port, () => {
    console.log(`server runnning on ${port}`)
});
