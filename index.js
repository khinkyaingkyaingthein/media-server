let http = require("http");
let url = require("url");
require("dotenv").config();

let route = {
  GET: {
    "/": (req, res, params) => {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.end("<h1>This is get method => path/</h1>");
    },
    "/home": (req, res, params) => {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.end(
        `<h1>This is get method => path/home ${params.query.name} and ${params.query.age}</h1>`
      );
    },
  },
  POST: {
    "/": (req, res, params) => {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.end("<h1>This is post method => path/</h1>");
    },
    "/home": (req, res, params) => {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.end("<h1>This is post method => path/home</h1>");
    },
  },
  NA: (req, res) => {
    res.writeHead(400);
    res.end("File not found!");
  },
};
let start = (req, res) => {
  let method = req.method;
  let params = url.parse(req.url, true);
  let resolveRoute = route[method][params.pathname];
  if (resolveRoute != null && resolveRoute != undefined) {
    resolveRoute(req, res, params);
  } else {
    route["NA"](req, res);
  }
};
let server = http.createServer(start);

server.listen(process.env.PORT, () => {
  console.log(`Server is running...at port ${process.env.PORT}`);
});
