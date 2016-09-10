'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseuri;
/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

/* eslint-disable */
var regex = exports.regex = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
/* eslint-enable */

var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];

function parseuri(str) {
  var src = str;
  var b = str.indexOf('[');
  var e = str.indexOf(']');

  if (b !== -1 && e !== -1) {
    str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length); // eslint-disable-line
  }

  var m = regex.exec(str || '');
  if (!m) {
    return null;
  }

  var uri = {};
  var i = 14;

  while (i--) {
    // eslint-disable-line
    uri[parts[i]] = m[i] || '';
  }

  if (b !== -1 && e !== -1) {
    uri.source = src;
    uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
    uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
    uri.ipv6uri = true;
  }

  return uri;
}