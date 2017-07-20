const fs = require('fs');
const path = require('path');
const { Server: WebSocketServer } = require('uws');
const config = require('./config.js');

const port = config.port;
const watchPath = config.watchPath;
console.log(watchPath);

const wss = new WebSocketServer({ port }, () => {
	console.log(`css watcher listening on port ${port}`);	
});

wss.on('connection', (request) => {
	console.log(`received connection`);
});

let cssDebounce;
let htmlDebounce;

fs.watch(watchPath, (event, filename) => {
	
	if (event === 'change' && filename.endsWith('.css') && !cssDebounce) {
		cssDebounce = true;
		console.log(`sending change on ${filename}`);
		wss.broadcast(JSON.stringify({ 
			type: 'css', 
			href: path.join(watchPath, filename)
		}));
		setTimeout(() => cssDebounce = null, 200);
	}
});
fs.watch('./', (event, filename) => {
	if (event === 'change' && filename.endsWith('.html') && !htmlDebounce) {
		htmlDebounce = true;
		console.log(`sending change on ${filename}`);
		wss.broadcast(JSON.stringify({ 
			type: 'page',
			href: filename
		}));
		setTimeout(() => htmlDebounce = null, 200);
	}
});

