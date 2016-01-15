/*eslint-disable*/
import sequenceDiagram from 'js-sequence-diagrams';
import flowchart from 'flowchart.js';
/*eslint-enable*/
import railroad from './railroad';

function inject(e) {
	const lang = $(e).data('lang');
	switch (lang) {
	case 'sequence':
		$(e).sequenceDiagram({ theme: 'hand' });
		break;
	case 'flowchart':
		$(e).flowChart();
		break;
	case 'railroad':
		railroad(e);
		break;
	default:
		break;
	}
}

export default function render(elems) {
	$.each(elems, (i, e) => inject(e));
}
