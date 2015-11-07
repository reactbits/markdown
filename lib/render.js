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

var _highlight = require('./highlight');

var _highlight2 = _interopRequireDefault(_highlight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var md = (0, _markdownIt2.default)({
	html: true,
	linkify: true,
	typographer: true,
	highlight: _highlight2.default
});

(0, _linkify2.default)(md.linkify);

// use plugins
md.use(_markdownItEmoji2.default);
md.use(_markdownItDeflist2.default);
md.use(_markdownItSub2.default);
md.use(_markdownItSup2.default);
md.use(_markdownItFootnote2.default);

md.renderer.rules.emoji = function (token, idx) {
	return _twemoji2.default.parse(token[idx].content);
};

// fix rendering of code blocks

var fence = md.renderer.rules.fence;
var reCodeBlock = /^\<(pre)\>(<code\s+(class="[\w-]+")\s*\>)/;

// TODO this code should in markdown-it
// patches syntax highlighter to add class to pre tag
md.renderer.rules.fence = function () {
	var args = [].slice.call(arguments);
	var result = fence.apply(this, args);
	return result.replace(reCodeBlock, '<$1 $3>$2');
};

// Renders given markdown text to HTML.
function render(text) {
	return md.render(text || '');
}