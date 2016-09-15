import http from 'http';

const port = process.env.PORT;

function onRequest(request, response) {
    response.writeHead(200, { 'Context-Type': 'text/plain' });
    response.write('The server responded');
    response.end();
}

http.createServer(onRequest).listen(port);
