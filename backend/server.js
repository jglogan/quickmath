const fs = require('fs');
const path = require('path');
const express = require('express');
const ipfilter = require('express-ipfilter').IpFilter;
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fallback = require('express-history-api-fallback');
const app = express();
const cwd = process.cwd();

if (!process.argv[2]) {
	 console.log('usage: node backend/server.js [static-path]');
	 process.exit(1);
}

const publicPath = path.resolve(process.argv[2] || path.join(cwd, './dist'));

console.log('serving static data from ' + publicPath);

//
//  Logging configuration.
//
app.use(morgan(':date :remote-addr :referrer :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'));

//
//  IP filtering.
//
const port = Number(process.env.PORT_PUBLIC) || 9080;
const ips = process.env.IP_FILTER ? process.env.IP_FILTER.split(',') : [];
const host = ips.length ? '0.0.0.0' : '127.0.0.1';
if (ips.length) {
	app.use(ipfilter(ips));
}

//
//  Enable the minimum CSP necessary to allow the
//  site to load and function.  For plain HTTP to
//  work, the configuration needs to disable both
//  the upgrade-insecure-requests CSP, and the
//  HSTS header.
//
const directives = {
	'default-src': [ "'self'" ],
	'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
	'style-src': ["'self'", "'unsafe-inline'"],
	'img-src': ["'self'", "blob:", "data:"],
	'frame-ancestors': [
		"'self'",
	],
};
app.use(helmet({
	contentSecurityPolicy: {
		useDefaults: false,
		directives: directives,
	},
	frameguard: false,
	hsts: false,
}));

//
//  Static and fallback routes.
//
app.use(express.static(publicPath));
app.use(fallback('index.html', { root: publicPath }));

//
//  Start the server.
//
const server = app.listen(port, host, function() {
	console.log(`Express is listening on ${host}:${port} with filters ${ips}`);
});
