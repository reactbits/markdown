'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = render;

var _markdownIt = require('markdown-it');

var _markdownIt2 = _interopRequireDefault(_markdownIt);

var _markdownItDeflist = require('markdown-it-deflist');

var _markdownItDeflist2 = _interopRequireDefault(_markdownItDeflist);

var _markdownItSup = require('markdown-it-sup');

var _markdownItSup2 = _interopRequireDefault(_markdownItSup);

var _markdownItSub = require('markdown-it-sub');

var _markdownItSub2 = _interopRequireDefault(_markdownItSub);

var _markdownItFootnote = require('markdown-it-footnote');

var _markdownItFootnote2 = _interopRequireDefault(_markdownItFootnote);

var _markdownItEmoji = require('markdown-it-emoji');

var _markdownItEmoji2 = _interopRequireDefault(_markdownItEmoji);

var _twemoji = require('twemoji');

var _twemoji2 = _interopRequireDefault(_twemoji);

var _linkify = require('./linkify');

var _linkify2 = _interopRequireDefault(_linkify);

var _codeblock = require('./codeblock');

var _codeblock2 = _interopRequireDefault(_codeblock);

var _embed = require('./embed');

var _embed2 = _interopRequireDefault(_embed);

var _tasklist = require('./tasklist');

var _tasklist2 = _interopRequireDefault(_tasklist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var md = new _markdownIt2.default({
  html: true,
  linkify: true,
  typographer: true
});

(0, _linkify2.default)(md.linkify);

// use plugins
md.use(_codeblock2.default);
md.use(_markdownItEmoji2.default);
md.use(_markdownItDeflist2.default);
md.use(_markdownItSub2.default);
md.use(_markdownItSup2.default);
md.use(_markdownItFootnote2.default);
md.use(_embed2.default);
md.use(_tasklist2.default);

md.renderer.rules.emoji = function (tokens, idx) {
  return _twemoji2.default.parse(tokens[idx].content);
};

// Renders given markdown text to HTML.
function render(text) {
  return md.render(text || '');
}