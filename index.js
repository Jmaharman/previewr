#! /usr/bin/env node

var c = require('commander'),
  Previewr = require('./lib/previewr'),
  _ = require('underscore'),
  fs = require('fs'),
  path = require('path'),
  isCli = (require.main === module),
  defaults = require('./lib/defaults');

// Exported in case anyone wishes to use Previewr directly.
module.exports = exports = Previewr;

// Otherwise, BOOM, straight into the cmd
if (isCli) {

    var localConfigPath = path.join(path.normalize(defaults.dir), '/.previewr-config.json');
    if (fs.existsSync(localConfigPath)) {
      var localConfig = require(localConfigPath);
      defaults = _.extend(defaults, localConfig);
    }

    c
      .version('0.0.1')
      .option('-d, --dir [dirname]', 'config directory [dirname] | default cwd')
      .option('-r, --root [rootfolder]', 'load files from [rootfolder] | default cwd')
      .option('-p, --port [num]', 'serve on port [num] | default 61403', parseInt)
      .option('-v, --verbose', 'log connections to console | default off')
      .parse(process.argv);

    var cliOptions = {};
    if (c.dir !== undefined) cliOptions.dir = c.dir;
    if (c.root !== undefined) cliOptions.root = c.root;
    if (c.port !== undefined) cliOptions.port = c.port;
    if (c.verbose !== undefined) cliOptions.verbose = c.verbose;

    var previewr = new Previewr(cliOptions).start();
}