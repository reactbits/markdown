'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = render;

var _jsSequenceDiagrams = require('js-sequence-diagrams');

var _jsSequenceDiagrams2 = _interopRequireDefault(_jsSequenceDiagrams);

var _flowchart = require('flowchart');

var _flowchart2 = _interopRequireDefault(_flowchart);

var _railroad = require('./railroad');

var _railroad2 = _interopRequireDefault(_railroad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render(elems) {
	$.each(elems, function (i, e) {
		var lang = $(e).data('lang');
		switch (lang) {
			case 'sequence':
				$(e).sequenceDiagram({ theme: 'hand' });
				break;
			case 'flowchart':
				$(e).flowChart();
				break;
			case 'railroad':
				(0, _railroad2.default)(e);
				break;
			default:
				break;
		}
	});
}
/*eslint-enable*/
/*eslint-disable*/