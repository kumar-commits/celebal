const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const baseDir = path.join(__dirname, 'files');

if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
}

const server = http.createServer((req, res) => {
    const urlParts = req.url.split('/');
    const command = urlParts[1];
    const fileName = urlParts[2];

    if (!fileName) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('File name is required.');
        return;
    }

    const filePath = path.join(baseDir, fileName);

    switch (command) {
        case 'create':
            const fileContent = urlParts.slice(3).join('/');
            fs.writeFile(filePath, fileContent, (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error creating file.');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end('File created successfully.');
                }
            });
            break;

        case 'read':
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error reading file.');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(data);
                }
            });
            break;

        case 'delete':
            fs.unlink(filePath, (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error deleting file.');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end('File deleted successfully.');
                }
            });
            break;

        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Invalid command.');
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
