"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = highlight;

var _prismjsPackage = require("prismjs-package");

var _prismjsPackage2 = _interopRequireDefault(_prismjsPackage);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// language aliases
// syntax highlighting with prism.js
var aliases = {
  "javascript": "js",
  "csharp": "c#"
};

_lodash2.default.pairs(aliases).forEach(function (p) {
  var lang = _prismjsPackage2.default.languages[p[0]];
  if (!lang) return;
  var alt = p[1];
  if (_lodash2.default.isString(alt)) {
    _prismjsPackage2.default.languages[alt] = lang;
  } else if (_lodash2.default.isArray(alt)) {
    alt.forEach(function (a) {
      _prismjsPackage2.default.languages[a] = lang;
    });
  }
});

function highlight(code, lang) {
  var g = _prismjsPackage2.default.languages[lang];
  if (g) {
    return _prismjsPackage2.default.highlight(code, g, lang);
  }
  return code;
}