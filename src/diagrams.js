/*eslint-disable*/
import sd from 'js-sequence-diagrams';
/*eslint-enable*/

export default function render(elems) {
	$.each(elems, (i, e) => {
		const lang = $(e).data('lang');
		if (lang === 'sequence') {
			$(e).sequenceDiagram({ theme: 'hand' });
		}
	});
}
