var _ = require('underscore'),
  flowUtils = require('./flowutils');


module.exports = exports = function(selector, previewrFlow, cb) {
  var flow = flowUtils.collectExpandedFlow(selector, previewrFlow);
  flowUtils.correctPathLocations(flow, './static/');

  if (flow == null)
    return cb('Flow not found for ' + selector, null);

  flowUtils.flowRunner(flow, cb);
};