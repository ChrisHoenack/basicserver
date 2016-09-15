import http from 'http';
import fs from 'fs';

const port = process.env.PORT;

// Handle 404
function pageNotFound(request, response) {
    response.writeHead(404, { 'Context-Type': 'text/plain' });
    response.write(`404: File not found at ${request.url}`);
    response.end();
}

// Handle Request
function onRequest(request, response) {
    if (request.method === 'GET' && request.url === '/') {
        response.writeHead(200, { 'Context-Type': 'text/html' });
        fs.createReadStream('./src/index.html').pipe(response);
    } else {
        pageNotFound(request, response);
    }
}

http.createServer(onRequest).listen(port);
