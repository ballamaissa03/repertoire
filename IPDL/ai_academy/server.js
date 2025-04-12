const http = require('http');
const fs = require('fs');
const path = require('path');
const httpStatus = require('http-status-codes');
const port = 3000;
// Types MIME pour les différents fichiers
const contentTypes = {
'.html': 'text/html',
'.css': 'text/css',
'.js': 'text/javascript',
'.json': 'application/json',
'.png': 'image/png',
'.jpg': 'image/jpeg',
'.gif': 'image/gif'
};
// Fonction pour servir un fichier
const serveFile = (filePath, res) => {
fs.readFile(filePath, (error, data) => {
if (error) {
res.writeHead(httpStatus.INTERNAL_SERVER_ERROR);
res.end('Erreur lors de la lecture du fichier');
return;
}
const extension = path.extname(filePath);const contentType = contentTypes[extension] || 'text/plain';
res.writeHead(httpStatus.OK, {
'Content-Type': contentType
});
res.end(data);
});
};
// Gérer les requêtes
const handleRequest = (req, res) => {
let url = req.url;
// Si l'URL est /, servir index.html
if (url === '/') {
serveFile('./views/index.html', res);
return;
}
// Vérifier si l'URL correspond à un fichier dans le dossier views
if (url.match(/^\/(about|courses|contact)$/)) {
serveFile(`./views${url}.html`, res);
return;
}
// Vérifier si l'URL correspond à un fichier statique
if (url.match(/^\/(css|js|images)\//)) {
const filePath = `./public${url}`;
// Vérifier si le fichier existe
fs.access(filePath, fs.constants.F_OK, (error) => {
if (error) {
res.writeHead(httpStatus.NOT_FOUND);
res.end('Fichier non trouvé');
return;
}
serveFile(filePath, res);
});
return;
}
// Si aucune route ne correspond, retourner une erreur 404
serveFile(`./views/error.html`, res);