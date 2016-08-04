'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.render = render;
exports.default = plugin;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _prismjsPackage = require('prismjs-package');

var _prismjsPackage2 = _interopRequireDefault(_prismjsPackage);

var _prism = require('prismjs-package/themes/prism.css');

var _prism2 = _interopRequireDefault(_prism);

var _reactDiffview = require('react-diffview');

var _reactDiffview2 = _interopRequireDefault(_reactDiffview);

var _utils = require('markdown-it/lib/common/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line
var externalLangs = {
	seq: 'sequence',
	sequence: 'sequence',
	// TODO flow could be ambigious with flow.js
	flow: 'flowchart',
	flowchart: 'flowchart',
	railroad: 'railroad',
	tex: 'tex'
};
// TODO do that in prismjs-package


var externalClass = {
	tex: 'tex'
};

function external(code, lang) {
	var className = externalClass[lang] || 'diagram';
	return '<div class="injection ' + className + '" data-lang="' + lang + '">' + code + '</div>';
}

function render(code, language) {
	var lang = (language || '').toLowerCase();
	var externalLang = externalLangs[lang];
	if (externalLang) {
		return external(code, externalLang);
	}
	if (lang.match(/^diff?/i)) {
		var view = _react2.default.createElement(_reactDiffview2.default, { source: code });
		return (0, _server.renderToString)(view);
	}
	return (0, _prismjsPackage2.default)(code, language);
}

/* eslint-disable no-param-reassign */
function plugin(md) {
	md.renderer.rules.fence = function (tokens, idx, options) {
		var token = tokens[idx];
		var info = token.info ? (0, _utils.unescapeAll)(token.info).trim() : '';
		var langName = '';

		if (info) {
			langName = info.split(/\s+/g)[0];
			token.attrJoin('class', options.langPrefix + langName);
		}

		return render(token.content, langName);
	};
}
/* eslint-enable */