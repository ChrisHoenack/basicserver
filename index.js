import http from 'http';
import fs from 'fs';
import url from 'url';
import path from 'path';
import { FileServer } from './fileserver.js';

// I'm using a cloud9 server. Change port to 3000 or desired port to run locally
const fileServer = new FileServer();
const port = process.env.PORT;

// Handle 404
function pageNotFound(request, response) {
    response.writeHead(404, { 'Context-Type': 'text/plain' });
    response.write(`404: File not found at ${request.url}`);
    response.end();
}

// Handle Request
function onRequest(request, response) {
    const filePath = path.join('./src', url.parse(request.url).pathname);
    if (request.method === 'GET' && request.url === '/') {
        response.writeHead(200, { 'Context-Type': 'text/html' });
        fs.createReadStream('./src/index.html').pipe(response);
    } else if (fileServer.doesFileExist(filePath)) {
        response.writeHead(200, { 'Context-Type': 'text/html' });
        fs.createReadStream(filePath).pipe(response);
    } else {
        pageNotFound(request, response);
    }
}

http.createServer(onRequest).listen(port);
