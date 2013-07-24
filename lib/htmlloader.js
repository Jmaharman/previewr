var fs = require('fs');


exports.loadHtml = function(path, cb) {
	fs.readFile('/doesnt/exist', 'utf8', function (err, data) {
		if (err) {
			return cb(err);
		}
	});
}