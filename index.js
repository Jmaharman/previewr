var express = require('express'),
  app = express(),
  cheerio = require('cheerio'),
  jsonDeets = require('./static/previewr'),
  previewr = require('./lib/previewr');

app.use(express.static('static'));

app.get('/*', function(req, res, next){
  var urlDetails = req.url.substring(1);

  previewr(urlDetails.replace(/\//g, '.'), jsonDeets, function(err, html) {
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
});

app.listen(3000);