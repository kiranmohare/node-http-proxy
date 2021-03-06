var http      = require('http'),
    https     = require('https'),
    url       = require('url'),
    httpProxy = require('./http-proxy/');

/**
 * Export the the proxy "Server" as the main export
 */
module.exports  = httpProxy.Server;

module.exports.createProxy = function(options) {
  return {
    web: httpProxy.createRightProxy('web')(options),
    ws:  httpProxy.createRightProxy('ws')(options) 
  };
}

/**
 * Creates the proxy server.
 *
 * Examples:
 *
 *    httpProxy.createProxyServer({ .. }, 8000)
 *    // => '{ web: [Function], ws: [Function] ... }'
 *
 * @param {Object} Options Config object passed to the proxy
 *
 * @return {Object} Proxy Proxy object with handlers for `ws` and `web` requests
 *
 * @api public
 */

module.exports.createProxyServer = module.exports.createServer = function createProxyServer(options) {
  /*
   *  `options` is needed and it must have the following layout:
   *
   *  {
   *    target : <url string to be parsed with the url module>
   *    forward: <url string to be parsed with the url module>
   *    agent  : <object to be passed to http(s).request>
   *    ssl    : <object to be passed to https.createServer()>
   *    ws     : <true/false, if you want to proxy websockets>
   *    xfwd   : <true/false, adds x-forward headers>
   *    secure : <true/false, verify SSL certificate>
   *  }
   *
   *  NOTE: `options.ws` and `options.ssl` are optional.
   *    `options.target and `options.forward` cannot be
   *    both missing
   *  }
   */

  return new httpProxy.Server(options);
};

