const http = require("http");
const httpStatus = require("http-status-codes");
const messageModule = require("./messages");
const port = 3000;
const app = http.createServer((req, res) => {
console.log(`Requête reçue pour: ${req.url}`);
res.writeHead(httpStatus.StatusCodes.OK, {
"Content-Type": "text/html",
});
if (req.url === "/messages") {
let messagesList = "<h1>Messages inspirants sur l'IA</h1><ul>";
messageModule.messages.forEach(message => {
messagesList += `<li>${message}</li>`;
});
messagesList += "</ul>";
res.end(messagesList);
} else if (req.url === "/") {
res.end(
"<h1>Accueil de AI Academy</h1><p>Visitez <a href='/messages'>nos messages</a> pour vous inspirer!</p>"
);
} else {
res.end("<h1>Page non trouvée!</h1>");
}
});
app.listen(port);
console.log(`Le serveur a démarré et écoute sur le port: ${port}`);