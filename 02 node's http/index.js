const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

const now = new Date();
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();


const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  // const info = `${Date.now()}: request itne vje ayi thi\n`;
  // fs.appendFile( "log.txt", info, () => {
  //     res.end("bhai teri information leli mene, tera data le liya sale")
  // } );

  const url_ = req.url;
  const my_url = url.parse(url_, true);
  console.log(my_url);

  if (req.url === "/favicon.ico") {
    return res.end();
  }

  switch (my_url.pathname) {
    case "/":
      let currentDate = `${day}-${month}-${year}`;
      let time = `${hours}:${minutes}:${seconds}`;
      const info = `Request URL : ${req.url}, Request Method : ${req.method}, Date : ${currentDate}, Time : ${time} \n`;
      fs.appendFile("log.txt", info, () => {
        res.end("bhai teri information leli mene, tera data le liya sale");
      });

      if (req.method === "GET") {
        res.end(" homepage se GET request ayi ");
      } else if (req.method === "POST") {
        res.end(" homepage se POST request ayi ");
      }
      break;

    case "/profile":
      res.end(" profile wala page ");
      break;

    case "/explore":
      if (req.method === "GET") {
        res.end(" explore se GET request ayi ");
      } else if (req.method === "POST") {
        res.end("explore se POST request ayi ");
      }
      break;

    case "/about":
      const query_parameter = my_url.query.name;
      const query_parameter2 = my_url.query.age;
      res.end(
        `About Page \n hi, ${query_parameter}, \n teri age ${query_parameter2}`
      );
      break;

    case "/google_search":
      const g_q_p1 = my_url.query.search_google;
      res.end(`Google search bar \n you google searched, ${g_q_p1}`);
      break;

    case "/youtube_search":
      const y_q_p1 = my_url.query.search_yt;
      res.end(`Youtube search bar \n you searched for video, ${y_q_p1}`);
      break;

    default:
      res.end("404 error");
      break;
  }
});

myServer.listen(8080, () => {
  console.log("server has started....");
});

// HTTP Methods
/* 

Get - Get is a default request sent by the browser to the server,
      Get is used to get/read some data from the server.
      Get do not hide the data sent by the user and show it in the url.
      Server will go to the database and look for the data and give it back to browser.

Post - Post is request sent by the browser when filling some data in a form,
       Post is used to send some data to the server and perform some mutation or operation on it.
       Post hides the data and do not show it on the url.
       Server will get the data attached to the post request adn do something with it.

Put - Put is used to put/insert some data into the server.
      Put is used to put images, PDF etc.. to form and insert it into database. 

Patch - Patch is used to change some existing data in the database by making a request to the server.

Delete - Delete is used to delete data from database by making request to the server.

*/
