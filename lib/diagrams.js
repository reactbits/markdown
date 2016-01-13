'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = render;

var _jsSequenceDiagrams = require('js-sequence-diagrams');

var _jsSequenceDiagrams2 = _interopRequireDefault(_jsSequenceDiagrams);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*eslint-enable*/

function render(elems) {
	$.each(elems, function (i, e) {
		var lang = $(e).data('lang');
		if (lang === 'sequence') {
			$(e).sequenceDiagram({ theme: 'hand' });
		}
	});
} /*eslint-disable*/