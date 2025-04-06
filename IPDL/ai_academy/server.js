const http = require('http');
const httpStatus = require('http-status-codes');
const routes = require('./routes');
const port = 3000;
const handleRequest = (req, res) => {
let body = [];
req.on("data", (bodyData) => {
body.push(bodyData);
});
req.on("end", () => {
body = Buffer.concat(body).toString();
res.writeHead(httpStatus.OK, {
"Content-Type": "text/html"
});
if (routes[req.url] && routes[req.url][req.method]) {
res.end(routes[req.url][req.method](req, res, body));
} else {
res.writeHead(httpStatus.NOT_FOUND);
res.end("<h1>Page non trouvée</h1>");
}
});
};
const app = http.createServer(handleRequest);
app.listen(port);
console.log(`Le serveur a démarré et écoute sur le port: ${port}`);