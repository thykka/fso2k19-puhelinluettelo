const morgan = require('morgan');
module.exports = morgan(function(tokens, req, res) {
  return [
    '[L]',
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body),
  ].join(' ');
});
