'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = render;

var _jsSequenceDiagrams = require('js-sequence-diagrams');

var _jsSequenceDiagrams2 = _interopRequireDefault(_jsSequenceDiagrams);

var _flowchart = require('flowchart.js');

var _flowchart2 = _interopRequireDefault(_flowchart);

var _katex = require('katex');

var _katex2 = _interopRequireDefault(_katex);

var _railroad = require('./railroad');

var _railroad2 = _interopRequireDefault(_railroad);

var _embed = require('embed-js/src/embed.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line
// import embedStyles from 'embed-js/src/embed.css'; // eslint-disable-line

function inject(element) {
	var $e = $(element);
	if ($e.is('.diagram')) {
		var lang = $e.data('lang');
		switch (lang) {
			case 'sequence':
				$e.sequenceDiagram({ theme: 'hand' });
				break;
			case 'flowchart':
				$e.flowChart();
				break;
			case 'railroad':
				(0, _railroad2.default)(element);
				break;
			default:
				break;
		}
		return;
	}
	if ($e.is('.tex')) {
		try {
			var text = $e.text();
			_katex2.default.render(text, element);
		} catch (e) {
			console.log('katex failed:', e);
		}
		return;
	}
	if ($e.is('.embedjs')) {
		var em = new window.EmbedJS({
			element: element
		});
		em.render();
	}
}
// import katexStyles from '../bower_components/KaTeX/dist/katex.min.css'; // eslint-disable-line

/*eslint-enable*/
/*eslint-disable*/
function render(elems) {
	$.each(elems, function (i, e) {
		return inject(e);
	});
}