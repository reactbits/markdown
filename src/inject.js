/*eslint-disable*/
import sequenceDiagram from 'js-sequence-diagrams';
import flowchart from 'flowchart.js';
/*eslint-enable*/
import railroad from './railroad';
import katex from 'katex';
// import katexStyles from '../bower_components/KaTeX/dist/katex.min.css'; // eslint-disable-line

function inject(element) {
	const $e = $(element);
	if ($e.is('.diagram')) {
		const lang = $e.data('lang');
		switch (lang) {
		case 'sequence':
			$e.sequenceDiagram({ theme: 'hand' });
			break;
		case 'flowchart':
			$e.flowChart();
			break;
		case 'railroad':
			railroad(element);
			break;
		default:
			break;
		}
		return;
	}
	if ($e.is('.tex')) {
		try {
			const text = $e.text();
			katex.render(text, element);
		} catch (e) {
			console.log('katex failed:', e);
		}
	}
}

export default function render(elems) {
	$.each(elems, (i, e) => inject(e));
}
