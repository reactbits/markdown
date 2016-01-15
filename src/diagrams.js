/*eslint-disable*/
import sequenceDiagram from 'js-sequence-diagrams';
import flowChart from 'flowchart';
/*eslint-enable*/
import railroad from './railroad';

export default function render(elems) {
	$.each(elems, (i, e) => {
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
	});
}
