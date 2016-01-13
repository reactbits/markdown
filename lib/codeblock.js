'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = render;

var _prismjsPackage = require('prismjs-package');

var _prismjsPackage2 = _interopRequireDefault(_prismjsPackage);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// language aliases
// syntax highlighting with prism.js
var aliases = {
	javascript: 'js',
	csharp: 'c#'
};

_lodash2.default.toPairs(aliases).forEach(function (p) {
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

var diagramLangs = {
	seq: 'sequence',
	sequence: 'sequence',
	// TODO flow could be ambigious with flow.js
	flow: 'flowchart',
	flowchart: 'flowchart'
};

function diagram(code, lang) {
	return '<div class="diagram" data-lang="' + lang + '">' + code + '</div>';
}

function codeBlock(html, lang) {
	var className = 'language-' + lang;
	return '<pre class="' + className + '"><code>' + html + '</code></pre>';
}

function render(code, language) {
	var lang = (language || '').toLowerCase();
	var diagramLang = diagramLangs[lang];
	if (diagramLang) {
		return diagram(code, diagramLang);
	}
	var grammar = _prismjsPackage2.default.languages[lang];
	if (grammar) {
		return codeBlock(_prismjsPackage2.default.highlight(code, grammar, lang));
	}
	// TODO inteligent language detection
	return code;
}