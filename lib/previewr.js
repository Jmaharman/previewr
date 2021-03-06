var express = require('express'),
	path = require('path'),
	previewrFlow = require('previewr-flow'),
	_ = require('underscore'),
	fs = require('fs'),
	defaults = require('./defaults');


function Previewr(options) {

	options = _.extend(defaults, options || {});

	this.port = options.port;
	this.dir = options.dir;
	this.verbose = options.verbose;
	this.root = options.root;

	if (!this.dir.match(/^\//)) this.dir = path.normalize(this.dir);
	if (!this.root.match(/^\//)) this.root = path.normalize(this.root);

	_.bindAll(this, 'handleWildcardRequest', 'handleRootRequest');

	this.previewrFlowPath = path.join(this.dir, '/.previewr-flow.json');

	return this;
}

Previewr.prototype.start = function() {

	var server = this.server = express();

	server.use(express.static(this.root));

	server.get('/', this.handleRootRequest);
	server.get('/*', this.handleWildcardRequest);

	server.listen(this.port);
	console.log(['Started to serve [', this.root, '] on port [', this.port, ']'].join(''));
}

// Tidy up how the HTML is built. Probably hook up templates or something.
Previewr.prototype.handleRootRequest = function(req, res, next) {


	var htmlOutput = '<html><head><title>Index</title></head><body>';

	if (this.doesPreviewrFlowExist()) {
		var flowDetails = this.getPreviewrFlow();
		htmlOutput += '<h1>Pages setup</h1><ul>';
		_.each(flowDetails.pages, function(value, key) {
			htmlOutput += '<li><a href="' + key + '">' + key + '</a></li>';
		});
		htmlOutput += '</ul>';
	} else {
		htmlOutput += '<h1>We\'re serving your static files but...</h1>'
		htmlOutput += ['<p>We can\'t help you build your prototype faster because we couldn\'t find a ".previewr-flow.json" file at [', this.previewrFlowPath, ']</p>'].join("");
		htmlOutput += '<p>Go and check out the <a href="https://github.com/jmaharman/previewr-template">previewr-template</a> for an example project, it has a .previewr-flow.json doc in it.</p>';
	}
	res.send(htmlOutput + '</body></html>')
}

Previewr.prototype.handleWildcardRequest = function(req, res, next){
	var urlDetails = req.url.substring(1);

	if (!this.doesPreviewrFlowExist()) {
		next();
		return;
	}
	previewrFlow(urlDetails, this.root, this.getPreviewrFlow(), function(err, html) {
		if (err && err.indexOf('Flow not found') !== 0) {
		  res.statusCode = 500;
		  return next();
		}

		if (html === null) {
			res.statusCode = 404;
			console.info('Flow for URL not found: ' + req.url);
		}
		else
			res.send(html);

		next();
	});
}

Previewr.prototype.doesPreviewrFlowExist = function() {
	return fs.existsSync(this.previewrFlowPath);
}

Previewr.prototype.getPreviewrFlow = function() {
	delete require.cache[this.previewrFlowPath];
	return require(this.previewrFlowPath)
}

Previewr.prototype.stop = function() {
	this.server.close();
}

module.exports = exports = Previewr;