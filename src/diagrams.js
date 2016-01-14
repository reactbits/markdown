/*eslint-disable*/
import sequenceDiagram from 'js-sequence-diagrams';
import flowChart from 'flowchart';
/*eslint-enable*/

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
		default:
			break;
		}
	});
}
