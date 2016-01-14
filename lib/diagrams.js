'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = render;

var _jsSequenceDiagrams = require('js-sequence-diagrams');

var _jsSequenceDiagrams2 = _interopRequireDefault(_jsSequenceDiagrams);

var _flowchart = require('flowchart');

var _flowchart2 = _interopRequireDefault(_flowchart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*eslint-enable*/

/*eslint-disable*/
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
			default:
				break;
		}
	});
}